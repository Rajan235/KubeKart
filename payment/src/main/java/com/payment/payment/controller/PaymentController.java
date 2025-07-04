package com.payment.payment.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.payment.payment.dtos.PaymentRequest;
import com.payment.payment.service.PaymentService;
import com.stripe.exception.StripeException;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class PaymentController {
private final PaymentService paymentService;

    @PostMapping("/create-checkout-session")
    public ResponseEntity<Map<String, String>> createCheckout(@RequestBody PaymentRequest request) throws StripeException {
        String url = paymentService.createStripeCheckoutSession(request);
        return ResponseEntity.ok(Map.of("checkoutUrl", url));
    }
}
