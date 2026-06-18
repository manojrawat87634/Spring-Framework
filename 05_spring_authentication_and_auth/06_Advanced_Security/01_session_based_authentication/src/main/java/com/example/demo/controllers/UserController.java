package com.example.demo.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.models.UserModel;
import com.example.demo.repo.UserRepo;
import com.example.demo.service.UserService;
import com.example.demo.utils.JwtUtil;

@RestController
public class UserController {
    private final PasswordEncoder passwordEncoder;
    private final UserRepo userRepo;
    // private final UserService userService;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private AuthenticationManager authenticationManager;

    public UserController(PasswordEncoder passwordEncoder, UserRepo userRepo, UserService userService) {
        this.passwordEncoder = passwordEncoder;
        // this.userService = userService;
        this.userRepo = userRepo;
    }

    @PostMapping("/api/register")
    Map<String, String> registerUser(@RequestBody UserModel user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepo.save(user);
        return Map.of("message", "User Registered Successfully");
    }

    @GetMapping("/api/users")
    List<UserModel> getUser() {
        return userRepo.findAll();
    }

    @PostMapping("/api/login")
    public Map<String, String> login(@RequestBody UserModel request) {
        System.out.println("-----------------hii---------------------");
        Authentication authentication = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()));
                        
                        if (authentication.isAuthenticated()) {

            String token = jwtUtil.generateToken(request.getEmail());
            System.out.println(token);
            
            return Map.of("token", token);
        }

        throw new RuntimeException("Invalid credentials");
    }
}
