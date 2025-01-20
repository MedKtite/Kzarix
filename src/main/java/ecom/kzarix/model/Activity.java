package ecom.kzarix.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Activity {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "activity_seq")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @Column(nullable = false)
    private String action;

    @Column(nullable = false)
    private String details;

    @Column(nullable = false)
    private LocalDateTime timestamp;

    public Activity() {
        this.timestamp = LocalDateTime.now();
    }

    public Activity(Customer customer, String action, String details) {
        this.customer = customer;
        this.action = action;
        this.details = details;
        this.timestamp = LocalDateTime.now();
    }
}
