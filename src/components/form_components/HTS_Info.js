import React, { Component, useEffect, useState } from "react";
import { Input, Label, FormGroup } from "reactstrap";

import axios from "axios";
import { API_URL } from "../../constants";


function HTS_Info(props) {    
    
    const [HTS_uses, setHTS_uses] = useState([])
    const [Deployment_types, setDeployment_types] = useState([])
    const statuses = ['', 'Active', 'Stalled/Inactive', 'Discontinued'];

    const getHTS_uses = async() => {
        await axios.get(API_URL+"/hts_uses").then(res => {setHTS_uses( res.data ); console.log(res.data)});
       };

    const getDeployment_types = async() => {
    await axios.get(API_URL+"/hts_deployment_types").then(res => setDeployment_types( res.data ));
    };

    const updateDeploymentOptions = (e) => {
        if (e.target.value == "1" || e.target.value == "3"){
            setDeployment_types([["", ""], [1, "Mobile Only"], [3, "Hybrid"]])
        }else if(e.target.value == "2"){
            setDeployment_types([["", ""],[2, "Desktop Only"], [3, "Hybrid"]])
        }else{
            setDeployment_types([["", ""]])
        }
        
    }
  

    useEffect(() => {        
        getHTS_uses()       
        getDeployment_types()     
    }, [])

    

        return (
            <div id="HTS_info">
                <h6  class="green_text_color">HTS Information</h6>
                <div id="HTS" class="row  mb-5 form_section shadow-sm bg-white rounded p-4">

                    <b>HTS Information</b>                   
                    <div class="form-group col-md-4 mb-4">
                        <Label for="hts_use">HTS Use:</Label>
                        <Input id="hts_use" name="hts_use" type="select" value={props.facility_data.hts_use} required
                            className={ props.Original_data && props.Original_data.hts_use != props.facility_data.hts_use && "highlight_changed_data"}
                            onChange={(e) => { updateDeploymentOptions(e); props.setFacility_data({...props.facility_data, "hts_use":e.target.value}) }}>
                                { 
                                HTS_uses.map(type => (    
                                        <option key={type[0]} value={type[0]}>{type[1]}</option>
                                    ))                              
                                }  
                        </Input> 
                    </div>
                    <div class="form-group col-md-4 mb-4">
                        <Label for="hts_deployment">Deployment:</Label>
                        <Input id="hts_deployment" name="hts_deployment" type="select" value={props.facility_data.hts_deployment} required
                            className={ props.Original_data && props.Original_data.hts_deployment != props.facility_data.hts_deployment && "highlight_changed_data"}
                            onChange={(e) => props.setFacility_data({...props.facility_data, "hts_deployment":e.target.value})}>
                                { 
                                Deployment_types.map(type => (    
                                    <option key={type[0]} value={type[0]}>{type[1]}</option>
                                ))                              
                                }  
                        </Input> 
                    </div>
                    <div class="form-group col-md-4 mb-4">
                        <Label for="hts_status">HTS Status:</Label>
                        <Input id="hts_status" name="hts_status" type="select" value={props.facility_data.hts_status} required
                            className={ props.Original_data && props.Original_data.hts_status != props.facility_data.hts_status && "highlight_changed_data"}
                            onChange={(e) => props.setFacility_data({...props.facility_data, "hts_status":e.target.value})}>
                                { 
                                statuses.map(status => (    
                                        <option value={status}>{status}</option>
                                    ))                              
                                }  
                        </Input> 
                    </div>                                    
                </div>
            </div>
        );
    //  }
}

export default HTS_Info;