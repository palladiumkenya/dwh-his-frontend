import React, { Component, useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label,Alert, Spinner } from "reactstrap";
import {FaInfoCircle } from 'react-icons/fa';
import axios from "axios";

import ErrorBoundary from "./error_boundary/ErrorBoundary";
import FacilityInfo from "./form_components/FacilityInfo";
import MHealthInfo from "./form_components/MHealthInfo";
import EMRInfo from "./form_components/EMRInfo";
import IL_Info from "./form_components/IL_Info";
import HTS_Info from "./form_components/HTS_Info";

import { API_URL, EMAIL_URL, BASE_URL } from "../constants";
import userManager from '../services/UserService';
import { useParams } from 'react-router-dom'


const UpdateFacility = (props) => {
    // get id of facility from url parameter
    const { fac_id } = useParams()

    const [Facility_data, setFacility_data] = useState({})
    const [Counties_list, setCounties_list] = useState([])
    const [Owners_list, setOwners_list] = useState([])
    const [Partners_list, setPartners_list] = useState([])
    const [edits_exist, setEdits_exist] = useState(false)
    const [isAllowedUser, setIsAllowedUser] = useState(false); // allowed users are either organisation stwewards or HIS approvers
    const [showSpinner, setShowSpinner] = useState(false);
    const showSearchIcon = "none";
    const [disableSubmit, setDisableSubmit] = useState(false);
    const [msg, setMsg] = useState("");


    const [ctToggle, setCtToggle] = useState("");
    const [htsToggle, setHTSToggle] = useState("");
    const [ilToggle, setILToggle] = useState("");
    const [mHealthToggle, setMHealthToggle] = useState("");


    const getFacilityData = async () => {
        await axios.get(API_URL+`/fetch_facility_data/${fac_id}`)
            .then(res => {
                setFacility_data( res.data[0]);
                CT_slideToggle(res.data[0].CT);
                HTS_slideToggle(res.data[0].HTS) ;
                IL_slideToggle(res.data[0].IL) ;
                Mhealth_slideToggle(res.data[0].mHealth)
                // check if allowed user
                checkIfAllowedUser(res.data[0].partner)
            } );

    };


    async function checkIfAllowedUser(partner_id) {
        const filtered_partner = Partners_list.filter(item => item.id === Number(partner_id))
        await userManager.getUser().then((res) => {
            // if (res.profile.OrganizationName.toLowerCase() == filtered_partner[0].partner.toLowerCase() && (res.profile.UserType == "2" || res.profile.UserType == "5")) {
            if (res.profile.UserType == "2" || res.profile.UserType == "5" || res.profile.UserType == "1") {
                if (partner_id==118){
                    setIsAllowedUser(true)
                }
                setIsAllowedUser(true)
            } else {
                setIsAllowedUser(false)
            }
        });
    }

    const check_for_updates = async() =>{

        await axios.get(API_URL+`/check/facility_edits/${fac_id}`)
            .then(function (response) {
                if (response.data.status_code == 200){
                    setEdits_exist(true)
                }else{
                    setEdits_exist(false)
                }

            });
    }


    const getCounties = async() => {
        // axios.get(API_URL+"/update_facility/981893d7-8488-4319-b976-747873551b71").then(res => this.setState({ facility: res.data }));
        await axios.get(API_URL+"/sub_counties").then(res => setCounties_list( res.data ));
    };

    const getOwners = async() => {
        // axios.get(API_URL+"/update_facility/981893d7-8488-4319-b976-747873551b71").then(res => this.setState({ facility: res.data }));
        await axios.get(API_URL+"/owners").then(res => setOwners_list( res.data ));
    };

    const getPartners = async() => {
        // axios.get(API_URL+"/update_facility/981893d7-8488-4319-b976-747873551b71").then(res => this.setState({ facility: res.data }));
        await axios.get(API_URL+"/partners_list").then(res => setPartners_list( res.data ));
    };


    const CT_slideToggle = (showtoggle) => {
        setCtToggle(showtoggle);
    };

    const HTS_slideToggle = (showtoggle) => {
        setHTSToggle(showtoggle);
    };

    const Mhealth_slideToggle = (showtoggle) => {
        setMHealthToggle(showtoggle);
    };

    const IL_slideToggle = (showtoggle) => {
        setILToggle(showtoggle);
    };

    const handleSubmit = async (event) => {
        setShowSpinner(true)
        setDisableSubmit(true)
        const msg =''
        event.preventDefault();
        Facility_data['username'] = props.user.profile.name
        Facility_data['email'] = props.user.profile.email

        await axios.post(API_URL + `/update_facility/${fac_id}`, Facility_data)
            .then(function (response) {
                axios.post( EMAIL_URL+"/send_email", { "facility_id": fac_id, "username":props.user.profile.name, "frontend_url":BASE_URL,
                    "mfl_code":Facility_data.mfl_code, "partner":Facility_data.partner})
                    .then(function (resp){
                        localStorage.setItem("flashMessage", "Facility has been updated. Modifications to facility data must first be approved before viewing");
                        window.location.href = BASE_URL + `/facilities/submitted/approvals`;
                    }).catch(function (error) {
                        localStorage.setItem("flashMessage", "Error sending email to approver ");
                        window.location.href = BASE_URL + `/facilities/submitted/approvals`;

                });

            })
            .catch(function (error) {
                localStorage.setItem("flashMessage", "Error. Please contact admin for assistance "+error);
                window.location.href = BASE_URL + `/facilities/update_facility/${fac_id}`;

                setShowSpinner(false)
                setDisableSubmit(false)
            });
    };

    useEffect(() => {
        check_for_updates()
        getFacilityData()
        getCounties()
        getOwners()
        getPartners()
        // check if allowed user
        // checkIfAllowedUser()
    }, [])


    return (
        <div>
            { !isAllowedUser &&
                <Alert color="danger">
                    <FaInfoCircle style={{marginRight:"20px", text:"center"}}/>
                    Only Organisation stewards and HIS approvers are allowed to edit. Please contact the steward
                    of this organisation to make changes
                </Alert>
            }

            { edits_exist &&
                <Alert color="danger">
                    <FaInfoCircle style={{marginRight:"20px"}}/>
                    This Facility's data has been either updated or newly added. The changes must be approved or rejected before it can be modified.
                    {/* Navigate here to <a href={`/facilities/approve_changes/${fac_id}`}  className="alert-link">Approve this facility's edits</a> */}
                </Alert>
            }

            <Form  id="facility_form" onSubmit={handleSubmit} class="form-control">
                <legend class="text-center mt-5"><b>Modify Facility Data</b></legend>
                <p class="mb-3 text-center">Make changes to Facility Data</p>
                {/* if the user logged in isnt authorised to edit then disable fields anyway.
                    If the user is authorised but there are alredy preexisting edits, disable fields alse */}
                <fieldset disabled={!isAllowedUser ? !isAllowedUser : edits_exist}>
                    { Counties_list.length > 0 &&
                        <ErrorBoundary>
                            <FacilityInfo facility_data={Facility_data} setFacility_data={setFacility_data}
                                          Counties_list={Counties_list}
                                          Owners_list={Owners_list} Partners_list={Partners_list}
                                          CT_slideToggle={CT_slideToggle}
                                          HTS_slideToggle={HTS_slideToggle} IL_slideToggle={IL_slideToggle}
                                          Mhealth_slideToggle={Mhealth_slideToggle}
                                          ctToggle={ctToggle}
                                          showSearchIcon={showSearchIcon} />
                        </ErrorBoundary>
                    }

                    { ctToggle &&
                        <ErrorBoundary>
                            <EMRInfo facility_data={Facility_data} setFacility_data={setFacility_data} counties_list={Counties_list}/>
                        </ErrorBoundary>
                    }

                    {mHealthToggle &&
                        <ErrorBoundary>
                            <MHealthInfo facility_data={Facility_data} setFacility_data={setFacility_data} counties_list={Counties_list}/>
                        </ErrorBoundary>
                    }

                    { htsToggle &&
                        <ErrorBoundary>
                            <HTS_Info facility_data={Facility_data} setFacility_data={setFacility_data} counties_list={Counties_list}/>
                        </ErrorBoundary>
                    }

                    { ilToggle &&
                        <ErrorBoundary>
                            <IL_Info facility_data={Facility_data} setFacility_data={setFacility_data} counties_list={Counties_list}/>
                        </ErrorBoundary>
                    }

                    <div class="d-flex justify-content-center mb-5">
                        {/*<input class="btn green_bg_color text-white" value="Update Data" type="submit" style={{width:"200px"}} />*/}
                        <button className="btn green_bg_color text-white" type="submit" disabled={disableSubmit}>
                            Update Data
                        </button>
                        {showSpinner && <Spinner style={{width: "1.2rem", height: "1.2rem"}}></Spinner> }
                    </div>
                </fieldset>

            </Form>
        </div>

    );
    // }
}

export default UpdateFacility;
