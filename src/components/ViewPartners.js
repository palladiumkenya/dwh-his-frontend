import React, { Component, useEffect, useState } from "react";
import {Button, Form, FormGroup, Input, Label, Alert, Table, Spinner} from "reactstrap";
import {FaEdit,FaPlusCircle ,FaArrowCircleRight  } from 'react-icons/fa';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';

import { API_URL, EMAIL_URL, BASE_URL } from "../constants";

import axios from "axios";
import { useParams } from 'react-router-dom'
import {SiMicrosoftexcel} from "react-icons/si";
import userManager from "../services/UserService";
import ExportToExcel from "./ExportToExcel";



const EditPartners = () => {
    const [Partner_data, setPartner_data] = useState([])
    const [filtereddata, setFilteredData] = useState([])
    const [EditedPartner, setEditedPartner] = useState([])
    const [show_hide, setDisplay] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [agencyId, setAgencyId]= useState(null);
    const [partnerId, setPartnerId]= useState(null);
    const [showDownloadSpinner, setShowDownloadSpinner] = useState(true);
    const [showUploadExcelSpinner, setShowUploadExcelSpinner] = useState(false);
    const [fetchError, setFetchError] = useState(null);
    const [fileUpload, setFileUpload] = useState()
    const isAuthenticated = sessionStorage.getItem("isAuthenticated");
    const [isAllowedUser, setIsAllowedUser] = useState(false)
    const [exceldata, setData] = useState([])
    const  fileName = "Stakeholders List";

    // Partner_data.map(partner => {
    //     const identifier = partner.id
    //     const item_ref = useRef("agency-"+identifier)
    //     const item_ref = useRef("agency-"+identifier)
    // });
    const fetchStakeholdersData = () =>{

        axios.post(API_URL + '/stakeholders/excel/download').then(r =>{
            setShowDownloadSpinner(false)
            setData(r.data)
        })
    }

    const getPartners = () => {
        axios.get(API_URL+'/partners').then(res => {
            setPartner_data(res.data)
            setFilteredData(res.data)
            console.log(res.data)
        } );
        
      };

    const toggleDisabledFields =(e) =>{
        const el = e.target.id;
        setAgencyId("agency-"+el)
        setPartnerId("partner-"+el).disabled = false;
            //setDisabled(!disabled)
            console.log(el)
    }

    //   const changes =() =>{
    //     console.log('hfffh')
    // }

    const handleSearchFilter = (e) => {
            const value = e.target.value;        

             const searcheddata = Partner_data.filter(item => (item.name).toLowerCase().includes(value.toLowerCase()) );  

            if (searcheddata.length > 0){
                setFilteredData(searcheddata)
            }else{
                setFilteredData(Partner_data)
            }
        };



    function uploadExcelStakeholders(event) {
        setFileUpload(event.target.files[0])
    }

    const handleExcelStakeholdersSubmit= async () => {
        setShowUploadExcelSpinner(true)

        if (fileUpload) {
            const formData = new FormData();
            formData.append('file', fileUpload);
            // Use fetch or a library like Axios to send the file to the server.
            // Replace 'YOUR_UPLOAD_URL' with your server's upload endpoint.
            await fetch(API_URL + "/uploadExcel/Stakeholders", {
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
                        window.location.href = BASE_URL+"/facilities/partners";
                    }else{
                        localStorage.setItem("flashMessage", 'Failed to Sync because of One or Two errors! Contact ' +
                            'admin for assistance.'+data.status_message);
                        window.location.href = BASE_URL+"/facilities/partners";
                    }

                    setShowUploadExcelSpinner(false)
                })
                .catch((error) => {
                    localStorage.setItem("flashMessage", error);
                    window.location.href = BASE_URL+"/facilities/partners";
                    setShowUploadExcelSpinner(false)

                });
        }
    };

    const getAuthorizedUsers = async () => {
        await userManager.getUser().then((res) => {
            if (res.profile.UserType == "2" || res.profile.UserType == "5" || res.profile.UserType == "1") {

                setIsAllowedUser(true)
            } else {
                setIsAllowedUser(false)
            }
        });

    };

    useEffect(() => {    
        getPartners();
        getAuthorizedUsers();
        fetchStakeholdersData();
    }, [])


    return(
        <div className="mx-5 my-5">
            {/*<div className="d-flex justify-content-between">*/}
            {/*    <h4>*/}
            {/*        Stakeholders List*/}
            {/*        { !showDownloadSpinner && <ExportToExcel apiData={exceldata} fileName={fileName} />  }*/}
            {/*        { showDownloadSpinner && <Spinner style={{width: "1.2rem", height: "1.2rem"}}></Spinner> }*/}
            {/*    </h4>*/}
            {/*</div>*/}
            { isAllowedUser &&
                <div className="d-flex justify-content-end mb-3" style={{paddingTop:"10px"}}>
                    <SiMicrosoftexcel onClick={handleExcelStakeholdersSubmit} style={{color:"green", fontSize:"30px"}}/>
                    <input type="file" onChange={uploadExcelStakeholders}         accept=".xlsx, .xls" required/>
                    <button onClick={handleExcelStakeholdersSubmit}  className="btn btn-sm green_bg_color text-white">
                        Upload Stakeholders and merge
                        { showUploadExcelSpinner && <Spinner style={{width: "1.2rem", height: "1.2rem"}}></Spinner> }
                    </button>
                </div>
            }
            <div className="d-flex justify-content-end">
                <input type="search" placeholder="Search ...." className="form-control" style={{width:"250px"}}
                    onChange={(e) => handleSearchFilter(e)} />
            </div>
            <Table  className="mx-5">
                    <thead>
                    <tr>
                        <th>Agency</th>
                        <th>SDP Code</th>
                        <th>Partner name</th>
                        <th>Prime Partner Name</th>
                        <th>HIS Approver</th>
                        <th>Actions</th>
                        <th style={{"cursor":"pointer"}}>Stakeholders List
                            { !showDownloadSpinner && <ExportToExcel apiData={exceldata} fileName={fileName} />  }
                            { showDownloadSpinner && <Spinner style={{width: "1.2rem", height: "1.2rem"}}></Spinner> }
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {!filtereddata || filtereddata.length <= 0 ? (
                        <tr>
                            <td colSpan="6" align="center">
                                <b>No Partners found</b>
                            </td>
                        </tr>
                    ) : (
                        filtereddata.map(partner => (                    
                            <tr>
                                <td className="font-weight-bold green_text_dark white_bg_color">{partner.agency}</td>
                                <td className="white_bg_color">{partner.sdp_code}</td>
                                <td className="white_bg_color">{partner.name}</td>
                                <td className="white_bg_color">{partner.prime_partner_name}</td>
                                <td className="white_bg_color">{partner.approver}</td>
                                <td className="green_text_dark white_bg_color">
                                    <Link to={"/facilities/edit/partner/" + partner.id}>
                                        <FaEdit id={partner.id} style={{color:"#00897B", fontSize:"15px", marginRight:"20px"}} />
                                    </Link>
                                </td>
                                <td className="blue_text_color teal_bg_color"> {partner.stakeholders} Users</td>

                                <td className="blue_text_color teal_bg_color">
                                    <Link to={"/partner/stakeholders/" + partner.name+"?id="+partner.id}>
                                        <FaPlusCircle  id={partner.id} style={{ fontSize:"15px", marginRight:"20px"}} />
                                    </Link>
                                </td>
                            
                            </tr>                    
                        ))                   
                    )}
                    </tbody>
            </Table>
        </div>
      );
  
}

export default EditPartners;
