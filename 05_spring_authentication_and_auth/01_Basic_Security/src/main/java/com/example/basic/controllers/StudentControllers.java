package com.example.basic.controllers;

import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController  
public class StudentControllers {
    @GetMapping("/api/student")
    Map<String, String> getStudent(){
        return Map.of("name", "Manoj Rawat");
    }
}