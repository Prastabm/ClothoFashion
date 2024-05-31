package com.clotho.project.Service;

import java.util.List;

import com.clotho.project.entity.WishlistItem;

public interface WishlistService {

    List<WishlistItem> getAllWishlistItems();

    List<WishlistItem> getWishlistItemByUserId(int userId);

    WishlistItem addWishlistItem(WishlistItem wishlistItem);

    void deleteByUserIdAndProductId(int userId, int productId);
	//void deleteByUserIdAndProductId(int userId, int productId);
}
