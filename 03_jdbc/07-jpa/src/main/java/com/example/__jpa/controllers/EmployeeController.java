package com.example.__jpa.controllers;
import org.springframework.web.bind.annotation.*;

import com.example.__jpa.models.Employee;
import com.example.__jpa.repositiry.EmployeeRepository;

import java.util.*;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

    private final EmployeeRepository repo;
    public EmployeeController(EmployeeRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Employee> getAll() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public Employee getOne(@PathVariable Long id) {
        return repo.findById(id).orElseThrow();
    }

    @PostMapping
    public Employee create(@RequestBody Employee emp) {
        return repo.save(emp);
    }

    @PutMapping("/{id}")
    public Employee update(@PathVariable Integer id, @RequestBody Employee emp) {
        emp.setId(id);
        return repo.save(emp);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}