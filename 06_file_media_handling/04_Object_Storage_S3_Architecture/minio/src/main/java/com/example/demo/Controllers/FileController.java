package com.example.demo.Controllers;

import java.util.Map;
import java.util.UUID;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import io.minio.MinioClient;
import io.minio.PutObjectArgs;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/file")
public class FileController {
    private final MinioClient minioClient;

    FileController(MinioClient minioClient) {
        this.minioClient = minioClient;
    }

    @PostMapping
    Map<String, String> postFile(@RequestParam MultipartFile file)  {
        try {
                String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
                minioClient.putObject(
                        PutObjectArgs.builder()
                                .bucket("manoj")
                                .object(fileName)
                                .stream(file.getInputStream(), file.getSize(), -1)
                                .contentType(file.getContentType())
                                .build());
                                String url = "http://localhost:9000/manoj/" + fileName;
                return Map.of("message", url);
        } catch (Exception e) {
            System.out.println(e);
            return Map.of("error", "internal server error");
        }
    }
}
