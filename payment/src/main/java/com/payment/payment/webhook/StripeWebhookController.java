package com.payment.payment.webhook;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.payment.payment.dao.PaymentRepository;
import com.payment.payment.kafka.KafkaEventPublisher;
import com.payment.payment.kafka.events.PaymentSucceededEvent;
import com.payment.payment.kafka.validator.JsonSchemaValidator;
import com.stripe.model.Event;
import com.stripe.model.checkout.Session;
import com.stripe.net.Webhook;
import lombok.RequiredArgsConstructor;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/api/webhooks")
@RequiredArgsConstructor
public class StripeWebhookController {

    private final PaymentRepository repository;

    @Autowired
    private KafkaEventPublisher eventPublisher;

    

    @Value("${stripe.webhook-secret}")
    private String webhookSecret;

    @PostMapping("/stripe")
    public ResponseEntity<String> handleStripeEvent(@RequestBody String payload,
                                                    @RequestHeader("Stripe-Signature") String sigHeader) {
        Event event;
        System.out.println("💥 Received Stripe webhook");

        try {
            event = Webhook.constructEvent(payload, sigHeader, webhookSecret);
        } catch (Exception e) {
            
            return ResponseEntity.badRequest().body("Invalid signature");
        }

        // System.out.println("👉 Event Type: " + event.getType());

        switch (event.getType()) {
            case "checkout.session.completed":
                handleCheckoutSessionCompleted(event);
                break;
            case "payment_intent.succeeded":
            case "payment_intent.failed":
            case "checkout.session.expired":
            case "charge.failed":
                handlePaymentFailure(event);
                break;
            case "charge.succeeded":
                // Optional: log or extend handling if needed
                // System.out.println("ℹ️ Received event: " + event.getType() + " — handled elsewhere or ignored.");
                break;
            default:
                 System.out.println("ℹ️ Unhandled event type: " + event.getType());
                break;
        }

        return ResponseEntity.ok("Received");
    }
    private void handlePaymentFailure(Event event) {
    var optionalObject = event.getDataObjectDeserializer().getObject();
    if (optionalObject.isEmpty()) return;

    Session session = (Session) optionalObject.get(); // or PaymentIntent if handling `payment_intent.failed`
    String sessionId = session.getId();

    repository.findBySessionId(sessionId).ifPresent(payment -> {
        payment.setStatus("FAILED");
        repository.save(payment);

        Map<String, Object> payload = Map.of(
            "id", payment.getId(),
            "orderId", payment.getOrderId(),
            "userId", payment.getUserId(),
            "amount", payment.getAmount(),
            "currency", payment.getCurrency(),
            "status", "failed",
            "sessionId", payment.getSessionId(),
            "createdAt", payment.getCreatedAt().toString(),
            "failureReason", "Payment failed or expired"
        );

        try {
            String json = new ObjectMapper().writeValueAsString(payload);
            JsonSchemaValidator.validate(json, "shared-schemas/payment/payment-failed.schema.json");
            eventPublisher.publish("payment-failed", payment.getId(), json);
        } catch (Exception e) {
            System.err.println("❌ Failed to publish payment-failed event: " + e.getMessage());
        }
    });
}


    private void handleCheckoutSessionCompleted(Event event) {
        var optionalObject = event.getDataObjectDeserializer().getObject();
        if (optionalObject.isEmpty()) {
            //System.err.println("❌ Failed to deserialize checkout.session.completed event");
            return;
        }

        Session session = (Session) optionalObject.get();
        String sessionId = session.getId();
        //System.out.println("✅ Session ID: " + sessionId);

        // repository.findBySessionId(sessionId).ifPresentOrElse(payment -> {
        //     payment.setStatus("SUCCESS");
        //     repository.save(payment);
        //     //System.out.println("✅ Payment updated in DB");
        // }, () -> {
        //     System.err.println("❌ No Payment found for session ID: " + sessionId);
        // });
        repository.findBySessionId(sessionId).ifPresent(payment -> {
            payment.setStatus("SUCCESS");
            repository.save(payment);
             // Prepare event payload
            PaymentSucceededEvent paymentSucceededEvent  = new PaymentSucceededEvent(
    payment.getId(),
    payment.getOrderId(),
    payment.getUserId(),
    payment.getAmount(),
    payment.getCurrency(),
    "success",
    payment.getSessionId(),
    payment.getCreatedAt()
);

            try {
        String json = new ObjectMapper().writeValueAsString(paymentSucceededEvent );
        JsonSchemaValidator.validate(json, "shared-schemas/payment/payment-succeeded.schema.json");
        eventPublisher.publish("payment-succeeded", payment.getId(), json);
        } catch (Exception e) {
            System.err.println("❌ Event publish failed: " + e.getMessage());
        }

        });
    }
}