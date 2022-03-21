import React, { Component, useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import SlideToggle from "react-slide-toggle";
import axios from "axios";

import { API_URL } from "../constants";
import { BASE_URL } from "../constants";

import { useParams } from 'react-router-dom'


const ViewFacility = () => {
    const { fac_id } = useParams()

    const [Facility_data, setFacility_data] = useState({})

    const [ctToggle, setCtToggle] = useState("");
    const [htsToggle, setHTSToggle] = useState("");
    const [ilToggle, setILToggle] = useState("");

    const getFacilityData = async () => {
        await axios.get(API_URL+`/view_facility/data/${fac_id}`)
                .then(res => { 
                    setFacility_data( res.data);    
                    CT_slideToggle(res.data.CT); 
                    HTS_slideToggle(res.data.HTS) ;
                    IL_slideToggle(res.data.IL) ;                   
                } );
       
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


    useEffect(() => {    
        getFacilityData()       
     }, [])


    return (
        <section class="mx-5">
            <div class=" mx-auto" style={{width:"80%"}}>
                <legend class=" mt-3 text-center text-capitalize"><b>{Facility_data.name} Facility</b></legend>
                <p class="mb-3 mt-3 text-center"> View facility details</p>

                <h6 id="facility_toggle" class="green_text_color">Facility Information</h6>
                <div class="row mb-5 form_section shadow-sm bg-white rounded p-3" >

                    <div class="d-flex col-md-3 mb-4">
                        <b>MFL Code : </b>
                        <p>{Facility_data.mfl_code}</p>
                    </div>
                    <div class="d-flex col-md-5 mb-4">
                        <b>Facility Name  : </b>
                        <p>{Facility_data.name}</p>
                    </div>
                    <div class="d-flex col-md-4 mb-4">
                        <b>Owner : </b>
                        <p>{Facility_data.owner}</p>
                    </div>

                    <div class="d-flex col-md-3 mb-3">
                        <b>County : </b>
                            <p>{Facility_data.county}</p>
                        </div>
                        <div class="d-flex col-md-3 mb-3">
                            <b>Sub-county : </b>
                            <p>{Facility_data.sub_county}</p>
                        </div>
                        <div class="d-flex col-md-3 mb-2">
                            <b>Latitude : </b>
                            <p>{Facility_data.lat}</p>
                        </div>
                        <div class="d-flex col-md-3 mb-2">
                            <b>Longitude : </b>
                            <p>{Facility_data.lon}</p>
                        </div>

                        <div class="d-flex col-md-6 mb-5">
                            <b>Agency : </b>
                            <p>{Facility_data.agency}</p>
                        </div>
                        <div class="d-flex col-md-6 ">
                            <b>SDP : </b>
                            <p>{Facility_data.partner}</p>
                        </div>

                        <div class=" col-md-4 mb-4">
                            <b>Implementation</b>
                            <div class="d-flex justify-content-between mr-5">
                                <p>{
                                    <i class="fa-solid fa-square-check green_text_color"></i>  ? Facility_data.CT :                                   
                                    <i class="fa-solid fa-square-xmark  text-muted"></i>
                                    } 
                                    CT
                                </p>
                                          

                                <p>{ <i class="fa-solid fa-square-check green_text_color"></i>  ? Facility_data.HTS : 
                                    <i class="fa-solid fa-square-xmark  text-muted"></i>
                                     } 
                                     HTS
                                </p>

                                <p>{<i class="fa-solid fa-square-check green_text_color"></i>  ? Facility_data.IL : 
                                    <i class="fa-solid fa-square-xmark  text-muted"></i> 
                                    } 
                                    IL
                                </p>
                            </div>
                        </div>

                </div>

                { Facility_data.CT &&
                    <div class="" id="EMR_info">
                        <h6  class="green_text_color">EMR Information</h6>
                        <div id="EMR" class="row  mb-5 form_section shadow-sm bg-white rounded p-4" >

                            <div class="d-flex col-md-6 mb-4">
                                <b>EMR : </b>
                                <p>{Facility_data.emr_type}</p>
                            </div>
                            <div class="d-flex col-md-6 mb-4">
                                <b>EMR Status : </b>
                                <p>{Facility_data.emr_status}</p>
                            </div>

                            <div class="col-md-10 mb-0">
                                <b>EMR modules</b>
                                <div class="d-flex justify-content-between">
                                    <p>{ 
                                        <i class="fa-solid fa-square-check green_text_color"></i>   ? Facility_data.ovc_offered : 
                                        <i class="fa-solid fa-square-xmark text-muted"></i> 
                                         }
                                        OVC
                                    </p>
                                    <p>{ 
                                        <i class="fa-solid fa-square-check green_text_color"></i>   ? Facility_data.otz_offered : 
                                        <i class="fa-solid fa-square-xmark text-muted"></i> 
                                         }
                                        OTZ
                                    </p>
                                    <p>{ 
                                        <i class="fa-solid fa-square-check green_text_color"></i>   ? Facility_data.prep_offered : 
                                        <i class="fa-solid fa-square-xmark text-muted"></i> 
                                         }
                                        PrEP
                                    </p>
                                    <p>{ 
                                        <i class="fa-solid fa-square-check green_text_color"></i>   ? Facility_data.tb_offered : 
                                        <i class="fa-solid fa-square-xmark text-muted"></i> 
                                         }
                                        TB
                                    </p>
                                    <p>{ 
                                        <i class="fa-solid fa-square-check green_text_color"></i>   ? Facility_data.mnch_offered : 
                                        <i class="fa-solid fa-square-xmark text-muted"></i> 
                                         }
                                        MNCH
                                    </p>
                                    <p>{ 
                                        <i class="fa-solid fa-square-check green_text_color"></i>   ? Facility_data.kp_offered : 
                                        <i class="fa-solid fa-square-xmark text-muted"></i> 
                                         }
                                        KP
                                    </p>
                                    <p>{ 
                                        <i class="fa-solid fa-square-check green_text_color"></i>   ? Facility_data.lab_man_offered : 
                                        <i class="fa-solid fa-square-xmark text-muted"></i> 
                                         }
                                        Lab Manifest
                                    </p>                                  

                                </div>
                            </div>
                        </div>
                    </div>
                }


                <div class="" id="MHealth_info">
                    <h6  class="green_text_color">MHealth Information</h6>
                    <div id="Mhealth" class="row  mb-5 form_section shadow-sm bg-white rounded p-4" >
                        <div  class="row section mb-4 col-md-10">
                            <b>MHealth Information</b>
                            <div class="d-flex justify-content-between">
                                <p>{ 
                                    <i class="fa-solid fa-square-check green_text_color"></i>   ? Facility_data.mhealth_ushauri : 
                                    <i class="fa-solid fa-square-xmark text-muted"></i> 
                                        }
                                    Ushauri
                                </p>
                                <p>{ 
                                    <i class="fa-solid fa-square-check green_text_color"></i>   ? Facility_data.mhealth_nishauri : 
                                    <i class="fa-solid fa-square-xmark text-muted"></i> 
                                        }
                                    Nishauri
                                </p>   
                                <p>{ 
                                    <i class="fa-solid fa-square-check green_text_color"></i>   ? Facility_data.mhealth_c4c : 
                                    <i class="fa-solid fa-square-xmark text-muted"></i> 
                                        }
                                    C4C
                                </p>   
                                <p>{ 
                                    <i class="fa-solid fa-square-check green_text_color"></i>   ? Facility_data.mhealth_mlab : 
                                    <i class="fa-solid fa-square-xmark text-muted"></i> 
                                        }
                                    MLab
                                </p>   
                                <p>{ 
                                    <i class="fa-solid fa-square-check green_text_color"></i>   ? Facility_data.mhealth_art : 
                                    <i class="fa-solid fa-square-xmark text-muted"></i> 
                                        }
                                    ART Directory
                                </p>   
                                <p>{ 
                                    <i class="fa-solid fa-square-check green_text_color"></i>   ? Facility_data.mhealth_psurvey : 
                                    <i class="fa-solid fa-square-xmark text-muted"></i> 
                                        }
                                    PSurvey
                                </p>                                  
                            </div>
                        </div>
                    </div>
                </div>

                { Facility_data.HTS &&
                    <div class="" id="HTS_info">
                        <h6  class="green_text_color">HTS Information</h6>
                        <div id="HTS" class="row  mb-5 form_section shadow-sm bg-white rounded p-4" >

                            <div class="d-flex col-md-4 mb-4">
                                <b>HTS Use : </b>
                                <p>{Facility_data.hts_use}</p>
                            </div>
                            <div class="d-flex col-md-4 mb-4">
                                <b>Deployment : </b>
                                <p>{Facility_data.hts_deployment}</p>
                            </div>
                            <div class="d-flex col-md-4 mb-4">
                                <b>HTS Status : </b>
                                <p>{Facility_data.hts_status}</p>
                            </div>
                        </div>
                    </div>
                }

                { Facility_data.IL &&
                    <div class="" id="IL_info">
                        <h6  class="green_text_color">IL Information</h6>
                        <div id="IL" class="row  mb-5 form_section shadow-sm bg-white rounded p-4" >
                            <b>IL Information</b>
                            <div class="d-flex col-md-4 mb-4">
                                <b>HTS Use : </b>
                                <p>{Facility_data.hts_use}</p>
                            </div>
                            <div class="d-flex col-md-4 mb-4">
                                <b>Deployment : </b>
                                <p>{Facility_data.hts_deployment}</p>
                            </div>
                            <div class="d-flex col-md-4 mb-4">
                                <b>HTS Status : </b>
                                <p>{Facility_data.hts_status}</p>
                            </div>

                            <div class="form-group col-md-5 mb-0">
                                <b>IL Modules</b>
                                <div class="d-flex justify-content-between">
                                    <p>{ 
                                        <i class="fa-solid fa-square-check green_text_color"></i>   ? Facility_data.il_mlab : 
                                        <i class="fa-solid fa-square-xmark text-muted"></i> 
                                            }
                                        MLab
                                    </p>  
                                    <p>{ 
                                        <i class="fa-solid fa-square-check green_text_color"></i>   ? Facility_data.il_three_PM : 
                                        <i class="fa-solid fa-square-xmark text-muted"></i> 
                                            }
                                        3PM
                                    </p>  
                                    <p>{ 
                                        <i class="fa-solid fa-square-check green_text_color"></i>   ? Facility_data.il_air : 
                                        <i class="fa-solid fa-square-xmark text-muted"></i> 
                                            }
                                        AIR
                                    </p>  
                                    <p>{ 
                                        <i class="fa-solid fa-square-check green_text_color"></i>   ? Facility_data.il_ushauri : 
                                        <i class="fa-solid fa-square-xmark text-muted"></i> 
                                            }
                                        Ushauri
                                    </p>    
                                </div>
                            </div>
                        </div>
                    </div>
                }


            </div>
        </section>
    );
    // }
}
  
export default ViewFacility;