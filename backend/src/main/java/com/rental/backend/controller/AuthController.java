package com.rental.backend.controller;

import com.rental.backend.model.Role;
import com.rental.backend.model.User;
import com.rental.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
// PAS de @CrossOrigin ici (déjà géré dans SecurityConfig)
public class AuthController {

    @Autowired private UserRepository userRepository;
    @Autowired private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        // Vérification doublon email
        if (userRepository.existsByEmail(user.getEmail())) {
            return ResponseEntity.badRequest().body(Map.of("message", "Cet email est déjà utilisé !"));
        }

        try {
            // Cryptage du mot de passe
            user.setPassword(passwordEncoder.encode(user.getPassword()));
            
            // Rôle par défaut si non précisé
            if (user.getRole() == null) user.setRole(Role.USER);
            
            userRepository.save(user);
            return ResponseEntity.ok(Map.of("message", "Inscription réussie !"));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("message", "Erreur: " + e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            return ResponseEntity.status(401).body(Map.of("message", "Mot de passe incorrect"));
        }

        return ResponseEntity.ok(user);
    }
}