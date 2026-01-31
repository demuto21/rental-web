package com.rental.backend.controller;

import com.rental.backend.model.User;
import com.rental.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/{id}/apply-agency")
    public ResponseEntity<?> applyForAgency(@PathVariable Long id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        // Au lieu de changer le rôle tout de suite, on met en attente
        user.setAgencyStatus(User.AgencyStatus.PENDING);

        userRepository.save(user);
        return ResponseEntity
                .ok(Map.of("message", "Votre demande d'agence est en attente de validation par l'administrateur."));
    }

    // Endpoint pour demander un upgrade (AGENCY ou DRIVER)
    @PostMapping("/{id}/upgrade")
    public ResponseEntity<?> upgradeUser(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        try {
            User user = userRepository.findById(id)
                    .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

            String requestedRole = payload.get("role");

            if (requestedRole == null || requestedRole.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of("message", "Le rôle est requis"));
            }

            // Validation du rôle demandé
            if (!requestedRole.equalsIgnoreCase("AGENCY") && !requestedRole.equalsIgnoreCase("DRIVER")) {
                return ResponseEntity.badRequest()
                        .body(Map.of("message", "Seuls les rôles AGENCY et DRIVER peuvent être demandés"));
            }

            // Pour AGENCY : on met en attente de validation admin
            if (requestedRole.equalsIgnoreCase("AGENCY")) {
                user.setAgencyStatus(User.AgencyStatus.PENDING);
                userRepository.save(user);
                return ResponseEntity.ok(Map.of(
                        "message",
                        "Votre demande d'agence a été soumise. Un administrateur va la valider prochainement.",
                        "status", "PENDING"));
            }

            // Pour DRIVER : upgrade direct (pas besoin de validation admin)
            if (requestedRole.equalsIgnoreCase("DRIVER")) {
                user.setRole(User.Role.DRIVER);
                User updatedUser = userRepository.save(user);
                return ResponseEntity.ok(updatedUser);
            }

            return ResponseEntity.badRequest().body(Map.of("message", "Erreur inconnue"));

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(Map.of("message", "Erreur interne : " + e.getMessage()));
        }
    }
}