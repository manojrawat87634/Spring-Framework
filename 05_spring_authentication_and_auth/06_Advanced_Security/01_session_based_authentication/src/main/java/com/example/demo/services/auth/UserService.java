package com.example.demo.services.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.dto.auth.RegisterRequest;
import com.example.demo.models.UserModel;
import com.example.demo.repo.UserRepo;

@Service
public class UserService {
    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void registerUser(RegisterRequest request) {

        // Business validation
        if (userRepo.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        UserModel user = new UserModel();

        user.setEmail(request.getEmail());

        // Never save plain passwords
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepo.save(user);
    }
}