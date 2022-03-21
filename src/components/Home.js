import React, { Component, useState, useEffect  } from "react";
import { Col, Container, Alert } from "reactstrap";
import {FaInfoCircle } from 'react-icons/fa';

import FacilitiesList from "./FacilitiesList";
import DeleteFacilityModal from "./DeleteFacilityModal";

import axios from "axios";

import { API_URL } from "../constants";





const Home = (props) =>{

  const [facilities, setFacilities] = useState([])
  const messages = localStorage.getItem("messages");
  console.log(messages)
  
  const getFacilities = () => {    
    const OrganizationId = localStorage.getItem("OrganizationId") ? localStorage.getItem("OrganizationId") : null;
    axios.post(API_URL, {"OrganizationId": OrganizationId}).then(res => setFacilities(res.data));
    
  };


  useEffect(() => {   
    getFacilities()    
    
  }, [])


  
    return (      
      <div style={{padding:"30px",backgroundColor:'#f4f6fa'}}>
            { messages != "" && 
                <Alert color="success">
                  <FaInfoCircle />
                  { messages }
                </Alert>  
            }
          <FacilitiesList
              facilities={facilities}
              resetState={setFacilities}
            />        
      </div>
    );
  
}

export default Home;