import React, { Component, useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label,Alert } from "reactstrap";
import {FaInfoCircle } from 'react-icons/fa';
import Swal from 'sweetalert2'

import ErrorBoundary from "./error_boundary/ErrorBoundary";
import FacilityInfo from "./form_components/FacilityInfo";
import MHealthInfo from "./form_components/MHealthInfo";
import EMRInfo from "./form_components/EMRInfo";
import IL_Info from "./form_components/IL_Info";
import HTS_Info from "./form_components/HTS_Info";

import { API_URL, EMAIL_URL, BASE_URL } from "../constants";

import axios from "axios";
import { useParams } from 'react-router-dom'


const ApproveFacilityChanges = (props) => {
  // get id of facility from url parameter
    const { fac_id } = useParams()

  	const [Facility_data, setFacility_data] = useState({})
    const [Original_data, setOriginal_data] = useState({})
    const [Counties_list, setCounties_list] = useState([])
    const [Owners_list, setOwners_list] = useState([])
    const [Partners_list, setPartners_list] = useState([])
   
    const [ctToggle, setCtToggle] = useState("");
    const [htsToggle, setHTSToggle] = useState("");
    const [ilToggle, setILToggle] = useState("");

  const getEditedData = async () => {
    await axios.get(API_URL+`/fetch_edits/data/${fac_id}`)
                .then(res => { 
                    setFacility_data( res.data[0]);
                    CT_slideToggle(res.data[0].CT); 
                    HTS_slideToggle(res.data[0].HTS) ;
                    IL_slideToggle(res.data[0].IL) ;
                } );
   
  }; 

  const getOriginalData = async () => {
    await axios.get(API_URL+`/fetch_facility_data/${fac_id}`)
                .then(res => { 
                  setOriginal_data( res.data[0]);
                    
                } );
   
  }; 

    
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

   const IL_slideToggle = (showtoggle) => {    
    setILToggle(showtoggle);
   };

   const confirm_approval = () =>{
    Swal.fire({
      title: 'Approve Changes?',
      text: "Approve the changes made to Facility.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1ab394',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Approve!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Approved!',
          'Changes were approved now reflect on the dashboard.',
          'success'
        )
        axios.post(EMAIL_URL+ "/send_customized_email", { "facility_id": fac_id, "choice":"approved","reason":"",
         "frontend_url":BASE_URL});
        // submit the data
        Post_approval()
      }
    })
 }

   const confirm_rejection = () =>{
      Swal.fire({
          title: 'Reject Changes?',
          text: "Reasons for Rejection? This will be sent to the modifier of this Facility for their knowledge",
          input: 'textarea',
          inputAttributes: {
            autocapitalize: 'off'
          },
          showCancelButton: true,
          confirmButtonText: 'Reject',
          confirmButtonColor: '#dc3545',
          showLoaderOnConfirm: true,
          preConfirm: (reasons) => {
              axios.post( EMAIL_URL+"/send_customized_email", { "facility_id": fac_id, "choice":"rejected",
                    "reason":reasons, "frontend_url":BASE_URL});
          },
          // allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
          if (result.isConfirmed) {
              Swal.fire(
                'Success!',
                'Success! Changes have been discarded!',
                'success'
              );
              // submit the data
              Post_rejection()
          } else {
            Swal.fire("Operation canceled!");
          }
      })
   }


   const Post_approval = async (event) => {    
        console.log(Facility_data)
        //event.preventDefault();

        await axios.post(API_URL + `/approve_changes/${fac_id}` , Facility_data)
              .then(function (response) { 
                  console.log('response --------->', response)
                   window.location.href = BASE_URL + `/facilities/view_facility/${fac_id}`;
                  console.log('redirecto to', response.data.redirect_url)
              })
              .catch(function (error) {
                console.log('failed ---/>', error);               
            });
   };


   const Post_rejection = async (event) => {    
        console.log(Facility_data)
        //event.preventDefault();

        await axios.post(API_URL + `/reject_changes/${fac_id}` , Facility_data)
              .then(function (response) { 
                  console.log('response --------->', response)
                  window.location.href = BASE_URL + '/'+response.data.redirect_url;
                  console.log('redirecto to', response.data.redirect_url)
              })
              .catch(function (error) {
                console.log('failed ---/>', error);               
            });
   };


   useEffect(() => {    
        getEditedData()
        getOriginalData()
        getCounties()    
        getOwners()
        getPartners()
  }, [])


    return (
          <div>             
          
              <Form  id="facility_form" class="form-control">
              <legend class="text-center mt-5"><b>Approve Changes</b></legend>
                  <p class="mb-3 text-center">Approve or Reject changes made to Facility</p>


                  <fieldset >
                      { Counties_list.length > 0 &&
                        <ErrorBoundary> 
                          <FacilityInfo facility_data={Facility_data} setFacility_data={setFacility_data}
                                        Original_data={Original_data}
                                        Counties_list={Counties_list}
                                          Owners_list={Owners_list} Partners_list={Partners_list}
                                          CT_slideToggle={CT_slideToggle}
                                          HTS_slideToggle={HTS_slideToggle} IL_slideToggle={IL_slideToggle} 
                                          ctToggle={ctToggle}/>
                        </ErrorBoundary> 
                      }                

                      { ctToggle &&
                        <ErrorBoundary> 
                          <EMRInfo facility_data={Facility_data}  Original_data={Original_data} setFacility_data={setFacility_data} counties_list={Counties_list}/>
                        </ErrorBoundary> 
                      }

                      <ErrorBoundary> 
                        <MHealthInfo facility_data={Facility_data}  Original_data={Original_data} setFacility_data={setFacility_data} counties_list={Counties_list}/>
                      </ErrorBoundary> 

                      { htsToggle &&
                        <ErrorBoundary> 
                          <HTS_Info facility_data={Facility_data}  Original_data={Original_data} setFacility_data={setFacility_data} counties_list={Counties_list}/>
                        </ErrorBoundary> 
                      } 

                      { ilToggle &&
                        <ErrorBoundary> 
                          <IL_Info facility_data={Facility_data}  Original_data={Original_data} setFacility_data={setFacility_data} counties_list={Counties_list}/>
                        </ErrorBoundary> 
                      } 

                        <div class=" d-flex justify-content-around mb-5">
                            <div >
                                <button name="approve" type="button" value="Approve changes" id="approve_changes" class="btn btn-success px-5" onClick={confirm_approval}>
                                    <i class="fa-solid fa-thumbs-up"></i> Approve changes
                                </button>

                                <button name="discard" type="button" value="Discard changes" id="discard_changes" class="btn btn-danger px-5"  onClick={confirm_rejection}>
                                    <i class="fa-solid fa-trash-can"></i> Discard changes
                                </button>
                            </div>
                        </div>
                  </fieldset>
                  
              </Form>
          </div>
       
      );
  // }
}

export default ApproveFacilityChanges;