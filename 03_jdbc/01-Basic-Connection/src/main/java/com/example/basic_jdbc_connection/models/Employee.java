package com.example.basic_jdbc_connection.models;

import java.time.LocalDate;

public class Employee {

    private int id;
    private String name;
    private String email;
    private LocalDate doj; // can use String for simplicity or java.sql.Date
    private Integer age;

    public Employee() {}

    public Employee(int id, String name, String email, LocalDate doj, Integer age) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.doj = doj;
        this.age = age;
    }

    // Getters and Setters

    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public LocalDate getDoj() { return doj; }
    public void setDoj(LocalDate doj) { this.doj = doj; }

    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }
}