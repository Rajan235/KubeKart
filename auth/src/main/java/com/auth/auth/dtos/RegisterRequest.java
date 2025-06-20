package com.auth.auth.dtos;

import com.auth.auth.model.Role;

import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequest {
    @NotBlank
    private String username;

    @Email
    @NotBlank
    private String email;

    @Size(min = 8, message = "Password must be at least 8 characters long")
    @NotBlank
    private String password;

    @NotNull(message = "Role cannot be blank")
    @Enumerated(jakarta.persistence.EnumType.STRING)
    private Role role; // Assuming role is a string, you might want to change this to an enum or a specific type if needed
}
