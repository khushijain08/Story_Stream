package com.example.repositories;

import com.example.entities.Role;
import com.example.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepo extends JpaRepository<User,Integer> {

    Optional<User> findByEmail(String email);

//    List<User> findByRole();
//List<User> findByRole(Role role);
}
