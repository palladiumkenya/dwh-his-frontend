import React from "react";
import { useSearchParams } from "react-router-dom";
import { Route } from "react-router-dom";
import userManager, { signinRedirectCallback, signinRedirect, signoutRedirect } from '../services/UserService';
import { Navigate, Outlet } from 'react-router-dom';


const ProtectedRoute = () => {
  const [searchParams] = useSearchParams();
  if (searchParams.get("next") != null){
    //window.location.href = BASE_URL + searchParams.get("next");
    localStorage.setItem("next", searchParams.get("next"));           
  }
  const isAuthenticated = sessionStorage.getItem("isAuthenticated");
  
  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" />;
}

export default ProtectedRoute;