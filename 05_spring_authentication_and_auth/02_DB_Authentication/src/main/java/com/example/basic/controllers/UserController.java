package com.example.basic.controllers;

import java.util.List;
import java.util.Map;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.basic.models.UserModel;
import com.example.basic.repo.UserRepo;

@RestController
public class UserController {
   private final PasswordEncoder passwordEncoder;
    private final UserRepo userRepo;

    public UserController(PasswordEncoder passwordEncoder, UserRepo userRepo){
        this.passwordEncoder = passwordEncoder;
        this.userRepo = userRepo;
    }
    @PostMapping("/api/register")
    Map<String, String> registerUser(@RequestBody UserModel user){
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepo.save(user);
        return Map.of("message", "User Registered Successfully");
    }
    @GetMapping("/api/users")
    List<UserModel> getUser(){
        return userRepo.findAll();
    }
}
