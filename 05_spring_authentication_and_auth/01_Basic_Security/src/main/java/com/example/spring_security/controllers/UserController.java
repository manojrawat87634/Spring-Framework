package com.example.spring_security.controllers;

import com.example.spring_security.models.UserModel;
import com.example.spring_security.repository.UserRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Register route
    @PostMapping("/register")
    public String registerUser(@RequestBody UserModel user) {
        System.out.println(user);
        if (userRepo.findByEmail(user.getEmail()).isPresent()) {
            return "Email already exists!";
        }
        user.setPassword(passwordEncoder.encode(user.getPassword())); // hash password
        user.setIsActive(true);
        userRepo.save(user);
        return "User registered successfully!";
    }

    // Public test endpoint
    @GetMapping("/public/hello")
    public String publicHello() {
        return "Hello from public endpoint!";
    }

    // Protected endpoint
    @GetMapping("/user/hello")
    public String userHello() {
        return "Hello authenticated user!";
    }
}