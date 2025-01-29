package com.ulfg2.imeps.controller;

import com.ulfg2.imeps.domain.LoginResponse;
import com.ulfg2.imeps.persistence.UserEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {


    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@AuthenticationPrincipal UserDetails userDetails) {
        UserEntity userEntity = (UserEntity) userDetails;
        return ResponseEntity.ok(new LoginResponse(userEntity.getUsername(), userEntity.getIsAdmin()));
    }
}
