package com.example.jpa_advance.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.jpa_advance.models.EmployeeModel;
import com.example.jpa_advance.repository.EmployeeRepo;


@RestController
public class EmployeeControllers {
    private final EmployeeRepo repo;

    EmployeeControllers(EmployeeRepo repo) {
        this.repo = repo;
    }

    @GetMapping("/api/employees/")
    List<EmployeeModel> getEmployeeControllers() {
        return repo.findAll();
    }

    
    @PostMapping("/api/employee/")
    int createEmployee(@PathVariable int id, @RequestBody EmployeeModel body) {
        repo.save(body);
        return 1;
    }
}
