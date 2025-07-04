package com.cart.cart.controller;

// public class CartController {

// }
// package com.cart.controller;


import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cart.cart.dtos.AddToCartRequest;
import com.cart.cart.model.Cart;
import com.cart.cart.security.UserContextHolder;
import com.cart.cart.service.CartService;

@RestController
@RequestMapping("/api/cart/public")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;
    @Autowired
    private UserContextHolder userContextHolder;

    @PostMapping("/add")
    public ResponseEntity<Void> addToCart(
                                          @RequestBody AddToCartRequest request) {
        String userId = userContextHolder.getCurrentUser().getUserId();                          
        cartService.addToCart(userId, request);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/remove/{productId}")
    public ResponseEntity<Void> removeFromCart(
                                               @PathVariable String productId) {
                                                String userId = userContextHolder.getCurrentUser().getUserId(); 
        cartService.removeFromCart(userId, productId);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<Cart> getCart() {
         String userId = userContextHolder.getCurrentUser().getUserId(); 
        return ResponseEntity.ok(cartService.getCart(userId));
    }
    @GetMapping("/hello")
    public ResponseEntity<String> getHello() {
    //logger.info("✅ hello cart service endpoint called");
    System.out.println("hello cart service");
    return ResponseEntity.ok("Cart service is alive!");
}

    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearCart() {
         String userId = userContextHolder.getCurrentUser().getUserId(); 
        cartService.clearCart(userId);
        return ResponseEntity.ok().build();
    }
     
}
