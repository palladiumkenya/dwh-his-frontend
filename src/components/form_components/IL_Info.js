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
                <h6  class="green_text_color">Interoperability(IL) and Integrations</h6>

                <div id="IL" class="row section mb-5 form_section shadow-sm bg-white rounded p-4">
                                       
                    <b>IL modules</b>
                    <div class="d-flex justify-content-between mb-4">
                        <FormGroup check>
                            <Input id="webADT_pharmacy" name="webADT_pharmacy" type="checkbox" 
                            checked={props.facility_data.webADT_pharmacy}
                            className={ props.Original_data && props.Original_data.webADT_pharmacy != props.facility_data.webADT_pharmacy && "highlight_changed_checkbox"}
                            onChange={(e) => props.setFacility_data({...props.facility_data, "webADT_pharmacy":e.target.checked})}/>                   
                            <Label check>WebADT Pharmacy</Label>
                        </FormGroup>
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

                    <b>Integrations</b>       
                    <div class="d-flex justify-content-start">
                        <FormGroup check>
                            <Input id="il_lab_manifest" name="il_lab_manifest" type="checkbox" checked={props.facility_data.il_lab_manifest}
                            className={ props.Original_data && props.Original_data.il_lab_manifest != props.facility_data.il_lab_manifest && "highlight_changed_checkbox"}
                            onChange={(e) => props.setFacility_data({...props.facility_data, "il_lab_manifest":e.target.checked})}/>                   
                            <Label check>Lab Manifest</Label>
                        </FormGroup>
                        <FormGroup check>
                            <Input id="il_nimeconfirm" name="il_nimeconfirm" type="checkbox" checked={props.facility_data.il_nimeconfirm} 
                            className={ props.Original_data && props.Original_data.il_nimeconfirm != props.facility_data.il_nimeconfirm && "highlight_changed_checkbox"}
                            onChange={(e) => props.setFacility_data({...props.facility_data, "il_nimeconfirm":e.target.checked})}/>                   
                            <Label check>NimeCONFIRM</Label>
                        </FormGroup> 
                    </div>           
                </div>
            </div>
        );
    //  }
}

export default IL_Info;