package com.kubiku.api.hospitality;

import com.kubiku.api.user.User;
import com.kubiku.api.user.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.temporal.ChronoUnit;

@Service
@RequiredArgsConstructor
public class BookingService {

    private final BookingRepository bookingRepository;
    private final RoomUnitRepository roomUnitRepository;
    private final AvailabilityService availabilityService;
    private final UserService userService;
    private final com.kubiku.api.notification.NotificationService notificationService;

    @Transactional
    public Booking createBookingRequest(BookingRequestDTO request) {
        // 1. Sync and get current user
        User currentUser = userService.syncUserWithAuth();

        // 2. Validate availability
        if (!availabilityService.isAvailable(request.getRoomUnitId(), request.getCheckIn(), request.getCheckOut())) {
            throw new RuntimeException("Selected dates are no longer available for this room unit");
        }

        // 3. Get Room Unit details
        RoomUnit unit = roomUnitRepository.findById(request.getRoomUnitId())
                .orElseThrow(() -> new RuntimeException("Room unit not found"));

        // 4. Calculate price
        long nights = ChronoUnit.DAYS.between(request.getCheckIn(), request.getCheckOut());
        if (nights <= 0) {
            throw new RuntimeException("Check-out date must be after check-in date");
        }
        BigDecimal totalPrice = unit.getBasePrice().multiply(BigDecimal.valueOf(nights));

        // 5. Create Booking
        Booking booking = Booking.builder()
                .user(currentUser)
                .roomUnit(unit)
                .checkIn(request.getCheckIn())
                .checkOut(request.getCheckOut())
                .totalPrice(totalPrice)
                .status(Booking.BookingStatus.REQUESTED)
                .build();

        Booking savedBooking = bookingRepository.save(booking);

        // Notify property owner
        notificationService.createNotification(
            unit.getListing().getOwner().getId(),
            "New Booking Request",
            "A new booking request has been made for " + unit.getListing().getTitle() + " (" + unit.getType() + ").",
            com.kubiku.api.notification.Notification.NotificationType.BOOKING
        );

        return savedBooking;
    }

    public java.util.List<Booking> getPartnerBookings() {
        User currentUser = userService.syncUserWithAuth();
        return bookingRepository.findByRoomUnitListingOwnerId(currentUser.getId());
    }

    public java.util.List<Booking> getMyBookings() {
        User currentUser = userService.syncUserWithAuth();
        return bookingRepository.findByUserIdOrderByCreatedAtDesc(currentUser.getId());
    }

    @Transactional
    public Booking updateBookingStatus(java.util.UUID bookingId, Booking.BookingStatus newStatus) {
        User currentUser = userService.syncUserWithAuth();
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        // Security check: Only owner can approve/reject, only guest can cancel (if not paid)
        boolean isOwner = booking.getRoomUnit().getListing().getOwner().getId().equals(currentUser.getId());
        boolean isGuest = booking.getUser().getId().equals(currentUser.getId());

        if (newStatus == Booking.BookingStatus.APPROVED || newStatus == Booking.BookingStatus.REJECTED) {
            if (!isOwner) throw new RuntimeException("Only property owner can update this status");
        }

        if (newStatus == Booking.BookingStatus.CANCELLED) {
            if (!isGuest && !isOwner) throw new RuntimeException("Unauthorized cancellation");
            if (booking.getStatus() == Booking.BookingStatus.PAID) {
                throw new RuntimeException("Cannot cancel a paid booking directly. Please contact support for refund.");
            }
        }

        if (newStatus == Booking.BookingStatus.APPROVED) {
            // Check availability again before final approval to be safe
            if (!availabilityService.isAvailable(booking.getRoomUnit().getId(), booking.getCheckIn(), booking.getCheckOut())) {
                throw new RuntimeException("Room is no longer available for these dates");
            }
            booking.setStatus(Booking.BookingStatus.APPROVED);
        } else {
            // General status update for other states
            booking.setStatus(newStatus);
        }

        Booking savedBooking = bookingRepository.save(booking);

        // Notify guest of status change
        String title = "Booking " + (newStatus == Booking.BookingStatus.APPROVED ? "Approved" : "Update");
        String message = "Your booking for " + booking.getRoomUnit().getListing().getTitle() + " has been " + newStatus.toString().toLowerCase() + ".";
        
        notificationService.createNotification(
            booking.getUser().getId(),
            title,
            message,
            com.kubiku.api.notification.Notification.NotificationType.BOOKING
        );

        return savedBooking;
    }
}
