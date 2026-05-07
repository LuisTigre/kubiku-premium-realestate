package com.kubiku.api.hospitality;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface RoomUnitRepository extends JpaRepository<RoomUnit, UUID> {
    List<RoomUnit> findByListingId(UUID listingId);
}
