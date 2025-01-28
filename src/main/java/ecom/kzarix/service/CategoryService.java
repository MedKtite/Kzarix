package ecom.kzarix.service;

import ecom.kzarix.model.Category;
import ecom.kzarix.repositories.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    // List all categories
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    // Get a category by id
    public Optional<Category> getCategoryById(Long id) {
        return categoryRepository.findById(id);
    }

    // Add a category
    public Category addCategory(Category category) {
        return categoryRepository.save(category);
    }

    // Update a category
    public Category updateCategory(Long id, Category category) {
        if (categoryRepository.existsById(id)) {
            category.setId(id);
            return categoryRepository.save(category);
        } else {
            throw new IllegalArgumentException("Category with id " + id + " does not exist");
        }
    }
    // Delete a category
    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }
}