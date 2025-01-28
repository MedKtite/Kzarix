package ecom.kzarix.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "images")
@Getter
@Setter
public class Image {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Lob
    private byte[] picByte;

    public Image() {
    }

    public Image(byte[] picByte) {
        this.picByte = picByte;
    }
}