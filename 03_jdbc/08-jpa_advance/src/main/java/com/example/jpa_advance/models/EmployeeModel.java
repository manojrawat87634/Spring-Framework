package com.example.jpa_advance.models;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

@Entity
@Table(name = "employee", uniqueConstraints = {
        @UniqueConstraint(columnNames = "email")
})
public class EmployeeModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer employee_id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private Integer salary;

    @Column(nullable = false)
    private Integer age;

    @Column(nullable = false)
    private LocalDate doj;

    // No-argument constructor (required by JPA)
    public EmployeeModel() {
    }

    // All-argument constructor
    public EmployeeModel(Integer employee_id, String name, String email,
                         Integer salary, Integer age, LocalDate doj) {
        this.employee_id = employee_id;
        this.name = name;
        this.email = email;
        this.salary = salary;
        this.age = age;
        this.doj = doj;
    }

    
    // Getters and Setters
    public Integer getEmployeeId() {
        return employee_id;
    }

    public void setEmployeeId(Integer employee_id) {
        this.employee_id = employee_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getSalary() {
        return salary;
    }

    public void setSalary(Integer salary) {
        this.salary = salary;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public LocalDate getDoj() {
        return doj;
    }

    public void setDoj(LocalDate doj) {
        this.doj = doj;
    }
}