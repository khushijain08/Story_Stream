package com.example.services;

import org.springframework.security.core.userdetails.UserDetails;

import java.util.Map;

public interface JWTService {

    String extractUserName(String token);

    String generateToken(UserDetails userDetails);

    boolean isTokenvalid(String token,UserDetails userDetails);

    String generateRefreshToken(Map<String, Object> extraClaims, UserDetails userDetails);

}
