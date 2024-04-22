import axios from 'axios'
import { showToast } from '../utils/showToast';

const backendUrl = 'http://localhost:3000/api/v1/post';

export const getAllPost = async (filter) => {
    try {
        const reqUrl = `${backendUrl}/allpost?category=${filter?.category || ""}`;
        // Construct the request URL without the skills query parameter
        const response = await axios.get(reqUrl);
        return response.data;

    } catch (error) {
        console.log(error);
        // toast something went wrong please try after sometime
    }
};


export const createPost = async (storiesData) => {
    try {
        const reqUrl = `${backendUrl}/createpost`;
        const token = localStorage.getItem("token");
        const postPayload = { stories: storiesData };
        console.log(postPayload);
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.post(reqUrl, postPayload);
        console.log(response.data);
        return response.data;


    } catch (error) {
        showToast(error.response.data.errorMessage, { type: 'error' });



    }
}


// import React, { createContext, useContext, useEffect, useState } from 'react';
// import axios from 'axios';

// const ApiContext = createContext();

// export const useApi = () => useContext(ApiContext);

// const backendUrl = 'http://localhost:3000/api/v1/post';

// export const ApiProvider = ({ children }) => {
//   const [postData, setPostData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const getAllPost = async (filter) => {
//     try {
//       const reqUrl = `${backendUrl}/allpost?category=${filter?.category || ""}`;
//       const response = await axios.get(reqUrl);
//       setPostData(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//     }
//   };

//   useEffect(() => {
   

//     getAllPost();

//   }, []);

//   return (
//     <ApiContext.Provider value={{ postData, loading, getAllPost }}>
//       {children}
//     </ApiContext.Provider>
//   );
// };
