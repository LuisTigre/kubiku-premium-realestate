package com.kubiku.api.hospitality;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingRequestDTO {
    private UUID roomUnitId;
    private LocalDate checkIn;
    private LocalDate checkOut;
}
