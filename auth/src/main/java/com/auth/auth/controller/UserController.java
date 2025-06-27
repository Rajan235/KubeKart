package com.auth.auth.controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RestController;

import com.auth.auth.dtos.AuthResponse;
import com.auth.auth.dtos.LoginRequest;
import com.auth.auth.dtos.RegisterRequest;
import com.auth.auth.dtos.UserDto;
import com.auth.auth.model.Role;
import com.auth.auth.model.User;
import com.auth.auth.model.UserPrincipal;
import com.auth.auth.service.JwtService;
import com.auth.auth.service.UserService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
public class UserController {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserService service;

    @Autowired
    private AuthenticationManager authenticationManager;

    
    @GetMapping("/")
    public String getMethodName() {
        return new String("Welcome to the Authentication Service");
    }
    

    @GetMapping("/current-user")
public ResponseEntity<UserDto> getCurrentUser() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    if (authentication != null && authentication.isAuthenticated()) {
        UserPrincipal userPrincipal = (UserPrincipal)authentication.getPrincipal();
        User user = userPrincipal.getUser();
        if (user != null) {
            UserDto userDto = new UserDto();
            userDto.setUsername(user.getUsername());
            userDto.setEmail(user.getEmail());
            return ResponseEntity.ok(userDto);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    } else {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
    }



}
   
    

    @PostMapping("/register")
public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
    // map to entity
    //User user = new User();
    //user.setUsername(request.getUsername());
    //user.setEmail(request.getEmail());
	//logger.info("Registering user password: " + request.getPassword());
	// Password should be hashed in a real application	
    //user.setPassword(request.getPassword());
    //System.out.println("Registering user password: " + request.getPassword());
	User user = new User();
	user.setUsername(request.getUsername());
	user.setEmail(request.getEmail());
	user.setPassword(request.getPassword());
    user.setRole(request.getRole());
    service.saveUser(user);
    return ResponseEntity.ok(new AuthResponse("User registered", null));
}

	// @PostMapping("login")
	// public String login(@RequestBody User user){

	// 	Authentication authentication = authenticationManager
	// 			.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));

	// 	if(authentication.isAuthenticated())
	// 		return jwtService.generateToken(user.getUsername());
	// 	else
	// 		return "Login Failed";

	
	@PostMapping("/login")
    //manual login method
public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
    try {
        
        Authentication auth = authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );
        
        if (auth.isAuthenticated()) {
            UserPrincipal userPrincipal = (UserPrincipal) auth.getPrincipal();
            String token = jwtService.generateToken(userPrincipal);
            return ResponseEntity.ok(new AuthResponse("Login Successful", token));
        }
        
    } catch (Exception e) {
        
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new AuthResponse("Invalid Credentials", null));
    }
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new AuthResponse("Login Failed", null));
}
@GetMapping("/admin-only")
@PreAuthorize("hasRole('ADMIN')")
public String adminOnly() {
    return "Welcome, Admin!";
}

    

}
