import React, { Component, useEffect, useState, useRef } from "react";
import { Input, Label, FormGroup } from "reactstrap";
import {FaSearch } from 'react-icons/fa';
import axios from "axios";
import { API_URL } from "../../constants";


function FacilityInfo(props) { 
    // const [facility_data, setFacility_data] = useState(props.facility_data);
    const [error_message, setErrorMessage] = useState("");
    const [disabled, setDisabled] = useState(false);
    const mfl_code_input = useRef(null);
    
    const getInitialSubCounties = id => {         
      if (props.Counties_list.length >0){
          return props.Counties_list.filter(item => item.county === Number(id));           
      }
    };      

    const [SubCounties_list, setSubCounties_list] = useState(getInitialSubCounties(Number(props.facility_data.county)));

         
    const handleCountyChange = (e) => {   
        console.log(typeof e)          
       if (typeof e != "number"){
            getSubCounties(Number(e.target.value))   
       }else{
            getSubCounties(e)   
       }          
       
      };
      

      const getSubCounties = id => { 
          
        // setSubCounties_list(props.counties_list.filter(item => item.county === Number(id)))    ;
        if (props.Counties_list.length >0){
            setSubCounties_list(props.Counties_list.filter(item => item.county === Number(id))); 
            
        }
      };    

      const getAgency = (e) => {             
        const partner = e.target.value         
        const filtered_partner = props.Partners_list.filter(item => item.id === Number(partner)) 
        
        props.setFacility_data({...props.facility_data, "agency":filtered_partner[0].agency }); 
        
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
        console.log(checked, props.facility_data)
      };

      const changeIL = e => {       
        const checked = e.target.checked;
        
        props.setFacility_data({...props.facility_data, "IL":checked});
        props.IL_slideToggle(checked)
      };
     
     
      const checkLength = e =>{
            if (e.target.value.length > 5) {
                //.html('MFL Code can only be a length of 5 characters')
                setErrorMessage('MFL Code can only be a length of 5 characters')
            }else if(e.target.value.length < 5){
                //.html('MFL Code can only be a length of 5 characters')
                setErrorMessage('MFL Code can only be a length of 5 characters')
            }else{
                setErrorMessage('')
            }
      }


      const getKMHFL_data = async() =>{
          //alert()
        const code_entered = mfl_code_input.current.props.value;        
       
        await axios.post(API_URL + '/get_mfl_data', {code: parseInt(code_entered)
        })
        .then(function (response) {
            
            if ('status' in response.data){               
                setErrorMessage('That Facility was already added')
                setDisabled(true)
            }else{
                setErrorMessage('')
                setDisabled(false)
                props.setFacility_data({...props.facility_data, "name":response.data.name, "owner":response.data.owner, "county":response.data.county,
                "sub_county":response.data.sub_county, "lat":response.data.lat, "lon":response.data.lon, "agency":response.data.agency,
                  "partner":response.data.partner });
                  
                  //update sub counties dropdown
                  handleCountyChange(response.data.county);
                 
                    
                  
            }
        })
        .catch(function (error) {
            console.log('failed ---/>', error);
            setErrorMessage('Facility not available in KHMFL')
            setDisabled(false)
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
                            <FaSearch class="green_text_color"  id="search_icon" onClick={getKMHFL_data}/>
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
                            onChange={(e) => {handleCountyChange(e); props.setFacility_data({...props.facility_data, "county":e.target.value}) }} 
                            value={props.facility_data.county}>
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
                            { SubCounties_list[0].sub_county.length > 0 &&
                                SubCounties_list[0].sub_county.map(subcounty => (    
                                    <option key={subcounty.id} value={subcounty.id}>{subcounty.name}</option>
                                ))                              
                            }                           
                        </Input> 
                    </div>
                    <div class="form-group col-md-3 mb-4">
                        <Label for="lat">Latitude:</Label>
                        <Input type="number" name="lat" value={props.facility_data.lat} disabled={disabled}
                            className={ props.Original_data && props.Original_data.lat != props.facility_data.lat && "highlight_changed_data"}
                            onChange={(e) => {props.setFacility_data({...props.facility_data, "lat":e.target.value}) }}/>
                    </div>
                    <div class="form-group col-md-3 mb-4">
                        <Label for="lon">Longitude:</Label>
                        <Input type="number" name="lon" value={props.facility_data.lon} disabled={disabled}
                            className={ props.Original_data && props.Original_data.lon != props.facility_data.lon && "highlight_changed_data"}
                            onChange={(e) => {props.setFacility_data({...props.facility_data, "lon":e.target.value}) }}/>
                    </div>
                    <div class="form-group col-md-4 mb-4">
                        <Label for="agency">SDP Agency:</Label>
                        <Input type="text" name="agency" disabled="true" value={props.facility_data.agency} />
                    </div>
                    <div class="form-group col-md-4 mb-4">
                        <Label for="partner">SDP:</Label>
                        <Input id="partner" name="partner" type="select" value={props.facility_data.partner} disabled={disabled}
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

                    <b>Implementation</b>
                    <div class="d-flex justify-content-between col-md-4 mb-4">
                        <FormGroup check>
                            <Input id="CT" name="CT" type="checkbox" defaultChecked={props.facility_data.CT} 
                            className={ props.Original_data && props.Original_data.CT != props.facility_data.CT && "highlight_changed_checkbox"}
                            onClick={(e) => changeCT(e)}
                            onChange={(e) => {getAgency(e); props.setFacility_data({...props.facility_data, "CT":e.target.checked}) }}/>                   
                            <Label check>C&T</Label>
                        </FormGroup>
                        <FormGroup check>
                            <Input id="HTS" name="HTS" type="checkbox" defaultChecked={props.facility_data.HTS} 
                            className={ props.Original_data && props.Original_data.HTS != props.facility_data.HTS && "highlight_changed_checkbox"}
                            onClick={(e) => changeHTS(e)}
                            onChange={(e) => {getAgency(e); props.setFacility_data({...props.facility_data, "HTS":e.target.checked}) }}/>                   
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
                            onChange={(e) => {getAgency(e); props.setFacility_data({...props.facility_data, "IL":e.target.checked}) }}/>                   
                            <Label check>IL & Integrations</Label>
                        </FormGroup>
                    </div>
                </div>
            </div>
        );
    //  }
}

export default FacilityInfo;