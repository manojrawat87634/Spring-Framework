package com.example.intro;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@CrossOrigin(origins = "*") 
public class IntroApplication {
	public static void main(String[] args) {
		SpringApplication.run(IntroApplication.class, args);
	}
}