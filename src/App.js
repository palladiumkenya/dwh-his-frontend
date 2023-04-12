import logo from './logo.svg';
import React, { Component, useState,useEffect } from "react";
import FlashMessage from 'react-flash-message';
import {FaInfoCircle } from 'react-icons/fa';
import { Col, Container, Alert } from "reactstrap";
import { BrowserRouter, Routes, Route} from "react-router-dom";

import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import AddFacility from "./components/AddFacility";
import UpdateFacility from "./components/UpdateFacility";
import ViewFacility from "./components/ViewFacility";
import ApproveFacilityChanges from "./components/ApproveFacilityChanges";
import SignIn from "./components/auth/Signin";
import ViewPartners from "./components/ViewPartners";
import EditPartners from "./components/EditPartners";
import ExportExcel from "./components/ExportToExcel";
import SigninOidc from "./components/auth/signin-oidc";
import ProtectedRoute from "./components/ProtectedRoute";
import ViewReports from "./components/ViewReports";
import SubmittedApprovals from "./components/SubmittedApprovals";
import PendingApprovals from "./components/PendingApprovals";

import userManager, { signinRedirectCallback, signoutRedirect } from './services/UserService';


function App() {
    
    const [user, setUser] = useState();

    
    const flashMessage = localStorage.getItem("flashMessage") ;  
     
    
    async function getUserDetails() {      
        await userManager.getUser().then((res) =>{
          // console.log("show org data",res)
          setUser(res);               
          console.log(res.profile)
          localStorage.setItem("OrganizationId", res.profile.OrganizationId);

        });      
    }

    useEffect(() => {
        getUserDetails() 
        setTimeout(() => localStorage.removeItem("flashMessage") , 8000)
    }, [])

    

    return (
      <BrowserRouter>     
          <Header user={user}/>
          { flashMessage && 
              <FlashMessage duration={8000}>
                  <Alert color="success">
                    <FaInfoCircle style={{marginRight:"20px"}}/>
                    { flashMessage }
                  </Alert>  
              </FlashMessage>
            }
          <div>
            <Routes>            
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home/>} />              
              {/* <ProtectedRoute path="/facilities/add_facility" element={<AddFacility user={user} />}/> */}
              <Route exact path='/facilities/add_facility' element={<ProtectedRoute/>}>
                  <Route exact path="/facilities/add_facility" element={<AddFacility user={user} />}/>
              </Route>

              <Route exact path='/facilities/update_facility/:fac_id' element={<ProtectedRoute/>}>
                  <Route exact path="/facilities/update_facility/:fac_id" element={<UpdateFacility user={user} />}/>
              </Route>

              <Route exact path='/facilities/approve_changes/:fac_id' element={<ProtectedRoute/>}>
                  <Route exact path="/facilities/approve_changes/:fac_id" element={<ApproveFacilityChanges user={user} />}/>
              </Route>

              <Route exact path='/facilities/edit/partner/:part_id' element={<ProtectedRoute/>}>
                  <Route exact path="/facilities/edit/partner/:part_id" element={<EditPartners user={user} />}/>
              </Route>

              {/* <Route exact path="/facilities/add_facility" element={<AddFacility user={user} />}/>
              <Route path="/facilities/update_facility/:fac_id" element={<UpdateFacility />} />                   
              <Route path="/facilities/approve_changes/:fac_id" element={<ApproveFacilityChanges />} /> 
              <Route path="/facilities/edit/partner/:part_id" element={<EditPartners />} />   */}

              <Route path="/facilities/view_facility/:fac_id" element={<ViewFacility />} />
              <Route path="/facilities/partners" element={<ViewPartners />} />  
              <Route path="/facilities/reports" element={<ViewReports />} />

                <Route path="/facilities/submitted/approvals" element={<SubmittedApprovals user={user}/>} />
                <Route path="/facilities/pending/approvals" element={<PendingApprovals user={user}/>} />

              <Route path="/signin" element={<SignIn />} />  
              
              <Route path="/export_excel" element={<ExportExcel />} /> 
              <Route path="/signout-oidc" element={<SigninOidc />} />
              <Route path="/signin-oidc" element={<SigninOidc />} />

            </Routes> 
          </div>   
          <Footer/>      
      </BrowserRouter>   
    );
}

export default App;
