import axios from "axios";

const userUrl='http://localhost:8090/api/users';

export const addUser=async(user)=>{
    try{
        return await axios.post(`${userUrl}/register`,user)
    }catch(error)
    {
        console.log('Error while calling adduser Api ',error.message);
        throw error;
    }

}

export const login = async(email,password)=>{
    const data = {
        email: email,
        password: password
      };
    try{
        const response= await axios.post(`${userUrl}/login`,data);
        return response;
    }
    catch(error){
        console.log('error while logging in',error.message)
    }
}
export const getUsers=async()=>{
    
    try{
        return await axios.get(`${userUrl}/users`);
    }catch(error){
        console.log('Error while calling getUsers api',error.message);
    }
}

export const getTotalAgents = async(role) =>{
    try{
        const response = await axios.get(`${userUrl}/role/${role}`);
        return response.data.length;
    }
    catch(error){
        console.log('error while calling getTotalAgents api',error.message);
    }
}


export const getUserByEmail = async(email) => {
    try{
        const response = await axios.get(`${userUrl}/email/${email}`);
        return response.data;
    }catch(error){
        console.log('error while finding user',error.message);
        throw error;
    }
}

export const getAllAgents = async(role) =>{
    try{
        const response = await axios.get(`${userUrl}/role/${role}`);
        return response.data;
    }
    catch(error){
        console.log('error while calling getTotalAgents api',error.message);
    }
}
 export const getUser=async(id)=>{
        id=id || '';
        try{
            return await axios.get(`${userUrl}/${id}`);
        }catch(error){
            console.log('Error while calling getUsers api',error.message);
        }
    }
export const getTotalUsers=async()=>{
    try{
        const response = await axios.get(`${userUrl}`);
        console.log(response);
    return response.data.length;
    }catch(error){
        console.log('Error while calling getUsers api',error.message);
    }
}
export const editUser = async (id, user) => {
    try {
      return await axios.put(`${userUrl}/${id}`, user, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
    } catch (error) {
      console.log("Error while calling update api", error.message);
      throw error; // Re-throw the error to handle it in the component
    }
  };

export const promoteAgent = async(id) =>{
    try{
        return await axios.put(`${userUrl}/agents/promote/${id}`);
    }catch(error){
        console.log("error while calling update api",error.message);

    }
}

export const deleteUser=async(id)=>{
    try{
        return await axios.delete(`${userUrl}/${id}`);
    }catch(error){
        console.log("error while calling delete api",error.message);

    }
}