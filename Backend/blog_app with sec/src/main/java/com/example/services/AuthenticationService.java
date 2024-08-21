package com.example.services;


import com.example.entities.User;
import com.example.paylods.*;

public interface AuthenticationService {

//    User signup(UserDto userDto);
public UserDto createUser(UserDto userDto);
    public UserDto createAdmin(UserDto userDto);
    JwtAuthenticationResponse signin(SigninRequest signinRequest) throws Exception;

    JwtAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest);

}
