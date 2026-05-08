package com.kubiku.api.hospitality;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AvailabilityService {

    private final BookingRepository bookingRepository;
    private final RoomUnitRepository roomUnitRepository;

    /**
     * Checks if a specific RoomUnit has availability for the given date range.
     */
    @Transactional(readOnly = true)
    public boolean isAvailable(UUID roomUnitId, LocalDate checkIn, LocalDate checkOut) {
        RoomUnit unit = roomUnitRepository.findById(roomUnitId)
                .orElseThrow(() -> new RuntimeException("Room unit not found"));

        long activeBookingsCount = bookingRepository.countOverlappingBookings(
                roomUnitId, 
                checkIn, 
                checkOut, 
                Booking.BookingStatus.CANCELLED,
                Booking.BookingStatus.REJECTED
        );

        return activeBookingsCount < unit.getTotalUnits();
    }

    /**
     * Returns the number of available units for a specific RoomUnit and date range.
     */
    @Transactional(readOnly = true)
    public int getAvailableUnitsCount(UUID roomUnitId, LocalDate checkIn, LocalDate checkOut) {
        RoomUnit unit = roomUnitRepository.findById(roomUnitId)
                .orElseThrow(() -> new RuntimeException("Room unit not found"));

        long activeBookingsCount = bookingRepository.countOverlappingBookings(
                roomUnitId, 
                checkIn, 
                checkOut, 
                Booking.BookingStatus.CANCELLED,
                Booking.BookingStatus.REJECTED
        );

        return (int) Math.max(0, unit.getTotalUnits() - activeBookingsCount);
    }
}
