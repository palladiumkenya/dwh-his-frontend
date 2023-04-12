import React, { Component, useState,useEffect } from "react";
import { Button, Form, FormGroup, Input, Label, Spinner , Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,} from "reactstrap";
import {BrowserRouter as Router,Route, Routes, IndexRoute, Link,
    Navigate,Switch} from 'react-router-dom';

import { IoMdLogOut } from "react-icons/io";
import userManager, { signinRedirectCallback, signinRedirect, signoutRedirect } from '../services/UserService';
import {GiHamburgerMenu } from 'react-icons/gi';


function Header(props) {
    // const [isNavExpanded, setIsNavExpanded] = useState(window.innerWidth <= 950 ? false : null);

    const [isOpen, setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);

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
        <Nav style={{backgroundColor:'#2f4050', color:'white'}}>
            <NavbarBrand href="/home">HIS Master List</NavbarBrand>
            <NavItem>
                <NavLink href="/facilities/partners">Partners</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="/facilities/reports">Reports</NavLink>
            </NavItem>
            { props.user ?
                <UncontrolledDropdown nav inNavbar className="testabove" style={{marginLeft:"auto"}}>
                    <DropdownToggle nav caret className="test" >
                        Welcome,  {props.user.profile.FullName }
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownMenu right>
                            <DropdownItem href="/facilities/submitted/approvals">Submitted Approvals</DropdownItem>
                            <DropdownItem href="/facilities/pending/approvals">Pending Approvals</DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem onClick={() =>{ logout_user()} }>Logout <IoMdLogOut /></DropdownItem>
                        </DropdownMenu>
                    </DropdownMenu>
                </UncontrolledDropdown>
                :
                <NavItem>
                    <NavLink onClick={() => signinRedirect()} style={{cursor:"pointer"}}>Login</NavLink>
                </NavItem>
            }
        </Nav>
  
    );

}

export default Header;
