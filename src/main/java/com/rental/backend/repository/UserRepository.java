package com.rental.backend.repository;

import com.rental.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    // Pour le Login
    Optional<User> findByEmail(String email);

    // POUR LE REGISTER (C'est cette ligne qui manquait)
    boolean existsByEmail(String email);

    // Pour le Dashboard Admin
    List<User> findByAgencyStatus(User.AgencyStatus status);
}