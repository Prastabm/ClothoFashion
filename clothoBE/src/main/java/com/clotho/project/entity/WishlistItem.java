package com.clotho.project.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class WishlistItem {
    
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    private int itemId;
	
    public int getItemId() {
		return itemId;
	}

	public void setItemId(int itemId) {
		this.itemId = itemId;
	}

	private int userId;
    private int productId;

   

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

	@Override
	public String toString() {
		return "WishlistItem [userId=" + userId + ", productId=" + productId + "]";
	}
}
