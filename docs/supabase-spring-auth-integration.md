# Supabase + Spring Security: Universal Integration Guide

This guide provides a standardized, reusable blueprint for authenticating a Spring Boot backend with Supabase using modern OIDC/JWKS asymmetric signing.

---

## 1. The Root Cause: The Cryptographic Shift
The most common point of failure in Supabase/Spring integrations is an algorithm mismatch caused by Supabase's migration to modern signing keys.

### The Migration Trap
*   **Legacy (HS256)**: Older Supabase projects used a "Shared Secret" (Symmetric signing). This required Spring to have the secret key manually configured.
*   **Modern (ES256 / ECC P-256)**: Newer projects use asymmetric "JWT Signing Keys". **You cannot validate these with a shared secret.**

**Symptoms of the trap:**
- Backend returns `401 Unauthorized`.
- Logs show "JWT was invalid" or "Signature verification failed".
- You are trying to use `NimbusJwtDecoder.withSecretKey()` or `jwt.secret` in your config.

---

## 2. The Solution: OIDC Discovery
Instead of manual secrets, use the `issuer-uri`. This tells Spring to fetch the **OpenID Configuration** from Supabase, which contains the `jwks_uri` (the public keys). Spring will then:
1. Automatically fetch the current public keys.
2. Automatically handle algorithm detection (ES256).
3. Automatically handle key rotation.

### Supabase Settings
1. Go to **Settings** > **API**.
2. Verify **JWT Signing Keys** shows `ECC (P-256)` as the CURRENT KEY.
3. If it shows a `Legacy HS256` key as PREVIOUS, you **must** use the OIDC flow.

---

## 3. Implementation Steps

### A. Backend Configuration (`application.yml`)
Provide only the `issuer-uri`. No secrets, no legacy keys.

```yaml
spring:
  security:
    oauth2:
      resourceserver:
        jwt:
          issuer-uri: https://[YOUR_PROJECT_REF].supabase.co/auth/v1
```

### B. Security Configuration (`SecurityConfig.java`)
Use the standard Resource Server defaults.

```java
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .authorizeHttpRequests(auth -> auth.anyRequest().authenticated())
            .oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()));
        return http.build();
    }
}
```

### C. Robust Profile Sync (`UserService.java`)
Always check for both `auth_id` and `email` to link accounts gracefully.

```java
@Transactional
public User syncUserWithAuth() {
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    Jwt jwt = (Jwt) auth.getPrincipal();
    
    String authId = jwt.getSubject(); 
    String email = jwt.getClaimAsString("email");
    
    // 1. Try authId lookup
    // 2. Fallback to email lookup (link authId to existing account)
    // 3. Create new user if no match found
}
```

---

## 4. Key Takeaways
- **Forget the Secret**: If you see `ECC (P-256)` in Supabase, your JWT Secret is useless for Spring validation.
- **Trust the Issuer**: `issuer-uri` is the single source of truth.
- **Frontend**: Only send the `access_token` in the `Bearer` header.
