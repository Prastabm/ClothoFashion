package com.clotho.project.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.clotho.project.Service.CartService;
import com.clotho.project.entity.CartItem;
import com.clotho.project.repository.CartRepository;


@RestController
@CrossOrigin
@RequestMapping("api/cart")
public class CartController {

    @Autowired
    private CartService cartService;
    
    @Autowired
    private CartRepository repository;
    @GetMapping("/items")
    public List<CartItem> getAllCartItems() {
        return cartService.getAllCartItems();
    }

    @GetMapping("/items/{userId}")
    public List<CartItem> getCartItemByUserId(@PathVariable int userId) {
        return cartService.getCartItemByUserId(userId);
    }

    @PostMapping("/items")
    public CartItem addCartItem(@RequestBody CartItem cartItem) {
    	CartItem item = repository.findByUserIdAndProductId(cartItem.getUserId(),cartItem.getProductId());
    	if (item != null) {
    		item.setQuantity(item.getQuantity()+1);
    		return repository.save(item);
    	}
    	cartItem.setQuantity(1);
        return cartService.addCartItem(cartItem);
    }
    
    @PutMapping("/items/{itemId}")
    public CartItem updateCartItemQuantity( @PathVariable int itemId, @RequestParam("quantity") int quantity) {
        CartItem item=cartService.getCartItemById(itemId) ;
       if (item != null) {
    	   item.setQuantity(item.getQuantity()+ quantity);
    	   return repository.save(item);
    	   
       }
       else return item;
    }
    @DeleteMapping("/items/{userId}/{productId}")
    public void deleteCartItem(@PathVariable int userId, @PathVariable int productId) {
    	CartItem item = repository.findByUserIdAndProductId(userId,productId);
    	if (item != null) {
    		if (item.getQuantity() > 1) {
    			item.setQuantity(item.getQuantity()-1);
        	    repository.save(item);
    		}
    		else {
    			 cartService.deleteByUserIdAndProductId(userId, productId);
    		}
    		
    	}
       
    }
}