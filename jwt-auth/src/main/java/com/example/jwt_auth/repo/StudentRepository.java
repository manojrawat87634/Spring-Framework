package com.example.jwt_auth.repo;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.jwt_auth.models.StudentModel;


public interface StudentRepository extends MongoRepository<StudentModel, String> {
}
