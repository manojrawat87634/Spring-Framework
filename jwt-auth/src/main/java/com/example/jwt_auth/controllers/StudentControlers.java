package com.example.jwt_auth.controllers;

import java.util.List;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.jwt_auth.models.StudentModel;
import com.example.jwt_auth.repo.StudentRepository;

public class StudentControlers {
    private final StudentRepository studentRepository;

    StudentControlers(StudentRepository stu) {
        this.studentRepository = stu;
    }

    @GetMapping("/api/student")
    List<StudentModel> studentGet() {
        return studentRepository.findAll();
    }
}
