package com.interviewplatform.backend.controller;

import com.interviewplatform.backend.dto.LoginRequest;
import com.interviewplatform.backend.dto.SignupRequest;
import com.interviewplatform.backend.dto.AuthResponse;

import com.interviewplatform.backend.service.AuthService;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")

public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/signup")
    public String signup(
            @Valid @RequestBody SignupRequest request
    ) {

        return authService.signup(request);
    }

    @PostMapping("/login")
    public AuthResponse login(
            @Valid @RequestBody LoginRequest request
    ) {

        return authService.login(request);
    }
}