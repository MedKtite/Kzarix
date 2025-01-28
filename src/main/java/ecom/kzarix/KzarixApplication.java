package ecom.kzarix;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;


@SpringBootApplication
public class KzarixApplication {

    public static void main(String[] args) {
        SpringApplication.run(KzarixApplication.class, args);
    }


  /*/cle*@Bean
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
  }*/

}
