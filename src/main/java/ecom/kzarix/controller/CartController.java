package ecom.kzarix.controller;

import ecom.kzarix.model.Cart;
import ecom.kzarix.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/carts")
public class CartController {

    private final CartService cartService;

    @Autowired
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping("/{customerId}")
    public ResponseEntity<Cart> getCartByCustomerId(@PathVariable Long customerId) {
        return ResponseEntity.ok(cartService.getCartByCustomerId(customerId));
    }

    @PostMapping("/{cartId}/add")
    public ResponseEntity<String> addProductToCart(@PathVariable Long cartId, @RequestParam Long productId, @RequestParam int quantity) {
        cartService.addProductToCart(cartId, productId, quantity);
        return ResponseEntity.ok("Product added to cart");
    }

    @PutMapping("/{cartId}/update/{cartItemId}")
    public ResponseEntity<String> updateCartItem(@PathVariable Long cartId, @PathVariable Long cartItemId, @RequestParam int quantity) {
        cartService.updateCartItem(cartItemId, quantity);
        return ResponseEntity.ok("Cart item updated");
    }

    @DeleteMapping("/{cartId}/clear")
    public ResponseEntity<String> clearCart(@PathVariable Long cartId) {
        cartService.clearCart(cartId);
        return ResponseEntity.ok("Cart cleared");
    }
}
