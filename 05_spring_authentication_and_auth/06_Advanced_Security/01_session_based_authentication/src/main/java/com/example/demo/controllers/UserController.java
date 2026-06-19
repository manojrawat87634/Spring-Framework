package com.example.demo.controllers;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
// import org.springframework.security.crypto.password.PasswordEncoder;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.auth.RegisterRequest;
import com.example.demo.services.auth.UserService;

import jakarta.validation.Valid;
@RestController
@RequestMapping("/auth")
class UserController {
    // @Autowired 
    // PasswordEncoder passwordEncoder;
    
    @Autowired 
    UserService userService;
    @PostMapping("/register")
     public ResponseEntity<?> registerUser(@Valid     
        @RequestBody RegisterRequest request){
            userService.registerUser(request);
            return ResponseEntity.ok(Map.of("message", "User Register Successfully!!"));
    }
}