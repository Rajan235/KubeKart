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
            case "charge.succeeded":
                // Optional: log or extend handling if needed
                // System.out.println("ℹ️ Received event: " + event.getType() + " — handled elsewhere or ignored.");
                break;
            default:
                // System.out.println("ℹ️ Unhandled event type: " + event.getType());
                break;
        }

        return ResponseEntity.ok("Received");
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
        });
    }
}