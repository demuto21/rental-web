package com.rental.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PaymentIntentResponse {
    private Long paymentId;
    private String clientSecret;
    private String status;
}
