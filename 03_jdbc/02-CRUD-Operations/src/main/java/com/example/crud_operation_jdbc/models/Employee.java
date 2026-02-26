package com.example.crud_operation_jdbc.models;

public class Employee {

    private Integer id;
    private String name;
    private String email;
    private String doj; // can use String for simplicity or java.sql.Date
    private Integer age;

    public Employee() {}

    public Employee(Integer id, String name, String email, String doj, Integer age) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.doj = doj;
        this.age = age;
    }

    // Getter and Setter for id
    public int getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    // Getter and Setter for name
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // Getter and Setter for email
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    // Getter and Setter for doj
    public String getDoj() {
        return doj;
    }

    public void setDoj(String doj) {
        this.doj = doj;
    }

    // Getter and Setter for age
    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }
}