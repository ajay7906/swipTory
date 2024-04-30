import { jwtDecode } from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIns, setIsLoggedIns] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [username, setUsername] = useState(null);
  const loggedInUser = localStorage.getItem('token');
  const [showYourStory, setShowYourStory] = useState(false);
  useEffect(() => {
 
    if (loggedInUser) {
        const decodedToken = jwtDecode(loggedInUser);
       setUsername(decodedToken);
    }

}, []);
  
  useEffect(() => {
   
    
    if (loggedInUser) {
      setIsLoggedIns(true);
      setShowYourStory(true);
    }
    else{
      setIsLoggedIns(false)
      setShowYourStory(false);
    }
     // Update isLoggedIn based on whether token exists
  }, [isLoggedIns,  loggedInUser , username ,showYourStory]);


  const setUser = (user) => {
    setUsername(user);
  };

  const handleLogin = () => {
   
    setIsLoggedIns(true);
    setShowLoginModal(false);
   
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIns(false);
    setUsername(null);
  };

  const openLoginModal = () => {
    setShowLoginModal(true);
  };

  const closeLoginModal = () => {
    setShowLoginModal(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIns,
        showLoginModal,
        handleLogin,
        logout,
        openLoginModal,
        closeLoginModal,
        username,
         setUser, showYourStory
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};