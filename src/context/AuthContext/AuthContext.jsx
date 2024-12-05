import { jwtDecode } from 'jwt-decode';
import { createContext, useEffect, useState } from 'react';

// import React from 'react'
export const AuthContext = createContext(null);

export default function AuthContextProvider(props) {
  const [loginData, setLoginData] = useState(null);
  let saveLoginData = () => {
    let encodeToken = localStorage.getItem('token');
    let decodeToken = jwtDecode(encodeToken);
    setLoginData(decodeToken);
  };
  useEffect(() => {
    if (localStorage.getItem('token')) {
      saveLoginData();
      // console.log(loginData);
    }
  }, []);
  return (
    <AuthContext.Provider value={{ loginData, saveLoginData }}>
      {props.children}
    </AuthContext.Provider>
  );
}
