import axios from "axios";

const wishlistUrl='http://localhost:8090/api/wishlist';

export const getWishlistItemByUserId = async (userId) => {
    try {
        const response = await axios.get(`${wishlistUrl}/items/${userId}`);
        console.log(response)
        return response.data;
    } catch (error) {
        console.error('Error fetching wishlist item:', error.message);
        throw error;
    }
};

export const addWishlistItem = async (userId, productId) => {
    const wishlistItem = {
        userId: userId,
        productId: productId
    };

    try {
        // Check if the item already exists in the wishlist
        const check = await axios.get(`${wishlistUrl}/items/find/${userId}/${productId}`);
        console.log('Check response:', check.data); // Log the response from the check
        
        if (check.data == []) {
            // If item doesn't exist, add it to the wishlist
            const response = await axios.post(`${wishlistUrl}/addItem`, wishlistItem);
            console.log('Response from adding item:', response.data); // Log the response from adding the item
            return response;
        } else {
            console.error('Product already exists');
        }
    } catch (error) {
        console.error('Error adding wishlist item:', error.message);
        throw error;
    }
};

export const deleteWishlistItem = async (userId, productId) => {
    try {
        await axios.delete(`${wishlistUrl}/items/${userId}/${productId}`);
    } catch (error) {
        console.error('Error deleting wishlist item:', error.message);
        throw error;
    }
};