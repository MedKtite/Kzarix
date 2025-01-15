package ecom.kzarix.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PasswordRestDto {
    private String token;
    private String newPassword;
}

