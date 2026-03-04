package com.example.spring_security.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.spring_security.models.UserModel;

@Repository
public interface UserRepo extends JpaRepository<UserModel, Long> {
     Optional<UserModel> findByEmail(String email);
}
