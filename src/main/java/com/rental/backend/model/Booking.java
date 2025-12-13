package com.rental.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "bookings")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Qui réserve ?
    private Long userId; // ID de l'utilisateur
    private String clientName;
    private String clientEmail;
    private String clientPhone;

    // Quoi ?
    @ManyToOne
    @JoinColumn(name = "car_id")
    private Car car;

    // Options
    private boolean withDriver;
    
    // Dates
    private LocalDateTime startDate;
    private LocalDateTime endDate;

    // Financier
    private Double totalPrice;

    // Statut
    @Enumerated(EnumType.STRING)
    private BookingStatus status; // PENDING, CONFIRMED, CANCELLED

    private LocalDateTime createdAt = LocalDateTime.now();
}