package com.example.basic_jdbc_connection.service;

import org.springframework.stereotype.Service;

import com.example.basic_jdbc_connection.models.Employee;
import com.example.basic_jdbc_connection.repositry.EmployeeRepository;

import java.util.List;

@Service
public class EmployeeService {

    private final EmployeeRepository repository;

    public EmployeeService(EmployeeRepository repository) {
        this.repository = repository;
    }

    public List<Employee> getAllEmployees() {
        return repository.findAll();
    }
}