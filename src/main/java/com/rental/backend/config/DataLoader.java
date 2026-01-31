package com.rental.backend.config;

import com.rental.backend.model.*;
import com.rental.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component // <-- Pense à décommenter ça pour que les données se chargent !
public class DataLoader implements CommandLineRunner {

    @Autowired private UserRepository userRepository;
    @Autowired private AgencyRepository agencyRepository;
    @Autowired private CarRepository carRepository;
    @Autowired private DriverRepository driverRepository;
    @Autowired private PasswordEncoder passwordEncoder;
    
    @Autowired(required = false) 
    private com.rental.backend.elasticsearch.CarSearchRepository carSearchRepository;
    
    @Autowired(required = false) 
    private com.rental.backend.elasticsearch.AgencySearchRepository agencySearchRepository;

    @Override
    public void run(String... args) {
        if (userRepository.count() == 0) {
            System.out.println("=== Initialisation des données ===");

            // --- ADMIN ---
            User admin = new User();
            admin.setFullName("Admin");
            admin.setEmail("admin@easyrent.com");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole(User.Role.ADMIN); // <-- CORRECTION ICI
            userRepository.save(admin);

            // --- UTILISATEUR CLASSIQUE ---
            User user = new User();
            user.setFullName("Jean Dupont");
            user.setEmail("user@easyrent.com");
            user.setPassword(passwordEncoder.encode("user123"));
            user.setRole(User.Role.USER); // <-- CORRECTION ICI
            userRepository.save(user);

            // --- AGENCES ---
            Agency agency1 = new Agency();
            agency1.setName("AutoLux Douala");
            agency1.setCity("Douala");
            agency1.setOpen(true);
            agencyRepository.save(agency1);

            Agency agency2 = new Agency();
            agency2.setName("Premium Cars Yaoundé");
            agency2.setCity("Yaoundé");
            agency2.setOpen(true);
            agencyRepository.save(agency2);

            // --- VOITURES ---
            Car car1 = new Car();
            car1.setName("Mercedes GLE 450");
            car1.setBrand("Mercedes");
            car1.setType("SUV");
            car1.setPricePerDay(75000.0);
            car1.setAvailable(true);
            car1.setAgency(agency1);
            carRepository.save(car1);

            Car car2 = new Car();
            car2.setName("Toyota Camry");
            car2.setBrand("Toyota");
            car2.setType("Berline");
            car2.setPricePerDay(45000.0);
            car2.setAvailable(true);
            car2.setAgency(agency1);
            carRepository.save(car2);

            Car car3 = new Car();
            car3.setName("Range Rover Evoque");
            car3.setBrand("Land Rover");
            car3.setType("SUV");
            car3.setPricePerDay(120000.0);
            car3.setAvailable(true);
            car3.setAgency(agency2);
            carRepository.save(car3);

            // --- CHAUFFEUR ---
            Driver driver = new Driver();
            driver.setName("Paul Biya");
            driver.setAge(45);
            driver.setExperience("15 ans");
            driver.setLocation("Yaoundé");
            driver.setPricePerDay(25000.0);
            driver.setRating(4.8);
            driverRepository.save(driver);

            System.out.println("=== Données initialisées avec succès ===");
            
            // Logique de synchronisation Elasticsearch...
            // (Le reste de ton code est correct pour la partie logique)
        }
    }
}