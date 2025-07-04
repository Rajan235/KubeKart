package com.payment.payment.service;

import org.springframework.stereotype.Service;

import com.payment.payment.dao.PaymentRepository;
import com.payment.payment.dtos.PaymentRequest;
import com.payment.payment.model.Payment;
import com.stripe.exception.StripeException;

import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import lombok.RequiredArgsConstructor;


import java.util.List;
import java.util.UUID;


@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {
    private final PaymentRepository repository;

    @Override
    public String createStripeCheckoutSession(PaymentRequest request) throws StripeException {
        List<SessionCreateParams.LineItem> lineItems = List.of(
            SessionCreateParams.LineItem.builder()
                .setQuantity(1L)
                .setPriceData(
                    SessionCreateParams.LineItem.PriceData.builder()
                        .setCurrency(request.getCurrency())
                        .setUnitAmount(request.getAmount())
                        .setProductData(
                            SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                .setName("Order: " + request.getOrderId())
                                .build()
                        )
                        .build()
                )
                .build()
        );

        SessionCreateParams params = SessionCreateParams.builder()
            .addAllLineItem(lineItems)
            .setMode(SessionCreateParams.Mode.PAYMENT)
            .setSuccessUrl("http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}")
            .setCancelUrl("http://localhost:3000/cancel")
            .build();

        Session session = Session.create(params);

        Payment payment = new Payment();
        payment.setId(UUID.randomUUID().toString());
        payment.setSessionId(session.getId());
        payment.setOrderId(request.getOrderId());
        payment.setUserId(request.getUserId());
        payment.setAmount(request.getAmount());
        payment.setCurrency(request.getCurrency());
        payment.setStatus("PENDING");

        repository.save(payment);

        return session.getUrl();
    }
}

