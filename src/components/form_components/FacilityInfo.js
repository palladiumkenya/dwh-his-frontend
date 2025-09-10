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


        const [EMR_types, setEMR_types] = useState([])

        const statuses = ["", 'Active', 'Stalled/Inactive', 'Discontinued'];

        const getEmrTypes = async() => {
            await axios.get(API_URL+"/emr_types").then(res => setEMR_types( res.data ));
        };

        useEffect(() => {
            getEmrTypes()

        }, [])

               
        return (
            <div >
                <h6 id="facility_toggle" className="green_text_color">Facility Information</h6>
                <div className="row  mb-5 form_section shadow-sm bg-white rounded p-4">
                    <div className="form-group col-md-4 mb-4">
                        <Label for="mfl_code">MFL Code:</Label>
                        <div className="d-flex">
                            <Input type="number" name="mfl_code" value={props.facility_data.mfl_code} required ref={mfl_code_input} 
                                className={ props.Original_data && props.Original_data.mfl_code != props.facility_data.mfl_code && "highlight_changed_data"}
                                onChange={(e) => {checkLength(e); props.setFacility_data({...props.facility_data, "mfl_code":e.target.value}) }}/>
                            
                            <FaSearch className="green_text_color"  id="search_icon" onClick={getKMHFL_data} style={{display:props.showSearchIcon, cursor:"pointer"}}
                            data-bs-toggle="tooltip" data-bs-placement="bottom" title="Fetch this MFL Code's facility data!"/>
                            
                        </div>                        
                         <p id="error_message" style={{color:"red"}}>{error_message}</p>
                    </div>
                    <div className="form-group col-md-4 mb-4">
                        <Label for="name">Facility Name:</Label>
                        <Input type="text" name="name" value={props.facility_data.name} required disabled={disabled}
                            className={ props.Original_data && props.Original_data.name != props.facility_data.name && "highlight_changed_data"}
                            onChange={(e) => props.setFacility_data({...props.facility_data, "name":e.target.value})} />
                    </div>
                    <div className="form-group col-md-4 mb-4">
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
                    <div className="form-group col-md-3 mb-4">
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
                    <div className="form-group col-md-3 mb-4">
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
                    <div className="form-group col-md-3 mb-4">
                        <Label for="ward">Ward:</Label>
                        <Input type="text" name="ward" value={props.facility_data.ward} required disabled={disabled}
                               className={ props.Original_data && props.Original_data.ward != props.facility_data.ward && "highlight_changed_data"}
                               onChange={(e) => props.setFacility_data({...props.facility_data, "ward":e.target.value})} />
                    </div>
                    <div className="form-group col-md-3 mb-4">
                        <Label for="lat">Latitude:</Label>
                        <Input type="number" name="lat" step="any" value={props.facility_data.lat} disabled={disabled}
                            className={ props.Original_data && props.Original_data.lat != props.facility_data.lat && "highlight_changed_data"}
                            onChange={(e) => {props.setFacility_data({...props.facility_data, "lat":e.target.value}) }}/>
                    </div>
                    <div className="form-group col-md-3 mb-4">
                        <Label for="lon">Longitude:</Label>
                        <Input type="number" name="lon" step="any" value={props.facility_data.lon} disabled={disabled}
                            className={ props.Original_data && props.Original_data.lon != props.facility_data.lon && "highlight_changed_data"}
                            onChange={(e) => {props.setFacility_data({...props.facility_data, "lon":e.target.value}) }}/>
                    </div>
                    <div className="form-group col-md-4 mb-4">
                        <Label for="agency">SDP Agency:</Label>
                        <Input type="text" id="agency" name="agency" disabled="true" value={agencyValue} />
                    </div>
                    <div className="form-group col-md-4 mb-4">
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
                    <div className="form-group col-md-3 mb-4">
                        <Label for="KEPH_Level">KEPH_Level:</Label>
                        <Input id="KEPH_Level" name="KEPH_Level" type="select" required
                               value={props.facility_data.KEPH_Level} disabled={disabled}
                               className={props.Original_data && props.Original_data.KEPH_Level != props.facility_data.KEPH_Level && "highlight_changed_data"}
                               onChange={(e) => props.setFacility_data({
                                   ...props.facility_data,
                                   "KEPH_Level": e.target.value
                               })}>
                            <option value=""></option>
                            <option value="Level 1">Level 1</option>
                            <option value="Level 2">Level 2</option>
                            <option value="Level 3">Level 3</option>
                            <option value="Level 4">Level 4</option>
                            <option value="Level 5">Level 5</option>
                            <option value="Level 6">Level 6</option>
                        </Input>
                    </div>
                    <div className="form-group col-md-4 mb-4">
                        <Label for="KMPDC_reg_no">KMPDC Registration No.:</Label>
                        <Input type="text" name="KMPDC_reg_no" value={props.facility_data.KMPDC_reg_no} required disabled={disabled}
                               className={ props.Original_data && props.Original_data.KMPDC_reg_no != props.facility_data.KMPDC_reg_no && "highlight_changed_data"}
                               onChange={(e) => props.setFacility_data({...props.facility_data, "KMPDC_reg_no":e.target.value})} />
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

                    <b>EMR Information</b>
                    <div id="EMR" className="row form_section  bg-white rounded" >
                        <div className="form-group col-md-3 mb-4">
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
                        <div className="form-group col-md-3 mb-4">
                            <Label for="date_of_emr_impl">Date Of EMR Implementation:</Label>
                            <Input id="date_of_emr_impl" name="date_of_emr_impl" type="date" value={props.facility_data.date_of_emr_impl} required
                                   className={ props.Original_data && props.Original_data.date_of_emr_impl != props.facility_data.date_of_emr_impl && "highlight_changed_data"}
                                   onChange={(e) => props.setFacility_data({...props.facility_data, "date_of_emr_impl":e.target.value})}>
                            </Input>
                        </div>
                        <div className="form-group col-md-3 mb-4">
                            <Label for="mode_of_use">Mode Of Use:</Label>
                            <Input id="mode_of_use" name="mode_of_use" type="select" value={props.facility_data.mode_of_use} required
                                   className={ props.Original_data && props.Original_data.mode_of_use != props.facility_data.mode_of_use && "highlight_changed_data"}
                                   onChange={(e) => props.setFacility_data({...props.facility_data, "mode_of_use":e.target.value})}>
                                <option value=""></option>
                                <option value="Point of Care">Point of Care</option>
                                <option value="Retrospective User (RDE)">Retrospective User (RDE)</option>
                                <option value="Hybrid Use">Hybrid Use</option>
                            </Input>
                        </div>
                        <div className="form-group col-md-3 mb-4">
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
                    </div>

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
