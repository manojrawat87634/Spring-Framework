package com.example.demo.controllers;

import java.util.Map;
import java.util.UUID;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import io.minio.GetPresignedObjectUrlArgs;
import io.minio.MinioClient;
import io.minio.PutObjectArgs;
import io.minio.http.Method;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/file")
public class FileControllers {
    final private MinioClient minioClient;

    FileControllers(MinioClient minioClient) {
        this.minioClient = minioClient;
    }

    @GetMapping("/{filename}")
    Map<String, String> getFile(@PathVariable String filename) {
        try {
            String url = minioClient.getPresignedObjectUrl(
                    GetPresignedObjectUrlArgs.builder()
                            .method(Method.GET)
                            .bucket("mybucket")
                            .object(filename)
                            .expiry(60 * 5) // 5 minutes
                            .build());
            return Map.of("message", url);
        } catch (Exception e) {
            return Map.of("error", "Internal Server Error");
        }
    }

    @PostMapping
    Map<String, String> postFile(@RequestParam("file") MultipartFile file) {
        try {
            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            minioClient.putObject(
                    PutObjectArgs.builder()
                            .bucket("mybucket")
                            .object(fileName)
                            .stream(file.getInputStream(), file.getSize(), -1)
                            .contentType(file.getContentType())
                            .build());
            String url = "http://localhost:9000/manoj/" + fileName;
            return Map.of("message", url);
        } catch (Exception e) {
            return Map.of("error", "Internal Server Error");
        }
    }
}
