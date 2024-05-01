
import axios from 'axios'


export async function registerUser({ username, password }) {
  try {
    const response = await axios.post('https://swiptory-2.onrender.com/api/v1/user/register', {
      username,
      password
    });
    localStorage.setItem("token", response.data.token)
    return response.data; // return any response data if needed
  } catch (error) {

 
    return error?.response?.data?.errorMessage;
  }
}


//login 
export async function loginUser({ username, password }) {
  try {
    const response = await axios.post('https://swiptory-2.onrender.com/api/v1/user/login', {
      username,
      password
    });
    localStorage.setItem("token", response.data.token)
      return response.data; // return any response data if needed
  } catch (error) {
   
    return error.response.data.errorMessage;
  }
}