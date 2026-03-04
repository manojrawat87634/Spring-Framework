package com.example.mongo_connection.repo;


import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.mongo_connection.models.Student;

public interface StudentRepository extends MongoRepository<Student, String> {
    // findAll() will return all existing documents
}
