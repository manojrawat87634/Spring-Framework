package com.example.demo.repo.auth;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.models.auth.UserModel;


@Repository
public interface UserRepo extends JpaRepository<UserModel, Long> {
  Optional<UserModel> findByEmail(String email);    
  boolean existsByEmail(String email);    
}
