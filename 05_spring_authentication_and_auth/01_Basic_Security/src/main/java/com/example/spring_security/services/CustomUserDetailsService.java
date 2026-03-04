// package com.example.spring_security.services;

// import com.example.spring_security.models.UserModel;
// import com.example.spring_security.repository.UserRepo;

// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.security.core.userdetails.*;
// import org.springframework.security.core.authority.SimpleGrantedAuthority;
// import org.springframework.stereotype.Service;

// import java.util.List;

// @Service
// public class CustomUserDetailsService implements UserDetailsService {

//     @Autowired
//     private UserRepo userRepo;

//     @Override
//     public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//         UserModel user = userRepo.findByEmail(email)
//                 .orElseThrow(() -> new UsernameNotFoundException("User not found"));

//         return new org.springframework.security.core.userdetails.User(
//                 user.getEmail(),
//                 user.getPassword(),
//                 user.isActive(),
//                 true, true, true, // accountNonExpired, credentialsNonExpired, accountNonLocked
//                 List.of(new SimpleGrantedAuthority("ROLE_USER")) // default role
//         );
//     }
// }