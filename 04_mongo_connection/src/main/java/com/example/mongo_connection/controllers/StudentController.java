package com.example.mongo_connection.controllers;
import org.springframework.web.bind.annotation.*;
import com.example.mongo_connection.models.Student;
import com.example.mongo_connection.repo.StudentRepository;
import java.util.List;


@RestController
@RequestMapping("/api/students")
public class StudentController {
    private final StudentRepository studentRepository;
    public StudentController(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }
    @GetMapping
    public List<Student> getAllStudents() {
        System.out.println(studentRepository.findAll());
        return studentRepository.findAll();  // fetches all existing records
    }
}
