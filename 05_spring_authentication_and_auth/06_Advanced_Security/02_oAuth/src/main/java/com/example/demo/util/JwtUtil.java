package com.example.demo.util;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.crypto.SecretKey;

import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {

    private static final long ACCESS_TOKEN_EXPIRY =
            1000L * 60 * 15; // 15 minutes

    private static final long REFRESH_TOKEN_EXPIRY =
            1000L * 60 * 60 * 24 * 7; // 7 days

    private final String SECRET =
            "mysupersecretkeymysupersecretkeymysupersecretkey123";

    private SecretKey getSignKey() {
        return Keys.hmacShaKeyFor(SECRET.getBytes());
    }

    // ---------------- ACCESS TOKEN ----------------

    public String generateAccessToken(
        Long userId,
        String sessionId,
        List<String> roles) {

    Date now = new Date();

    return Jwts.builder()
            .subject(String.valueOf(userId))
            .claim("sid", sessionId)
            .claim("roles", roles)
            .issuedAt(now)
            .expiration(new Date(now.getTime() + ACCESS_TOKEN_EXPIRY))
            .signWith(getSignKey())
            .compact();
}

    // ---------------- REFRESH TOKEN ----------------

    public String generateRefreshToken(String sessionId) {

        Date now = new Date();

        return Jwts.builder()
                .claim("sid", sessionId)
                .claim("jti", UUID.randomUUID().toString())
                .issuedAt(now)
                .expiration(new Date(now.getTime() + REFRESH_TOKEN_EXPIRY))
                .signWith(getSignKey())
                .compact();
    }

    // ---------------- COMMON ----------------

    public Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSignKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    public Integer extractUserId(String token) {
        return Integer.parseInt(
                extractAllClaims(token).getSubject()
        );
    }

    public String extractSessionId(String token) {
        return extractAllClaims(token).get("sid", String.class);
    }

    public String extractRole(String token) {
        return extractAllClaims(token).get("role", String.class);
    }

    public String extractJti(String token) {
        return extractAllClaims(token).get("jti", String.class);
    }

    public boolean isExpired(String token) {
        return extractAllClaims(token)
                .getExpiration()
                .before(new Date());
    }

    public boolean validate(String token) {
        return !isExpired(token);
    }
}