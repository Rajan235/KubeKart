package com.payment.payment.model;

import java.time.Instant;

import jakarta.persistence.Entity;
// import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
// import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@AllArgsConstructor
@Data
@NoArgsConstructor

public class Payment {
    @Id
    //@GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private String id;
    private String orderId;
    private String userId;
    private Long amount;
    private String currency;
    private String status;
    private String sessionId;
    private Instant createdAt = Instant.now();

    
}
