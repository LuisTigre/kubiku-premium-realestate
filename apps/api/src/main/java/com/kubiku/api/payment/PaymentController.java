package com.kubiku.api.payment;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
@Tag(name = "Payments", description = "Transaction management")
public class PaymentController {

    private final PaymentService paymentService;

    @PostMapping("/mock/{bookingId}")
    public Transaction processMockPayment(@PathVariable UUID bookingId) {
        return paymentService.initiateMockPayment(bookingId);
    }
}
