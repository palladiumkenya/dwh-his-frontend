import React, { Component, useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label,Alert, Table } from "reactstrap";
import {FaEdit } from 'react-icons/fa';
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
        <div class="mx-5 my-5">
            <div class="d-flex justify-content-end">
                <input type="search" placeholder="Search ...." class="form-control" style={{width:"250px"}}
                    onChange={(e) => handleSearchFilter(e)} />
            </div>
            <Table  class="mx-5">
                    <thead>
                    <tr>
                        <th>Agency</th>
                        <th>Partner name</th>
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
                                <td id="agency_container"> {partner.agency}</td>
                                <td id="agency_container">{partner.name}</td>
                                <td id="agency_container"> 
                                    <Link to={"/facilities/edit/partner/" + partner.id}>
                                        <FaEdit id={partner.id} style={{color:"#1ab394", marginRight:"20px"}} />
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
