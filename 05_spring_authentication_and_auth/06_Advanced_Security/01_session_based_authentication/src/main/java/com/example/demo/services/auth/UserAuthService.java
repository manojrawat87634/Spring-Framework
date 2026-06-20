package com.example.demo.services.auth;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.dto.auth.AuthRequest;
import com.example.demo.helpers.RequestUtils;
import com.example.demo.models.UserModel;
import com.example.demo.models.UserSessionModel;
import com.example.demo.repo.auth.UserRepo;
import com.example.demo.repo.auth.UserSessionRepo;
import com.example.demo.util.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class UserAuthService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserSessionRepo sessionRepo;

    @Autowired
    private JwtUtil jwtUtil;

    public void registerUser(AuthRequest request) {

        if (userRepo.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        UserModel user = new UserModel();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepo.save(user);
    }

    public Map<String, String> login(AuthRequest request, HttpServletRequest httpRequest) {

        // 1. Find user
        UserModel user = userRepo.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        // 2. Verify password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        // 3. Client information
        String ipAddress = RequestUtils.getClientIp(httpRequest);
        String userAgent = RequestUtils.getUserAgent(httpRequest);
        String deviceName = RequestUtils.parseDevice(userAgent);

        // 4. Create a new login session
        String sessionId = UUID.randomUUID().toString();

        // 5. Generate tokens
        String accessToken = jwtUtil.generateAccessToken(
                user.getId(),
                sessionId,
                "USER" // Replace with user.getRole() if available
        );

        String refreshToken = jwtUtil.generateRefreshToken(sessionId);

        // 6. Save session
        UserSessionModel session = new UserSessionModel();

        session.setUser(user);
        session.setSessionId(sessionId);
        session.setRefreshToken(refreshToken); // Later store a hash instead
        session.setIpAddress(ipAddress);
        session.setUserAgent(userAgent);
        session.setDeviceName(deviceName);

        session.setLoginAt(LocalDateTime.now());
        session.setLastActivity(LocalDateTime.now());
        session.setExpiresAt(LocalDateTime.now().plusDays(7));
        session.setIsRevoked(false);

        sessionRepo.save(session);

        // 7. Return tokens
        return Map.of(
                "accessToken", accessToken,
                "refreshToken", refreshToken);
    }

}