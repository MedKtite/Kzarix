package ecom.kzarix;

import ecom.kzarix.model.Product;
import ecom.kzarix.repositories.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.util.Date;

@SpringBootApplication
public class KzarixApplication {

    public static void main(String[] args) {
        SpringApplication.run(KzarixApplication.class, args);
    }


  /* @Bean
    CommandLineRunner initDatabase(ProductRepository productRepository) {
        return args -> {
            productRepository.save(Product.builder()
                    .name("Product 1")
                    .description("Description of product 1")
                    .price(100.0)
                    .quantity(10)
                    .createdAt(new Date())
                    .build());

        };
    }/*/

}
