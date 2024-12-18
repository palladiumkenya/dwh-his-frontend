import React, { Component, useEffect, useState } from "react";
import {Button, Form, FormGroup, Input, Label, Alert, Table, Spinner, Col,
    Container, Row} from "reactstrap";
import Swal from 'sweetalert2'

import {FaEdit, FaTrash , FaPlusCircle} from 'react-icons/fa';
import userManager, { signinRedirectCallback, signoutRedirect } from '../services/UserService';

import { API_URL, EMAIL_URL, BASE_URL } from "../constants";

import axios from "axios";
import {Link, useParams,useLocation } from "react-router-dom";



const ViewPartnerStakeholdersList = (props) => {
    const { part_name } = useParams();

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const part_id = searchParams.get('id');
   
    const [StakeholdersList, setStakeholdersListData] = useState([]);
    const [agecies_list, setAgencies_list] = useState([]);
    const [isOrgSteward, setIsOrgSteward] = useState(false);

    const getStakeholdersListData = () => {
         axios.get(API_URL+`/stakeholders_list/${part_id}`).then(res => {
            setStakeholdersListData(res.data);
             checkIfOrgSteward(res.data.org_steward_emails);
        });

      };

    async function checkIfOrgSteward(emails) {
        await userManager.getUser().then((res) =>{
            // setIsOrgSteward( emails.includes(res.profile.email.toLowerCase()))
            // default to true for all with login credentials
            setIsOrgSteward( true)
        });

    }



    const ConfirmDeletion = (stakeholder_id, stakeholder_name) =>{
        Swal.fire({
            title: 'Delete Stakeholder?',
            text: "Are you sure you want to delete "+stakeholder_name+" stakeholder",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#1ab394',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Delete!'

        }).then((result) => {
            if (result.isConfirmed) {
                DeleteStakeholder(stakeholder_id)
                Swal.fire(
                    'Success!',
                    'Success! Stakeholder Deleted form the System!',
                    'success'
                );

            } else {
                Swal.fire("Operation canceled!");
            }
        })
    }


    const DeleteStakeholder = async (stakeholder_id) => {

        await axios.post(`${API_URL}/delete_stakeholder/${stakeholder_id}`)
            .then(function (response) {
                window.location.href = `${BASE_URL}/partner/stakeholders/${StakeholdersList.partner}?id=${StakeholdersList.partner_id}`;
            })
            .catch(function (error) {
                console.log('failed ---/>', error);
            });
    };



    useEffect(() => {    
        getStakeholdersListData()

    }, [])


    return(
        <div className="p-5">
            <Container>
                <Row>
                    <Col xs={9}>
                        <h5>
                            {part_name} Stakeholders
                        </h5>
                    </Col>
                    <Col xs={3}>
                        {/*<Link to={"/facilities/add/stakeholder/" + StakeholdersList.partner +"?id="+ StakeholdersList.partner_id}>*/}
                        {/*    Add New Stakeholder<FaPlusCircle id={part_id} style={{ fontSize:"15px", marginRight:"20px"}} />*/}
                        {/*</Link>*/}
                        <div className="d-flex justify-content-end mb-3" style={{paddingTop:"20px"}}>
                            <a href={"/partner/add/stakeholder/" + StakeholdersList.partner +"?id="+ StakeholdersList.partner_id}
                            className="btn btn-sm green_bg_color text-white" style={{width:"200px", paddingRight:"10px"}}>
                                Add New Stakeholder <FaPlusCircle id={part_id} style={{ fontSize:"15px", marginLeft:"20px"}} />
                            </a>
                        </div>
                    </Col>
                </Row>
            </Container>


            <Table  className="mx-5">
                <thead>
                <tr>
                    <th>SDP Code</th>
                    <th>Partner name</th>
                    <th>Title</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {!StakeholdersList.users || StakeholdersList.users.length <= 0 ? (
                    <tr>
                        <td colSpan="6" align="center">
                            <b>No Stakeholders found. Add a stakeholder to the mailing list</b>
                        </td>
                    </tr>
                ) : (
                    StakeholdersList.users.map(stakeholder => (
                        <tr>
                            <td className="font-weight-bold green_text_dark white_bg_color">{stakeholder.sdp_code}</td>
                            <td className="white_bg_color">{stakeholder.partner}</td>
                            <td className="white_bg_color">{stakeholder.title}</td>
                            <td className="white_bg_color">{stakeholder.name}</td>
                            <td className="white_bg_color">{stakeholder.email}</td>
                            <td className="green_text_dark white_bg_color">
                                <Link to={"/partner/edit/stakeholder?id=" + stakeholder.id}>
                                    <FaEdit id={stakeholder.id} style={{color:"#00897B", fontSize:"15px", marginRight:"20px"}} />
                                </Link>
                                <FaTrash id={stakeholder.id} className="red_text_dark" onClick={()=>ConfirmDeletion(stakeholder.id, stakeholder.name)}
                                         style={{fontSize:"15px", marginRight:"20px"}} />
                            </td>
                        </tr>
                    ))
                )}
                </tbody>
            </Table>

        </div>
      );
  
}

export default ViewPartnerStakeholdersList;
