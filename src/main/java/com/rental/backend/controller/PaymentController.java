package com.rental.backend.controller;

import com.rental.backend.dto.PaymentIntentRequest;
import com.rental.backend.dto.PaymentIntentResponse;
import com.rental.backend.model.Payment;
import com.rental.backend.model.SavedPaymentMethod;
import com.rental.backend.model.User;
import com.rental.backend.service.PaymentService;
import com.rental.backend.service.UserService;
import com.stripe.exception.StripeException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class PaymentController {

    private final PaymentService paymentService;
    private final UserService userService;

    private User getAuthenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        return userService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @PostMapping("/create-intent")
    public ResponseEntity<PaymentIntentResponse> createPaymentIntent(@RequestBody PaymentIntentRequest request) {
        try {
            User user = getAuthenticatedUser();
            PaymentIntentResponse response = paymentService.createPaymentIntent(request, user.getId());
            return ResponseEntity.ok(response);
        } catch (StripeException e) {
            return ResponseEntity.badRequest().body(null);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/confirm")
    public ResponseEntity<?> confirmPayment(@RequestBody Map<String, String> payload) {
        String paymentIntentId = payload.get("paymentIntentId");
        if (paymentIntentId == null) {
            return ResponseEntity.badRequest().body("paymentIntentId is required");
        }

        try {
            Payment payment = paymentService.confirmPayment(paymentIntentId);
            return ResponseEntity.ok(payment);
        } catch (StripeException e) {
            return ResponseEntity.badRequest().body("Stripe error: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body("Error: " + e.getMessage());
        }
    }

    @GetMapping("/my-payments")
    public ResponseEntity<List<Payment>> getMyPayments() {
        User user = getAuthenticatedUser();
        return ResponseEntity.ok(paymentService.getUserPayments(user.getId()));
    }

    @GetMapping("/methods")
    public ResponseEntity<List<SavedPaymentMethod>> getMyPaymentMethods() {
        User user = getAuthenticatedUser();
        return ResponseEntity.ok(paymentService.getSavedPaymentMethods(user.getId()));
    }

    @PostMapping("/methods/save")
    public ResponseEntity<?> savePaymentMethod(@RequestBody Map<String, String> payload) {
        String paymentMethodId = payload.get("paymentMethodId");
        if (paymentMethodId == null) {
            return ResponseEntity.badRequest().body("paymentMethodId is required");
        }

        try {
            User user = getAuthenticatedUser();
            SavedPaymentMethod saved = paymentService.savePaymentMethod(user.getId(), paymentMethodId);
            return ResponseEntity.ok(saved);
        } catch (StripeException e) {
            return ResponseEntity.badRequest().body("Stripe error: " + e.getMessage());
        }
    }
}
