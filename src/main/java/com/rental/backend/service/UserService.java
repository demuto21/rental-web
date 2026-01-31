package com.rental.backend.service;

import com.rental.backend.model.User;
import com.rental.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Utilisateur qui postule
    public void applyForAgency(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        user.setAgencyStatus(User.AgencyStatus.PENDING);
        userRepository.save(user);
    }

    // Admin qui liste les demandes
    public List<User> getPendingRequests() {
        return userRepository.findByAgencyStatus(User.AgencyStatus.PENDING);
    }

    // Admin qui approuve
    public void approveAgency(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        user.setAgencyStatus(User.AgencyStatus.APPROVED);
        user.setRole(User.Role.AGENCY); // On change le rôle ici
        userRepository.save(user);
    }

    // Admin qui rejette
    public void rejectAgency(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        user.setAgencyStatus(User.AgencyStatus.REJECTED);
        userRepository.save(user);
    }

    // === NOUVELLES MÉTHODES ADMIN ===

    // Récupérer tous les utilisateurs
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Supprimer un utilisateur
    public void deleteUser(Long userId) {
        if (!userRepository.existsById(userId)) {
            throw new RuntimeException("Utilisateur non trouvé");
        }
        userRepository.deleteById(userId);
    }

    // Mettre à jour le rôle d'un utilisateur
    public void updateUserRole(Long userId, User.Role role) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        user.setRole(role);
        userRepository.save(user);
    }

    // Compter le nombre total d'utilisateurs
    public long countAllUsers() {
        return userRepository.count();
    }

    // Trouver un utilisateur par email
    public java.util.Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}