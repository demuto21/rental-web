package com.rental.backend.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "cars")
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Infos principales
    private String name;       // Ex: Mercedes-Benz GLE 450
    private String type;       // Ex: SUV, Berline, Sport
    private Double pricePerDay;
    private String location;   // Ex: Douala, Bonapriso
    private Double rating;     // Ex: 4.8
    private Integer reviewCount;
    private boolean isAvailable;

    @Column(length = 2000) // Texte long
    private String description;

    // Images
    private String image; // Image principale (cover)
    
    @ElementCollection
    @CollectionTable(name = "car_gallery", joinColumns = @JoinColumn(name = "car_id"))
    @Column(name = "image_url")
    private List<String> gallery; // Liste des autres images

    // Caractéristiques Techniques (Specs)
    private String vitesseMax;   // "250 km/h"
    private String acceleration; // "0-100 en 5.7s"
    private String puissance;    // "367 ch"
    private String moteur;       // "V6 Turbo"
    private String transmission; // "Automatique 9G"
    private Integer places;      // 5 ou 7

    // Relation Agence
    @ManyToOne
    @JoinColumn(name = "agency_id")
    private Agency agency;
}