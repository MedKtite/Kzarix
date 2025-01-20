package ecom.kzarix.service;

import ecom.kzarix.model.Cart;
import ecom.kzarix.model.CartItem;
import ecom.kzarix.model.Product;
import ecom.kzarix.repositories.CartRepository;
import ecom.kzarix.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final ProductRepository productRepository;

    @Autowired
    public CartService(CartRepository cartRepository, ProductRepository productRepository) {
        this.cartRepository = cartRepository;
        this.productRepository = productRepository;
    }

    public Cart getCartByCustomerId(Long customerId) {
        return cartRepository.findByCustomer_Id(customerId);
    }

    public void addProductToCart(Long cartId, Long productId, int quantity) {
        Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new RuntimeException("Cart not found"));
        Product product = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));

        CartItem cartItem = new CartItem();
        cartItem.setCart(cart);
        cartItem.setProduct(product);
        cartItem.setQuantity(quantity);

        cart.addItem(cartItem);
        cartRepository.save(cart);
    }

    public void updateCartItem(Long cartItemId, int quantity) {
        Cart cart = cartRepository.findByItems_Id(cartItemId);
        if (cart == null) {
            throw new RuntimeException("Cart not found");
               }

        cart.getItems().stream()
                .filter(item -> item.getId().equals(cartItemId))
                .findFirst()
                .ifPresent(item -> item.setQuantity(quantity));

        cartRepository.save(cart);
    }

    public void clearCart(Long cartId) {
        Cart cart = cartRepository.findById(cartId).orElseThrow(() -> new RuntimeException("Cart not found"));
        cart.clearCart();
        cartRepository.save(cart);
    }
}
