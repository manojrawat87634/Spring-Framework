package com.example.jwt_auth.controllers;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;

public class HomeControlers {
    @GetMapping("/api/first/")
    Map <String, String> myFristApi(){
        return Map.of("name", "Manoj");
    }
}
