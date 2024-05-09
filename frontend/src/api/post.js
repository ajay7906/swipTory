import axios from 'axios'
import { showToast } from '../utils/showToast';


const backendUrl = 'https://swiptory-2.onrender.com/api/v1/post';

export const getAllPost = async (filter) => {
    
    try {
       
        const reqUrl = `${backendUrl}/allpost?category=${filter.category || ""}`;
      
        const response = await axios.get(reqUrl);
        return response?.data;

    } catch (error) {
       
        return error
    }
};


export const createPost = async (storiesData) => {
    try {
        const reqUrl = `${backendUrl}/createpost`;
        const token = localStorage.getItem("token");
        const postPayload = { stories: storiesData };
      
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.post(reqUrl, postPayload);
       
        return response?.data;


    } catch (error) {
        return error



    }
}
export const getPostById = async (postId)=>{
   
    try {
        const reqUrl = `${backendUrl}/post-details/${postId}`;
     
        const response = await axios?.get(reqUrl);
        return response?.data;

    } catch (error) {
        return error
       
    }
}

export const getSharePostById = async (postId)=>{
   
    try {
        const reqUrl = `${backendUrl}/share/${postId}`;
     
        const response = await axios?.get(reqUrl);
        return response?.data;

    } catch (error) {
        return error
       
    }
}

//update post by Id

export const updatePostById = async (postId, storiesData) => {
    try {
        const reqUrl = `${backendUrl}/update-post/${postId}`;
        const token = localStorage.getItem("token");
        const postPayload = { stories: storiesData };
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.put(reqUrl, postPayload);
      
        return response?.data;


    } catch (error) {
        return error



    }
}


//like post api


export const likePost = async (postId) => {
    try {
        const reqUrl = `${backendUrl}/post-details/${postId}/like`;
        const token = localStorage.getItem("token");
        
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.put(reqUrl);
       
        return response?.data;


    } catch (error) {
        return error



    }
}
//unlike post api

export const unlikePost = async (postId) => {
    try {
        const reqUrl = `${backendUrl}/post-details/${postId}/unlike`;
        const token = localStorage.getItem("token");
        
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.put(reqUrl);
        
        return response?.data;


    } catch (error) {
        return error



    }
}

//track like count

export const tracklikeCountkPost = async (postId) => {
    try {
        const reqUrl = `${backendUrl}/post-details/${postId}/getlikecount`;
        const token = localStorage.getItem("token");
        
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.get(reqUrl);
       
        return response?.data;


    } catch (error) {
        return error



    }
}



//api calling for book  the all  stories

export const bookMarkPost = async (postId) => {
    try {
        const reqUrl = `${backendUrl}/post-details/${postId}/bookmark`;
        const token = localStorage.getItem("token");
        
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.put(reqUrl);
        
        return response?.data;


    } catch (error) {
        return error



    }
}


//api calling for book  the all  stories

export const unbookMarkPost = async (postId) => {
    try {
        const reqUrl = `${backendUrl}/post-details/${postId}/unbookmark`;
        const token = localStorage.getItem("token");
        
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.put(reqUrl);
        
        return response?.data;


    } catch (error) {
        return error



    }
}

//track bookmark

export const trackbookMarkPost = async (postId) => {
    try {
        const reqUrl = `${backendUrl}/post-details/${postId}/bookMarkTrack`;
        const token = localStorage.getItem("token");
        
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.get(reqUrl);
   
        return response?.data;


    } catch (error) {
        return error


    }
}

//track  user isLike

export const trackIsLikePost = async (postId) => {
    try {
        const reqUrl = `${backendUrl}/post-details/${postId}/islikepost`;
        const token = localStorage.getItem("token");
        
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.get(reqUrl);
        
        return response?.data;


    } catch (error) {
        return error


    }
}

//get all post of useer


export const getAllUserPost = async () => {
    try {
        const reqUrl = `${backendUrl}/mypost`;
        const token = localStorage.getItem("token");
        
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.get(reqUrl);
        
        return response?.data;


    } catch (error) {
        return error


    }
}


//get bookmarked post
export const getBookmarkedPosts = async () => {
    try {
        const reqUrl = `${backendUrl}/bookmarkspost`;
        const token = localStorage.getItem("token");
        
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.get(reqUrl);
        
        return response?.data;


    } catch (error) {
        return error



    }
}

