package ecom.kzarix.controller;


import ecom.kzarix.model.Product;
import ecom.kzarix.service.CategoryService;
import ecom.kzarix.service.ImageService;
import ecom.kzarix.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;
    private final ImageService imageService;
    private final CategoryService categoryService;

    @Autowired
    public ProductController(ProductService productService, ImageService imageService, CategoryService categoryService) {
        this.productService = productService;
        this.imageService = imageService;
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
        return ResponseEntity.ok(productService.getProductById(id));
    }

    // Add a product

    @PostMapping("/add")
    public ResponseEntity<Product> addProduct(@RequestBody Product product) {
        product.setCategory(categoryService.getCategoryById(product.getCategory().getId()).orElseThrow(() -> new IllegalArgumentException("Invalid category ID")));
        product.setCreatedAt(new Date());
        Product savedProduct = productService.addProduct(product);
        System.out.println("Saved Product in Controller: " + savedProduct); // Debugging statement
        return ResponseEntity.ok(savedProduct);
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