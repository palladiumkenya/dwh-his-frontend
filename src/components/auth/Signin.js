import React, { Component, useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label,Alert } from "reactstrap";
import {FaInfoCircle } from 'react-icons/fa';
import axios from "axios";

import { API_URL } from "../../constants";
import { BASE_URL } from "../../constants";

import {signinRedirect} from "../../services/UserService";



export default function Signin() {
   
    signinRedirect()
     
}