import React, { Component, useEffect, useState } from "react";
import {Button, Form, FormGroup, Input, Label, Alert, Table, Spinner, Col,
    Container, Row} from "reactstrap";

import {FaEdit, FaInfoCircle, FaPlusCircle} from 'react-icons/fa';
import Swal from 'sweetalert2'
import userManager, { signinRedirectCallback, signoutRedirect } from '../services/UserService';

import { API_URL, EMAIL_URL, BASE_URL } from "../constants";

import axios from "axios";
import {Link, useParams,useLocation } from "react-router-dom";
import initial_data from "./json_data/initial_data";



const EditPartnerStakeholder = (props) => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const stakeholder_id = searchParams.get('id');


    const [Stakeholder, setStakeholdersData] = useState([]);
    const [partners_list, setPartners_list] = useState([]);
    const [isOrgSteward, setIsOrgSteward] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);



    const setInitialData = async() => {
        const initial_data = {
            "title":"",
            "name":"",
            "telno":"",
            "email":"",
            "partner_id":""
        }
        setStakeholdersData(initial_data)
    };


    // async function checkIfOrgSteward(emails) {
    //     await userManager.getUser().then((res) =>{
    //         // setIsOrgSteward( emails.includes(res.profile.email.toLowerCase()))
    //         // default to true for all with login credentials
    //         setIsOrgSteward( true)
    //     });
    //
    // }

      const get_partners_list = async() => {
        // axios.get(API_URL+"/update_facility/981893d7-8488-4319-b976-747873551b71").then(res => this.setState({ facility: res.data }));
        await axios.get(API_URL+"/get_partners_list").then(res => setPartners_list( res.data ));
       };


    const handleSubmit = async (event) => {    

        event.preventDefault();
        setShowSpinner(true)

        await axios.post(`${API_URL}/add_stakeholder`, Stakeholder)
                  .then(function (response) { 
                        localStorage.setItem("flashMessage", "New Stakeholder successfully added");
                      window.location.href = `${BASE_URL}/partner/stakeholders/${Stakeholder.partner_name}?id=${Stakeholder.partner_id}`;
                      setShowSpinner(false)

                  })
                  .catch(function (error) {
                     localStorage.setItem("flashMessage", "Something went wrong. Refresh and try again");
                      setShowSpinner(false)

                });
       };


    useEffect(() => {    
        get_partners_list()
        setInitialData()
    }, [])


    return(
        <div className="p-5">


            <Form  onSubmit={handleSubmit} className="form-control " style={{width:"400px", margin:"auto"}}>
                 <legend className="text-center mt-5"><b>Add Stakeholder</b></legend>
                <p className="mb-3 text-center">Add details of a new stakeholder</p>

                {/*<fieldset disabled={!isOrgSteward}>*/}
                <fieldset >
                    <Label for="partner">Partner:</Label>
                    <Input id="partner" name="partner" type="select" value={Stakeholder.partner_id}
                    onChange={(e) => {setStakeholdersData({...Stakeholder, "partner_id":e.target.value}) }}>
                    <option value=""></option>
                    { partners_list.length > 0 &&
                        partners_list.map(partner => (
                            <option key={partner.id} value={partner.id}>{partner.name}</option>
                        ))
                    }
                    </Input>

                    <Label for="title">Title:</Label>
                    <Input type="text" name="title" value={Stakeholder.title}
                           onChange={(e) => {setStakeholdersData({...Stakeholder, "title":e.target.value}) }}/>

                    <Label for="name">Name:</Label>
                    <Input type="text" name="name" value={Stakeholder.name}
                           onChange={(e) => {setStakeholdersData({...Stakeholder, "name":e.target.value}) }}/>

                    <Label for="email">Email:</Label>
                    <Input type="email" name="email" value={Stakeholder.email}
                           onChange={(e) => {setStakeholdersData({...Stakeholder, "email":e.target.value}) }}/>

                    <Label for="telno">TelNo:</Label>
                    <Input type="number" name="telno" value={Stakeholder.telno}
                           onChange={(e) => {setStakeholdersData({...Stakeholder, "telno":e.target.value}) }}/>
                    <div className="d-flex justify-content-center mb-5 mt-5">
                        <input className="btn green_bg_color text-white" value="Add" type="submit" style={{width:"200px"}} />
                        {showSpinner && <Spinner style={{width: "1.2rem", height: "1.2rem"}}></Spinner> }

                    </div>
                </fieldset>
            </Form>
        </div>
      );
  
}

export default EditPartnerStakeholder;
