package com.example.demo.repo.auth;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.demo.models.auth.UserSessionModel;


@Repository
public interface UserSessionRepo extends JpaRepository<UserSessionModel, Long> {
 
}
