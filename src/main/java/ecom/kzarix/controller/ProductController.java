package ecom.kzarix.controller;

import ecom.kzarix.model.Product;
import ecom.kzarix.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // List all products
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    // Get a product by id
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    // Add a product
    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product){
        return ResponseEntity.ok(productService.addProduct(product));
    }

    // Update a product
    @PutMapping
    public ResponseEntity<Product> updateProduct(@RequestBody Product product){
        return ResponseEntity.ok(productService.updateProduct(product));
    }

    // Delete a product
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id){
        productService.deleteProduct(id);
        return ResponseEntity.ok().build();
    }
}
