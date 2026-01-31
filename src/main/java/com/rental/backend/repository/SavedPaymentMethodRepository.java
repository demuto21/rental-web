package com.rental.backend.repository;

import com.rental.backend.model.SavedPaymentMethod;
import com.rental.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SavedPaymentMethodRepository extends JpaRepository<SavedPaymentMethod, Long> {

    List<SavedPaymentMethod> findByUser(User user);

    Optional<SavedPaymentMethod> findByUserAndIsDefaultTrue(User user);

    Optional<SavedPaymentMethod> findByStripePaymentMethodId(String stripePaymentMethodId);
}
