package ecom.kzarix.service;

import ecom.kzarix.model.Activity;
import ecom.kzarix.model.Customer;
import ecom.kzarix.repositories.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActivityService {
    private final ActivityRepository activityRepository;

    @Autowired
    public ActivityService(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }


    public void logActivity(Customer customer, String action, String details) {
        Activity activity = new Activity(customer, action, details);
        activityRepository.save(activity);
    }

}
