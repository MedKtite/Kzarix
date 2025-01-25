package ecom.kzarix.service;

import ecom.kzarix.dto.*;
import ecom.kzarix.model.Role;
import ecom.kzarix.model.User;
import ecom.kzarix.repositories.UserRepository;
import jakarta.mail.MessagingException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final EmailService emailService;

    public AuthenticationService(
            UserRepository userRepository,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder,
            EmailService emailService
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.emailService = emailService;
    }


public User signup(RegisterUserDto input) {
    User user = new User(input.getUsername(), input.getEmail(), passwordEncoder.encode(input.getPassword()));
    user.setRole(input.getRole() != null ? input.getRole() : Role.USER); // USER Role BY DEFAULT
    user.setVerificationCode(generateVerificationCode());
    user.setVerificationCodeExpiresAt(LocalDateTime.now().plusMinutes(15));
    user.setEnabled(false);
    sendVerificationEmail(user);
    userRepository.save(user);

    if (input.getRole() == Role.ADMIN) {
        sendAdminApprovalEmail(input);
        throw new RuntimeException("Admin account created. Please wait for approval.");
    }
    return user;
}

    // Send Admin Approval Email
    public void sendAdminApprovalEmail(RegisterUserDto input) {
        String subject = "Admin Account Approval";
        String approvalLink = "http://localhost:8085/auth/approve-admin?email=" + input.getEmail();
        String htmlMessage = "<html>"
                + "<body style=\"font-family: Arial, sans-serif;\">"
                + "<div style=\"background-color: #f5f5f5; padding: 20px;\">"
                + "<h2 style=\"color: #333;\">Admin Sign-Up Request</h2>"
                + "<p style=\"font-size: 16px;\">An admin sign-up request has been made for the email: " + input.getEmail() + "</p>"
                + "<p style=\"font-size: 16px;\">Click the link below to approve the request:</p>"
                + "<a href=\"" + approvalLink + "\">Approve Admin Sign-Up</a>"
                + "</div>"
                + "</body>"
                + "</html>";

        try {
            emailService.sendVerificationEmail("ktite.m3@gmail.com", subject, htmlMessage);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }



    // Send Approved Email
public ResponseEntity<String> approveAdmin(String email) {
    Optional<User> optionalUser = userRepository.findByEmail(email);
    if (optionalUser.isPresent()) {
        User user = optionalUser.get();
        user.setRole(Role.ADMIN);
        user.setEnabled(true);
        userRepository.save(user);

        // Send success email to the admin
        String subject = "Admin Account Approved";
        String htmlMessage = "<html>"
                + "<body style=\"font-family: Arial, sans-serif;\">"
                + "<div style=\"background-color: #f5f5f5; padding: 20px;\">"
                + "<h2 style=\"color: #333;\">Admin Account Approved</h2>"
                + "<p style=\"font-size: 16px;\">Your admin account has been approved successfully.</p>"
                + "</div>"
                + "</body>"
                + "</html>";

        try {
            emailService.sendVerificationEmail(user.getEmail(), subject, htmlMessage);
        } catch (MessagingException e) {
            e.printStackTrace();
        }

        return ResponseEntity.ok("Admin sign-up request approved");
    } else {
        return ResponseEntity.badRequest().body("User not found");
    }
}

    // Authenticate User
    public User authenticate(LoginUserDto input) {
        User user = userRepository.findByEmail(input.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.isEnabled()) {
            throw new RuntimeException("Account not verified. Please verify your account.");
        }
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        input.getEmail(),
                        input.getPassword()
                )
        );

        return user;
    }


    public void verifyUser(VerifyUserDto input) {
        Optional<User> optionalUser = userRepository.findByEmail(input.getEmail());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.getVerificationCodeExpiresAt().isBefore(LocalDateTime.now())) {
                throw new RuntimeException("Verification code has expired");
            }
            if (user.getVerificationCode().equals(input.getVerificationCode())) {
                user.setEnabled(true);
                user.setVerificationCode(null);
                user.setVerificationCodeExpiresAt(null);
                userRepository.save(user);
            } else {
                throw new RuntimeException("Invalid verification code");
            }
        } else {
            throw new RuntimeException("User not found");
        }
    }

    public void resendVerificationCode(String email) {
        Optional<User> optionalUser = userRepository.findByEmail(email);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.isEnabled()) {
                throw new RuntimeException("Account is already verified");
            }
            user.setVerificationCode(generateVerificationCode());
            user.setVerificationCodeExpiresAt(LocalDateTime.now().plusHours(1));
            sendVerificationEmail(user);
            userRepository.save(user);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    private void sendVerificationEmail(User user) {
        String subject = "Account Verification";
        String verificationCode = "VERIFICATION CODE " + user.getVerificationCode();
        String htmlMessage = "<html>"
                + "<body style=\"font-family: Arial, sans-serif;\">"
                + "<div style=\"background-color: #f5f5f5; padding: 20px;\">"
                + "<h2 style=\"color: #333;\">Welcome to Kzarix!</h2>"
                + "<p style=\"font-size: 16px;\">Please enter the verification code below to continue:</p>"
                + "<div style=\"background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);\">"
                + "<h3 style=\"color: #333;\">Verification Code:</h3>"
                + "<p style=\"font-size: 18px; font-weight: bold; color: #007bff;\">" + verificationCode + "</p>"
                + "</div>"
                + "</div>"
                + "</body>"
                + "</html>";

        try {
            emailService.sendVerificationEmail(user.getEmail(), subject, htmlMessage);
        } catch (MessagingException e) {
            // Handle email sending exception
            e.printStackTrace();
        }
    }

    // Password Reset Request
    public void requestPasswordReset (PasswordRestRequestDto request) {
        Optional<User> optionalUser = userRepository.findByEmail(request.getEmail());
        if (optionalUser.isPresent()){
            User user = optionalUser.get();
           user.setResetToken(generateVerificationCode());
           user.setResetTokenExpiresAt(LocalDateTime.now().plusMinutes(15));
           sendResetEmail(user);
           userRepository.save(user);

        } else {
            throw new RuntimeException("User not found");
        }
    }

    // Password Reset
    public void restPassword(PasswordRestDto restDto) {
        Optional<User> optionalUser = userRepository.findByResetToken(restDto.getToken());
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            if (user.getResetTokenExpiresAt().isBefore(LocalDateTime.now())) {
                throw new RuntimeException("Token has expired");
            }
            user.setPassword(passwordEncoder.encode(restDto.getNewPassword()));
            user.setResetToken(null);
            user.setResetTokenExpiresAt(null);
            userRepository.save(user);
        } else {
            throw new RuntimeException("Invalid token");
        }
    }

    private void sendResetEmail(User user) {
        String subject = "Password Reset Request";
        String resetToken = "RESET TOKEN " + user.getResetToken();
        String htmlMessage = "<html>"
                + "<body style=\"font-family: Arial, sans-serif;\">"
                + "<div style=\"background-color: #f5f5f5; padding: 20px;\">"
                + "<h2 style=\"color: #333;\">Password Reset Request</h2>"
                + "<p style=\"font-size: 16px;\">Please use the reset token below to reset your password:</p>"
                + "<div style=\"background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0,0,0,0.1);\">"
                + "<h3 style=\"color: #333;\">Reset Token:</h3>"
                + "<p style=\"font-size: 18px; font-weight: bold; color: #007bff;\">" + resetToken + "</p>"
                + "</div>"
                + "</div>"
                + "</body>"
                + "</html>";

        try {
            emailService.sendVerificationEmail(user.getEmail(), subject, htmlMessage);
        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }



    private String generateVerificationCode() {
        Random random = new Random();
        int code = random.nextInt(900000) + 100000;
        return String.valueOf(code);
    }
}
