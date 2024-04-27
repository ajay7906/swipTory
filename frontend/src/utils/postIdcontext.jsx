// PostIdContext.jsx
import React, { createContext, useContext, useState } from 'react';

const PostIdContext = createContext();

export const PostIdProvider = ({ children }) => {
  const [postId, setPostId] = useState(null);

  const value = {
    postId,
    setPostId,
  };

  return <PostIdContext.Provider value={value}>{children}</PostIdContext.Provider>;
};

export const usePostId = () => useContext(PostIdContext);