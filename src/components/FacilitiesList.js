import React, { Component, useState, useEffect  } from "react";
import { Table, Spinner, Input } from "reactstrap";
import { FaDownload } from 'react-icons/fa';
import axios from "axios";

import DeleteFacilityModal from "./DeleteFacilityModal";
import ExportToExcel from "./ExportToExcel";
import { API_URL, EMAIL_URL, BASE_URL } from "../constants";


const FacilityList = (props) => {    
 
    const facilities = props.facilities;

    const [testdata, setData] = useState([])
    // const [facilities, setFilteredData] = useState(props.facilities)

    const isAuthenticated = localStorage.getItem("isAuthenticated");

    const  fileName = "HIS Master List";
    const fetchData = () =>{
        const OrganizationId = localStorage.getItem("OrganizationId") ? localStorage.getItem("OrganizationId") : null;
        axios.post(API_URL + '/data_for_excel', {"OrganizationId": OrganizationId}).then(r => setData(r.data) )
    }
      
    // const handleSearchFilter = (e) => {
    //     const value = e.target.value;        
    //     console.log(value)
        
    //      const filtereddata = props.facilities.filter(item => item.mfl_code === parseInt(value));  
    //     console.log(filtereddata)
    //     if (filtereddata.length > 0){
    //         setFilteredData(filtereddata)
    //     }else{
    //         setFilteredData(props.facilities)
    //     }
    // };
    

    useEffect(() => {   
        fetchData()
    }, [])

    return (
        <>     
            <div class="d-flex justify-content-end mb-3">
                <a href="/facilities/add_facility" class="btn btn-sm green_bg_color text-white" style={{width:"200px"}}>Add New Facility</a>
            </div>         
            
            <div class="d-flex justify-content-between">
                <h4>
                    Facilities Data 
                    { isAuthenticated && <ExportToExcel apiData={testdata} fileName={fileName} />  }                
                </h4>
                {/* <Input placeholder="Search..." name="searchFilter" onChange={(e) => handleSearchFilter(e)} style={{width:"250px"}}/> */}
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
                {!facilities || facilities.length <= 0 ? (
                    <tr>                           
                        <td colSpan="12" align="center">
                            {props.showSpinner ? <Spinner style={{width: "1.2rem", height: "1.2rem"}}></Spinner> : 
                                <b>No facilities found</b>
                            }
                        </td>                       
                    </tr>
                ) : (
                    facilities.map(facility => (
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
                            resetState={props.resetState}
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
        </>
    );
  
}

export default FacilityList;