import React, { Component, useEffect, useState } from "react";
import { Button, Spinner } from "reactstrap";
import {FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';

import ExportToExcel from "./ExportToExcel";
import { API_URL, EMAIL_URL, BASE_URL } from "../constants";

import axios from "axios";
import { useParams } from 'react-router-dom'



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
                {!showSpinner && <ExportToExcel apiData={excelreportdata} fileName={fileName}/> }
               {showSpinner && <Spinner style={{width: "1.2rem", height: "1.2rem"}}></Spinner> }
           </h4>
        
        </div>
      );
  
}

export default ViewReports;
