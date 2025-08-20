
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
    const expirationTime = Date.now() + 60 * 60 * 1000 * 60; // 60 hours from now

    localStorage.setItem("token", token);
    localStorage.setItem("tokenExpiration", expirationTime);

    // Set a timeout to remove the token after 60 hours
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiration");
    }, 60 * 60 * 1000 * 60);

    return response.data; // return any response data if needed
  } catch (error) {
    return error?.response?.data?.errorMessage;
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
    const expirationTime = Date.now() + 60 * 60 * 1000 * 60; // 10 seconds from now for testing

    localStorage.setItem("token", token);
    localStorage.setItem("tokenExpiration", expirationTime);

    // Set a timeout to remove the token after 10 seconds
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("tokenExpiration");
    }, 10000);

    return response.data; // return any response data if needed
  } catch (error) {
    return error.response.data.errorMessage;
  }
}
