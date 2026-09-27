
import axios from 'axios'


// export async function registerUser({ username, password }) {
//   try {
//     const response = await axios.post('https://swiptory-2.onrender.com/api/v1/user/register', {
//       username,
//       password
//     });


//     localStorage.setItem("token", response.data.token)
//     return response.data; // return any response data if needed
//   } catch (error) {


//     return error?.response?.data?.errorMessage;
//   }
// }

export async function registerUser({ username, password, email }) {
  try {
    const response = await axios.post('https://swiptory-2.onrender.com/api/v1/user/register', {
      
      username,
      email,
      password
    });

    console.log('Response:', response);

    const token = response.data.token;
    if (token) {
      const expirationTime = Date.now() + 60 * 60 * 1000 * 60;
      localStorage.setItem("token", token);
      localStorage.setItem("tokenExpiration", String(expirationTime));
    }

    return response.data; // return any response data if needed
  } catch (error) {
    return error?.response?.data || { success: false, errorMessage: 'Unable to reach the server' };
  }
}



//login 
// export async function loginUser({ username, password }) {
//   try {
//     const response = await axios.post('https://swiptory-2.onrender.com/api/v1/user/login', {
//       username,
//       password
//     });
//     localStorage.setItem("token", response.data.token)
//     return response.data; // return any response data if needed
//   } catch (error) {

//     return error.response.data.errorMessage;
//   }
// }



export async function loginUser({ username, password }) {
  try {
    const response = await axios.post('https://swiptory-2.onrender.com/api/v1/user/login', {
      username,
      password
    });
    
    const token = response.data.token;
    const expirationTime = Date.now() + 60 * 60 * 1000 * 60;

    localStorage.setItem("token", token);
    localStorage.setItem("tokenExpiration", expirationTime);

    // Clear credentials after the same 60 hour lifetime as the server token.
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiration");
    }, 60 * 60 * 1000 * 60);

    return response.data; // return any response data if needed
  } catch (error) {
    return error?.response?.data || { success: false, errorMessage: 'Unable to reach the server' };
  }
}
