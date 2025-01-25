package ecom.kzarix.controller;

import ecom.kzarix.model.Image;
import ecom.kzarix.model.Product;
import ecom.kzarix.service.ImageService;
import ecom.kzarix.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;
    private final ImageService imageService;

    @Autowired
    public ProductController(ProductService productService, ImageService imageService) {
        this.productService = productService;
        this.imageService = imageService;
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
    public ResponseEntity<Product> addProduct(@RequestParam String name, @RequestParam String description, @RequestParam double price, @RequestParam int quantity, @RequestParam Long categoryId, @RequestParam("file") MultipartFile file) {
        try {
            Image image = imageService.saveImage(file);
            Product product = new Product(null, name, description, price, quantity, new Date(), image);
            return ResponseEntity.ok(productService.addProduct(product));
        } catch (IOException e) {
            return ResponseEntity.status(500).body(null);
        }
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