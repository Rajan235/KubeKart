package com.payment.payment.webhook;

import com.payment.payment.dao.PaymentRepository;

import com.stripe.model.Event;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/webhooks")
@RequiredArgsConstructor
public class StripeWebhookController {
    private final PaymentRepository repository;

    @Value("${stripe.webhook-secret}")
    private String webhookSecret;

    @PostMapping("/stripe")
    public ResponseEntity<String> handleStripeEvent(@RequestBody String payload,
                                                    @RequestHeader("Stripe-Signature") String sigHeader) {
        Event event;

        try {
            event = Webhook.constructEvent(payload, sigHeader, webhookSecret);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Invalid signature");
        }

        if ("checkout.session.completed".equals(event.getType())) {
            Session session = (Session) event.getDataObjectDeserializer()
                                             .getObject()
                                             .orElseThrow();

            String sessionId = session.getId();

            repository.findBySessionId(sessionId).ifPresent(payment -> {
                payment.setStatus("SUCCESS");
                repository.save(payment);
                // Optionally emit Kafka event here
            });
        }

        return ResponseEntity.ok("Received");
    }
}
