import React, { Component, useState,useEffect } from "react";
import { Button, Form, FormGroup, Input, Label, Spinner } from "reactstrap";
import {BrowserRouter as Router,Route, Routes, IndexRoute, Link,
    Navigate,Switch} from 'react-router-dom';
import { IoMdLogOut } from "react-icons/io";
import userManager, { signinRedirectCallback, signinRedirect, signoutRedirect } from '../services/UserService';



function Footer(props) {
   
   



    return (
        <footer class="shadow" style={{backgroundColor:'RED',position: "fixed",
        bottom: 0, width:"100%", color:"white", fontSize:"30px"}}>
            TEST SITE: for testing purposes only...
        
        </footer>
  
    );

}

export default Footer;
