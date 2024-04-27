import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIns, setIsLoggedIns] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLogin = () => {
    // Perform login logic here
    console.log(isLoggedIns);
    setIsLoggedIns(true);
    setShowLoginModal(false);
   
  };

  const handleLogout = () => {
    setIsLoggedIns(false);
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
        handleLogout,
        openLoginModal,
        closeLoginModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};