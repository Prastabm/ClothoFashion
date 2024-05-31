package com.clotho.project.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.clotho.project.entity.WishlistItem;
import com.clotho.project.repository.WishlistRepository;
//import com.clotho.project.Service.WishlistService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class WishlistServiceImpl implements WishlistService {

    @Autowired
    private WishlistRepository wishlistRepository;
    
    

    @Override
    public List<WishlistItem> getAllWishlistItems() {
        return wishlistRepository.findAll();
    }

    @Override
    public List<WishlistItem> getWishlistItemByUserId(int userId) {
        return wishlistRepository.findByUserId(userId);
    }

    @Override
    public WishlistItem addWishlistItem(WishlistItem wishlistItem) {
        return wishlistRepository.save(wishlistItem);
    }
    
    @Override
    public void deleteByUserIdAndProductId(int userId, int productId) {
    	WishlistItem wishlistItem = wishlistRepository.findByUserIdAndProductId(userId, productId);
    	if (wishlistItem != null) wishlistRepository.delete(wishlistItem);
    	
    	else throw new EntityNotFoundException("Wishlist item with user ID " + userId + " and product ID " + productId + " not found.");
    }
  
//    
}
    


