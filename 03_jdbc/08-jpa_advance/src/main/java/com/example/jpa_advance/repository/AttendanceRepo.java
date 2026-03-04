package com.example.jpa_advance.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.jpa_advance.models.Attendance;

public interface AttendanceRepo extends JpaRepository<Attendance, Long>{
        
}
