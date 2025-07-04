package com.cart.cart.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.cart.cart.dao.CartRepository;
import com.cart.cart.dtos.AddToCartRequest;
import com.cart.cart.model.Cart;
import com.cart.cart.model.CartItem;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartRepository cartRepository;

   public void addToCart(String userId, AddToCartRequest request) {
        Cart cart = cartRepository.findByUserId(userId);
        if(cart==null) cart = new Cart(userId,new ArrayList<>());

        List<CartItem> items = cart.getItems();

        boolean updated = false;

        for (CartItem item : items) {
            if (item.getProductId().equals(request.getProductId())) {
                item.setQuantity(item.getQuantity() + request.getQuantity());
                updated = true;
                break;
            }
        }
        if (!updated) {
            items.add(new CartItem(request.getProductId(),
                request.getProductName(),
                request.getProductPrice(),
                request.getSellerId(),
                request.getProductPrice() * request.getQuantity(),
                request.getQuantity()));
        }
        cartRepository.save(userId, cart);
    }

     
    public void removeFromCart(String userId, String productId) {
        Cart cart = cartRepository.findByUserId(userId);
        if (cart == null) return;

        cart.getItems().removeIf(item -> item.getProductId().equals(productId));
        cartRepository.save(userId, cart);
       
    }

    
    public Cart getCart(String userId) {
         Cart cart = cartRepository.findByUserId(userId);
        if (cart == null) return new Cart(userId, new ArrayList<>());
        return cart;
    }

    
    public void clearCart(String userId) {
        cartRepository.delete(userId);
    }
}