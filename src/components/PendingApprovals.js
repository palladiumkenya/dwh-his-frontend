import React, { Component, useState, useEffect  } from "react";
import { Table, Col, Container, Alert, Spinner } from "reactstrap";
import {FaInfoCircle } from 'react-icons/fa';
import FlashMessage from 'react-flash-message'

// import FacilitiesList from "./FacilitiesList";
import DeleteFacilityModal from "./DeleteFacilityModal";
import ExportToExcel from "./ExportToExcel";

import { FaEye, FaTrashAlt, FaEdit } from 'react-icons/fa';

import 'jquery/dist/jquery.min.js';
//Datatable Modules
import "datatables.net-dt/js/dataTables.dataTables"
import "datatables.net-dt/css/jquery.dataTables.min.css"
import $ from 'jquery';

import Swal from "sweetalert2";

import { API_URL, EMAIL_URL, BASE_URL } from "../constants";
import userManager, { signinRedirectCallback, signoutRedirect } from '../services/UserService';

import axios from "axios";
import { useParams } from 'react-router-dom'




const PendingApprovals = (props) =>{

    const [facilities, setFacilities] = useState([])
    const [filtereddata, setFilteredData] = useState([])
    const [showSpinner, setShowSpinner] = useState(false);
    const [showDownloadSpinner, setShowDownloadSpinner] = useState(true);
    const [orgId, setOrgId] = useState(null);
    const [fetchError, setFetchError] = useState(null);
    const [email, setEmail] = useState(null);

    async function getFacilities() {
        setShowSpinner(true);

        await userManager.getUser().then((user) =>{
            if (user){
                const orgId = user.profile.OrganizationId  ? user.profile.OrganizationId : null
                axios.post(API_URL+'/pending/approvals', {"Email":user.profile.email.toLowerCase()}).then(res => {
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
                axios.post(API_URL, {"OrganizationId": null}).then(res => {
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


    const confirm_deletion = (facilityid, editid) =>{
        Swal.fire({
            title: 'Delete Selected Pending Approval?',
            text: "This will be removed permanently from the system.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#1ab394',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete!'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Deleted!',
                    'Selected Pending Approval was dropped.',
                    'success'
                )
                deletePendingApproval(facilityid, editid)
            }
        })
    }
    const deletePendingApproval= async (facilityid, editid) => {
        console.log(facilityid)

        await axios.post(API_URL + `/delete/pending/approval/edit/${editid}` , {})
            .then(function (response) {
                window.location.href = BASE_URL+"/facilities/pending/approvals";
                setShowSpinner(false)
            })
            .catch(function (error) {
                console.log('failed ---/>', error);
                setShowSpinner(false)
            });
    };

    useEffect(() => {
        getFacilities() ;

    }, [])



    return (
        <div className="table_container">

            <div className="d-flex justify-content-between">
                <h4>
                    My Pending Approvals
                </h4>
            </div>

            <Table id="facilities_list">
                <thead>
                <tr>
                    <th>MFL Code</th>
                    <th>Name</th>
                    <th>County</th>
                    <th>Sub County</th>
                    <th>Service Delivery Partner</th>
                    <th>Approved</th>
                    <th>Submitted By</th>
                    <th>Date Added</th>
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
                            <td>{facility.county}</td>
                            <td>{facility.sub_county}</td>
                            <td>{facility.owner}</td>
                            <td style={{color:"red"}}>False</td>
                            <td style={{color:"red"}}>{facility.submitted_by}</td>
                            <td>{facility.date_edited}</td>
                            {/* <td>{facility.emr_type}</td> */}
                            {/* <td>{facility.emr_status}</td>                         */}
                            <td align="center">
                                <a href={"/facilities/approve_changes/"+facility.id}>Approve</a>
                                {/*<button onClick={() => confirm_deletion(facility.id)}>Delete</button>*/}
                                 <FaTrashAlt style={{color:"red", marginLeft:"20px", cursor:"pointer"}} onClick={() => confirm_deletion(facility.id, facility.edit_id)}/>

                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </Table>

        </div>
    );

}

export default PendingApprovals;
