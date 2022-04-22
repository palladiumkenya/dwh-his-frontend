import React, { Component, useState, useEffect  } from "react";
import { Table, Col, Container, Alert, Spinner } from "reactstrap";
import {FaInfoCircle } from 'react-icons/fa';
import FlashMessage from 'react-flash-message'

// import FacilitiesList from "./FacilitiesList";
import DeleteFacilityModal from "./DeleteFacilityModal";
import ExportToExcel from "./ExportToExcel";

//Bootstrap and jQuery libraries
// import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery'; 

import axios from "axios";

import { API_URL } from "../constants";

import userManager, { signinRedirectCallback, signoutRedirect } from '../services/UserService';




const Home = (props) =>{
            
      const [facilities, setFacilities] = useState([])
      const [filtereddata, setFilteredData] = useState([])
      const [showSpinner, setShowSpinner] = useState(false);
      const [orgId, setOrgId] = useState(null);    

      const [testdata, setData] = useState([])

      const isAuthenticated = sessionStorage.getItem("isAuthenticated");
      

      const  fileName = "HIS List";
      const fetchData = () =>{
          const OrganizationId = localStorage.getItem("OrganizationId") ? localStorage.getItem("OrganizationId") : null;
          axios.post(API_URL + '/data_for_excel', {"OrganizationId": OrganizationId}).then(r =>{
            setShowSpinner(false)  
             setData(r.data) 
          })
      }

      async function getFacilities() { 
          setShowSpinner(true)    

          await userManager.getUser().then((user) =>{         
            if (user){
              const orgId = user.profile.OrganizationId  ? user.profile.OrganizationId : null
              axios.post(API_URL, {"OrganizationId":orgId}).then(res => {
                  setFacilities(res.data);
                  setFilteredData(res.data);
                  
                   //initialize datatable        
                $('#facilities_list').DataTable({pageLength : 50});            
              });  
            }         
            else{
              axios.post(API_URL, {"OrganizationId": null}).then(res => {
                setFacilities(res.data);
                setFilteredData(res.data);
                setShowSpinner(false)     
                //initialize datatable        
                $('#facilities_list').DataTable({pageLength : 50});       
              });  
            }           
                
        });      
    }


    useEffect(() => {  
      getFacilities() ;  
      fetchData();  
      
      const nextUrl =localStorage.getItem("next");       
      if (nextUrl != null){
        window.location.href = nextUrl;
      }
      localStorage.removeItem("next")
    }, [])


  
    return (      
      <div style={{padding:"30px"}}> 
                        
            <div class="d-flex justify-content-end mb-3">
                <a href="/facilities/add_facility" class="btn btn-sm green_bg_color text-white" style={{width:"200px"}}>Add New Facility</a>
            </div>                
            
            <div class="d-flex justify-content-between">
                <h4>
                    Facilities Data 
                    { isAuthenticated && !showSpinner && <ExportToExcel apiData={testdata} fileName={fileName} />  }        
                    { isAuthenticated && showSpinner && <Spinner style={{width: "1.2rem", height: "1.2rem"}}></Spinner> }        
                </h4>                
            </div>

            <Table id="facilities_list">
                <thead>
                <tr>
                    <th>MFL Code</th>
                    <th>Name</th>
                    <th>County</th>
                    <th>Sub County</th>                    
                    <th>Owner</th>
                    <th>Service Delivery Partner</th>
                    <th>SDP Agency</th>                
                    {/* <th>EMR</th> */}
                    {/* <th>EMR Status</th> */}
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
                        {/* <td>{facility.emr_type}</td> */}
                        {/* <td>{facility.emr_status}</td>                         */}
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