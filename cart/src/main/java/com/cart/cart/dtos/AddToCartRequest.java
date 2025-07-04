package com.cart.cart.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AddToCartRequest {
    private String productId;
    private int quantity;
    
    private String productName;
    private Float productPrice;
    private String sellerId;
    private Float totalPrice;
    
    

}
