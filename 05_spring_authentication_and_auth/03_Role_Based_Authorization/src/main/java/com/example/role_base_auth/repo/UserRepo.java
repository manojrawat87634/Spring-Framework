package com.example.role_base_auth.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.role_base_auth.models.UserModel;

public interface UserRepo extends JpaRepository<UserModel, Long> {
    Optional<UserModel> findByEmail(String email);
}