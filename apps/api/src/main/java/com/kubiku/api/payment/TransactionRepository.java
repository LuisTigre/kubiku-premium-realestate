package com.kubiku.api.payment;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, UUID> {
    Optional<Transaction> findByBookingId(UUID bookingId);
    Optional<Transaction> findByProviderReference(String providerReference);
}
