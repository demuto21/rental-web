package com.rental.backend.service;

import com.rental.backend.model.Booking;
import com.rental.backend.model.BookingStatus;
import com.rental.backend.model.Car;
import com.rental.backend.repository.BookingRepository;
import com.rental.backend.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class BookingService {

    @Autowired private BookingRepository bookingRepository;
    @Autowired private CarRepository carRepository;

    public Booking createBooking(Booking booking) {
        // 1. Validation de sécurité : Dates
        if (booking.getStartDate() == null || booking.getEndDate() == null) {
            throw new RuntimeException("Les dates de début et de fin sont obligatoires");
        }

        // 2. Validation de sécurité : Voiture
        if (booking.getCar() == null || booking.getCar().getId() == null) {
            throw new RuntimeException("L'identifiant de la voiture est obligatoire");
        }

        // 3. Récupération de la voiture en base de données
        Car car = carRepository.findById(booking.getCar().getId())
            .orElseThrow(() -> new RuntimeException("Voiture introuvable avec l'ID : " + booking.getCar().getId()));

        // 4. Calcul de la durée
        long days = ChronoUnit.DAYS.between(booking.getStartDate(), booking.getEndDate());
        
        // Gestion des dates inversées ou même jour (minimum 1 jour facturé)
        if (days < 1) days = 1;

        // 5. Calcul du prix de base
        // CORRECTION ICI : getPricePerDay() au lieu de getPrice()
        Double dailyPrice = car.getPricePerDay();
        if (dailyPrice == null) dailyPrice = 0.0; // Protection anti-null

        double total = dailyPrice * days;

        // 6. Ajout du chauffeur si demandé
        if (booking.isWithDriver()) {
            total += (15000 * days); // Prix fixe chauffeur par jour
        }

        // 7. Finalisation de l'objet Booking
        booking.setTotalPrice(total);
        booking.setStatus(BookingStatus.PENDING);
        
        // On réinjecte l'objet Car complet pour le retour API (sinon on n'aurait que l'ID)
        booking.setCar(car);

        // 8. Sauvegarde
        return bookingRepository.save(booking);
    }

    public List<Booking> getAllBookings() { 
        return bookingRepository.findAll(); 
    }
    
    public List<Booking> getUserBookings(Long userId) { 
        return bookingRepository.findByUserId(userId); 
    }
}