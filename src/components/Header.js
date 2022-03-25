import React, { Component, useState,useEffect } from "react";
import { Button, Form, FormGroup, Input, Label, Spinner } from "reactstrap";
import {BrowserRouter as Router,Route, Routes, IndexRoute, Link,
    Navigate,Switch} from 'react-router-dom';
import { IoMdLogOut } from "react-icons/io";
import userManager, { signinRedirectCallback, signinRedirect, signoutRedirect } from '../services/UserService';



function Header(props) {
   
    const logout_user = async () => {     
      localStorage.clear()       
      await signoutRedirect();      
   };

   const login_user = async () => {            
    await signinRedirect();      
 };  


    return (
        <header class="shadow" style={{backgroundColor:'#2f4050'}}>
        
        <nav class="navbar navbar-expand-lg p-0" style={{backgroundColor:"#2f4050"}}>
          <div class="container-fluid p-0">
  
            <div class="collapse navbar-collapse" id="navbarExample01">
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item active green_bg_color px-4 py-1" style={{backgroundColor:"#0e2031"}}>
                  <a class="nav-link text-white" aria-current="page" href="/home">HIS Master List</a>
                </li>
                <li class="nav-item px-2 py-1">
                  <a class="nav-link text-white" href="/facilities/partners">Partners</a>
                </li>
                <li class="nav-item px-2 py-1">
                  <a class="nav-link text-white" href="/facilities/reports">Reports</a>
                </li>
              </ul>
              { props.user ?                 
                <div class="d-flex justify-content-around px-3 py-1" style={{width:"230px"}}>
                    <p class="text-white mr-5" style={{margin: "auto"}}>Welcome, {props.user.profile.FullName }</p>
                    <p onClick={() =>{ logout_user()} } class="text-white" style={{margin: "auto", cursor: "pointer"}}>Logout <IoMdLogOut /></p>
                </div>
                  : 
                <a onClick={() => login_user()} class="btn green_bg_color text-white pl-3">Login</a>  
              }                             
  
            </div>
          </div>
        </nav>
      
      </header>
  
    );

}

export default Header;