package com.clotho.project.Service;

import java.util.List;

import com.clotho.project.entity.CartItem;

public interface CartService {
    List<CartItem> getAllCartItems();
    List<CartItem> getCartItemByUserId(int userId);
    CartItem addCartItem(CartItem cartItem);
    void updateCartItemQuantity(int userId, int productId, int quantity);
    void deleteByUserIdAndProductId(int userId, int productId);
    CartItem getCartItemById(int itemId);
}