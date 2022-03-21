import React, { Component, useEffect, useState } from "react";
import { Input, Label, FormGroup } from "reactstrap";

import axios from "axios";
import { API_URL } from "../../constants";


function IL_Info(props) { 
    
    const statuses = ['Active', 'Stalled/Inactive', 'Discontinued'];

    const getEmrTypes = async () => {
        await axios.get(API_URL+"/emr_types").then(res =>{ return (res.data) });
       };

    const emrTypes = [[1, "KenyaEMR"], [2, "IQCare-KeHMIS"], [3, "AMRS"]]
    // axios.get(API_URL+"/emr_types").then(res =>{ emrTypes = res.data });
    // console.log(emrTypes.id)

        return (
            <div id="IL_info">
                <h6  class="green_text_color">Interoperability(IL) and Integration</h6>

                    <div id="IL" class="row section mb-5 form_section shadow-sm bg-white rounded p-4">
                        <b>IL Information</b>                 
                    <div class="col-md-5 d-flex justify-content-between">
                        <FormGroup check>
                            <Input id="webADT_registration" name="webADT_registration" type="checkbox" 
                            checked={props.facility_data.webADT_registration}
                            className={ props.Original_data && props.Original_data.webADT_registration != props.facility_data.webADT_registration && "highlight_changed_checkbox"}
                            onChange={(e) => props.setFacility_data({...props.facility_data, "webADT_registration":e.target.checked})}/>                   
                            <Label check>WebADT Registration</Label>
                        </FormGroup>
                        <FormGroup check>
                            <Input id="webADT_pharmacy" name="webADT_pharmacy" type="checkbox" 
                            checked={props.facility_data.webADT_pharmacy}
                            className={ props.Original_data && props.Original_data.webADT_pharmacy != props.facility_data.webADT_pharmacy && "highlight_changed_checkbox"}
                            onChange={(e) => props.setFacility_data({...props.facility_data, "webADT_pharmacy":e.target.checked})}/>                   
                            <Label check>WebADT Pharmacy</Label>
                        </FormGroup>
                    </div>
                    <div class="form-group col-md-2 mb-4"></div>
                    <div class="form-group col-md-5 mb-4">
                        <Label for="il_status">IL Status:</Label>
                        <Input id="il_status" name="il_status" type="select" value={props.facility_data.il_status}
                            className={ props.Original_data && props.Original_data.il_status != props.facility_data.il_status && "highlight_changed_data"}
                            onChange={(e) => props.setFacility_data({...props.facility_data, "il_status":e.target.value})}>
                                { 
                                statuses.map(status => (    
                                        <option value={status}>{status}</option>
                                    ))                              
                                }  
                        </Input> 
                    </div>

                    <b>IL modules</b>
                    <div class="d-flex justify-content-between">
                        <FormGroup check>
                            <Input id="il_mlab" name="il_mlab" type="checkbox" checked={props.facility_data.il_mlab}
                            className={ props.Original_data && props.Original_data.il_mlab != props.facility_data.il_mlab && "highlight_changed_checkbox"}
                            onChange={(e) => props.setFacility_data({...props.facility_data, "il_mlab":e.target.checked})}/>                   
                            <Label check>Mlab</Label>
                        </FormGroup>
                        <FormGroup check>
                            <Input id="il_three_PM" name="il_three_PM" type="checkbox" checked={props.facility_data.il_three_PM}
                            className={ props.Original_data && props.Original_data.il_three_PM != props.facility_data.il_three_PM && "highlight_changed_checkbox"}
                            onChange={(e) => props.setFacility_data({...props.facility_data, "il_three_PM":e.target.checked})}/>                   
                            <Label check>3PM</Label>
                        </FormGroup>
                        <FormGroup check>
                            <Input id="il_air" name="il_air" type="checkbox" checked={props.facility_data.il_air}
                            className={ props.Original_data && props.Original_data.il_air != props.facility_data.il_air && "highlight_changed_checkbox"}
                            onChange={(e) => props.setFacility_data({...props.facility_data, "il_air":e.target.checked})}/>                   
                            <Label check>AIR</Label>
                        </FormGroup>
                        <FormGroup check>
                            <Input id="il_ushauri" name="il_ushauri" type="checkbox" checked={props.facility_data.il_ushauri} 
                            className={ props.Original_data && props.Original_data.il_ushauri != props.facility_data.il_ushauri && "highlight_changed_checkbox"}
                            onChange={(e) => props.setFacility_data({...props.facility_data, "il_ushauri":e.target.checked})}/>                   
                            <Label check>Ushauri</Label>
                        </FormGroup>                                       
                    </div>                   
                </div>
            </div>
        );
    //  }
}

export default IL_Info;