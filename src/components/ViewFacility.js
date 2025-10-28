import React, { Component, useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label, Spinner, Container,Row,Col } from "reactstrap";
import {FaCheckSquare} from 'react-icons/fa';
import SlideToggle from "react-slide-toggle";
import axios from "axios";

import { API_URL } from "../constants";
import { BASE_URL } from "../constants";

import { useParams } from 'react-router-dom'
import * as XLSX from "xlsx";


const ViewFacility = () => {
    const { fac_id } = useParams()

    const [Facility_data, setFacility_data] = useState({})

    const [ctToggle, setCtToggle] = useState("");
    const [htsToggle, setHTSToggle] = useState("");
    const [ilToggle, setILToggle] = useState("");
    const [mHealthToggle, setMHealthToggle] = useState("");

    const [showCTSpinner, setShowCTSpinner] = useState(false);
    const [showHTSSpinner, setShowHTSSpinner] = useState(false);
    const [showPREPSpinner, setShowPREPSpinner] = useState(false);
    const [showMNCHSpinner, setShowMNCHSpinner] = useState(false);


    const getFacilityData = async () => {
        await axios.get(API_URL+`/view_facility/data/${fac_id}`)
                .then(res => { 
                    setFacility_data( res.data);    
                    CT_slideToggle(res.data.CT); 
                    HTS_slideToggle(res.data.HTS) ;
                    IL_slideToggle(res.data.IL) ;      
                    Mhealth_slideToggle(res.data.mHealth);             
                } );
       
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

    const addToCT = async (Facility_data) => {
        setShowCTSpinner(true)

        await axios.post(API_URL + `/sync/CT/MasterFacilities`, Facility_data)
            .then(function (response) {
                localStorage.setItem("flashMessage", "Facility added to CT in NDWH. You can now send that docket from DWAPI to NDWH");
                window.location.href = BASE_URL + `/facilities/view_facility/${Facility_data.id}`;

            })
            .catch(function (error) {
                localStorage.setItem("flashMessage", "Something went wrong. Failed to sync. Refresh and try again or contact Admin");
                window.location.href = BASE_URL + `/facilities/view_facility/${Facility_data.id}`;

            });
    };

    const addToHTS = async (Facility_data) => {
        setShowHTSSpinner(true)

        await axios.post(API_URL + `/sync/HTS/MasterFacilities`, Facility_data)
            .then(function (response) {
                localStorage.setItem("flashMessage", "Facility added to HTS in NDWH. You can now send that docket from DWAPI to NDWH");
                window.location.href = BASE_URL + `/facilities/view_facility/${Facility_data.id}`;

            })
            .catch(function (error) {
                localStorage.setItem("flashMessage", "Something went wrong. Failed to sync. Refresh and try again or contact Admin");
                window.location.href = BASE_URL + `/facilities/view_facility/${Facility_data.id}`;

            });
    };


    const addToPREP = async (Facility_data) => {
        setShowPREPSpinner(true)

        await axios.post(API_URL + `/sync/PREP/MasterFacilities`, Facility_data)
            .then(function (response) {
                localStorage.setItem("flashMessage", "Facility added to PREP in NDWH. You can now send that docket from DWAPI to NDWH");
                window.location.href = BASE_URL + `/facilities/view_facility/${Facility_data.id}`;

            })
            .catch(function (error) {
                localStorage.setItem("flashMessage", "Something went wrong. Failed to sync. Refresh and try again or contact Admin");
                window.location.href = BASE_URL + `/facilities/view_facility/${Facility_data.id}`;

            });
    };

    const addToMNCH = async (Facility_data) => {
        setShowMNCHSpinner(true)

        await axios.post(API_URL + `/sync/MNCH/MasterFacilities`, Facility_data)
            .then(function (response) {
                localStorage.setItem("flashMessage", "Facility added to MNCH in NDWH. You can now send that docket from DWAPI to NDWH");
                window.location.href = BASE_URL + `/facilities/view_facility/${Facility_data.id}`;

            })
            .catch(function (error) {
                localStorage.setItem("flashMessage", "Something went wrong. Failed to sync. Refresh and try again or contact Admin");
                window.location.href = BASE_URL + `/facilities/view_facility/${Facility_data.id}`;

            });
    };

    useEffect(() => {    
        getFacilityData()  
     }, [])


    return (
        <section className="mx-5">
            <div className=" mx-auto" style={{width:"80%"}}>
                <legend className=" mt-3 text-center text-capitalize"><b>{Facility_data.name} Facility</b></legend>
                <p className="mb-3 mt-3 text-center"> View facility details</p>
                <Container>
                    <Row>
                        <Col xs={3}>
                            <button className="btn btn-warning" onClick={(e) => addToCT(Facility_data)} >
                                Add to NDWH CT {showCTSpinner && <Spinner style={{width: "1.2rem", height: "1.2rem"}}></Spinner> }
                            </button>
                        </Col>
                        <Col xs={3}>
                            <button className="btn btn-warning" onClick={(e) => addToHTS(Facility_data)} >
                                Add to NDWH HTS {showHTSSpinner && <Spinner style={{width: "1.2rem", height: "1.2rem"}}></Spinner> }
                            </button>
                        </Col>
                        <Col xs={3}>
                            <button className="btn btn-warning" onClick={(e) => addToMNCH(Facility_data)} >
                                Add to NDWH MNCH {showMNCHSpinner && <Spinner style={{width: "1.2rem", height: "1.2rem"}}></Spinner> }
                            </button>
                        </Col>
                        <Col xs={3}>
                            <button className="btn btn-warning" onClick={(e) => addToPREP(Facility_data)} >
                                Add to NDWH PREP {showPREPSpinner && <Spinner style={{width: "1.2rem", height: "1.2rem"}}></Spinner> }
                            </button>
                        </Col>
                    </Row>
                </Container>


                <h6 id="facility_toggle" className="green_text_color mt-5">Facility Information</h6>
                <div className="row mb-5 form_section shadow-sm bg-white rounded p-3" >

                    <div className="d-flex col-md-3 mb-4">
                        <b>MFL Code : </b>
                        <p>{Facility_data.mfl_code}</p>
                    </div>
                    <div className="d-flex col-md-5 mb-4">
                        <b>Facility Name  : </b>
                        <p>{Facility_data.name}</p>
                    </div>
                    <div className="d-flex col-md-4 mb-4">
                        <b>Owner : </b>
                        <p>{Facility_data.owner}</p>
                    </div>

                    <div className="d-flex col-md-3 mb-3">
                        <b>County : </b>
                        <p>{Facility_data.county}</p>
                    </div>
                    <div className="d-flex col-md-3 mb-3">
                        <b>Sub-county : </b>
                        <p>{Facility_data.sub_county}</p>
                    </div>
                    <div className="d-flex col-md-3 mb-3">
                        <b>Ward : </b>
                        <p>{Facility_data.ward}</p>
                    </div>
                    <div className="d-flex col-md-3 mb-2">
                        <b>Latitude : </b>
                        <p>{Facility_data.lat}</p>
                    </div>
                    <div className="d-flex col-md-3 mb-2">
                        <b>Longitude : </b>
                        <p>{Facility_data.lon}</p>
                    </div>

                    <div className="d-flex col-md-3 mb-2">
                        <b>Agency : </b>
                        <p>{Facility_data.agency}</p>
                    </div>
                    <div className="d-flex col-md-3 ">
                        <b>SDP : </b>
                        <p>{Facility_data.partner}</p>
                    </div>
                    <div className="d-flex col-md-3 mb-2">
                        <b>Infrastructure Type : </b>
                        <p>{Facility_data.infrastructure_type}</p>
                    </div>
                    <div className="d-flex col-md-3 mb-2">
                        <b>KEPH_Level : </b>
                        <p>{Facility_data.KEPH_Level}</p>
                    </div>
                    <div className="d-flex col-md-3 mb-5">
                        <b>KMPDC Registration No. : </b>
                        <p>{Facility_data.KMPDC_reg_no}</p>
                    </div>

                    <b>Facility Type</b>
                    <div className="d-flex justify-content-between col-md-2 mb-4">
                        <p>{
                            Facility_data.emr_site ? <FaCheckSquare className="fa-solid fa-square-check green_text_color"/>:
                                <FaCheckSquare className="fa-solid fa-square-xmark  text-muted"/>
                        }
                            EMR site
                        </p>
                        <p>{
                            Facility_data.non_emr_site ? <FaCheckSquare className="fa-solid fa-square-check green_text_color"/>:
                                <FaCheckSquare className="fa-solid fa-square-xmark  text-muted"/>
                        }
                            Non-EMR site
                        </p>
                    </div>
                    <div className="d-flex justify-content-between col-md-3 mb-4">

                        <b>Non-EMR sites Options</b>
                        <p>{
                            Facility_data.asal ? <FaCheckSquare className="fa-solid fa-square-check green_text_color"/>:
                                <FaCheckSquare className="fa-solid fa-square-xmark  text-muted"/>
                        }
                            ASAL
                        </p>
                        <p>{
                            Facility_data.pepfar ? <FaCheckSquare className="fa-solid fa-square-check green_text_color"/>:
                                <FaCheckSquare className="fa-solid fa-square-xmark  text-muted"/>
                        }
                            PEPFAR
                        </p>
                    </div>

                    <b>Implementation</b>
                    <div  className="row form_section bg-white ">
                        <div className="d-flex col-md-2 mb-4">
                            <b>EMR : </b>
                            <p>{Facility_data.emr_type}</p>
                        </div>
                        <div className="d-flex col-md-4 mb-4">
                            <b>Date Of EMR Implementation : </b>
                            <p>{Facility_data.date_of_emr_impl}</p>
                        </div>
                        <div className="d-flex col-md-3 mb-4">
                            <b>Mode Of Use : </b>
                            <p>{Facility_data.mode_of_use}</p>
                        </div>
                        <div className="d-flex col-md-3 mb-4">
                            <b>EMR Status : </b>
                            <p>{Facility_data.emr_status}</p>
                        </div>
                    </div>
                    <div  className="row form_section bg-white ">
                        <div className="d-flex col-md-2 mb-4">
                            <p>{
                                Facility_data.facility_wide_site  ? <FaCheckSquare className="fa-solid fa-square-check green_text_color"/> :
                                    <FaCheckSquare className="fa-solid fa-square-xmark text-muted"/>
                            }
                                Facility Wide Site
                            </p>
                        </div>
                        <div className="d-flex col-md-4 mb-4">
                            <p>{
                                Facility_data.hiv_clinic_site  ? <FaCheckSquare className="fa-solid fa-square-check green_text_color"/> :
                                    <FaCheckSquare className="fa-solid fa-square-xmark text-muted"/>
                            }
                                HIV Clinic Site:
                            </p>
                        </div>
                        <div className="d-flex col-md-3 mb-4">
                            <b>Date of Implementation : </b>
                            <p>{Facility_data.date_of_init}</p>
                        </div>
                        <div className="d-flex col-md-3 mb-4">
                            <b>Ownership Category:</b>
                            <p>{Facility_data.ownership_category}</p>
                        </div>
                    </div>

                    <b>Implementation</b>
                    <div className=" col-md-4 mb-4">
                            <div className="d-flex justify-content-between mr-5">
                                <p>{
                                    Facility_data.CT  ? <FaCheckSquare className="fa-solid fa-square-check green_text_color"/> :
                                    <FaCheckSquare className="fa-solid fa-square-xmark text-muted"/>
                                    } 
                                    C&T
                                </p>
                                          

                                <p>{ Facility_data.HTS  ? <FaCheckSquare className="fa-solid fa-square-check green_text_color"/> :
                                    <FaCheckSquare className="fa-solid fa-square-xmark  text-muted"/>
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
                        <h6  class="green_text_color">CT Information</h6>
                        <div id="EMR" class="row  mb-5 form_section shadow-sm bg-white rounded p-4" >

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

                { Facility_data.mHealth &&
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
                }

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
                                <b>IL Participating Systems</b>
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
                                        KHIS
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
