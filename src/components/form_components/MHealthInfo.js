import React, { Component, useEffect, useState } from "react";
import { Input, Label, FormGroup } from "reactstrap";



function MHealth_info(props) { 

    
        return (
            <div id="MHealth_info">
                <h6 id="MHealth_toggle" class="green_text_color">MHealth Information</h6>
                <div class="row mb-5 form_section shadow-sm bg-white rounded p-4">
                    
                        <b>MHealth Information</b>
                        <div class="d-flex justify-content-between">
                            <FormGroup check>
                                <Input id="mhealth_ushauri" name="mhealth_ushauri" type="checkbox" checked={props.facility_data.mhealth_ushauri}
                                className={ props.Original_data && props.Original_data.mhealth_ushauri != props.facility_data.mhealth_ushauri && "highlight_changed_checkbox"}
                                 onChange={(e) => props.setFacility_data({...props.facility_data, "mhealth_ushauri":e.target.checked})}/>                     
                                <Label check>Ushauri</Label>
                            </FormGroup>
                            <FormGroup check>
                                <Input id="mhealth_nishauri" name="mhealth_nishauri" type="checkbox" checked={props.facility_data.mhealth_nishauri}
                                className={ props.Original_data && props.Original_data.mhealth_nishauri != props.facility_data.mhealth_nishauri && "highlight_changed_checkbox"}
                                 onChange={(e) => props.setFacility_data({...props.facility_data, "mhealth_nishauri":e.target.checked})}/>                        
                                <Label check>Nishauri</Label>
                            </FormGroup>
                            <FormGroup check>
                                <Input id="mhealth_c4c" name="mhealth_c4c" type="checkbox" checked={props.facility_data.mhealth_c4c}
                                className={ props.Original_data && props.Original_data.mhealth_c4c != props.facility_data.mhealth_c4c && "highlight_changed_checkbox"}
                                 onChange={(e) => props.setFacility_data({...props.facility_data, "mhealth_c4c":e.target.checked})}/>                     
                                <Label check>C4C</Label>
                            </FormGroup>
                            <FormGroup check>
                                <Input id="mhealth_mlab" name="mhealth_mlab" type="checkbox"checked={props.facility_data.mhealth_mlab}
                                className={ props.Original_data && props.Original_data.mhealth_mlab != props.facility_data.mhealth_mlab && "highlight_changed_checkbox"}
                                 onChange={(e) => props.setFacility_data({...props.facility_data, "mhealth_mlab":e.target.checked})}/>                     
                                <Label check>MLab</Label>
                            </FormGroup>
                            <FormGroup check>
                                <Input id="mhealth_art" name="mhealth_art" type="checkbox" checked={props.facility_data.mhealth_art}
                                className={ props.Original_data && props.Original_data.mhealth_art != props.facility_data.mhealth_art && "highlight_changed_checkbox"}
                                 onChange={(e) => props.setFacility_data({...props.facility_data, "mhealth_art":e.target.checked})}/>                   
                                <Label check>ART Directory</Label>
                            </FormGroup>
                            <FormGroup check>
                                <Input id="mhealth_psurvey" name="mhealth_psurvey" type="checkbox" checked={props.facility_data.mhealth_psurvey}
                                className={ props.Original_data && props.Original_data.mhealth_psurvey != props.facility_data.mhealth_psurvey && "highlight_changed_checkbox"}
                                onChange={(e) => props.setFacility_data({...props.facility_data, "mhealth_psurvey":e.target.checked})}/>                       
                                <Label check>PSurvey</Label>
                            </FormGroup>                      
                        </div>                   
                   
                </div>
            </div>
        );
    //  }
}

export default MHealth_info;