package com.cart.cart.controller;

// public class CartController {

// }
// package com.cart.controller;


import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.cart.cart.dtos.AddToCartRequest;
import com.cart.cart.dtos.CartResponseDto;
import com.cart.cart.dtos.PlaceOrderRequestDto;
import com.cart.cart.model.Cart;
import com.cart.cart.security.UserContextHolder;
import com.cart.cart.service.CartService;

@RestController
@RequestMapping("/api/cart/user")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;
    private UserContextHolder userContextHolder;

    @PostMapping("/add")
    public ResponseEntity<Void> addToCart(@RequestBody AddToCartRequest request) {
        String userId = userContextHolder.getCurrentUser().getUserId();
        cartService.addToCart(userId, request);
        return ResponseEntity.ok().build();
    }
    @PutMapping("/update-quantity")
    public ResponseEntity<Void> updateQuantity(@RequestBody AddToCartRequest request) {
        String userId = userContextHolder.getCurrentUser().getUserId();
        cartService.updateQuantity(userId, request);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/remove/{productId}")
    public ResponseEntity<Void> removeFromCart(@PathVariable String productId) {
        String userId = userContextHolder.getCurrentUser().getUserId();
        cartService.removeFromCart(userId, productId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/getCart")
    public ResponseEntity<CartResponseDto> getCart() {
         String userId = userContextHolder.getCurrentUser().getUserId(); 
        return ResponseEntity.ok(cartService.getCart(userId));
    }
    @GetMapping("/ping")
    public ResponseEntity<String> healthCheck() {
        System.out.println("✅ Cart service is alive");
        return ResponseEntity.ok("Cart service is alive!");
    }

    @DeleteMapping("/clear")
    public ResponseEntity<Void> clearCart() {
        String userId = userContextHolder.getCurrentUser().getUserId();
        cartService.clearCart(userId);
        return ResponseEntity.ok().build();
    }
    // @PostMapping("/place-order")
    // public ResponseEntity<String> placeOrder() {
    //     String userId = userContextHolder.getCurrentUser().getUserId();
    //     CartResponseDto cart = cartService.getCart(userId);

    //     if (cart.getItems().isEmpty()) {
    //         return ResponseEntity.badRequest().body("Cart is empty");
    //     }

    //     PlaceOrderRequestDto orderRequest = PlaceOrderRequestDto.builder()
    //         .userId(userId)
    //         .items(cart.getItems())
    //         .build();

    //     // Send to Order Service (internal REST call)
    //     String orderServiceUrl = "http://ORDER-SERVICE/api/orders/create"; // or use Eureka
    //     try {
    //         ResponseEntity<String> response = restTemplate.postForEntity(orderServiceUrl, orderRequest, String.class);
    //         return ResponseEntity.ok(response.getBody());
    //     } catch (Exception e) {
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Order creation failed: " + e.getMessage());
    //     }
    // }

     
}
