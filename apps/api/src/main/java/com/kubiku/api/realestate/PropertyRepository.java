package com.kubiku.api.realestate;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface PropertyRepository extends JpaRepository<Property, UUID> {
    Optional<Property> findByListingId(UUID listingId);
    java.util.List<Property> findByAgentId(UUID agentId);
}
