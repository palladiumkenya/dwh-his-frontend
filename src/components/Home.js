import React, { Component, useState, useEffect  } from "react";
import { Col, Container, Alert, Spinner } from "reactstrap";
import {FaInfoCircle } from 'react-icons/fa';
import FlashMessage from 'react-flash-message'

import FacilitiesList from "./FacilitiesList";
import DeleteFacilityModal from "./DeleteFacilityModal";

import axios from "axios";

import { API_URL } from "../constants";





const Home = (props) =>{

  const [facilities, setFacilities] = useState([])
  const [showSpinner, setShowSpinner] = useState(false);
  const messages = localStorage.getItem("messages");
  console.log(messages)
  
  const getFacilities = () => {   
    setShowSpinner(true)   
    const OrganizationId = localStorage.getItem("OrganizationId") ? localStorage.getItem("OrganizationId") : null;
    axios.post(API_URL, {"OrganizationId": OrganizationId}).then(res => {
      setFacilities(res.data);
      setShowSpinner(false)
    });
    
  };


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