import axios from 'axios';

const BASE_URL = 'http://localhost:8090/api/orders';

export const createOrder = async (order) => {
  try {
    const response = await axios.post(`${BASE_URL}`, order, {
      headers: {
          'Content-Type': 'application/json'
      }});
    return response.data;
  } catch (error) {
    throw new Error('Error creating order: ' + error.message);
  }
};

export const getTotalOrders = async()=>{
    try{
        const response = await axios.get(`${BASE_URL}`);
        return response.data.length;
    } catch (error) {
        throw new Error('Error fetching orders: ' + error.message);
      }
}

export const getOrdersByUserId = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching orders: ' + error.message);
  }
};

export const deleteOrder = async (id) => {
  try {
    await axios.put(`${BASE_URL}/cancel/${id}`);
  } catch (error) {
    throw new Error('Error deleting order: ' + error.message);
  }
};
