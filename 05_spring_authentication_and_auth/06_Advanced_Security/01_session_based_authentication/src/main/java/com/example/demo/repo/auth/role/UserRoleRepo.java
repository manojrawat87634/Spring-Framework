package com.example.demo.repo.auth.role;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.demo.models.auth.role.UserRoleId;
import com.example.demo.models.auth.role.UserRoleModel;

@Repository
public interface UserRoleRepo extends JpaRepository<UserRoleModel, UserRoleId> {

    @Query("""
            SELECT ur.role.name
            FROM UserRoleModel ur
            WHERE ur.user.id = :userId
            """)
    List<String> findRoleNamesByUserId(Long userId);
}