package com.example.services.impl;

import com.example.entities.Role;
import com.example.repositories.RoleRepo;
import com.example.services.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
    RoleRepo roleRepo;;
    @Override
    public Role createRole(Role role) {
        role.setName("USER");
        roleRepo.save(role);
        return null;
    }


}
