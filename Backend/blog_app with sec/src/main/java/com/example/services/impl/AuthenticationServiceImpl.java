package com.example.services.impl;


import com.example.entities.User;
import com.example.exceptions.ApiException;
import com.example.paylods.*;
import com.example.repositories.RoleRepo;
import com.example.repositories.UserRepo;
import com.example.services.AuthenticationService;
import com.example.services.JWTService;
import com.example.services.UserService;
import io.micrometer.observation.ObservationFilter;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import com.example.entities.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.beans.FixedKeySet;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    @Autowired
    private final UserRepo userRepo;

    @Autowired
    private final PasswordEncoder passwordEncoder;

    @Autowired
    private final AuthenticationManager authenticationManager;



    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private RoleRepo roleRepo;

    @Autowired
    private final JWTService jwtService;
//    private ObservationFilter mapper;


@Autowired
    private UserService userService;
//    public User signup(SignUpRequest signUpRequest){
//        User user = new User();
//        user.setName(signUpRequest.getName());
//        user.setAbout(signUpRequest.getAbout());
//        user.setEmail(signUpRequest.getEmail());
//        user.setRole(Role.USER);
//        user.setPassword(passwordEncoder.encode(signUpRequest.getPassword()));
//        return userRepo.save(user);
//    }

//    public User signup(UserDto userDto){
////        User user = new User();
////        user.setName(userDto.getName());
////        user.setAbout(userDto.getAbout());
////        user.setEmail(userDto.getEmail());
////        user.setRole(Role.USER);
////        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
////        return userRepo.save(user);
//
//        User user = dtoToUser(userDto);
//
//
//        return this.userRepo.save(user);
//    }


   /* @Override
    public UserDto createUser(UserDto userDto) {

        User user = dtoToUser(userDto);
        user.setName(userDto.getName());
        user.setAbout(userDto.getAbout());
        user.setEmail(userDto.getEmail());
//        user.setRoles();
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));

        // Create a Role object for the USER role
        Optional<Role> role= roleRepo.findById(2);//user
        Set<Role> roleSet = new HashSet<>();
        roleSet.add(role.orElse(null));
        user.setRoles(roleSet);


        // Encode the password before setting it
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        // Save the user
        User savedUser = userRepo.save(user);

        // Convert the saved user entity back to DTO and return
        return userToDto(savedUser);

    }*/

    @Override
    public UserDto createUser(UserDto userDto) {
        // Fetch the USER role from the database
        Optional<Role> userRoleOptional = roleRepo.findById(502); // Assuming 2 is the ID for USER role
        Role userRole = userRoleOptional.orElseThrow(() -> new RuntimeException("USER role not found"));

        // Convert DTO to entity
        User user = dtoToUser(userDto);

        // Set user attributes
        user.setName(userDto.getName());
        user.setAbout(userDto.getAbout());
        user.setEmail(userDto.getEmail());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));

        // Assign the USER role to the user
        Set<Role> roles = new HashSet<>();
        roles.add(userRole);
        user.setRoles(roles);

        // Save the user to the database
        User savedUser = userRepo.save(user);

        // Convert the saved user entity back to DTO and return
        return userToDto(savedUser);
    }


    @Override
    public UserDto createAdmin(UserDto userDto) {

        User user = dtoToUser(userDto);
        user.setName(userDto.getName());
        user.setAbout(userDto.getAbout());
        user.setEmail(userDto.getEmail());
//        user.setRoles();
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));

        // Create a Role object for the USER role
        Optional<Role> role= roleRepo.findById(501);
        Set<Role> roleSet = new HashSet<>();
        roleSet.add(role.orElse(null));
        user.setRoles(roleSet);
        // Encode the password before setting it
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));
        // Save the user
        User savedUser = userRepo.save(user);

        // Convert the saved user entity back to DTO and return
        return userToDto(savedUser);

    }




    public JwtAuthenticationResponse signin(SigninRequest signinRequest) throws Exception {

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(signinRequest.getEmail(),
                signinRequest.getPassword());
        try {

            this.authenticationManager.authenticate(authenticationToken);
        }
        catch (BadCredentialsException e)
        {
            System.out.println("Invalid credentials");
            throw  new ApiException("Invalid Username and Password: " + signinRequest);

        }

        var user = userRepo.findByEmail(signinRequest.getEmail()).orElseThrow(()->new IllegalArgumentException("Invalid email or Password.."));
        System.out.println(user.getAuthorities());
        var jwt = jwtService.generateToken(user);
        var refreshToken = jwtService.generateRefreshToken(new HashMap<>(),user);

        JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();

        jwtAuthenticationResponse.setToken(jwt);
        jwtAuthenticationResponse.setUser(this.modelMapper.map((User)user,UserDto.class));


        jwtAuthenticationResponse.setRefreshToken(refreshToken);

        return jwtAuthenticationResponse;
    }

//    public JwtAuthenticationResponse signin(SigninRequest signinRequest){
//        // Find user by email
//        User user = userRepo.findByEmail(signinRequest.getEmail())
//                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));
//
//        // Verify password
//        if (!passwordEncoder.matches(signinRequest.getPassword(), user.getPassword())) {
//            throw new IllegalArgumentException("Invalid email or password");
//        }
//
//        // Generate JWT token
//        String jwtToken = jwtService.generateToken(user);
//        var refreshToken = jwtService.generateRefreshToken(new HashMap<>(),user);
//
//        // Convert User to UserDto
//        UserDto userDto = modelMapper.map(user, UserDto.class);
//
//        // Create JwtAuthenticationResponse object with token, email, and password
//        JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();
//            jwtAuthenticationResponse.setToken(jwtToken);
//        jwtAuthenticationResponse.setRefreshToken(refreshToken);
//        jwtAuthenticationResponse.setEmail(signinRequest.getEmail());
//        jwtAuthenticationResponse.setEmail(signinRequest.g
//        );
//        return jwtAuthenticationResponse;
//    }
//    }

    public JwtAuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest){
        String userEmail = jwtService.extractUserName(refreshTokenRequest.getToken());
        User user = userRepo.findByEmail(userEmail).orElseThrow();
        if(jwtService.isTokenvalid(refreshTokenRequest.getToken(),user)){

            var jwt = jwtService.generateToken(user);
//          var refreshToken = refreshTokenRequest.getToken();
            var refreshToken = jwtService.generateRefreshToken(new HashMap<>(), user);
            JwtAuthenticationResponse jwtAuthenticationResponse = new JwtAuthenticationResponse();

            jwtAuthenticationResponse.setToken(jwt);
            jwtAuthenticationResponse.setRefreshToken(refreshToken);

            return jwtAuthenticationResponse;

        }
        return null;
    }

    public User dtoToUser(UserDto userDto)
    {
        User user = this.modelMapper.map(userDto,User.class);
//        user.setId(userdto.getId());
//        user.setName(userdto.getName());
//        user.setEmail(userdto.getEmail());
//        user.setAbout(userdto.getAbout());
//        user.setPassword(userdto.getPassword());
        return user;
    }

    public UserDto userToDto(User user){
        UserDto userDto = this.modelMapper.map(user,UserDto.class);
//        userDto.setId(user.getId());
//        userDto.setName(user.getName());
//        userDto.setEmail(user.getEmail());
//        userDto.setAbout(user.getAbout());
//        userDto.setPassword(user.getPassword());
        return userDto;
    }

}


