package com.example.demo.repo.auth.role;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.models.auth.role.RoleModel;

@Repository
public interface RoleRepo extends JpaRepository<RoleModel, Long> {
    Optional<RoleModel> findByName(String name);

    boolean existsByName(String name);

}