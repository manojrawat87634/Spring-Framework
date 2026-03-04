package com.example.jpa_advance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.jpa_advance.models.EmployeeModel;

public interface EmployeeRepo extends JpaRepository<EmployeeModel, Long> {
    
}