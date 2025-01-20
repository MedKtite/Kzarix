package ecom.kzarix.service;

import ecom.kzarix.model.Product;
import ecom.kzarix.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // List all products
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Get a product by id
    public Product getProductById(Long id) {
        return productRepository.findById(id).orElse(null);
    }

    // Add a product
    public Product addProduct(Product product) {
        return productRepository.save(product);
    }

    // Update a product
    public Product updateProduct(Product product) {
        return productRepository.save(product);
    }

    // Delete a product
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

}
