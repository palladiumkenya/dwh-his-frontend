import React, { Component, useState, useEffect  } from "react";
import { Col, Container, Alert, Spinner } from "reactstrap";
import {FaInfoCircle } from 'react-icons/fa';
import FlashMessage from 'react-flash-message'

import FacilitiesList from "./FacilitiesList";
import DeleteFacilityModal from "./DeleteFacilityModal";

import axios from "axios";

import { API_URL } from "../constants";

import userManager, { signinRedirectCallback, signoutRedirect } from '../services/UserService';




const Home = (props) =>{

  const [facilities, setFacilities] = useState([])
  const [showSpinner, setShowSpinner] = useState(false);
  const [orgId, setOrgId] = useState(null);
  const messages = localStorage.getItem("messages"); 
  

  async function getFacilities() { 
      setShowSpinner(true)    

      await userManager.getUser().then((user) =>{         
          if (user){
            //setOrgId(user.profile.OrganizationId);
            axios.post(API_URL, {"OrganizationId": user.profile.OrganizationId}).then(res => {
                setFacilities(res.data);
                setShowSpinner(false)            
            });  
          }         
          else{
            axios.post(API_URL, {"OrganizationId": null}).then(res => {
              setFacilities(res.data);
              setShowSpinner(false)            
            });  
          }
           
          // axios.post(API_URL, {"OrganizationId": orgId}).then(res => {
          //     setFacilities(res.data);
          //     setShowSpinner(false)            
          // });        
      });      
  }

  // const getFacilities = () => {   
  //   setShowSpinner(true)   
  //   const OrganizationId = localStorage.getItem("OrganizationId") ? localStorage.getItem("OrganizationId") : null;
  //   axios.post(API_URL, {"OrganizationId": OrganizationId}).then(res => {
  //     setFacilities(res.data);
  //     setShowSpinner(false)
  //   });
    
  // };


  useEffect(() => {  
    getFacilities()       
  }, [])


  
    return (      
      <div style={{padding:"30px"}}> 
                        
              <FacilitiesList
                  facilities={facilities}
                  resetState={setFacilities}
                  showSpinner={showSpinner}
                />    
          
      </div>
    );
  
}

export default Home;