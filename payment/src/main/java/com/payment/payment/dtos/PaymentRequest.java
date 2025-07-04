package com.payment.payment.dtos;

import lombok.Data;

@Data
public class PaymentRequest {
     private String orderId;
    private String userId;
    private Long amount; // in paise
    private String currency; // INR or USD
}
