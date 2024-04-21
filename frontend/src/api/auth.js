
import axios from 'axios'
import { showToast } from '../utils/showToast';

export async function registerUser({username, password}) {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/register', {
        username,
        password
      });
      return response.data; // return any response data if needed
    } catch (error) {
      showToast(error.response.data.errorMessage, { type: 'error' });
    }
  }


  //login 
  export async function loginUser({username, password}) {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/login', {
        username,
        password
      });
      localStorage.setItem("token", response.data.token)
      return response.data; // return any response data if needed
    } catch (error) {
      showToast(error.response.data.errorMessage, { type: 'error' });
    }
  }