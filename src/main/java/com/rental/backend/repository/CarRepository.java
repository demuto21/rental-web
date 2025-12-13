package com.rental.backend.repository;

import com.rental.backend.model.Car;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CarRepository extends JpaRepository<Car, Long> {
    // Méthodes personnalisées (Spring les comprendra automatiquement)
    List<Car> findByLocationContaining(String location);
    List<Car> findByPriceLessThanEqual(Double price);
}