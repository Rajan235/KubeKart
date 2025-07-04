package com.cart.cart.dtos;

import lombok.Data;

@Data
public class AddToCartRequest {
     private String productId;
    private int quantity;
    
    private String productName;
    private Float productPrice;
    private String sellerId;
    private Float totalPrice;
    
    

}
