package com.kubiku.api.realestate;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/realestate/properties")
@RequiredArgsConstructor
@Tag(name = "Real Estate Properties", description = "Property-specific details and pricing")
public class PropertyController {

    private final PropertyRepository propertyRepository;
    private final com.kubiku.api.user.UserService userService;

    @GetMapping
    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    @GetMapping("/agent")
    public List<Property> getAgentProperties() {
        com.kubiku.api.user.User currentUser = userService.syncUserWithAuth();
        return propertyRepository.findByAgentId(currentUser.getId());
    }

    @PostMapping
    public Property createProperty(@RequestBody Property property) {
        return propertyRepository.save(property);
    }

    @GetMapping("/listing/{listingId}")
    public Property getPropertyByListing(@PathVariable UUID listingId) {
        return propertyRepository.findByListingId(listingId).orElseThrow();
    }
}
