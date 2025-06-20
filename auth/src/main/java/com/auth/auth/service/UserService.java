package com.auth.auth.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.auth.auth.dao.UserRepo;
import com.auth.auth.model.User;

import lombok.RequiredArgsConstructor;

// service used to save user details in the database for custome controller methods 
@Service
@RequiredArgsConstructor
public class UserService {
    
    private final UserRepo repo;
    
    
    private final PasswordEncoder encoder;




    public User saveUser(User user) {
        String encodedPassword = encoder.encode(user.getPassword());
        user.setPassword(encodedPassword);
        return repo.save(user);
    }



}
