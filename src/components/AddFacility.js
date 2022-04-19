import React, { Component, useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Spinner } from "reactstrap";
import axios from "axios";

import ErrorBoundary from "./error_boundary/ErrorBoundary";
import FacilityInfo from "./form_components/FacilityInfo";
import MHealthInfo from "./form_components/MHealthInfo";
import EMRInfo from "./form_components/EMRInfo";
import IL_Info from "./form_components/IL_Info";
import HTS_Info from "./form_components/HTS_Info";


import {signinRedirect} from "../services/UserService";

import initial_data from "./json_data/initial_data";

import { API_URL } from "../constants";
import { BASE_URL } from "../constants";



const AddFacility = (props) => {  
    

    const default_data= initial_data;

  	const [Facility_data, setFacility_data] = useState(default_data)
    const [Counties_list, setCounties_list] = useState([])
    const [Owners_list, setOwners_list] = useState([])
    const [Partners_list, setPartners_list] = useState([])
    const [facilityAlreadyExists, setfacilityAlreadyExists]  = useState(false)
    const showSearchIcon = "block";

    const [ctToggle, setCtToggle] = useState(false);
    const [htsToggle, setHTSToggle] = useState(false);
    const [ilToggle, setILToggle] = useState(false);
    const [mHealthToggle, setMHealthToggle] = useState(false);

    const [hiddenSpinner, setHiddenSpinner] = useState("none");


  
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

   useEffect(() => {   
    getCounties()
    getOwners()
    getPartners()
    
  }, [])  
 
  
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
      // show spinning icon
        setHiddenSpinner("block") 

        console.log(Facility_data)
        event.preventDefault();
        
        await axios.post(API_URL + '/add_facility', Facility_data)
              .then(function (response) { 
                localStorage.setItem("flashMessage", "Facility was successfully added and can be viewed below!");
                  console.log('response --------->', response)
                  window.location.href = BASE_URL + '/'+response.data.redirect_url;
                  
              })
              .catch(function (error) {
                console.log('failed ---/>', error);  
                localStorage.setItem("flashMessage", "We ran into a problem. Please try again");
                //window.location.reload();             
            });
    };
   

    return (
          
            <Form  id="facility_form" onSubmit={handleSubmit} class="form-control">
                <legend class="text-center mt-5"><b>Add Facility</b></legend>
                <p class="mb-3 text-center">Add new Facility to your List</p>
                
                
                    { Counties_list.length > 0 &&
                      <ErrorBoundary> 
                        <FacilityInfo facility_data={Facility_data} setFacility_data={setFacility_data}
                                      Counties_list={Counties_list}
                                        Owners_list={Owners_list} Partners_list={Partners_list}
                                        CT_slideToggle={CT_slideToggle}
                                        HTS_slideToggle={HTS_slideToggle} IL_slideToggle={IL_slideToggle} 
                                        Mhealth_slideToggle={Mhealth_slideToggle}
                                        ctToggle={ctToggle}
                                        setfacilityAlreadyExists={setfacilityAlreadyExists}
                                        showSearchIcon={showSearchIcon}/>
                      </ErrorBoundary> 
                    }                

                    { ctToggle &&
                      <ErrorBoundary> 
                        <EMRInfo facility_data={Facility_data} setFacility_data={setFacility_data} counties_list={Counties_list}/>
                      </ErrorBoundary> 
                    }

                    { mHealthToggle &&
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

                  <fieldset disabled={facilityAlreadyExists}>
                      <div class="d-flex justify-content-center mb-5">
                        <input class="btn green_bg_color text-white" value="Submit" type="submit" style={{width:"200px"}} />
                        <Spinner style={{display:hiddenSpinner, width: "1.2rem", height: "1.2rem"}}></Spinner>
                    </div>
                 </fieldset>
            </Form>
        
       
    );
  // }
}

export default AddFacility;