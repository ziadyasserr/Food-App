// import React from 'react'

import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../../../context/AuthContext/AuthContext';

export default function ProtectedRoute({ children }) {
  const { loginData } = useContext(AuthContext);
  if (localStorage.getItem('token') || loginData) return children;
  else return <Navigate to="/login" />;
}
