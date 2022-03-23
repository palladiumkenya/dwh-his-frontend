import React, { Component, useEffect, useState } from "react";
import { Input, Label, FormGroup } from "reactstrap";

import axios from "axios";
import { API_URL } from "../../constants";


function EMRInfo(props) { 
    
    const [EMR_types, setEMR_types] = useState([])

    const statuses = ["", 'Active', 'Stalled/Inactive', 'Discontinued'];
 
    const getEmrTypes = async() => {
        await axios.get(API_URL+"/emr_types").then(res => setEMR_types( res.data ));
       };

    useEffect(() => {        
        getEmrTypes()        
    }, [])

        return (
            
            <div id="EMR_info">
                 <h6  class="green_text_color">EMR Information</h6>
                <div id="EMR" class="row  mb-5 form_section shadow-sm bg-white rounded p-4" >
                    <div class="form-group col-md-3 mb-4">
                        <Label for="emr_type">EMR Type:</Label>
                        <Input id="emr_type" name="emr_type" type="select" value={props.facility_data.emr_type} required
                            className={ props.Original_data && props.Original_data.emr_type != props.facility_data.emr_type && "highlight_changed_data"}
                            onChange={(e) => props.setFacility_data({...props.facility_data, "emr_type":e.target.value})}>
                            { 
                                EMR_types.map(type => (    
                                        <option value={type[0]}>{type[1]}</option>
                                    ))                              
                                }   
                        </Input> 
                    </div>
                    <div class="form-group col-md-3 mb-4">
                        <Label for="emr_status">EMR Status:</Label>
                        <Input id="emr_status" name="emr_status" type="select" value={props.facility_data.emr_status} required
                            className={ props.Original_data && props.Original_data.emr_status != props.facility_data.emr_status && "highlight_changed_data"}
                            onChange={(e) => props.setFacility_data({...props.facility_data, "emr_status":e.target.value})}>
                                { 
                                statuses.map(status => (    
                                        <option value={status}>{status}</option>
                                    ))                              
                                }  
                        </Input> 
                    </div>

                    <b>EMR modules</b>
                    <div class="d-flex justify-content-between">
                        <FormGroup check>
                            <Input id="ovc_offered" name="ovc_offered" type="checkbox" checked={props.facility_data.ovc_offered}
                            className={ props.Original_data && props.Original_data.ovc_offered != props.facility_data.ovc_offered && "highlight_changed_checkbox"}
                             onChange={(e) => props.setFacility_data({...props.facility_data, "ovc_offered":e.target.checked})}/>                   
                            <Label check>OVC</Label>
                        </FormGroup>
                        <FormGroup check>
                            <Input id="otz_offered" name="otz_offered" type="checkbox" checked={props.facility_data.otz_offered}
                            className={ props.Original_data && props.Original_data.otz_offered != props.facility_data.otz_offered && "highlight_changed_checkbox"}
                             onChange={(e) => props.setFacility_data({...props.facility_data, "otz_offered":e.target.checked})}/>                   
                            <Label check>OTZ</Label>
                        </FormGroup>
                        <FormGroup check>
                            <Input id="prep_offered" name="prep_offered" type="checkbox" checked={props.facility_data.prep_offered}
                            className={ props.Original_data && props.Original_data.prep_offered != props.facility_data.prep_offered && "highlight_changed_checkbox"}
                             onChange={(e) => props.setFacility_data({...props.facility_data, "prep_offered":e.target.checked})}/>                   
                            <Label check>PrEP</Label>
                        </FormGroup>
                        <FormGroup check>
                            <Input id="tb_offered" name="tb_offered" type="checkbox"checked={props.facility_data.tb_offered} 
                            className={ props.Original_data && props.Original_data.tb_offered != props.facility_data.tb_offered && "highlight_changed_checkbox"}
                             onChange={(e) => props.setFacility_data({...props.facility_data, "tb_offered":e.target.checked})}/>                   
                            <Label check>TB</Label>
                        </FormGroup>
                        <FormGroup check>
                            <Input id="mnch_offered" name="mnch_offered" type="checkbox" checked={props.facility_data.mnch_offered}
                            className={ props.Original_data && props.Original_data.mnch_offered != props.facility_data.mnch_offered && "highlight_changed_checkbox"}
                             onChange={(e) => props.setFacility_data({...props.facility_data, "mnch_offered":e.target.checked})}/>                   
                            <Label check>MNCH</Label>
                        </FormGroup>
                        <FormGroup check>
                            <Input id="kp_offered" name="kp_offered" type="checkbox" checked={props.facility_data.kp_offered}
                            className={ props.Original_data && props.Original_data.kp_offered != props.facility_data.kp_offered && "highlight_changed_checkbox"}
                             onChange={(e) => props.setFacility_data({...props.facility_data, "kp_offered":e.target.checked})}/>                   
                            <Label check>KP</Label>
                        </FormGroup>    
                        {/* <FormGroup check>
                            <Input id="lab_man_offered" name="lab_man_offered" type="checkbox" checked={props.facility_data.lab_man_offered}
                            className={ props.Original_data && props.Original_data.lab_man_offered != props.facility_data.lab_man_offered && "highlight_changed_checkbox"}
                             onChange={(e) => props.setFacility_data({...props.facility_data, "lab_man_offered":e.target.checked})}/>                   
                            <Label check>Lab Manifest</Label>
                        </FormGroup>      */}
                        <FormGroup check>
                            <Input id="hiv_offered" name="hiv_offered" type="checkbox" checked={props.facility_data.hiv_offered}
                            className={ props.Original_data && props.Original_data.hiv_offered != props.facility_data.hiv_offered && "highlight_changed_checkbox"}
                             onChange={(e) => props.setFacility_data({...props.facility_data, "hiv_offered":e.target.checked})}/>                   
                            <Label check>HIV</Label>
                        </FormGroup>  
                        <FormGroup check>
                            <Input id="tpt_offered" name="tpt_offered" type="checkbox" checked={props.facility_data.tpt_offered}
                            className={ props.Original_data && props.Original_data.tpt_offered != props.facility_data.tpt_offered && "highlight_changed_checkbox"}
                             onChange={(e) => props.setFacility_data({...props.facility_data, "tpt_offered":e.target.checked})}/>                   
                            <Label check>TPT</Label>
                        </FormGroup>  
                        <FormGroup check>
                            <Input id="covid_19_offered" name="covid_19_offered" type="checkbox" checked={props.facility_data.covid_19_offered}
                            className={ props.Original_data && props.Original_data.covid_19_offered != props.facility_data.covid_19_offered && "highlight_changed_checkbox"}
                             onChange={(e) => props.setFacility_data({...props.facility_data, "covid_19_offered":e.target.checked})}/>                   
                            <Label check>Covid-19</Label>
                        </FormGroup>  
                        <FormGroup check>
                            <Input id="evmmc_offered" name="evmmc_offered" type="checkbox" checked={props.facility_data.evmmc_offered}
                            className={ props.Original_data && props.Original_data.evmmc_offered != props.facility_data.evmmc_offered && "highlight_changed_checkbox"}
                             onChange={(e) => props.setFacility_data({...props.facility_data, "evmmc_offered":e.target.checked})}/>                   
                            <Label check>EVMMC</Label>
                        </FormGroup>  


                    </div>                   
                </div>
            </div>
        );
    //  }
}

export default EMRInfo;