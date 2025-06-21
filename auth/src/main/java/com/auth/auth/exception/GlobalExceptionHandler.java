package com.auth.auth.exception;

import java.util.HashMap;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

@ControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(MethodArgumentTypeMismatchException.class)
    public ResponseEntity<String> handleTypeMismatch(MethodArgumentTypeMismatchException ex) {
        return ResponseEntity.badRequest().body("Invalid role value. Allowed: USER, SELLER, ADMIN");
    }

    //  // Handles @Valid errors
    // @ExceptionHandler(MethodArgumentNotValidException.class)
    // public ResponseEntity<Map<String, String>> handleValidationErrors(MethodArgumentNotValidException ex) {
    //     Map<String, String> errors = new HashMap<>();

    //     for (FieldError error : ex.getBindingResult().getFieldErrors()) {
    //         errors.put(error.getField(), error.getDefaultMessage());
    //     }

    //     return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    // }

    // // Optional: handle all other exceptions
    // @ExceptionHandler(Exception.class)
    // public ResponseEntity<Map<String, String>> handleAllOtherErrors(Exception ex) {
    //     Map<String, String> error = new HashMap<>();
    //     error.put("error", ex.getMessage());
    //     return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    // }
}