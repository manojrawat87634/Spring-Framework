package com.example.demo.repo.auth;


import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.models.UserModel;
import com.example.demo.models.UserSessionModel;


@Repository
public interface UserSessionRepo extends JpaRepository<UserSessionModel, Long> {
 
}
