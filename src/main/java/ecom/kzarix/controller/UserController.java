package ecom.kzarix.controller;

import ecom.kzarix.model.User;
import ecom.kzarix.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.logging.Logger;

@RequestMapping("/users")
@RestController
public class UserController {
    private final UserService userService;
    private static final Logger logger = Logger.getLogger(UserController.class.getName());

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/me")
    public ResponseEntity<User> authenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            logger.warning("No user is authenticated");
            return ResponseEntity.badRequest().build();
        }
        Object principal = authentication.getPrincipal();
        if (principal instanceof User) {
            logger.warning("Principal is not an instance of User");
            return ResponseEntity.status(401).build();
        }
        User currentUser = (User) principal;
        logger.info("User is authenticated: " + currentUser.getUsername());
        return ResponseEntity.ok(currentUser);
    }

    @GetMapping("/")
    public ResponseEntity<List<User>> allUsers() {
        List <User> users = userService.allUsers();
        return ResponseEntity.ok(users);
    }
}