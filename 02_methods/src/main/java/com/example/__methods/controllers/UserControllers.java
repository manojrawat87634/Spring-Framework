package com.example.__methods.controllers;
import java.util.Map;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
public class UserControllers {
    @GetMapping("/api/first")
    public Map<String, String> getUserMap() {
        return Map.of("name", "Manoj Rawat");
    }

    @PostMapping("/api/user")
    public Map<String, String> postData(@RequestBody Map<String, Object> payload) {
        System.out.println(payload);
        return Map.of("name", "manoj rawat");
    }

    @PutMapping("/api/user/{id}")
    public Map<String, String> putData(@PathVariable("id") int userId) {
        System.out.println(userId);
        return Map.of("name", "manoj rawat");
    }

    @DeleteMapping("/api/user")
    public Map<String, String> deleteData(@RequestBody Map<String, Object> payload) {
        System.out.println(payload);
        return Map.of("name", "manoj rawat");
    }
}