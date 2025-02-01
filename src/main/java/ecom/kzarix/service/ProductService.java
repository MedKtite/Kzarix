package ecom.kzarix.service;

import ecom.kzarix.model.Category;
import ecom.kzarix.model.Product;
import ecom.kzarix.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProductService {
    private final ProductRepository productRepository;
    private final CategoryService categoryService;

    @Autowired
    public ProductService(ProductRepository productRepository, CategoryService categoryService) {
        this.productRepository = productRepository;
        this.categoryService = categoryService;
    }

    // List all products
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Get a product by id
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    // Add a product
    public Product addProduct(Product product) {
        Category category = categoryService.getCategoryById(product.getCategory().getId())
                .orElseThrow(() -> new IllegalArgumentException("Category not found"));
        product.setCategory(category);
        return productRepository.save(product);
    }

    // Update a product
    public Product updateProduct(Long id, Product product) {
        if (!productRepository.existsById(id)) {
            throw new IllegalArgumentException("Product not found");
        }
        product.setId(id);
        return productRepository.save(product);
    }

    // Delete a product
    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }
}