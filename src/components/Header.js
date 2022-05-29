import React, { Component, useState,useEffect } from "react";
import { Button, Form, FormGroup, Input, Label, Spinner } from "reactstrap";
import {BrowserRouter as Router,Route, Routes, IndexRoute, Link,
    Navigate,Switch} from 'react-router-dom';
import { IoMdLogOut } from "react-icons/io";
import userManager, { signinRedirectCallback, signinRedirect, signoutRedirect } from '../services/UserService';
import {GiHamburgerMenu } from 'react-icons/gi';


function Header(props) {
    const [isNavExpanded, setIsNavExpanded] = useState(window.innerWidth <= 500 ? false : null);

    const logout_user = async () => {     
      sessionStorage.removeItem('isAuthenticated');      
      await signoutRedirect();      
   };

   const login_user = async () => {            
    await signinRedirect();      
 };

    // useEffect(() => {
    //     console.log("window.innerWidth",window.innerWidth)
    //     if (window.innerWidth < 500){
    //         setIsNavExpanded(false)
    //     }
    // })


    return (
        <header className="shadow" style={{backgroundColor:'#2f4050'}}>
        
        <nav className="navbar navbar-expand-lg p-0" style={{backgroundColor:"#2f4050"}}>
          <div className="container-fluid p-0">
  
            <div className=" navbar-collapse" id="navbarExample01">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item active green_bg_color px-4 py-1 d-flex justify-content-between align-items-center" style={{backgroundColor:"#0e2031"}}>
                  <a className="nav-link text-white" aria-current="page" href="/home">HIS Master List</a>
                    <GiHamburgerMenu id="nav_menu_dropdown" style={{color:"white", display:"none"}} onClick={() => {
                        setIsNavExpanded(!isNavExpanded)
                    }}
                    />
                </li>
                <li className={isNavExpanded === false ? "nav-item menu_item px-2 py-1 hide_menu_link" :  "nav-item px-2 py-1 menu_item show_menu_link" }>
                  <a className="nav-link text-white" href="/facilities/partners">Partners</a>
                </li>
                <li className={isNavExpanded === false ? "nav-item menu_item px-2 py-1 hide_menu_link" : "nav-item px-2 py-1 menu_item show_menu_link" }>
                  <a className="nav-link text-white" href="/facilities/reports">Reports</a>
                </li>
              </ul>

              { props.user ?                 
                <div className={isNavExpanded === false ? "menu_item d-flex justify-content-around px-3 py-1 hide_menu_link" : "menu_item d-flex justify-content-around px-3 py-1 show_menu_link" } style={{width:"230px"}}>
                    <p className="text-white mr-5" style={{margin: "auto"}}>Welcome, {props.user.profile.FullName }</p>
                    <p onClick={() =>{ logout_user()} } className="text-white" style={{margin: "auto", cursor: "pointer"}}>Logout <IoMdLogOut /></p>
                </div>
                  : 
                <a onClick={() => login_user()} className={isNavExpanded === false ? "menu_item btn green_bg_color text-white  pl-3 hide_menu_link" : "menu_item btn green_bg_color text-white  pl-3 show_menu_link" }>Login</a>
              }



            </div>
          </div>
        </nav>
      
      </header>
  
    );

}

export default Header;
