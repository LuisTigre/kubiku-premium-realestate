package com.kubiku.api.hospitality;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/hospitality/bookings")
@RequiredArgsConstructor
@Tag(name = "Hospitality Bookings", description = "Booking lifecycle management")
public class BookingController {

    private final BookingRepository bookingRepository;

    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @PostMapping
    public Booking createBooking(@RequestBody Booking booking) {
        return bookingRepository.save(booking);
    }

    @PatchMapping("/{id}/status")
    public Booking updateStatus(@PathVariable UUID id, @RequestParam Booking.BookingStatus status) {
        Booking booking = bookingRepository.findById(id).orElseThrow();
        booking.setStatus(status);
        return bookingRepository.save(booking);
    }
}
