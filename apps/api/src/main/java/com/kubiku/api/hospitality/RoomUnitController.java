package com.kubiku.api.hospitality;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/hospitality/units")
@RequiredArgsConstructor
@Tag(name = "Hospitality Units", description = "Management of rooms, villas, and suites")
public class RoomUnitController {

    private final RoomUnitRepository roomUnitRepository;

    @GetMapping
    public List<RoomUnit> getAllUnits() {
        return roomUnitRepository.findAll();
    }

    @GetMapping("/listing/{listingId}")
    public List<RoomUnit> getUnitsByListing(@PathVariable UUID listingId) {
        return roomUnitRepository.findByListingId(listingId);
    }

    @PostMapping
    public RoomUnit createUnit(@RequestBody RoomUnit unit) {
        return roomUnitRepository.save(unit);
    }
}
