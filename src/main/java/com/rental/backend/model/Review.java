package com.rental.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDate;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "reviews")
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userName; // Nom de l'auteur
    private String userAvatar; // Avatar de l'auteur (optionnel)
    
    @Column(length = 1000)
    private String comment;
    private Integer rating; // 1 à 5
    
    private LocalDate date;

    // Cibles (Une seule sera remplie)
    private Long carId;
    private Long driverId;
    private Long agencyId;
}