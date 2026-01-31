package com.rental.backend.service;

import com.rental.backend.dto.PaymentIntentRequest;
import com.rental.backend.dto.PaymentIntentResponse;
import com.rental.backend.model.Booking;
import com.rental.backend.model.BookingStatus;
import com.rental.backend.model.Payment;
import com.rental.backend.model.SavedPaymentMethod;
import com.rental.backend.model.User;
import com.rental.backend.repository.BookingRepository;
import com.rental.backend.repository.PaymentRepository;
import com.rental.backend.repository.SavedPaymentMethodRepository;
import com.rental.backend.repository.UserRepository;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final PaymentRepository paymentRepository;
    private final SavedPaymentMethodRepository savedPaymentMethodRepository;
    private final UserRepository userRepository;
    private final BookingRepository bookingRepository;

    /**
     * Create a Stripe Payment Intent
     */
    @Transactional
    public PaymentIntentResponse createPaymentIntent(PaymentIntentRequest request, Long userId) throws StripeException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Validate booking if provided
        Booking booking = null;
        if (request.getBookingId() != null) {
            booking = bookingRepository.findById(request.getBookingId())
                    .orElseThrow(() -> new RuntimeException("Booking not found"));
        }

        // Convert XAF to smallest currency unit (cents)
        // Note: XAF doesn't have decimals, so 1 XAF = 1 unit
        long amountInCents = request.getAmount().multiply(new BigDecimal(100)).longValue();

        // Create Payment Intent with Stripe
        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount(amountInCents)
                .setCurrency(request.getCurrency().toLowerCase())
                .setDescription(request.getDescription())
                .putMetadata("userId", userId.toString())
                .putMetadata("bookingId", request.getBookingId() != null ? request.getBookingId().toString() : "")
                .setAutomaticPaymentMethods(
                        PaymentIntentCreateParams.AutomaticPaymentMethods.builder()
                                .setEnabled(true)
                                .build())
                .build();

        PaymentIntent intent = PaymentIntent.create(params);

        // Save payment record in database
        Payment payment = new Payment();
        payment.setUser(user);
        payment.setBooking(booking);
        payment.setAmount(request.getAmount());
        payment.setCurrency(request.getCurrency());
        payment.setPaymentMethod(Payment.PaymentMethod.CARD);
        payment.setStatus(Payment.PaymentStatus.PENDING);
        payment.setStripePaymentIntentId(intent.getId());
        payment.setStripeClientSecret(intent.getClientSecret());
        payment.setDescription(request.getDescription());

        payment = paymentRepository.save(payment);

        return new PaymentIntentResponse(
                payment.getId(),
                intent.getClientSecret(),
                intent.getStatus());
    }

    /**
     * Confirm a payment after successful Stripe confirmation
     */
    @Transactional
    public Payment confirmPayment(String paymentIntentId) throws StripeException {
        Payment payment = paymentRepository.findByStripePaymentIntentId(paymentIntentId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        // Retrieve the payment intent from Stripe
        PaymentIntent intent = PaymentIntent.retrieve(paymentIntentId);

        if ("succeeded".equals(intent.getStatus())) {
            payment.setStatus(Payment.PaymentStatus.COMPLETED);
            payment.setCompletedAt(LocalDateTime.now());

            // If associated with a booking, confirm the booking
            if (payment.getBooking() != null) {
                Booking booking = payment.getBooking();
                booking.setStatus(BookingStatus.CONFIRMED);
                bookingRepository.save(booking);
            }
        } else if ("requires_payment_method".equals(intent.getStatus()) ||
                "canceled".equals(intent.getStatus())) {
            payment.setStatus(Payment.PaymentStatus.FAILED);
            payment.setFailureReason(
                    intent.getCancellationReason() != null ? intent.getCancellationReason() : "Payment failed");
        }

        return paymentRepository.save(payment);
    }

    /**
     * Get user's payment history
     */
    public List<Payment> getUserPayments(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return paymentRepository.findByUserOrderByCreatedAtDesc(user);
    }

    /**
     * Get a specific payment
     */
    public Payment getPayment(Long paymentId) {
        return paymentRepository.findById(paymentId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));
    }

    /**
     * Save a payment method for future use
     */
    @Transactional
    public SavedPaymentMethod savePaymentMethod(Long userId, String paymentMethodId) throws StripeException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Retrieve payment method details from Stripe
        com.stripe.model.PaymentMethod stripePaymentMethod = com.stripe.model.PaymentMethod.retrieve(paymentMethodId);

        SavedPaymentMethod savedMethod = new SavedPaymentMethod();
        savedMethod.setUser(user);
        savedMethod.setStripePaymentMethodId(paymentMethodId);

        if (stripePaymentMethod.getCard() != null) {
            savedMethod.setCardBrand(stripePaymentMethod.getCard().getBrand());
            savedMethod.setCardLast4(stripePaymentMethod.getCard().getLast4());
            savedMethod.setExpiryMonth(stripePaymentMethod.getCard().getExpMonth().intValue());
            savedMethod.setExpiryYear(stripePaymentMethod.getCard().getExpYear().intValue());
        }

        // Set as default if user has no saved methods yet
        List<SavedPaymentMethod> existingMethods = savedPaymentMethodRepository.findByUser(user);
        savedMethod.setIsDefault(existingMethods.isEmpty());

        return savedPaymentMethodRepository.save(savedMethod);
    }

    /**
     * Get user's saved payment methods
     */
    public List<SavedPaymentMethod> getSavedPaymentMethods(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return savedPaymentMethodRepository.findByUser(user);
    }

    /**
     * Calculate total revenue (for admin dashboard)
     */
    public BigDecimal getTotalRevenue() {
        return paymentRepository.findByStatus(Payment.PaymentStatus.COMPLETED)
                .stream()
                .map(Payment::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }
}
