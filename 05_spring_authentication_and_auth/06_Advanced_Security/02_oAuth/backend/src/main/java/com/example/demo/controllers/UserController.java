package com.example.demo.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.auth.AuthRequest;
import com.example.demo.services.auth.UserAuthService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/auth")
public class UserController {

    @Autowired
    private UserAuthService userAuthService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(
            @Valid @RequestBody AuthRequest request) {

        userAuthService.registerUser(request);

        return ResponseEntity.ok(
                Map.of("message", "User registered successfully!")
        );
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @Valid @RequestBody AuthRequest request,
            HttpServletRequest httpRequest) {

        Map<String, String> response =
                userAuthService.login(request, httpRequest);

        return ResponseEntity.ok(response);
    }

    @PostMapping("/logout")
public ResponseEntity<String> logout(@RequestParam Long sessionId) {
    userAuthService.logout(sessionId);

    return ResponseEntity.ok("Logged out successfully");
}
}