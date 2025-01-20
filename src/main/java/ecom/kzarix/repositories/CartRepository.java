package ecom.kzarix.repositories;

import ecom.kzarix.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Cart findByCustomer_Id(Long customerId);
    Cart findByItems_Id(Long cartItemId);
}
