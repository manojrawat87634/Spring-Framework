package com.example.mongo_connection.controllers;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeControllers {
    @GetMapping("/api/first")
    public Map<String, String>firstApi(){
        return Map.of("name", "manoj Rawat");
    }
    @PostMapping("/api/first")
    public String postMap(@RequestBody Map<String, String> body){
        return "Data Registered Successfully";
    }
}

