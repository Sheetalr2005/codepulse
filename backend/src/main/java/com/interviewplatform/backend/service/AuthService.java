package com.interviewplatform.backend.service;

import com.interviewplatform.backend.dto.LoginRequest;
import com.interviewplatform.backend.dto.SignupRequest;
import com.interviewplatform.backend.model.User;
import com.interviewplatform.backend.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.interviewplatform.backend.service.JwtService;
import com.interviewplatform.backend.dto.AuthResponse;

@Service

public class AuthService {

    

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    public String signup(SignupRequest request) {

    if (userRepository.findByEmail(request.getEmail()).isPresent()) {
        return "Email already exists";
    }

    User user = new User();

    user.setName(request.getName());
    user.setEmail(request.getEmail());

    user.setPassword(
            passwordEncoder.encode(request.getPassword())
    );

    userRepository.save(user);

    return "User registered successfully";
}

    public AuthResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElse(null);

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        boolean isPasswordCorrect = passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        );

        if (!isPasswordCorrect) {
            throw new RuntimeException("Invalid password");
        }

        String token = jwtService.generateToken(
        user.getEmail()
);

return new AuthResponse(
        token,
        user.getId(),
        user.getEmail()
);
    }
}