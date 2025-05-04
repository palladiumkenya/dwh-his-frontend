import React, { Component, useState, useEffect  } from "react";
import { Table, Col, Container, Alert, Spinner } from "reactstrap";
import {FaFileUpload } from 'react-icons/fa';
import {SiMicrosoftexcel} from 'react-icons/si';

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

import {API_URL, BASE_URL} from "../constants";

import userManager, { signinRedirectCallback, signoutRedirect } from '../services/UserService';




const Home = (props) =>{
            
      const [facilities, setFacilities] = useState([])
      const [filtereddata, setFilteredData] = useState([])
      const [showSpinner, setShowSpinner] = useState(false);
      const [showDownloadSpinner, setShowDownloadSpinner] = useState(true);
      const [showUploadExcelSpinner, setShowUploadExcelSpinner] = useState(false);

      const [orgId, setOrgId] = useState(null);
      const [fetchError, setFetchError] = useState(null);
      const [fileUpload, setFileUpload] = useState()

      const [exceldata, setData] = useState([])
      const [userEmailAllowed, setuserEmailAllowed] = useState(false)


    const isAuthenticated = sessionStorage.getItem("isAuthenticated");
      

      const  fileName = "HIS List";
      const fetchData = () =>{
          let OrganizationId = localStorage.getItem("OrganizationId") ? localStorage.getItem("OrganizationId") : null;
          if (OrganizationId !== null && OrganizationId.includes(",")) {
             OrganizationId = (OrganizationId).split(",");            
          }     
          axios.post(API_URL + '/data_for_excel', {"OrganizationId": OrganizationId}).then(r =>{
            setShowDownloadSpinner(false)  
             setData(r.data) 
          })
      }

      async function getFacilities() { 
          setShowSpinner(true)    

          await userManager.getUser().then((user) =>{         
            if (user){

                if (["mary.kilewe@thepalladiumgroup.com"].includes(user.profile.email.toLowerCase())){
                    setuserEmailAllowed(true)
                }

              const orgId = user.profile.OrganizationId  ? user.profile.OrganizationId : null
              axios.post(`${API_URL}/facilities`, {"OrganizationId":orgId}).then(res => {
                  setFacilities(res.data);
                  setFilteredData(res.data);
                  
                   //initialize datatable        
                $('#facilities_list').DataTable({pageLength : 50});
              }).catch(function (error){
                  setFacilities([]);
                  setFilteredData([]);
                  setShowSpinner(false);
                  setFetchError(' ----- Reason: '+error.message+' -----');
              });
            }         
            else{
              axios.post(`${API_URL}/facilities`, {"OrganizationId": null}).then(res => {
                setFacilities(res.data);
                setFilteredData(res.data);
                setShowSpinner(false)     
                //initialize datatable        
                $('#facilities_list').DataTable({pageLength : 50, scrollX: true});
              }).catch(function (error){
                  setFacilities([]);
                  setFilteredData([]);
                  setShowSpinner(false);
                  setFetchError(' ----- Reason: '+error.message+' -----');
              });
            }           
                
        });      
    }


    function uploadExcelHIS(event) {
        setFileUpload(event.target.files[0])
    }

    const handleExcelHISSubmit= async () => {
        setShowUploadExcelSpinner(true)

        if (fileUpload) {
            const formData = new FormData();
            formData.append('file', fileUpload);
            // Use fetch or a library like Axios to send the file to the server.
            // Replace 'YOUR_UPLOAD_URL' with your server's upload endpoint.
            await fetch(API_URL + "/uploadExcelHIS", {
                method: 'POST',
                body: formData,
            }) .then(response => {
                if (!response.ok) {
                throw new Error('Network response was not ok');
                    }
                    return response.json(); // Parse response body as JSON
                })
                .then((data) => {

                    if (data.status_code==200){
                        localStorage.setItem("flashMessage", 'Successfully Synced!');
                        window.location.href = BASE_URL;
                    }else{
                        localStorage.setItem("flashMessage", 'Failed to Sync because of One or Two errors! Contact ' +
                            'admin for assistance.'+data.status_message);
                        window.location.href = BASE_URL;
                    }

                    setShowUploadExcelSpinner(false)
                })
                .catch((error) => {
                    localStorage.setItem("flashMessage", error);
                    window.location.href = BASE_URL;
                    setShowUploadExcelSpinner(false)

                });
        }
    };


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
      <div className="table_container">
                        
            <div className="d-flex justify-content-end mb-3" style={{paddingTop:"20px"}}>
                <a href="/facilities/add_facility" className="btn btn-sm green_bg_color text-white" style={{width:"200px", paddingRight:"10px"}}>Add New Facility</a>
            </div>
          {/*    { isAuthenticated &&*/}
          { isAuthenticated && userEmailAllowed &&
              <div className="d-flex justify-content-end mb-3" style={{paddingTop:"10px"}}>
                  <SiMicrosoftexcel onClick={handleExcelHISSubmit} style={{color:"green", fontSize:"30px"}}/>
                  <input type="file" onChange={uploadExcelHIS}         accept=".xlsx, .xls" required/>
                  <button onClick={handleExcelHISSubmit}  className="btn btn-sm green_bg_color text-white">
                      Upload HIS Excel
                      { showUploadExcelSpinner && <Spinner style={{width: "1.2rem", height: "1.2rem"}}></Spinner> }
                  </button>
              </div>
          }
            
            <div className="d-flex justify-content-between">
                <h4>
                    Facilities Data 
                    { isAuthenticated && !showDownloadSpinner && <ExportToExcel apiData={exceldata} fileName={fileName} />  }
                    { isAuthenticated && showDownloadSpinner && <Spinner style={{width: "1.2rem", height: "1.2rem"}}></Spinner> }
                </h4>                
            </div>

            <Table id="facilities_list">
                <thead>
                <tr>
                    <th>MFL Code</th>
                    <th>Name</th>
                    <th>KMPDC_reg_no</th>
                    <th>Type</th>
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
                                <b>No facilities found {fetchError}</b>
                            }
                        </td>                       
                    </tr>
                ) : (
                  filtereddata.map(facility => (
                    <tr key={facility.pk}>
                        <td>{facility.mfl_code}</td>
                        <td>{facility.name}</td>
                        <td>{facility.KMPDC_reg_no}</td>
                        <td>{facility.facility_type}</td>
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
