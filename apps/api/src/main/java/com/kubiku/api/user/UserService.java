package com.kubiku.api.user;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @Transactional
    public User syncUserWithKeycloak() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        
        if (!(principal instanceof Jwt)) {
            throw new RuntimeException("User is not authenticated with JWT");
        }

        Jwt jwt = (Jwt) principal;
        String keycloakId = jwt.getSubject();
        String email = jwt.getClaimAsString("email");
        String name = jwt.getClaimAsString("name");
        
        // Extract roles from realm_access
        String role = "USER";
        java.util.Map<String, Object> realmAccess = jwt.getClaim("realm_access");
        if (realmAccess != null && realmAccess.containsKey("roles")) {
            java.util.Collection<String> roles = (java.util.Collection<String>) realmAccess.get("roles");
            if (roles.contains("ADMIN")) {
                role = "ADMIN";
            } else if (roles.contains("PARTNER")) {
                role = "PARTNER";
            }
        }

        Optional<User> existingUser = userRepository.findByKeycloakId(keycloakId);
        
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            // Optional: Update name/email if they changed in Keycloak
            if (!user.getEmail().equals(email) || !user.getFullName().equals(name)) {
                user.setEmail(email);
                user.setFullName(name);
                return userRepository.save(user);
            }
            return user;
        }

        // Create new user
        User newUser = User.builder()
                .keycloakId(keycloakId)
                .email(email)
                .fullName(name != null ? name : email)
                .role(role)
                .build();

        return userRepository.save(newUser);
    }

    public Optional<User> findByKeycloakId(String keycloakId) {
        return userRepository.findByKeycloakId(keycloakId);
    }
}
