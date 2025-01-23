package ecom.kzarix.model;

import jakarta.persistence.*;
import lombok.*;


import java.util.List;

@Entity
@Getter
@Setter
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String orderNumber;
    @ManyToOne
    private Customer customer;
    @OneToMany
    private List<Product> products;
    private double total;
    private String status;

}
