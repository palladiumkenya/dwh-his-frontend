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

import { useParams } from 'react-router-dom'


const UpdateFacility = (props) => {
  // get id of facility from url parameter
    const { fac_id } = useParams()

  	const [Facility_data, setFacility_data] = useState({})
    const [Counties_list, setCounties_list] = useState([])
    const [Owners_list, setOwners_list] = useState([])
    const [Partners_list, setPartners_list] = useState([])
    const [edits_exist, setEdits_exist] = useState(false)
    const [showSpinner, setShowSpinner] = useState(false);
    const showSearchIcon = "none";

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
                    
                } );
   
  }; 

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
        
        event.preventDefault();
        Facility_data['username'] = props.user.profile.name
        Facility_data['email'] = props.user.profile.email
        
        await axios.post(API_URL + `/update_facility/${fac_id}`, Facility_data)
            .then(function (response) { 
                  axios.post( EMAIL_URL+"/send_email", { "facility_id": fac_id, "username":props.user.profile.name, "frontend_url":BASE_URL});
                  localStorage.setItem("flashMessage", "Facility has been updated. Modifications to facility data must first be approved \
                                  before viewing");
                  
                  window.location.href =  BASE_URL + '/'+response.data.redirect_url;
                  
                  setShowSpinner(false) 
            })
            .catch(function (error) {
                console.log('failed ---/>', error);    
                setShowSpinner(false)            
            });
   };

   useEffect(() => {
    check_for_updates()
    getFacilityData()
    getCounties()    
    getOwners()
    getPartners()
  }, [])


    return (
          <div>
             { edits_exist && 
                <Alert color="danger">
                  <FaInfoCircle />
                  This Facility's data has been updated. Approve or discard those changes before attempting to update.
                  Navigate here to <a href={`/facilities/approve_changes/${fac_id}`}  className="alert-link">Approve this facility's edits</a>
                </Alert>  
              }
          
              <Form  id="facility_form" onSubmit={handleSubmit} class="form-control">
                  <legend class="text-center mt-5"><b>Modify Facility Data</b></legend>
                  <p class="mb-3 text-center">Make changes to Facility Data</p>

                  <fieldset disabled={edits_exist}>
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
                          <input class="btn green_bg_color text-white" value="Update Data" type="submit" style={{width:"200px"}} />
                          {showSpinner && <Spinner style={{width: "1.2rem", height: "1.2rem"}}></Spinner> }
                      </div>
                  </fieldset>
                  
              </Form>
          </div>
       
      );
  // }
}

export default UpdateFacility;