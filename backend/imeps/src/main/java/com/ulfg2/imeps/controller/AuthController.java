package com.ulfg2.imeps.controller;

import com.ulfg2.imeps.domain.LoginResponse;
import com.ulfg2.imeps.persistence.*;
import com.ulfg2.imeps.repo.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Set;

@RestController
public class AuthController {

    @Autowired
    StudentRepository repo;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@AuthenticationPrincipal UserDetails userDetails) {
        UserEntity userEntity = (UserEntity) userDetails;
        return ResponseEntity.ok(new LoginResponse(userEntity.getUsername(), userEntity.getIsAdmin()));
    }


}
