package com.example.__jpa.models;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "employee", uniqueConstraints = {
        @UniqueConstraint(columnNames = "email")
})
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true, columnDefinition = "TEXT")
    private String email;

    @Column(nullable = false)
    private LocalDate doj;

    @Column(nullable = false)
    private Integer age;

    // No-argument constructor
    public Employee() {
    }

    // All-argument constructor
    public Employee(Integer id, String email, LocalDate doj, Integer age) {
        this.id = id;
        this.email = email;
        this.doj = doj;
        this.age = age;
    }

    // Getters and setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public LocalDate getDoj() {
        return doj;
    }

    public void setDoj(LocalDate doj) {
        this.doj = doj;
    }

    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    // toString method
    @Override
    public String toString() {
        return "Employee{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", doj=" + doj +
                ", age=" + age +
                '}';
    }
}