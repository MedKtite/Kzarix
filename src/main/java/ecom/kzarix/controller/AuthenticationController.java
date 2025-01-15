package ecom.kzarix.controller;

import ecom.kzarix.dto.*;
import ecom.kzarix.model.User;
import ecom.kzarix.response.LoginResponse;
import ecom.kzarix.service.AuthenticationService;
import ecom.kzarix.service.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RequestMapping("/auth")
@RestController
public class AuthenticationController {
    private final JwtService jwtService;
    private final AuthenticationService authenticationService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup")
    public ResponseEntity<User> register(@RequestBody RegisterUserDto registerUserDto) {
        User registeredUser = authenticationService.signup(registerUserDto);
        return ResponseEntity.ok(registeredUser);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginUserDto loginUserDto){
        User authenticatedUser = authenticationService.authenticate(loginUserDto);
        String jwtToken = jwtService.generateToken(authenticatedUser);
        LoginResponse loginResponse = new LoginResponse(jwtToken, jwtService.getExpirationTime());
        return ResponseEntity.ok(loginResponse);
    }

@PostMapping("/verify")
public ResponseEntity<Map<String, String>> verifyUser(@RequestBody VerifyUserDto verifyUserDto) {
    Map<String, String> response = new HashMap<>();
    try {
        authenticationService.verifyUser(verifyUserDto);
        response.put("message", "Account verified successfully");
        return ResponseEntity.ok(response);
    } catch (RuntimeException e) {
        response.put("error", e.getMessage());
        return ResponseEntity.badRequest().body(response);
    }
}

    @PostMapping("/resend")
    public ResponseEntity<?> resendVerificationCode(@RequestParam String email) {
        try {
            authenticationService.resendVerificationCode(email);
            return ResponseEntity.ok("Verification code sent");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/oauth2")
    public String home(Model model, @AuthenticationPrincipal OAuth2User principal) {
        model.addAttribute("name", principal.getAttribute("name"));
        return "home";
    }


    // Password Reset
    
    @PostMapping("/password-reset-request")
    public ResponseEntity<?> requestPasswordReset(@RequestBody PasswordRestRequestDto request) {
        try {
            authenticationService.requestPasswordReset(request);
            return ResponseEntity.ok("Password reset token sent to email");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/password-reset")
    public ResponseEntity<?> resetPassword(@RequestBody PasswordRestDto resetDto) {
        try {
            authenticationService.restPassword(resetDto);
            return ResponseEntity.ok("Password reset successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());


        }
    }

    }
