import React from "react";
import { Route } from "react-router-dom";
import userManager, { signinRedirectCallback, signinRedirect, signoutRedirect } from '../services/UserService';
import { Navigate, Outlet } from 'react-router-dom';


const ProtectedRoute = () => {
  const isAuthenticated = sessionStorage.getItem("isAuthenticated");
  console.log("this", isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
}

export default ProtectedRoute;