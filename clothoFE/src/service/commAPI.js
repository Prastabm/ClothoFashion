import axios from "axios";

const messageURL = "http://localhost:8090/api/contactus";

export const getAllUnrepliedMessages = async ()=>{
    try{
        const response = await axios.get(`${messageURL}/replied/false`);
        console.log(response.data)
        return response.data;
    }catch(error){
        console.log('error while calling getAllUnreadMessages api',error.message);
    }
}
export const getMessageById = async (id) =>{
    try{
        const response = await axios.get(`${messageURL}/${id}`);
        console.log(response.data)

        return response.data;
    }catch(error){
        console.log('error while calling getMessageById api',error.message);
    }
}

export const sendMessage = async (message) =>{
    try{
        const response = await axios.post(`${messageURL}/message`,message);
        console.log(response.data);

        return response.data;
    }catch(error){
        console.log('error while sending message',error.message);
    }
}

export const sendOTP = async (data) => {
    try {
      const response = await axios.post(`${messageURL}/send-otp`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('OTP API response:', response);
      return response.data;
    } catch (error) {
      console.error('Error while sending message:', error.message);
      throw new Error('Failed to send OTP'); // Ensure the error is thrown
    }
  };

export const getTotalMessages = async() =>{
    try{
        const response = await axios.get(`${messageURL}`);
        return response.data.length;
    }catch(error){
        console.log('error while calling getallmessages api',error.message);
        throw error;
    }
}
export const getAllRepliedMessages = async ()=>{
    try{
        const response = await axios.get(`${messageURL}/replied/true`);
        console.log(response.data)

        return response.data;
    }catch(error){
        console.log('error while calling getAllRepliedMessages api',error.message);
    }
}

export const getRepliedMessagesByLocation = async(location) =>{
    try{
        const response = await axios.get(`${messageURL}/location/${location.toUpperCase()}/replied/true`);
        console.log(response.data)

        return response.data;
    }catch(error){
        console.log('error while calling getAllRepliedMessagesByLocation api',error.message);
    }
}
export const getTotalMessagesByLoc = async(location) =>{
    try{
        const response = await axios.get(`${messageURL}/location/${location.toUpperCase()}/replied/true`);
        const response2 = await axios.get(`${messageURL}/location/${location.toUpperCase()}/replied/false`);
        const l1 = response.data.length;
        const l2 = response2.data.length;
        return l1+l2;
    }catch(error){
        console.log('error while calling getAllMessagesByLocation api',error.message);
    }
}
export const getUnrepliedMessagesByLocation = async(location) =>{
    try{
        const response = await axios.get(`${messageURL}/location/${location.toUpperCase()}/replied/false`);
        console.log(response.data)

        return response.data;
    }catch(error){
        console.log('error while calling getAllUnrepliedMessagesByLocation api',error.message);
    }
}

export const sendReply = async(id, data) =>{
    try{
        return await axios.post(`${messageURL}/send-reply/${id}`,data,{
            headers: {
                'Content-Type': 'application/json'
            }});
    }catch(error){
        console.log('error while sending reply',error.message);
    }
}

export const deleteMessage = async(id) => {
    try{
        return await axios.delete(`${messageURL}/delete/${id}`);
    }catch(error){
        console.log('error deleteing the message');
        throw error;
    }
}