import React, { Component, useState, useEffect  } from "react";
import { Table } from "reactstrap";
import { FaDownload } from 'react-icons/fa';
import axios from "axios";

import DeleteFacilityModal from "./DeleteFacilityModal";
import ExportToExcel from "./ExportToExcel";
import { API_URL, EMAIL_URL, BASE_URL } from "../constants";


const FacilityList = (props) => {    
 
    const facilities = props.facilities;

    const [testdata, setData] = useState([])

    const  fileName = "HIS Master List";
    const fetchData = () =>{
        const OrganizationId = localStorage.getItem("OrganizationId") ? localStorage.getItem("OrganizationId") : null;
        axios.post(API_URL + '/data_for_excel', {"OrganizationId": OrganizationId}).then(r => setData(r.data) )
    }
      


       useEffect(() => {   
        fetchData()
      }, [])

    return (
        <>              
            <a href="/facilities/add_facility" class="btn btn-outline-success" style={{float:"right"}}>Add Facility</a>
            <h4>Facilities Data <ExportToExcel apiData={testdata} fileName={fileName} /> </h4>
        
            <Table striped>
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
                    <td colSpan="6" align="center">
                        <b>No facilities found</b>
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