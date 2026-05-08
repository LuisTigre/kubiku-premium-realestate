package com.kubiku.api.payment;

import com.kubiku.api.hospitality.Booking;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import java.math.BigDecimal;
import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Table(name = "transactions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id", nullable = false)
    private Booking booking;

    @Column(nullable = false)
    private BigDecimal amount;

    @Builder.Default
    private String currency = "AOA";

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TransactionStatus status;

    private String provider; // e.g. "STRIPE", "PROXYPAY", "MOCK"
    private String providerReference;

    @CreationTimestamp
    private ZonedDateTime createdAt;

    public enum TransactionStatus {
        PENDING, COMPLETED, FAILED, REFUNDED
    }
}
