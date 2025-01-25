package ecom.kzarix.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private double price;
    private int quantity;
    @ManyToOne
    private Category category;
    @ManyToOne
    @JoinColumn(name = "image_id")
    private Image image;
    private Date createdAt;

    public Product() {
    }

    public Product(Long id, String name, String description, double price, int quantity, Date createdAt, Image image) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.quantity = quantity;
        this.createdAt = createdAt;
        this.image = image;
    }
}