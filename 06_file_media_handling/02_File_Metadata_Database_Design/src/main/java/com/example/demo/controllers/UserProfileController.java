package com.example.demo.controllers;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.models.FilesModel;
import com.example.demo.repo.FileRepo;
@RestController
@CrossOrigin(origins = "*")
public class UserProfileController {
    final private FileRepo fileRepo;
    UserProfileController(FileRepo fileRepo){
        this.fileRepo = fileRepo;
    } 
    @PostMapping("/api/profile-pic")
    Map<String, String> postController(@RequestParam("file") MultipartFile file) {
        try {
            String destPath = "upload/";
            Path p = Paths.get(destPath);
            if (!Files.exists(p)) {
                Files.createDirectories(p);
            }
            Path filePath = p.resolve(file.getOriginalFilename());
            file.transferTo(filePath);

            FilesModel meta = new FilesModel();

            meta.setOriginalName(file.getOriginalFilename());
            meta.setStoredName(file.getOriginalFilename());
            meta.setFileType(file.getContentType());
            meta.setFileSize(file.getSize());
            meta.setFilePath(filePath.toString());
            meta.setUploadedAt(LocalDateTime.now());
            fileRepo.save(meta);
            System.out.println(meta);
            return Map.of("message", "successfully");
        } catch (Exception e) {
            System.out.println(e);
            return Map.of("error", "Some Error Occured");
        }
    }
}