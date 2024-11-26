import React, { Component, useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label,Alert, Table } from "reactstrap";
import {FaEdit,FaPlusCircle ,FaArrowCircleRight  } from 'react-icons/fa';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';

import { API_URL, EMAIL_URL, BASE_URL } from "../constants";

import axios from "axios";
import { useParams } from 'react-router-dom'



const EditPartners = () => {
    const [Partner_data, setPartner_data] = useState([])
    const [filtereddata, setFilteredData] = useState([])
    const [EditedPartner, setEditedPartner] = useState([])
    const [show_hide, setDisplay] = useState(false)
    const [disabled, setDisabled] = useState(true)
    const [agencyId, setAgencyId]= useState(null);
    const [partnerId, setPartnerId]= useState(null);

    // Partner_data.map(partner => {
    //     const identifier = partner.id
    //     const item_ref = useRef("agency-"+identifier)
    //     const item_ref = useRef("agency-"+identifier)
    // });


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


    useEffect(() => {    
        getPartners()
    }, [])


    return(
        <div className="mx-5 my-5">
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
                        <th>Stakeholders</th>
                        <th>Actions</th>
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
                                <td className="blue_text_color teal_bg_color">{partner.stakeholder_list}</td>
                                <td className="blue_text_color teal_bg_color">
                                    <Link to={"/partner/stakeholders/" + partner.name+"?id="+partner.id}>
                                        <FaArrowCircleRight  id={partner.id} style={{ fontSize:"15px", marginRight:"20px"}} />
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
