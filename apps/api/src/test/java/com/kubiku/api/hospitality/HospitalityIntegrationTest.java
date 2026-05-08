package com.kubiku.api.hospitality;

import com.kubiku.api.listing.Listing;
import com.kubiku.api.listing.ListingRepository;
import com.kubiku.api.user.User;
import com.kubiku.api.user.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Collections;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

@SpringBootTest(properties = {
    "spring.datasource.url=jdbc:h2:mem:testdb;DB_CLOSE_DELAY=-1;MODE=PostgreSQL",
    "spring.datasource.driver-class-name=org.h2.Driver",
    "spring.datasource.username=sa",
    "spring.datasource.password=",
    "spring.flyway.enabled=false",
    "spring.jpa.hibernate.ddl-auto=create-drop"
})
@Transactional
public class HospitalityIntegrationTest {

    @MockitoBean
    private JwtDecoder jwtDecoder;

    @Autowired
    private BookingService bookingService;

    @Autowired
    private AvailabilityService availabilityService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ListingRepository listingRepository;

    @Autowired
    private RoomUnitRepository roomUnitRepository;

    private UUID roomUnitId;
    private String testUserAuthId = "test-auth-id";
    private User testUser;

    @BeforeEach
    void setUp() {
        // 1. Setup mock authentication
        Jwt jwt = mock(Jwt.class);
        when(jwt.getSubject()).thenReturn(testUserAuthId);
        when(jwt.getClaimAsString("email")).thenReturn("test@kubiku.com");
        
        SecurityContextHolder.getContext().setAuthentication(
            new UsernamePasswordAuthenticationToken(jwt, null, Collections.emptyList())
        );

        // 2. Create and save user
        testUser = userRepository.save(User.builder()
            .authId(testUserAuthId)
            .email("test@kubiku.com")
            .fullName("Test User")
            .role("USER")
            .build());

        // 3. Create and save listing
        Listing listing = listingRepository.save(Listing.builder()
            .title("Test Resort")
            .locationName("Test Location")
            .owner(testUser)
            .type(Listing.ListingType.HOSPITALITY)
            .build());

        // 4. Create and save room unit (with 2 units available)
        RoomUnit unit = roomUnitRepository.save(RoomUnit.builder()
            .listing(listing)
            .type(RoomUnit.UnitType.SUITE)
            .basePrice(new BigDecimal("250.00"))
            .totalUnits(2)
            .build());
        
        roomUnitId = unit.getId();
    }

    @Test
    void testBookingAvailabilityFlow() {
        LocalDate checkIn = LocalDate.now().plusDays(10);
        LocalDate checkOut = LocalDate.now().plusDays(15);

        // 1. Initial Availability Check (should have 2 units)
        int initialCount = availabilityService.getAvailableUnitsCount(roomUnitId, checkIn, checkOut);
        assertEquals(2, initialCount);

        // 2. Create first booking request
        BookingRequestDTO request1 = new BookingRequestDTO(roomUnitId, checkIn, checkOut);
        Booking booking1 = bookingService.createBookingRequest(request1);
        assertNotNull(booking1);
        assertEquals(Booking.BookingStatus.REQUESTED, booking1.getStatus());
        assertEquals(0, new BigDecimal("1250.00").compareTo(booking1.getTotalPrice())); // 5 nights * 250

        // 3. Availability Check after first booking (should have 1 unit)
        int afterFirstCount = availabilityService.getAvailableUnitsCount(roomUnitId, checkIn, checkOut);
        assertEquals(1, afterFirstCount);

        // 4. Create second booking request
        BookingRequestDTO request2 = new BookingRequestDTO(roomUnitId, checkIn, checkOut);
        bookingService.createBookingRequest(request2);

        // 5. Availability Check after second booking (should have 0 units)
        int afterSecondCount = availabilityService.getAvailableUnitsCount(roomUnitId, checkIn, checkOut);
        assertEquals(0, afterSecondCount);
        assertFalse(availabilityService.isAvailable(roomUnitId, checkIn, checkOut));

        // 6. Attempt third booking request (should fail)
        BookingRequestDTO request3 = new BookingRequestDTO(roomUnitId, checkIn, checkOut);
        assertThrows(RuntimeException.class, () -> bookingService.createBookingRequest(request3));
    }
}
