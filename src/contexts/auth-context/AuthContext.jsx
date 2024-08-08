import React, { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(() => {
    const token = localStorage.getItem("userToken");
    return token ? JSON.parse(token) : null;
  });

  const logan = (userWithToken) => {
    setUserToken(userWithToken);
    localStorage.setItem("userToken", JSON.stringify(userWithToken));
  };

  const logout = () => {
    setUserToken(null);
    localStorage.removeItem("userToken");
  };

  return (
    <AuthContext.Provider value={{ userToken, logan, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);