package com.rental.backend.controller;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class NotificationController {

    // Stockage des connexions SSE par userId
    private final Map<Long, SseEmitter> emitters = new ConcurrentHashMap<>();

    /**
     * Endpoint SSE pour recevoir les notifications en temps réel
     */
    @GetMapping(value = "/stream/{userId}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter subscribe(@PathVariable Long userId) {
        System.out.println("🔌 Nouvelle tentative d'abonnement SSE pour l'utilisateur ID: " + userId);
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);
        
        emitters.put(userId, emitter);
        
        emitter.onCompletion(() -> {
            System.out.println("💨 Connexion SSE terminée (Completion) pour l'utilisateur: " + userId);
            emitters.remove(userId);
        });
        emitter.onTimeout(() -> {
            System.out.println("⏰ Connexion SSE expirée (Timeout) pour l'utilisateur: " + userId);
            emitters.remove(userId);
        });
        emitter.onError((e) -> {
            System.out.println("❌ Erreur SSE pour l'utilisateur: " + userId + " - " + e.getMessage());
            emitters.remove(userId);
        });
        
        // Message de bienvenue
        try {
            emitter.send(SseEmitter.event()
                    .name("connected")
                    .data("Connecté aux notifications en temps réel"));
            System.out.println("✅ Abonnement SSE réussi pour l'utilisateur ID: " + userId);
        } catch (IOException e) {
            System.out.println("❌ Échec de l'envoi du message de bienvenue SSE pour: " + userId);
            emitter.complete();
        }
        
        return emitter;
    }

    /**
     * Envoyer une notification à un utilisateur spécifique
     */
    public void sendNotification(Long userId, String type, String message) {
        System.out.println("🎯 Tentative d'envoi de notification SSE à l'utilisateur " + userId + " (" + type + ")");
        SseEmitter emitter = emitters.get(userId);
        if (emitter != null) {
            try {
                emitter.send(SseEmitter.event()
                        .name(type)
                        .data(message));
                System.out.println("🚀 Notification envoyée avec succès via SSE à l'utilisateur: " + userId);
            } catch (IOException e) {
                System.out.println("❌ Erreur lors de l'envoi SSE à l'utilisateur " + userId + ". Suppression de l'émetteur.");
                emitters.remove(userId);
            }
        } else {
            System.out.println("⚠️ Aucun émetteur SSE actif trouvé pour l'utilisateur: " + userId);
        }
    }

    /**
     * Envoyer une notification à tous les utilisateurs connectés
     */
    public void broadcastNotification(String type, String message) {
        System.out.println("📢 Broadcast d'une notification à tous les utilisateurs (" + type + ")");
        emitters.forEach((userId, emitter) -> {
            try {
                emitter.send(SseEmitter.event()
                        .name(type)
                        .data(message));
            } catch (IOException e) {
                emitters.remove(userId);
            }
        });
    }

    /**
     * Endpoint pour tester l'envoi de notifications
     */
    @PostMapping("/send/{userId}")
    public String sendTestNotification(
            @PathVariable Long userId,
            @RequestParam String message) {
        sendNotification(userId, "notification", message);
        return "Notification envoyée à l'utilisateur " + userId;
    }
}

