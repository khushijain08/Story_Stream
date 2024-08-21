package com.example.paylods;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SignUpRequest {

    private int id;
    @NotEmpty
    @Size(min = 4,message = "Username must be min of 4 charactor !! ")
    private String name;
    @Email(message = "Email address is not valid !!")
    private String email;
    @NotEmpty
    @Size(min = 3,max = 10,message = "Password must be min of 3 chars and max of 10 chars !!")
    private String password;
    @NotEmpty
    private String about;
}

