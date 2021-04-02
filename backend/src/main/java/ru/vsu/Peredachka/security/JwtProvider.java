package ru.vsu.Peredachka.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import ru.vsu.Peredachka.data.entity.UserRole;

import java.security.Key;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtProvider {

    private final Key key;
    private final JwtParser jwtParser;


    public JwtProvider(@Value("${jwtSecret}") String key) {
        this.key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(key));
        this.jwtParser = Jwts.parserBuilder()
            .setSigningKey(this.key)
            .build();
    }

    public String generateToken(String email, UserRole userRole, Long id) {
        Date exDate = Date.from(
                LocalDate.now()
                .plusDays(15)
                .atStartOfDay(ZoneId.systemDefault()).toInstant()
        );

        return Jwts.builder()
                .setExpiration(exDate)
                .setId(Long.toString(id))
                .setSubject(email)
                .claim("role", userRole.getName())
                .signWith(key)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            jwtParser.parse(token);
            return true;
        } catch(Exception e) {
            System.err.println("Invalid token");
            return false;
        }
    }

    public Claims getClaimsFromToken(String token) {
        return jwtParser.parseClaimsJws(token).getBody();
    }

}
