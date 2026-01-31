package com.rental.backend.dto;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class PaymentIntentRequest {
    private Long bookingId; // nullable for subscriptions
    private BigDecimal amount;
    private String currency = "XAF";
    private String description;
    private Boolean savePaymentMethod = false;
}
