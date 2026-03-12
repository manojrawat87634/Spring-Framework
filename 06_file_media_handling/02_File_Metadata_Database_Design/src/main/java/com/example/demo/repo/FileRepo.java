package com.example.demo.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.models.FilesModel;

public interface FileRepo extends JpaRepository<FilesModel, Long> {
    
}
