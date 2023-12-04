import React, { Component, useEffect, useState, useRef } from "react";
import { Input, Label, FormGroup, Tooltip } from "reactstrap";
import {FaSearch } from 'react-icons/fa';
import axios from "axios";
import { API_URL } from "../../constants";


function FacilityInfo(props) { 
    // const [facility_data, setFacility_data] = useState(props.facility_data);
    const [error_message, setErrorMessage] = useState("");
    const [disabled, setDisabled] = useState(false);
    const [agencyValue, setAgencyValue] = useState(props.facility_data.agency);
    const [showNonEmrOptions, setShowNonEmrOptions] = useState(props.facility_data.non_emr_site ? true : false);



    const mfl_code_input = useRef(null);
    
    const getInitialSubCounties = id => {      
      if (props.Counties_list.length >0){
          return props.Counties_list.filter(item => item.county === Number(id));           
      }
    };      

    const [SubCounties_list, setSubCounties_list] = useState(props.facility_data.county != "" ? getInitialSubCounties(Number(props.facility_data.county)) : []);

         
    const handleCountyChange = (e) => {   
        
        if (e != ""){     
            getSubCounties(e)      
            // if (typeof e != "number"){
            //         getSubCounties(Number(e.target.value))   
            // }else{
            //         getSubCounties(e)   
            // }      
        }    
       
      };
      

      const getSubCounties = (id) => { 
         
        // setSubCounties_list(props.counties_list.filter(item => item.county === Number(id)))    ;
        if (props.Counties_list.length >0){
            setSubCounties_list(props.Counties_list.filter(item => item.county === Number(id))); 
            
        }
      };    

      const getAgency = (e) => {             
        const partner = e.target.value         
        const filtered_partner = props.Partners_list.filter(item => item.id === Number(partner))
        props.setFacility_data({...props.facility_data, "agency":filtered_partner[0].agency }); 
        setAgencyValue(filtered_partner[0].agency)
      };
      
      
      const changeCT = e => {
        //e.persist();       
        const checked = e.target.checked;
        
        props.setFacility_data({...props.facility_data, "CT":checked});
        props.CT_slideToggle(checked)        
      };

      const changeHTS = e => {
        const checked = e.target.checked;
        
        props.setFacility_data({...props.facility_data, "HTS":checked});
        props.HTS_slideToggle(checked)
      };

      const changeMHealth = e => {
        const checked = e.target.checked;
        
        props.setFacility_data({...props.facility_data, "mHealth":checked});
        props.Mhealth_slideToggle(checked)
        
      };

      const changeIL = e => {       
        const checked = e.target.checked;
        
        props.setFacility_data({...props.facility_data, "IL":checked});
        props.IL_slideToggle(checked)
      };


    const changeNonEmrOptions = e => {
        //e.persist();
        const checked = e.target.checked;

        props.setFacility_data({...props.facility_data, "non_emr_site":checked});
        setShowNonEmrOptions(checked)
    };
     
     
      const checkLength = e =>{
            if (e.target.value.length > 5) {
                setDisabled(true)
                setErrorMessage('MFL Code can only be a length of 5 characters')
            }else if(e.target.value.length < 5){
                setDisabled(true)
                setErrorMessage('MFL Code can only be a length of 5 characters')
            }else{
                setDisabled(false)
                setErrorMessage('')
            }
      }


      const getKMHFL_data = async() =>{
          //alert()
        const code_entered = mfl_code_input.current.props.value;        
       
        await axios.post(API_URL + '/get_mfl_data', {code: parseInt(code_entered)
        })
        .then(function (response) {
            console.log(response.data, Object.keys(response.data).length === 0)
            if ('status' in response.data){               
                setErrorMessage('That Facility already exists.')
                setDisabled(true)
                props.setfacilityAlreadyExists(true)
                props.setFacility_data({...props.facility_data, "name":"", "owner":"", "county":"",
                "sub_county":"", "lat":"", "lon":"", "agency":"",
                  "partner":"" });
            }else{
                if (Object.keys(response.data).length != 0){
                    setErrorMessage('')
                    setDisabled(false)
                    props.setfacilityAlreadyExists(false)
                    props.setFacility_data({...props.facility_data, "name":response.data.name, "owner":response.data.owner, "county":response.data.county,
                    "sub_county":response.data.sub_county, "lat":response.data.lat, "lon":response.data.lon, "agency":response.data.agency,
                    "partner":response.data.partner });
                    
                    //update sub counties dropdown
                    handleCountyChange(response.data.county)
                }else{
                    props.setFacility_data({...props.facility_data, "name":"", "owner":"", "county":"",
                "sub_county":"", "lat":"", "lon":"", "agency":"",
                  "partner":"" });
                }                                
                  
            }
        })
        .catch(function (error) {
            console.log('failed ---/>', error);
            setErrorMessage('Facility not available in KHMFL')
            setDisabled(false)
            props.setFacility_data({...props.facility_data, "name":"", "owner":"", "county":"",
                "sub_county":"", "lat":null, "lon":null, "agency":"",
                  "partner":"" });
        });
       
      }

               
        return (
            <div >
                <h6 id="facility_toggle" class="green_text_color">Facility Information</h6>
                <div class="row  mb-5 form_section shadow-sm bg-white rounded p-4">
                    <div class="form-group col-md-4 mb-4">
                        <Label for="mfl_code">MFL Code:</Label>
                        <div class="d-flex">
                            <Input type="number" name="mfl_code" value={props.facility_data.mfl_code} required ref={mfl_code_input} 
                                className={ props.Original_data && props.Original_data.mfl_code != props.facility_data.mfl_code && "highlight_changed_data"}
                                onChange={(e) => {checkLength(e); props.setFacility_data({...props.facility_data, "mfl_code":e.target.value}) }}/>
                            
                            <FaSearch class="green_text_color"  id="search_icon" onClick={getKMHFL_data} style={{display:props.showSearchIcon, cursor:"pointer"}}
                            data-bs-toggle="tooltip" data-bs-placement="bottom" title="Fetch this MFL Code's facility data!"/>
                            
                        </div>                        
                         <p id="error_message" style={{color:"red"}}>{error_message}</p>
                    </div>
                    <div class="form-group col-md-4 mb-4">
                        <Label for="name">Facility Name:</Label>
                        <Input type="text" name="name" value={props.facility_data.name} required disabled={disabled}
                            className={ props.Original_data && props.Original_data.name != props.facility_data.name && "highlight_changed_data"}
                            onChange={(e) => props.setFacility_data({...props.facility_data, "name":e.target.value})} />
                    </div>
                    <div class="form-group col-md-4 mb-4">
                        <Label for="owner">Owner:</Label>
                        <Input id="owner" name="owner" type="select" value={props.facility_data.owner} required disabled={disabled}
                            className={ props.Original_data && props.Original_data.owner != props.facility_data.owner && "highlight_changed_data"}
                            onChange={(e) => props.setFacility_data({...props.facility_data, "owner":e.target.value})}>
                                { props.Owners_list.length > 0 &&
                                props.Owners_list.map(name => (    
                                        <option key={name[0]} value={name[0]}>{name[1]}</option>
                                    ))                              
                                }                           
                        </Input> 
                    </div>
                    <div class="form-group col-md-3 mb-4">
                        <Label for="county">County:</Label>
                        <Input id="county" name="county" type="select" required disabled={disabled}
                            className={ props.Original_data && props.Original_data.county != props.facility_data.county && "highlight_changed_data"}
                            onChange={(e) => {handleCountyChange(e.target.value); props.setFacility_data({...props.facility_data, "county":e.target.value}) }} 
                            value={props.facility_data.county}>
                                <option value=""></option>
                              { props.Counties_list.length > 0 &&
                                props.Counties_list.map(county => (
                                    <option key={county.county} value={county.county}>{county.county_name}</option>
                                ))                              
                            }                                            
                        </Input>                        
                    </div>
                    <div class="form-group col-md-3 mb-4">
                        <Label for="subcounty">Sub County:</Label>
                        <Input id="sub_county" name="sub_county" type="select" required value={props.facility_data.sub_county} disabled={disabled} 
                            className={ props.Original_data && props.Original_data.sub_county != props.facility_data.sub_county && "highlight_changed_data"}
                            onChange={(e) => props.setFacility_data({...props.facility_data, "sub_county":e.target.value}) } >
                                <option value=""></option>
                            {  SubCounties_list.length > 0 && SubCounties_list[0].sub_county.length > 0 &&
                                SubCounties_list[0].sub_county.map(subcounty => (    
                                    <option key={subcounty.id} value={subcounty.id}>{subcounty.name}</option>
                                ))                              
                            }                           
                        </Input> 
                    </div>
                    <div class="form-group col-md-3 mb-4">
                        <Label for="lat">Latitude:</Label>
                        <Input type="number" name="lat" step="any" value={props.facility_data.lat} disabled={disabled}
                            className={ props.Original_data && props.Original_data.lat != props.facility_data.lat && "highlight_changed_data"}
                            onChange={(e) => {props.setFacility_data({...props.facility_data, "lat":e.target.value}) }}/>
                    </div>
                    <div class="form-group col-md-3 mb-4">
                        <Label for="lon">Longitude:</Label>
                        <Input type="number" name="lon" step="any" value={props.facility_data.lon} disabled={disabled}
                            className={ props.Original_data && props.Original_data.lon != props.facility_data.lon && "highlight_changed_data"}
                            onChange={(e) => {props.setFacility_data({...props.facility_data, "lon":e.target.value}) }}/>
                    </div>
                    <div class="form-group col-md-4 mb-4">
                        <Label for="agency">SDP Agency:</Label>
                        <Input type="text" id="agency" name="agency" disabled="true" value={agencyValue} />
                    </div>
                    <div class="form-group col-md-4 mb-4">
                        <Label for="partner">SDP:</Label>
                        <Input id="partner" name="partner" type="select" value={props.facility_data.partner} disabled={disabled} required
                            className={ props.Original_data && props.Original_data.partner != props.facility_data.partner && "highlight_changed_data"}
                            onChange={(e) => {getAgency(e); props.setFacility_data({...props.facility_data, "partner":e.target.value}) }}>
                                <option value=""></option>
                            { props.Partners_list.length > 0 &&
                                    props.Partners_list.map(partner => (    
                                        <option key={partner.id} value={partner.id}>{partner.partner}</option>
                                    ))                              
                                }                          
                        </Input> 
                    </div>

                    <div className="form-group col-md-3 mb-4">
                        <Label for="infrastructure_type">Infrastructure Type:</Label>
                        <Input id="infrastructure_type" name="infrastructure_type" type="select" required
                               value={props.facility_data.infrastructure_type} disabled={disabled}
                               className={props.Original_data && props.Original_data.infrastructure_type != props.facility_data.infrastructure_type && "highlight_changed_data"}
                               onChange={(e) => props.setFacility_data({
                                   ...props.facility_data,
                                   "infrastructure_type": e.target.value
                               })}>
                            <option value=""></option>
                            <option value="On Premises">On Premises</option>
                            <option value="On Cloud">On Cloud</option>

                        </Input>
                    </div>

                    <b>Facility Type</b>
                    <div className="d-flex justify-content-between col-md-2 col-lg-4 mb-4">
                        <FormGroup check>
                            <Input id="emr_site" name="emr_site" type="checkbox" defaultChecked={props.facility_data.emr_site}
                                   className={props.Original_data && props.Original_data.emr_site != props.facility_data.emr_site && "highlight_changed_checkbox"}

                                   onChange={(e) => {
                                       props.setFacility_data({...props.facility_data, "emr_site": e.target.checked})
                                   }}/>
                            <Label check>EMR site</Label>
                        </FormGroup>
                        <FormGroup check>
                            <Input id="non_emr_site" name="non_emr_site" type="checkbox" defaultChecked={props.facility_data.non_emr_site}
                                   className={props.Original_data && props.Original_data.non_emr_site != props.facility_data.non_emr_site && "highlight_changed_checkbox"}
                                   onClick={(e) => changeNonEmrOptions(e)}
                                   onChange={(e) => {
                                       props.setFacility_data({...props.facility_data, "non_emr_site": e.target.checked})
                                   }}/>
                            <Label check>Non-EMR site</Label>
                        </FormGroup>
                    </div>



                    { showNonEmrOptions &&
                        <div className="d-flex justify-content-between col-md-2  col-lg-3 mb-4 bg-light px-4 border border-warning" >
                            <b>Non-EMR Options</b>
                            <FormGroup check>
                                <Input id="asal" name="asal" type="checkbox" defaultChecked={props.facility_data.asal}
                                       className={props.Original_data && props.Original_data.asal != props.facility_data.asal && "highlight_changed_checkbox"}
                                       onChange={(e) => {
                                           props.setFacility_data({...props.facility_data, "asal": e.target.checked})
                                       }}/>
                                <Label check>ASAL</Label>
                            </FormGroup>
                            <FormGroup check>
                                <Input id="pepfar" name="pepfar" type="checkbox" defaultChecked={props.facility_data.pepfar}
                                       className={props.Original_data && props.Original_data.pepfar != props.facility_data.pepfar && "highlight_changed_checkbox"}
                                       onChange={(e) => {
                                           props.setFacility_data({...props.facility_data, "pepfar": e.target.checked})
                                       }}/>
                                <Label check>PEPFAR</Label>
                            </FormGroup>
                        </div>
                    }

                    <b>Implementation</b>
                    <div class="d-flex justify-content-between col-md-6 mb-4">
                        <FormGroup check>
                            <Input id="CT" name="CT" type="checkbox" defaultChecked={props.facility_data.CT} 
                            className={ props.Original_data && props.Original_data.CT != props.facility_data.CT && "highlight_changed_checkbox"}
                            onClick={(e) => changeCT(e)}
                            onChange={(e) => {props.setFacility_data({...props.facility_data, "CT":e.target.checked}) }}/>                   
                            <Label check>C&T</Label>
                        </FormGroup>
                        <FormGroup check>
                            <Input id="HTS" name="HTS" type="checkbox" defaultChecked={props.facility_data.HTS} 
                            className={ props.Original_data && props.Original_data.HTS != props.facility_data.HTS && "highlight_changed_checkbox"}
                            onClick={(e) => changeHTS(e)}
                            onChange={(e) => {props.setFacility_data({...props.facility_data, "HTS":e.target.checked}) }}/>                   
                            <Label check>HTS</Label>
                        </FormGroup>
                        <FormGroup check>
                            <Input id="mHealth" name="mHealth" type="checkbox" defaultChecked={props.facility_data.mHealth} 
                            className={ props.Original_data && props.Original_data.mHealth != props.facility_data.mHealth && "highlight_changed_checkbox"}
                            onClick={(e) => changeMHealth(e)}/>                   
                            <Label check>mHealth</Label>
                        </FormGroup>
                        <FormGroup check>
                            <Input id="IL" name="IL" type="checkbox" defaultChecked={props.facility_data.IL} 
                            className={ props.Original_data && props.Original_data.IL != props.facility_data.IL && "highlight_changed_checkbox"}
                            onClick={(e) => changeIL(e)}
                            onChange={(e) => {props.setFacility_data({...props.facility_data, "IL":e.target.checked}) }}/>                   
                            <Label check>IL & Integrations</Label>
                        </FormGroup>
                        <FormGroup check>
                            <Input id="KP" name="KP" type="checkbox" checked={props.facility_data.KP}
                            className={ props.Original_data && props.Original_data.KP != props.facility_data.KP && "highlight_changed_checkbox"}
                             onChange={(e) => props.setFacility_data({...props.facility_data, "KP":e.target.checked})}/>                   
                            <Label check>KP</Label>
                        </FormGroup>  
                    </div>
                </div>
            </div>
        );
    //  }
}

export default FacilityInfo;
