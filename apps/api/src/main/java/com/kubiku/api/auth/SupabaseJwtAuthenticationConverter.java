package com.kubiku.api.auth;

import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;

import java.util.Collection;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

public class SupabaseJwtAuthenticationConverter implements Converter<Jwt, AbstractAuthenticationToken> {

    @Override
    public AbstractAuthenticationToken convert(Jwt jwt) {
        Collection<GrantedAuthority> authorities = extractRoles(jwt);
        return new JwtAuthenticationToken(jwt, authorities);
    }

    private Collection<GrantedAuthority> extractRoles(Jwt jwt) {
        // Supabase stores custom claims in app_metadata
        Map<String, Object> appMetadata = jwt.getClaim("app_metadata");
        if (appMetadata == null || appMetadata.isEmpty()) {
            return Set.of(new SimpleGrantedAuthority("ROLE_USER"));
        }

        Object rolesObj = appMetadata.get("roles");
        if (!(rolesObj instanceof Collection)) {
            return Set.of(new SimpleGrantedAuthority("ROLE_USER"));
        }

        Set<GrantedAuthority> authorities = ((Collection<?>) rolesObj).stream()
                .filter(String.class::isInstance)
                .map(role -> new SimpleGrantedAuthority("ROLE_" + ((String) role).toUpperCase()))
                .collect(Collectors.toSet());
        
        // Ensure at least ROLE_USER
        authorities.add(new SimpleGrantedAuthority("ROLE_USER"));
        
        return authorities;
    }
}
