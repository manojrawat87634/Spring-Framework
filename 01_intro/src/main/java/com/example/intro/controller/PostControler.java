package com.example.intro.controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PostControler {
    @PostMapping("/api/first")
    public String createUser(@RequestBody User user){
        System.out.print(user);
        return "";
    }
}

class User {
    private String name;
    private String email;
    public User() {} // default constructor
    public User(String name, String email) {
        this.name = name;
        this.email = email;
    }

    // Getters & Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    @Override
    public String toString() {
        return "User{name='" + name + "', email='" + email + "'}";
    }
}

 
