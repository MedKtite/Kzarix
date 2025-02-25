package ecom.kzarix.controller;

import ecom.kzarix.model.Product;
import ecom.kzarix.service.CategoryService;
import ecom.kzarix.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

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
    public ResponseEntity<Product> addProduct(@ModelAttribute Product product, @RequestParam("images") List<MultipartFile> images) {
        product.setCreatedAt(new Date());
        categoryService.getCategoryById(product.getCategory().getId()).ifPresent(product::setCategory);
        List<String> imageUrls = saveImages(images);
        product.setImages(imageUrls);
        return ResponseEntity.ok(productService.addProduct(product));
    }

    // Update a product
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Long id, @ModelAttribute Product product, @RequestParam("images") List<MultipartFile> images) {
        try {
            List<String> imageUrls = saveImages(images);
            product.setImages(imageUrls);
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

    private List<String> saveImages(List<MultipartFile> images) {
        String uploadDir = "uploads/images"; // Specify your upload directory
        Path uploadPath = Paths.get(uploadDir);

        // Create directories if they do not exist
        if (!Files.exists(uploadPath)) {
            try {
                Files.createDirectories(uploadPath);
            } catch (IOException e) {
                throw new RuntimeException("Failed to create upload directory", e);
            }
        }

        return images.stream().map(image -> {
            try {
                // Generate a unique file name
                String fileName = UUID.randomUUID().toString() + "_" + image.getOriginalFilename();
                Path filePath = uploadPath.resolve(fileName);

                // Save the file to the specified directory
                Files.write(filePath, image.getBytes());

                // Return the URL of the saved image
                return filePath.toString(); // Adjust this to return the correct URL
            } catch (IOException e) {
                throw new RuntimeException("Failed to save image", e);
            }
        }).collect(Collectors.toList());
    }
}