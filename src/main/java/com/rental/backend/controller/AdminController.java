package com.rental.backend.controller;

import com.rental.backend.model.User;
import com.rental.backend.model.Agency;
import com.rental.backend.model.Car;
import com.rental.backend.model.Booking;
import com.rental.backend.service.UserService;
import com.rental.backend.service.AgencyService;
import com.rental.backend.service.CarService;
import com.rental.backend.service.BookingService;
import com.rental.backend.repository.AgencyRepository;
import com.rental.backend.repository.CarRepository;
import com.rental.backend.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private UserService userService;

    @Autowired
    private AgencyRepository agencyRepository;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @GetMapping("/agencies/pending")
    public ResponseEntity<List<User>> getPendingAgencies() {
        return ResponseEntity.ok(userService.getPendingRequests());
    }

    @PutMapping("/agencies/{id}/approve")
    public ResponseEntity<Void> approve(@PathVariable Long id) {
        userService.approveAgency(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/agencies/{id}/reject")
    public ResponseEntity<Void> reject(@PathVariable Long id) {
        userService.rejectAgency(id);
        return ResponseEntity.ok().build();
    }

    // === STATISTIQUES GLOBALES ===
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Long>> getGlobalStats() {
        Map<String, Long> stats = new HashMap<>();
        stats.put("totalUsers", userService.countAllUsers());
        stats.put("totalAgencies", agencyRepository.count());
        stats.put("totalCars", carRepository.count());
        stats.put("totalBookings", bookingRepository.count());
        return ResponseEntity.ok(stats);
    }

    // === GESTION DES UTILISATEURS ===
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/users/{id}/role")
    public ResponseEntity<Void> updateUserRole(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String roleStr = body.get("role");
        User.Role role = User.Role.valueOf(roleStr);
        userService.updateUserRole(id, role);
        return ResponseEntity.ok().build();
    }

    // === GESTION DES AGENCES ===
    @GetMapping("/agencies/all")
    public ResponseEntity<List<Agency>> getAllAgencies() {
        return ResponseEntity.ok(agencyRepository.findAll());
    }

    @DeleteMapping("/agencies/{id}")
    public ResponseEntity<Void> deleteAgency(@PathVariable Long id) {
        agencyRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // === GESTION DES VOITURES ===
    @GetMapping("/cars")
    public ResponseEntity<List<Car>> getAllCars() {
        return ResponseEntity.ok(carRepository.findAll());
    }

    @GetMapping("/cars/stats")
    public ResponseEntity<Map<String, Long>> getCarsStats() {
        Map<String, Long> stats = new HashMap<>();
        List<Car> allCars = carRepository.findAll();
        stats.put("total", (long) allCars.size());
        stats.put("available", allCars.stream().filter(Car::isAvailable).count());
        stats.put("rented", allCars.stream().filter(car -> !car.isAvailable()).count());
        return ResponseEntity.ok(stats);
    }

    // === GESTION DES RÉSERVATIONS ===
    @GetMapping("/bookings")
    public ResponseEntity<List<Booking>> getAllBookings() {
        return ResponseEntity.ok(bookingRepository.findAll());
    }

    @GetMapping("/bookings/stats")
    public ResponseEntity<Map<String, Object>> getBookingsStats() {
        Map<String, Object> stats = new HashMap<>();
        List<Booking> allBookings = bookingRepository.findAll();
        stats.put("total", (long) allBookings.size());

        // Calculer le revenu total
        double totalRevenue = allBookings.stream()
                .mapToDouble(booking -> booking.getTotalPrice() != null ? booking.getTotalPrice() : 0.0)
                .sum();
        stats.put("totalRevenue", totalRevenue);

        return ResponseEntity.ok(stats);
    }
}