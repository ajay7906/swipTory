import axios from 'axios'
import { showToast } from '../utils/showToast';


const backendUrl = 'https://swiptory-2.onrender.com/api/v1/post';

export const getAllPost = async (filter) => {
    
    try {
       
        const params = new URLSearchParams(Object.entries(filter || {}).filter(([, value]) => value !== undefined && value !== null && value !== ''));
        const reqUrl = `${backendUrl}/allpost?${params.toString()}`;
      
        const response = await axios.get(reqUrl, { headers: localStorage.getItem('token') ? { Authorization: localStorage.getItem('token') } : {} });
        return response?.data;

    } catch (error) {
       
        throw error
    }
};

export const getStatuses = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${backendUrl}/statuses`, { headers: token ? { Authorization: token } : {} });
    return response.data;
};

export const getArticleById = async (postId) => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${backendUrl}/article/${postId}`, { headers: token ? { Authorization: token } : {} });
    return response.data?.data;
};

export const getComments = async (storyId) => {
    const response = await axios.get(`${backendUrl}/${storyId}/comments`);
    return response.data;
};
export const addComment = async (storyId, text, parent) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${backendUrl}/${storyId}/comments`, { text, parent }, { headers: { Authorization: token } });
    return response.data;
};
export const reportStory = async (storyId, reason) => {
    const response = await axios.post(`${backendUrl}/${storyId}/report`, { reason }, { headers: { Authorization: localStorage.getItem('token') } });
    return response.data;
};
export const trackShare = async (storyId) => {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${backendUrl}/${storyId}/share`, {}, { headers: token ? { Authorization: token } : {} });
    return response.data;
};


export const createPost = async (storiesData, metadata = {}) => {
    try {
        const reqUrl = `${backendUrl}/createpost`;
        const token = localStorage.getItem("token");
        const postPayload = { stories: storiesData, ...metadata };
      
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.post(reqUrl, postPayload);
       
        return response?.data;


    } catch (error) {
        throw error



    }
}
export const getPostById = async (postId)=>{
   
    try {
        const reqUrl = `${backendUrl}/post-details/${postId}`;
     
        const token = localStorage.getItem('token');
        const response = await axios?.get(reqUrl, { headers: token ? { Authorization: token } : {} });
        return response?.data;

    } catch (error) {
        throw error
       
    }
}

export const getSharePostById = async (postId)=>{
   
    try {
        const reqUrl = `${backendUrl}/share/${postId}`;
     
        const token = localStorage.getItem('token');
        const response = await axios?.get(reqUrl, { headers: token ? { Authorization: token } : {} });
        return response?.data;

    } catch (error) {
        return error
       
    }
}

//update post by Id

export const updatePostById = async (postId, storiesData, metadata = {}) => {
    try {
        const reqUrl = `${backendUrl}/update-post/${postId}`;
        const token = localStorage.getItem("token");
        const postPayload = { stories: storiesData, ...metadata };
        axios.defaults.headers.common["Authorization"] = token;
        const response = await axios.put(reqUrl, postPayload);
      
        return response?.data;


    } catch (error) {
        throw error



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

