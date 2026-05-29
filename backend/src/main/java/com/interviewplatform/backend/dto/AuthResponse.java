package com.interviewplatform.backend.dto;

public class AuthResponse {

    private String token;

    private Long userId;

    private String email;

    public AuthResponse(
            String token,
            Long userId,
            String email
    ) {

        this.token = token;
        this.userId = userId;
        this.email = email;
    }

    public String getToken() {
        return token;
    }

    public Long getUserId() {
        return userId;
    }

    public String getEmail() {
        return email;
    }
}