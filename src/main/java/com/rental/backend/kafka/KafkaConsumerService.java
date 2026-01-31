package com.rental.backend.kafka;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;
import com.rental.backend.controller.NotificationController;

@Service
public class KafkaConsumerService {

    @Autowired
    private NotificationController notificationController;

    @KafkaListener(topics = "booking-events", groupId = "easyrent-group")
    public void consumeBookingEvent(String message) {
        System.out.println("📥 Kafka: Booking event received - " + message);
        // Broadcast à tous les utilisateurs connectés
        notificationController.broadcastNotification("booking", message);
    }

    @KafkaListener(topics = "notifications", groupId = "easyrent-group")
    public void consumeNotification(String message) {
        System.out.println("📥 Kafka: Notification received - " + message);
        // Format: userId|message
        String[] parts = message.split("\\|", 2);
        if (parts.length == 2) {
            try {
                Long userId = Long.parseLong(parts[0]);
                String notifMessage = parts[1];
                notificationController.sendNotification(userId, "notification", notifMessage);
            } catch (NumberFormatException e) {
                System.out.println("❌ Invalid userId in notification: " + parts[0]);
            }
        }
    }
}
