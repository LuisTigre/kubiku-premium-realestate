package com.kubiku.api.hospitality;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Repository
public interface BookingRepository extends JpaRepository<Booking, UUID> {
    List<Booking> findByUserId(UUID userId);

    @Query("""
        SELECT COUNT(b) FROM Booking b 
        WHERE b.roomUnit.id = :roomUnitId 
        AND b.status NOT IN (:excludedStatuses)
        AND b.checkIn < :checkOut 
        AND b.checkOut > :checkIn
    """)
    long countOverlappingBookings(
        @Param("roomUnitId") UUID roomUnitId, 
        @Param("checkIn") LocalDate checkIn, 
        @Param("checkOut") LocalDate checkOut,
        @Param("excludedStatuses") Booking.BookingStatus... excludedStatuses
    );

    List<Booking> findByRoomUnitListingOwnerId(UUID ownerId);
    List<Booking> findByUserIdOrderByCreatedAtDesc(UUID userId);
}
