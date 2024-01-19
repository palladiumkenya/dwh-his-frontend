import React, { Component, useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label, Spinner, Container,Row,Col } from "reactstrap";
import {FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';

import ExportToExcel from "./ExportToExcel";
import { API_URL, EMAIL_URL, BASE_URL } from "../constants";

import axios from "axios";
import { useParams } from 'react-router-dom'
import EmrTypeChart from "./charts/EmrTypeChart";
import InfractractureTypeChart from "./charts/InfrastructureTypeChart";
import InfrastructureTypeChart from "./charts/InfrastructureTypeChart";
import FacilityByCountyChart from "./charts/FacilityByCountyChart";
import ImplementationTypeChart from "./charts/ImplementationTypeChart";



const ViewReports = () => {
    const [excelreportdata, setExcelreportData] = useState([]);
    const [showSpinner, setShowSpinner] = useState(true);
   
    const  fileName = "HIS Master List";
    const fetchData = () =>{
        const OrganizationId = null;
        axios.post(API_URL + '/data_for_excel', {"OrganizationId": OrganizationId}).then(r => {
            setExcelreportData(r.data) 
            setShowSpinner(false)
        })        
    }


    useEffect(() => {    
        fetchData();        
    }, [])


    return(
        <div class="mx-5 my-5">
           <h4>HIS Master List 
               {/* {!showSpinner && <ExportToExcel apiData={excelreportdata} fileName={fileName}/> }*/}
               {/*{showSpinner && <Spinner style={{width: "1.2rem", height: "1.2rem"}}></Spinner> }*/}
           </h4>

            <Container style={{'marginTop':'30px'}}>
                <Row>
                    <Col xs={1}>
                    </Col>
                    <Col xs={3}>
                        <EmrTypeChart />
                    </Col>
                    <Col xs={3}>
                        <InfrastructureTypeChart />
                    </Col>
                    <Col xs={3}>
                        <ImplementationTypeChart />
                    </Col>
                    <Col xs={1}>
                    </Col>
                </Row>
            </Container>
            <Container style={{'marginTop':'30px'}}>
                <Row>
                    <Col xs={12}>
                        <FacilityByCountyChart />
                    </Col>
                </Row>
            </Container>

        </div>
      );
  
}

export default ViewReports;
