import React, { Component, useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label,Alert, Table } from "reactstrap";
import {FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2'


import { API_URL, EMAIL_URL, BASE_URL } from "../constants";

import axios from "axios";
import { useParams } from "react-router-dom";



const EditPartners = (props) => {
    const { part_id } = useParams();
    console.log("this.context:",  part_id )
    const [Partner_data, setPartner_data] = useState([]);
    const [agecies_list, setAgencies_list] = useState([]);

    const getPartnerData = async() => {
        axios.get(API_URL+`/edit_partner/${part_id}`).then(res => setPartner_data(res.data) );
   
        console.log('------->',part_id)
      };

    
      const get_agencies_list = async() => {
        // axios.get(API_URL+"/update_facility/981893d7-8488-4319-b976-747873551b71").then(res => this.setState({ facility: res.data }));
        await axios.get(API_URL+"/get_agencies_list").then(res => setAgencies_list( res.data ));
       };


    const handleSubmit = async (event) => {    
        console.log(Partner_data)
        event.preventDefault();
    
        await axios.post(API_URL + `/edit_partner/${part_id}`, Partner_data)
                  .then(function (response) { 
                      console.log('response --------->', response)
                      window.location.href = BASE_URL + '/facilities/'+response.data.redirect_url;
                      console.log('redirecto to', response.data.redirect_url)
                  })
                  .catch(function (error) {
                    console.log('failed ---/>', error);               
                });
       };


    useEffect(() => {    
        getPartnerData()
        get_agencies_list()
    }, [])


    return(
        <div class="p-5">
            <Form  onSubmit={handleSubmit} class="form-control " style={{width:"400px", margin:"auto"}}>
                 <legend class="text-center mt-5"><b>Modify Partner</b></legend>
                <p class="mb-3 text-center">Update details about a partner</p>

                <Label for="lat">Partner:</Label>
                <Input type="text" name="partner" value={Partner_data.partner} 
                        onChange={(e) => {setPartner_data({...Partner_data, "partner":e.target.value}) }}/>

                <Label for="partner">Agency:</Label>
                <Input id="agency" name="agency_id" type="select" value={Partner_data.agency_id} 
                    onChange={(e) => {setPartner_data({...Partner_data, "agency_id":e.target.value}) }}>
                    <option value=""></option>
                    { agecies_list.length > 0 &&
                        agecies_list.map(agency => (    
                            <option key={agency.id} value={agency.id}>{agency.name}</option>
                        ))                              
                    }                          
                </Input> 
                
                <div class="d-flex justify-content-center mb-5 mt-5">
                     <input class="btn green_bg_color text-white" value="Submit" type="submit" style={{width:"200px"}} />
                 </div>
            </Form>
        </div>
      );
  
}

export default EditPartners;
