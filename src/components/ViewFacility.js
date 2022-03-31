import React, { Component, useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label } from "reactstrap";
import {FaCheckSquare} from 'react-icons/fa';
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
                                    Facility_data.CT  ? <FaCheckSquare class="fa-solid fa-square-check green_text_color"/> :                                   
                                    <FaCheckSquare class="fa-solid fa-square-xmark text-muted"/>
                                    } 
                                    C&T
                                </p>
                                          

                                <p>{ Facility_data.HTS  ? <FaCheckSquare class="fa-solid fa-square-check green_text_color"/> : 
                                    <FaCheckSquare class="fa-solid fa-square-xmark  text-muted"/>
                                     } 
                                     HTS
                                </p>

                                <p>{ 
                                    Facility_data.mHealth ? <FaCheckSquare class="fa-solid fa-square-check green_text_color"/>: 
                                    <FaCheckSquare class="fa-solid fa-square-xmark  text-muted"/>
                                        }
                                    MHealth
                                </p>

                                <p>{Facility_data.IL   ? <FaCheckSquare class="fa-solid fa-square-check green_text_color"/>: 
                                    <FaCheckSquare class="fa-solid fa-square-xmark  text-muted"/>
                                    } 
                                    IL & Integrations
                                </p>

                                <p>{ 
                                    Facility_data.KP ? <FaCheckSquare class="fa-solid fa-square-check green_text_color"/>: 
                                    <FaCheckSquare class="fa-solid fa-square-xmark  text-muted"/>
                                        }
                                    KP
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

                            <div class="col-md-12 mb-0">
                                <b>EMR modules</b>
                                <div class="d-flex justify-content-between">
                                    <p>{ 
                                        Facility_data.ovc_offered    ? <FaCheckSquare class="fa-solid fa-square-check green_text_color"/>: 
                                        <FaCheckSquare class="fa-solid fa-square-xmark  text-muted"/>
                                         }
                                        OVC
                                    </p>
                                    <p>{ 
                                        Facility_data.otz_offered ? <FaCheckSquare class="fa-solid fa-square-check green_text_color"/> : 
                                        <FaCheckSquare class="fa-solid fa-square-xmark  text-muted"/>
                                         }
                                        OTZ
                                    </p>
                                    <p>{ 
                                        Facility_data.prep_offered ? <FaCheckSquare class="fa-solid fa-square-check green_text_color"/>: 
                                        <FaCheckSquare class="fa-solid fa-square-xmark  text-muted"/>
                                         }
                                        PrEP
                                    </p>
                                    <p>{ 
                                        Facility_data.tb_offered ? <FaCheckSquare class="fa-solid fa-square-check green_text_color"/> : 
                                        <FaCheckSquare class="fa-solid fa-square-xmark  text-muted"/>
                                         }
                                        TB
                                    </p>
                                    <p>{ 
                                        Facility_data.mnch_offered ? <FaCheckSquare class="fa-solid fa-square-check green_text_color"/>: 
                                        <FaCheckSquare class="fa-solid fa-square-xmark  text-muted"/>
                                         }
                                        MNCH
                                    </p>                                  
                                   
                                    <p>{ 
                                        Facility_data.tpt_offered ? <FaCheckSquare class="fa-solid fa-square-check green_text_color"/>: 
                                        <FaCheckSquare class="fa-solid fa-square-xmark  text-muted"/>
                                         }
                                        TPT
                                    </p>     
                                    <p>{ 
                                        Facility_data.covid_19_offered ? <FaCheckSquare class="fa-solid fa-square-check green_text_color"/> : 
                                        <FaCheckSquare class="fa-solid fa-square-xmark  text-muted"/>
                                         }
                                        Covid-19
                                    </p>     
                                    <p>{ 
                                        Facility_data.evmmc_offered ? <FaCheckSquare class="fa-solid fa-square-check green_text_color"/> : 
                                        <FaCheckSquare class="fa-solid fa-square-xmark  text-muted"/>
                                         }
                                        EVMMC
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
                                    Facility_data.mhealth_ushauri ? <FaCheckSquare class="fa-solid fa-square-check green_text_color"/>: 
                                    <FaCheckSquare class="fa-solid fa-square-xmark  text-muted"/>
                                        }
                                    Ushauri
                                </p>
                                <p>{ 
                                    Facility_data.mhealth_nishauri  ? <FaCheckSquare class="fa-solid fa-square-check green_text_color"/> : 
                                    <FaCheckSquare class="fa-solid fa-square-xmark  text-muted"/>
                                        }
                                    Nishauri
                                </p>   
                                <p>{ 
                                    Facility_data.mhealth_c4c ? <FaCheckSquare class="fa-solid fa-square-check green_text_color"/>  : 
                                    <FaCheckSquare class="fa-solid fa-square-xmark  text-muted"/>
                                        }
                                    C4C
                                </p>   
                                <p>{ 
                                    Facility_data.mhealth_mlab ? <FaCheckSquare class="fa-solid fa-square-check green_text_color"/> : 
                                    <FaCheckSquare class="fa-solid fa-square-xmark  text-muted"/>
                                        }
                                    MLab
                                </p>   
                                <p>{ 
                                    Facility_data.mhealth_art ? <FaCheckSquare class="fa-solid fa-square-check green_text_color"/> : 
                                    <FaCheckSquare class="fa-solid fa-square-xmark  text-muted"/>
                                        }
                                    ART Directory
                                </p>   
                                <p>{ 
                                    Facility_data.mhealth_psurvey ? <FaCheckSquare class="fa-solid fa-square-check green_text_color"/> : 
                                    <FaCheckSquare class="fa-solid fa-square-xmark  text-muted"/>
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
                        <h6  class="green_text_color">Interoperability(IL) and Integrations</h6>
                        <div id="IL" class="row  mb-5 form_section shadow-sm bg-white rounded p-4" >
                           
                            <div class="form-group col-md-10 mb-0">
                                <b>IL Modules</b>
                                <div class="d-flex justify-content-between">
                                    <p>{ 
                                        Facility_data.webADT_pharmacy ? <FaCheckSquare class="fa-solid fa-square-check green_text_color"/> : 
                                        <FaCheckSquare class="fa-solid fa-square-xmark  text-muted"/>
                                            }
                                        webADT_pharmacy
                                    </p>  
                                    <p>{ 
                                        Facility_data.il_mlab ? <FaCheckSquare class="fa-solid fa-square-check green_text_color"/> : 
                                        <FaCheckSquare class="fa-solid fa-square-xmark  text-muted"/>
                                            }
                                        MLab
                                    </p>  
                                    <p>{ 
                                        Facility_data.il_three_PM ? <FaCheckSquare class="fa-solid fa-square-check green_text_color"/> : 
                                        <FaCheckSquare class="fa-solid fa-square-xmark  text-muted"/>
                                            }
                                        3PM
                                    </p>  
                                    <p>{ 
                                        Facility_data.il_air ? <FaCheckSquare class="fa-solid fa-square-check green_text_color"/> : 
                                        <FaCheckSquare class="fa-solid fa-square-xmark  text-muted"/>
                                            }
                                        AIR
                                    </p>  
                                    <p>{ 
                                        Facility_data.il_ushauri ? <FaCheckSquare class="fa-solid fa-square-check green_text_color"/>: 
                                        <FaCheckSquare class="fa-solid fa-square-xmark  text-muted"/>
                                            }
                                        Ushauri
                                    </p>    
                                </div>
                                <b>Integrations</b>
                                <div class="col-md-4 d-flex justify-content-between">
                                    <p>{ 
                                        Facility_data.il_lab_manifest ? <FaCheckSquare class="fa-solid fa-square-check green_text_color"/>   : 
                                        <FaCheckSquare class="fa-solid fa-square-xmark  text-muted"/>
                                            }
                                        Lab Manifest
                                    </p> 
                                    <p>{ 
                                        Facility_data.il_nimeconfirm ? <FaCheckSquare class="fa-solid fa-square-check green_text_color"/>: 
                                        <FaCheckSquare class="fa-solid fa-square-xmark text-muted"/> 
                                            }
                                        NimeCONFIRM
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