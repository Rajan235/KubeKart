package com.payment.payment.model;

import java.time.Instant;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@AllArgsConstructor
@Data
@NoArgsConstructor
public class Payment {
     @Id
    private String id;
    private String orderId;
    private String userId;
    private Long amount;
    private String currency;
    private String status;
    private String sessionId;
    private Instant createdAt = Instant.now();

    
}
