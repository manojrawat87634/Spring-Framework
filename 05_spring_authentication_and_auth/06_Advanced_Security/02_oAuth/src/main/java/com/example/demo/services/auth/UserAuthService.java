package com.example.demo.services.auth;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.dto.auth.AuthRequest;
import com.example.demo.helpers.RequestUtils;
import com.example.demo.models.auth.UserModel;
import com.example.demo.models.auth.UserSessionModel;
import com.example.demo.models.auth.role.RoleModel;
import com.example.demo.models.auth.role.UserRoleModel;
import com.example.demo.repo.auth.UserRepo;
import com.example.demo.repo.auth.UserSessionRepo;
import com.example.demo.repo.auth.role.RoleRepo;
import com.example.demo.repo.auth.role.UserRoleRepo;
import com.example.demo.util.JwtUtil;

import jakarta.servlet.http.HttpServletRequest;

@Service
public class UserAuthService {

        @Autowired
        private UserRepo userRepo;

        @Autowired
        private UserSessionRepo sessionRepo;

        @Autowired
        private RoleRepo roleRepo;

        @Autowired
        private UserRoleRepo userRoleRepo;

        @Autowired
        private PasswordEncoder passwordEncoder;

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

                // Assign default USER role
                RoleModel role = roleRepo.findByName("student")
                                .orElseThrow(() -> new RuntimeException("Default role not found"));

                UserRoleModel userRole = new UserRoleModel();
                userRole.setUser(user);
                userRole.setRole(role);

                userRoleRepo.save(userRole);
        }

        public Map<String, String> login(
                        AuthRequest request,
                        HttpServletRequest httpRequest) {

                UserModel user = userRepo.findByEmail(request.getEmail())
                                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

                if (!passwordEncoder.matches(
                                request.getPassword(),
                                user.getPassword())) {

                        throw new RuntimeException("Invalid credentials");
                }

                String ipAddress = RequestUtils.getClientIp(httpRequest);
                String userAgent = RequestUtils.getUserAgent(httpRequest);
                String deviceName = RequestUtils.parseDevice(userAgent);

                String sessionId = UUID.randomUUID().toString();

                List<String> roles = userRoleRepo.findRoleNamesByUserId(user.getId());

                String accessToken = jwtUtil.generateAccessToken(
                                user.getId(),
                                sessionId,
                                roles);

                String refreshToken = jwtUtil.generateRefreshToken(sessionId);

                UserSessionModel session = new UserSessionModel();
                session.setUser(user);
                session.setSessionId(sessionId);
                session.setRefreshToken(refreshToken);
                session.setIpAddress(ipAddress);
                session.setUserAgent(userAgent);
                session.setDeviceName(deviceName);
                session.setLoginAt(LocalDateTime.now());
                session.setLastActivity(LocalDateTime.now());
                session.setExpiresAt(LocalDateTime.now().plusDays(7));
                session.setIsRevoked(false);

                sessionRepo.save(session);

                return Map.of(
                                "accessToken", accessToken,
                                "refreshToken", refreshToken);
        }

        public Map<String, String> refreshToken(String refreshToken) {

                UserSessionModel session = sessionRepo
                                .findByRefreshToken(refreshToken)
                                .orElseThrow(() -> new RuntimeException("Invalid refresh token"));

                if (session.getIsRevoked()) {
                        throw new RuntimeException("Refresh token revoked");
                }

                if (session.getExpiresAt().isBefore(LocalDateTime.now())) {
                        throw new RuntimeException("Refresh token expired");
                }

                UserModel user = session.getUser();

                List<String> roles = userRoleRepo.findRoleNamesByUserId(user.getId());

                // Rotate session id
                String newSessionId = UUID.randomUUID().toString();

                String newAccessToken = jwtUtil.generateAccessToken(
                                user.getId(),
                                newSessionId,
                                roles);

                String newRefreshToken = jwtUtil.generateRefreshToken(newSessionId);

                // Revoke old token
                session.setIsRevoked(true);
                sessionRepo.save(session);

                // Create new session
                UserSessionModel newSession = new UserSessionModel();

                newSession.setUser(user);
                newSession.setSessionId(newSessionId);
                newSession.setRefreshToken(newRefreshToken);
                newSession.setIpAddress(session.getIpAddress());
                newSession.setUserAgent(session.getUserAgent());
                newSession.setDeviceName(session.getDeviceName());

                newSession.setLoginAt(LocalDateTime.now());
                newSession.setLastActivity(LocalDateTime.now());
                newSession.setExpiresAt(LocalDateTime.now().plusDays(7));
                newSession.setIsRevoked(false);

                sessionRepo.save(newSession);

                return Map.of(
                                "accessToken", newAccessToken,
                                "refreshToken", newRefreshToken);
        }

        public void logout(Long sessionId) {
                UserSessionModel session = sessionRepo.findBySessionId(sessionId)
                                .orElseThrow(() -> new RuntimeException("Session not found"));

                session.setIsRevoked(true);

                sessionRepo.save(session);
        }
}
