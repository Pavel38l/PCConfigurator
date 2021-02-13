package ru.vsu.Peredachka.security;

import io.jsonwebtoken.Claims;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;


@Getter @Setter
public class CustomUserDetails implements UserDetails {

    private String email;
    private GrantedAuthority grantedAuthority;

    public static CustomUserDetails fromClaimsToUserDetails(Claims claims) {
        CustomUserDetails userDetails = new CustomUserDetails();
        userDetails.setEmail(claims.getSubject());
        userDetails.setGrantedAuthority(new SimpleGrantedAuthority(claims.get("role", String.class)));
        return userDetails;

    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(grantedAuthority);
    }

    @Override
    public String getPassword() {
        return null;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
