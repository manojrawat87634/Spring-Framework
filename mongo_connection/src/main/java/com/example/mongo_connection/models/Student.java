package com.example.mongo_connection.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "student")
public class Student {
    @Id
    private String id;
    private String name;
    private int age;
    private String grade;
    private String city;

    public Student() {}

    public Student(String name, int age, String grade, String city) {
        this.name = name;
        this.age = age;
        this.grade = grade;
        this.city = city;
    }

    // Getters & Setters
    public String getId() { return id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }
    public String getGrade() { return grade; }
    public void setGrade(String grade) { this.grade = grade; }
    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    @Override
    public String toString() {
        return "Student{id='" + id + "', name='" + name + "', age=" + age + ", grade='" + grade + "', city='" + city + "'}";
    }
}
