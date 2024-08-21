package com.example.controllers;



import com.example.entities.User;
import com.example.paylods.*;
import com.example.services.AuthenticationService;
import com.example.services.UserService;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor

public class AuthenticationController {

    @Autowired
    private UserService userService;
    @Autowired
    private final AuthenticationService authenticationService;

//    @PostMapping("/signup")
//    public ResponseEntity<User> signup(@RequestBody UserDto userDto){
//
//        return ResponseEntity.ok(authenticationService.signup(userDto));
//    }
@PostMapping("/signup")
public ResponseEntity<UserDto>  createUser(@Valid @RequestBody UserDto userDto){
    UserDto createUserDto = this.authenticationService.createUser(userDto);
    return new ResponseEntity<>(createUserDto, HttpStatus.CREATED);
}

    @PostMapping("/signup/admin")
    public ResponseEntity<UserDto>  createAdmin(@Valid @RequestBody UserDto userDto){
        UserDto createUserDto = this.authenticationService.createAdmin(userDto);
        return new ResponseEntity<>(createUserDto, HttpStatus.CREATED);
    }


    @PostMapping("/signin")
    public ResponseEntity<JwtAuthenticationResponse> signin(@RequestBody SigninRequest signinRequest) throws Exception {
//        try {
        JwtAuthenticationResponse signin = authenticationService.signin(signinRequest);
            return ResponseEntity.ok(signin);
//        }
//        catch (BadCredentialsException e)
//        {
//            System.out.println("Invalid credentials");
//            throw  new Exception("Invalid Username and Password: " + signinRequest);
//        }

    }


    //register
    @PostMapping("/register")
    public ResponseEntity<UserDto> resgisterUser(@RequestBody UserDto userDto)
    {
        UserDto registeredUser = this.userService.registerNewUser(userDto);
        return new ResponseEntity<UserDto>(registeredUser,HttpStatus.CREATED);
    }

    @PostMapping("/refresh")
    public ResponseEntity<JwtAuthenticationResponse> refresh(@RequestBody RefreshTokenRequest refreshTokenRequest){
        return ResponseEntity.ok(authenticationService.refreshToken(refreshTokenRequest));
    }


}


