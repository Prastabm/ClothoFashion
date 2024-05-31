package com.clotho.project.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clotho.project.entity.CartItem;
import com.clotho.project.repository.CartRepository;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepository cartRepository;

    @Override
    public List<CartItem> getAllCartItems() {
        return cartRepository.findAll();
    }

    @Override
    public List<CartItem> getCartItemByUserId(int userId) {
        return cartRepository.findByUserId(userId);
    }

    @Override
    public CartItem addCartItem(CartItem cartItem) {
        return cartRepository.save(cartItem);
    }
     
    @Override
    public CartItem getCartItemById(int itemId) {
    	return cartRepository.findByItemId(itemId);
    }
    
    @Override
    public void updateCartItemQuantity(int userId, int productId, int quantity) {
        CartItem cartItem = cartRepository.findByUserIdAndProductId(userId, productId);
        if (cartItem != null) {
            cartItem.setQuantity(quantity);
            cartRepository.save(cartItem);
        } else {
            // Handle the case when the cart item does not exist
            // You can throw an exception or handle it according to your application's requirements
        }
    }

    @Override
    public void deleteByUserIdAndProductId(int userId, int productId) {
        CartItem cartItem = cartRepository.findByUserIdAndProductId(userId, productId);
        if (cartItem != null) {
            cartRepository.delete(cartItem);
        } else {
            // Handle the case when the cart item does not exist
            // You can throw an exception or handle it according to your application's requirements
        }
    }
}