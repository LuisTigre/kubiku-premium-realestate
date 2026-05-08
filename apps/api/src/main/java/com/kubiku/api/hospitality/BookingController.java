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
    private final BookingService bookingService;

    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    @PostMapping("/request")
    public Booking createBookingRequest(@RequestBody BookingRequestDTO request) {
        return bookingService.createBookingRequest(request);
    }

    @GetMapping("/partner")
    public List<Booking> getPartnerBookings() {
        return bookingService.getPartnerBookings();
    }

    @GetMapping("/my")
    public List<Booking> getMyBookings() {
        return bookingService.getMyBookings();
    }

    @PatchMapping("/{id}/status")
    public Booking updateStatus(@PathVariable UUID id, @RequestParam Booking.BookingStatus status) {
        return bookingService.updateBookingStatus(id, status);
    }
}
