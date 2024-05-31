import axios from 'axios';

const BASE_URL = 'http://localhost:8090/api/cart'; // Update with your actual backend URL

const cartAPI = {
  getAllCartItems: async () => {
    try {
      const response = await axios.get(`${BASE_URL}/items`);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching cart items: ' + error.message);
    }
  },

  getCartItemByUserId: async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}/items/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching cart item: ' + error.message);
    }
  },

  addCartItem: async (cartItem) => {
    try {
      const response = await axios.post(`${BASE_URL}/items`, cartItem);
      return response.data;
    } catch (error) {
      throw new Error('Error adding cart item: ' + error.message);
    }
  },

  updateCartItemQuantity: async (itemId, quantity) => {
    try {
      const response = await axios.put(`${BASE_URL}/items/${itemId}?quantity=${quantity}`);
      return response.data;
    } catch (error) {
      throw new Error('Error updating cart item quantity: ' + error.message);
    }
  },

  deleteCartItem: async (userId, productId) => {
    try {
      await axios.delete(`${BASE_URL}/items/${userId}/${productId}`);
    } catch (error) {
      throw new Error('Error deleting cart item: ' + error.message);
    }
  },
};

export default cartAPI;
