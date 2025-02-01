package ecom.kzarix.controller;

import ecom.kzarix.model.Product;
import ecom.kzarix.service.CategoryService;
import ecom.kzarix.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;
    private final CategoryService categoryService;

    @Autowired
    public ProductController(ProductService productService, CategoryService categoryService) {
        this.productService = productService;
        this.categoryService = categoryService;
    }

    // List all products
    @GetMapping("/")
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    // Get a product by id
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Optional<Product> product = productService.getProductById(id);
        return product.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Add a product
    @PostMapping("/add")
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        product.setCreatedAt(new Date());
        categoryService.getCategoryById(product.getCategory().getId()).ifPresent(product::setCategory);
        return ResponseEntity.ok(productService.addProduct(product));
    }

    // Update a product
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @RequestBody Product product) {
        try {
            Product updatedProduct = productService.updateProduct(id, product);
            return ResponseEntity.ok(updatedProduct);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(404).body(null);
        }
    }

    // Delete a product
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.ok().build();
    }
}