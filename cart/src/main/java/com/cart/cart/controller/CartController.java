package com.cart.cart.controller;

// public class CartController {

// }
// package com.cart.controller;


import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cart.cart.dtos.AddToCartRequest;
import com.cart.cart.model.Cart;
import com.cart.cart.service.CartService;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<Void> addToCart(@RequestHeader("X-User-Id") String userId,
                                          @RequestBody AddToCartRequest request) {
        cartService.addToCart(userId, request);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/remove/{productId}")
    public ResponseEntity<Void> removeFromCart(@RequestHeader("X-User-Id") String userId,
                                               @PathVariable String productId) {
        cartService.removeFromCart(userId, productId);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<Cart> getCart(@RequestHeader("X-User-Id") String userId) {
        return ResponseEntity.ok(cartService.getCart(userId));
    }
    @GetMapping("/hello")
    public ResponseEntity<String> getHello() {
    //logger.info("✅ hello cart service endpoint called");
    System.out.println("hello cart service");
    return ResponseEntity.ok("Cart service is alive!");
}

    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearCart(@RequestHeader("X-User-Id") String userId) {
        cartService.clearCart(userId);
        return ResponseEntity.ok().build();
    }
     
}
