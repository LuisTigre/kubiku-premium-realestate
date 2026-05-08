package com.kubiku.api.user;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
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
    public User syncUserWithAuth() {
        try {
            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            
            if (auth == null || !auth.isAuthenticated() || auth instanceof org.springframework.security.authentication.AnonymousAuthenticationToken) {
                throw new RuntimeException("User is not authenticated");
            }
            
            Object principal = auth.getPrincipal();
            if (!(principal instanceof Jwt)) {
                throw new RuntimeException("Authentication principal is not a JWT");
            }

            Jwt jwt = (Jwt) principal;
            String authId = jwt.getSubject();
            String email = jwt.getClaimAsString("email");
            
            // Extract name from user_metadata or fallback
            String name = null;
            java.util.Map<String, Object> userMetadata = jwt.getClaim("user_metadata");
            if (userMetadata != null) {
                name = (String) userMetadata.get("full_name");
                if (name == null) {
                    name = (String) userMetadata.get("name");
                }
            }
            
            // Determine role from app_metadata or default to USER
            String role = "USER";
            java.util.Map<String, Object> appMetadata = jwt.getClaim("app_metadata");
            if (appMetadata != null && appMetadata.containsKey("roles")) {
                Object rolesObj = appMetadata.get("roles");
                if (rolesObj instanceof java.util.Collection) {
                    java.util.Collection<?> roles = (java.util.Collection<?>) rolesObj;
                    if (roles.contains("ADMIN")) {
                        role = "ADMIN";
                    } else if (roles.contains("PARTNER")) {
                        role = "PARTNER";
                    }
                }
            }

            // 1. Try to find by authId (Supabase UUID)
            Optional<User> userByAuthId = userRepository.findByAuthId(authId);
            if (userByAuthId.isPresent()) {
                User user = userByAuthId.get();
                return updateIfNeeded(user, email, name, role);
            }

            // 2. If not found, try to find by email (for account linking)
            if (email != null) {
                Optional<User> userByEmail = userRepository.findByEmail(email);
                if (userByEmail.isPresent()) {
                    User user = userByEmail.get();
                    user.setAuthId(authId); // Link the Supabase ID
                    return updateIfNeeded(user, email, name, role);
                }
            }

            // 3. Not found by either, create new user
            User newUser = User.builder()
                    .authId(authId)
                    .email(email)
                    .fullName(name != null ? name : (email != null ? email : "User " + authId.substring(0, 8)))
                    .role(role)
                    .build();

            return userRepository.save(newUser);
            
        } catch (Exception e) {
            System.err.println("CRITICAL SYNC ERROR: " + e.getMessage());
            e.printStackTrace();
            throw e;
        }
    }

    private User updateIfNeeded(User user, String email, String name, String role) {
        boolean updated = false;
        if (email != null && !email.equals(user.getEmail())) {
            user.setEmail(email);
            updated = true;
        }
        if (name != null && !name.equals(user.getFullName())) {
            user.setFullName(name);
            updated = true;
        }
        if (role != null && !role.equals(user.getRole())) {
            user.setRole(role);
            updated = true;
        }
        
        if (updated) {
            return userRepository.save(user);
        }
        return user;
    }

    public Optional<User> findByAuthId(String authId) {
        return userRepository.findByAuthId(authId);
    }

    @Transactional
    public User updateProfile(UserUpdateDTO data) {
        User currentUser = syncUserWithAuth();
        
        if (data.getFullName() != null && !data.getFullName().isBlank()) {
            currentUser.setFullName(data.getFullName());
        }
        
        if (data.getPhoneNumber() != null) {
            currentUser.setPhoneNumber(data.getPhoneNumber());
        }
        
        return userRepository.save(currentUser);
    }
}
