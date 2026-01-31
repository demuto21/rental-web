package com.rental.backend.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String fullName;
    
    @Column(unique = true)
    private String email;
    
    private String password;

    @Enumerated(EnumType.STRING)
    private Role role; // USER, ADMIN, AGENCY, DRIVER

    // --- NOUVEAU CHAMP ---
    @Enumerated(EnumType.STRING)
    private AgencyStatus agencyStatus = AgencyStatus.NONE;

    public enum Role {
        USER, ADMIN, AGENCY, DRIVER
    }

    public enum AgencyStatus {
        NONE, PENDING, APPROVED, REJECTED
    }
}