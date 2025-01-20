package ecom.kzarix.service;

import ecom.kzarix.model.Customer;
import ecom.kzarix.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerService {
    private final CustomerRepository customerRepository;

    @Autowired
    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    // List all customers
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    // Get a customer by id
    public Customer getCustomerById(Long id) {
        return customerRepository.findById(id).orElse(null);
    }

}
