package com.example.__jpa.repositiry;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.__jpa.models.Employee;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}