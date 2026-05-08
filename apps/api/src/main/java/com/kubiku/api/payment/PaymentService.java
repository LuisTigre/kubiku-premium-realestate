package com.kubiku.api.payment;

import com.kubiku.api.hospitality.Booking;
import com.kubiku.api.hospitality.BookingRepository;
import com.kubiku.api.notification.Notification;
import com.kubiku.api.notification.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.UUID;

@Service
@RequiredArgsConstructor
public class PaymentService {

    private final TransactionRepository transactionRepository;
    private final BookingRepository bookingRepository;
    private final NotificationService notificationService;

    @Transactional
    public Transaction initiateMockPayment(UUID bookingId) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (booking.getStatus() != Booking.BookingStatus.APPROVED) {
            throw new RuntimeException("Only approved bookings can be paid");
        }

        // Check if transaction already exists
        Transaction transaction = transactionRepository.findByBookingId(bookingId)
                .orElse(Transaction.builder()
                        .booking(booking)
                        .amount(booking.getTotalPrice())
                        .status(Transaction.TransactionStatus.PENDING)
                        .provider("MOCK")
                        .build());

        // In a real scenario, this would involve calling a payment gateway
        // Here we simulate a successful payment instantly
        transaction.setStatus(Transaction.TransactionStatus.COMPLETED);
        transaction.setProviderReference("MOCK-" + UUID.randomUUID().toString());
        
        Transaction savedTransaction = transactionRepository.save(transaction);

        // Update Booking Status
        booking.setStatus(Booking.BookingStatus.PAID);
        bookingRepository.save(booking);

        // Notify Owner
        notificationService.createNotification(
            booking.getRoomUnit().getListing().getOwner().getId(),
            "Payment Received",
            "A payment of " + booking.getTotalPrice() + " Kz has been received for booking at " + booking.getRoomUnit().getListing().getTitle(),
            Notification.NotificationType.PAYMENT
        );

        return savedTransaction;
    }
}
