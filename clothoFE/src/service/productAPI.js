import axios from "axios";

const productUrl='http://localhost:8090/api/products';

export const getTotalProducts = async() =>{
    try{
        const response = await axios.get(`${productUrl}`);
        return response.data.length;
    }
    catch(error){
        console.log('error while calling getTotalProducts api',error.message);
    }
}

export const getAllProducts = async () => {
    try {
        const response = await axios.get(`${productUrl}`); // Use Axios directly or with API instance
        return response.data;
    } catch (error) {
        console.error('Error fetching all products:', error.message);
        // Handle errors appropriately (e.g., display error message to user)
        throw error; // Re-throw for potential error handling in caller
    }
};
export const getAllListedProducts = async () => {
    try {
        const response = await axios.get(`${productUrl}/listed`);
        return response.data;
    } catch (error) {
        console.error('Error fetching listed products:', error.message);
        throw error;  // Re-throw for potential error handling in caller
    }
};
export const getProductById = async (id) => {
    try {
        const response = await axios.get(`${productUrl}/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product by ID:', error.message);
        throw error;
    }
};

export const getproductByListedby = async (listby) => {
    try{
        const response = await axios.get(`${productUrl}/listby/${listby}`);
        return response.data;
    }
    catch (error) {
        console.error('Error fetching product by lister name:', error.message);
        throw error;
    }
}

export const getTotalListByProducts = async (listby) =>{
    try{
        const response = await axios.get(`${productUrl}/listby/${listby}`);
        return response.data.length;
    }
    catch (error) {
        console.error('Error fetching product by lister name:', error.message);
        throw error;
    }
}


export const createProduct = async (formData) => {
    try {
        const response = await axios.post(`${productUrl}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error creating product:', error.message);
        throw error;
    }
}

// If discount calculation is handled on the server (assuming an endpoint):
export const calculateDiscount = async (data) => {
    try {
        const response = await axios.post(`${productUrl}/calcDiscount`, data);
        return response.data; // Assuming endpoint returns the calculated discount
    } catch (error) {
        console.error('Error calculating discount:', error.message);
        throw error;
    }
};
export const updateProduct = async (id, formData) => {
    try {
        const response = await axios.put(`${productUrl}/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error updating product:', error.message);
        throw error;
    }
};

export const unlistProduct = async (id) =>{
    try{
        return await axios.put(`${productUrl}/unlist/${id}`);
    }catch (error) {
        console.error('Error updating product:', error.message);
        throw error;
    }
};

export const enlistProduct = async (id) =>{
    try{
        return await axios.put(`${productUrl}/enlist/${id}`);
    }catch (error) {
        console.error('Error updating product:', error.message);
        throw error;
    }
}

export const deleteProduct = async (id) => {
    try {
        await axios.delete(`${productUrl}/${id}`); // No data to return on success
    } catch (error) {
        console.error('Error deleting product:', error.message);
        throw error;
    }
};