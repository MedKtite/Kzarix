package ecom.kzarix.dto;

import ecom.kzarix.model.Role;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterUserDto {
    private String email;
    private String username;
    private String password;
    private Role role;

}
