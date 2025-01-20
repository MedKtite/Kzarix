package ecom.kzarix.controller;

import ecom.kzarix.model.Customer;
import ecom.kzarix.service.ActivityService;
import ecom.kzarix.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    private final CustomerService customerService;
    private final ActivityService activityService;

    @Autowired
    public CustomerController(CustomerService customerService, ActivityService activityService) {
        this.customerService = customerService;
        this.activityService = activityService;
    }

    // List all customers
    @GetMapping
    public ResponseEntity<List<Customer>> getAllCustomers() {
        return ResponseEntity.ok(customerService.getAllCustomers());
    }

    // Get a customer by id
    @GetMapping("/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable Long id) {
        Customer customer = customerService.getCustomerById(id);
        if (customer != null) {
            return ResponseEntity.ok(customer);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // View a product by a customer
    @PostMapping("/{id}/view-product")
    public ResponseEntity<String> viewProduct(@PathVariable Long id, @RequestParam String product) {
        Customer customer = customerService.getCustomerById(id);
        if (customer == null) {
            return ResponseEntity.notFound().build();
        }

        activityService.logActivity(customer, "VIEW_PRODUCT", "Viewed product: " + product);
        return ResponseEntity.ok("Product viewed: " + product);
    }
}
