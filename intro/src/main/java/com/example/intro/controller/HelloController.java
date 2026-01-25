package com.example.intro.controller;
import java.util.Map;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    @GetMapping("/api/first")
    public Map<String, String> firstApi() {
        System.out.println("api hit");
           return Map.of("data", "first api in Java");
    }

    @GetMapping("/message")
    public Map<String, String> messageApi(){
        return Map.of("name", "Manoj Rawat");
    }
}
