package com.example.jpa_advance.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.jpa_advance.models.Attendance;
import com.example.jpa_advance.models.EmployeeModel;
import com.example.jpa_advance.repository.AttendanceRepo;

import jakarta.transaction.Transactional;

@RestController
@CrossOrigin(origins = "*")
public class AttendanceControllers {
    AttendanceRepo repo;

    AttendanceControllers(AttendanceRepo repo) {
        this.repo = repo;
    }

    @GetMapping("/api/attendance")
    List<Attendance> getAttendance() {
        return repo.findAll();
    }

    @PostMapping("/api/attendance/{id}")
    @Transactional
    public Attendance postAttendance(
            @RequestBody Attendance request,
            @PathVariable Integer id) {

        EmployeeModel employee = new EmployeeModel();
        employee.setEmployeeId(id);

        request.setEmployee(employee);

        return repo.save(request);
    }
}
