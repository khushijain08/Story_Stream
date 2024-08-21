package com.example.services;

import com.example.paylods.UserDto;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;

public interface UserService {

    UserDto registerNewUser (UserDto user);
//   UserDto createAdmin(UserDto user);
    UserDto updateUser(UserDto user,Integer userId);
    UserDto getUserById(Integer userId);
    List<UserDto> getAllUsers();
    void deleteUser(Integer userId);
 UserDetailsService userDetailsService();

}
