package com.example.paylods;

import com.example.entities.Role;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

@NoArgsConstructor
@Getter
@Setter
public class UserDto {


    private int id;
    @NotEmpty
    @Size(min = 4,message = "Username must be min of 4 charactor !! ")
    private String name;
    @Email(message = "Email address is not valid !!")
    @NotEmpty(message = "Email is required !!")
    private String email;
    @NotEmpty
    @Size(min = 3,max = 10,message = "Password must be min of 3 chars and max of 10 chars !!")
    private String password;

    @NotEmpty
    private String about;


    @JsonIgnore
    public String getPassword() {
        return this.password;

    }
@JsonProperty
    public void setPassword(String password) {
        this.password = password;
    }

//
//    private Set<CommentDto> comments = new HashSet<>();

}
