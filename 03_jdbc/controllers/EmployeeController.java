package com.example.jdbc_sessions.controllers;
import org.springframework.web.bind.annotation.*;

import com.example.jdbc_sessions.models.EmployeeModel;
import com.example.jdbc_sessions.repositiry.EmployeeRepository;

import java.util.*;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

    private final EmployeeRepository repo;
    public EmployeeController(EmployeeRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<EmployeeModel> getAll() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public EmployeeModel getOne(@PathVariable Long id) {
        return repo.findById(id).orElseThrow();
    }

    @PostMapping
    public EmployeeModel create(@RequestBody EmployeeModel emp) {
        return repo.save(emp);
    }

    @PutMapping("/{id}")
    public EmployeeModel update(@PathVariable Long id, @RequestBody EmployeeModel emp) {
        emp.setId(id);
        return repo.save(emp);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}