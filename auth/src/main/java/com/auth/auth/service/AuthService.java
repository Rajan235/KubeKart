// package com.auth.auth.service;
// import com.auth.auth.kafka.events.UserCreatedEventDto;
// import com.auth.auth.model.User;
// import com.auth.kafka.events.UserCreatedEvent;
// import com.auth.kafka.validator.JsonSchemaValidator;
// import com.fasterxml.jackson.databind.ObjectMapper;
// import lombok.RequiredArgsConstructor;
// import org.springframework.kafka.core.KafkaTemplate;
// import org.springframework.stereotype.Service;

// @Service
// @RequiredArgsConstructor
// public class AuthService {

//     private final KafkaTemplate<String, String> kafkaTemplate;
//     private final ObjectMapper objectMapper = new ObjectMapper();

//     public void handleSignup(User user) throws Exception {
//         UserCreatedEventDto event = new UserCreatedEventDto(user.getUserId(), user.getEmail(), user.getRole());

//         String json = objectMapper.writeValueAsString(event);

//         // Validate with shared schema
//         String schemaPath = "shared-schemas/user/user-created.schema.json"; // adjust path if running from JAR
//         com.auth.auth.kafka.validator.JsonSchemaValidator.validate(json, schemaPath);

//         // Publish to Kafka
//         kafkaTemplate.send("user-created", json);
//         System.out.println("✅ Published user-created event");
//     }
// }
