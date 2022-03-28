import React, { Component, useState, useEffect  } from "react";
import { Table, Col, Container, Alert, Spinner } from "reactstrap";
import {FaInfoCircle } from 'react-icons/fa';
import FlashMessage from 'react-flash-message'

// import FacilitiesList from "./FacilitiesList";
import DeleteFacilityModal from "./DeleteFacilityModal";
import ExportToExcel from "./ExportToExcel";

import axios from "axios";

import { API_URL } from "../constants";

import userManager, { signinRedirectCallback, signoutRedirect } from '../services/UserService';




const Home = (props) =>{

      const [facilities, setFacilities] = useState([])
      const [filtereddata, setFilteredData] = useState([])
      const [showSpinner, setShowSpinner] = useState(false);
      const [orgId, setOrgId] = useState(null);    

      const [testdata, setData] = useState([])

      const isAuthenticated = localStorage.getItem("isAuthenticated");
      

      const  fileName = "HIS List";
      const fetchData = () =>{
          const OrganizationId = localStorage.getItem("OrganizationId") ? localStorage.getItem("OrganizationId") : null;
          axios.post(API_URL + '/data_for_excel', {"OrganizationId": OrganizationId}).then(r => setData(r.data) )
      }


      const handleSearchFilter = (e) => {
          const value = e.target.value;        
          
          //item.mfl_code.includes(value)
          const searcheddata = facilities.filter(item => (item.name).toLowerCase().includes(value.toLowerCase()) );  
          console.log(searcheddata)
          if (searcheddata.length > 0){
              setFilteredData(searcheddata)
          }else{
              setFilteredData(facilities)
          }
      };

      async function getFacilities() { 
          setShowSpinner(true)    

          await userManager.getUser().then((user) =>{         
            if (user){
              //setOrgId(user.profile.OrganizationId);
              axios.post(API_URL, {"OrganizationId": user.profile.OrganizationId}).then(res => {
                  setFacilities(res.data);
                  setFilteredData(res.data);
                  setShowSpinner(false)            
              });  
            }         
            else{
              axios.post(API_URL, {"OrganizationId": null}).then(res => {
                setFacilities(res.data);
                setFilteredData(res.data);
                setShowSpinner(false)            
              });  
            }           
                
        });      
    }


    useEffect(() => {  
      getFacilities()   
      fetchData()    
    }, [])


  
    return (      
      <div style={{padding:"30px"}}> 
                        
            <div class="d-flex justify-content-end mb-3">
                <a href="/facilities/add_facility" class="btn btn-sm green_bg_color text-white" style={{width:"200px"}}>Add New Facility</a>
            </div>                
            
            <div class="d-flex justify-content-between">
                <h4>
                    Facilities Data 
                    { isAuthenticated && <ExportToExcel apiData={testdata} fileName={fileName} />  }                
                </h4>
                <input type="search" placeholder="Search facility name...." class="form-control" style={{width:"250px"}}
                    onChange={(e) => handleSearchFilter(e)} />
            </div>

            <Table >
                <thead>
                <tr>
                    <th>MFL Code</th>
                    <th>Name</th>
                    <th>County</th>
                    <th>Sub County</th>                    
                    <th>Owner</th>
                    <th>Service Delivery Partner</th>
                    <th>SDP Agency</th>                
                    <th>EMR</th>
                    <th>EMR Status</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {!filtereddata || filtereddata.length <= 0 ? (
                    <tr>                           
                        <td colSpan="12" align="center">
                            {showSpinner ? <Spinner style={{width: "1.2rem", height: "1.2rem"}}></Spinner> : 
                                <b>No facilities found</b>
                            }
                        </td>                       
                    </tr>
                ) : (
                  filtereddata.map(facility => (
                    <tr key={facility.pk}>
                        <td>{facility.mfl_code}</td>
                        <td>{facility.name}</td>
                        <td>{facility.county}</td>
                        <td>{facility.sub_county}</td>
                        <td>{facility.owner}</td>
                        <td>{facility.partner}</td>
                        <td>{facility.agency}</td>
                        <td>{facility.emr_type}</td>
                        <td>{facility.emr_status}</td>                        
                        <td align="center">
                        <DeleteFacilityModal
                            create={false}
                            facility={facility}
                            resetState={setFacilities}
                        />
                        &nbsp;&nbsp;
                        {/* <ConfirmRemovalModal
                            pk={facility.pk}
                            resetState={this.props.resetState}
                        /> */}
                        </td>
                    </tr>
                    ))
                )}
                </tbody>
            </Table>
          
      </div>
    );
  
}

export default Home;