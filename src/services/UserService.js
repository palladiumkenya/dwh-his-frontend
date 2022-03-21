import React, { Component, useEffect, useState } from "react";
import { Button, Form, FormGroup, Input, Label,Alert } from "reactstrap";
import {FaInfoCircle } from 'react-icons/fa';
import axios from "axios";

import { API_URL } from "../constants";
import { BASE_URL } from "../constants";

import { UserManager } from 'oidc-client';


const config = {
    authority: "https:localhost:5006",
    client_id: "dwh.his",
    redirect_uri: "http://localhost:8000/signin-oidc",
    response_type: "id_token token",
    scope: "openid profile apiApp",
    post_logout_redirect_uri: "http://localhost:8000",
}

const userManager = new UserManager(config);

export function signinRedirect() {
    return userManager.signinRedirect();
}

export function signinRedirectCallback() {
    if (window.location.hash) {
        try {
            localStorage.setItem("isAuthenticated", "true");
            return userManager.signinRedirectCallback();
        }
        catch (e) {
            console.log(e);
        }
    } else {
        return userManager.signinRedirectCallback();
    }
}

export async function signoutRedirect() {
    let user = await userManager.getUser();
    await userManager.clearStaleState();
    await userManager.removeUser();
    return userManager.signoutRedirect({ 'id_token_hint': user.id_token });
}

export function signoutRedirectCallback() {
    userManager.clearStaleState();
    userManager.removeUser();
    return userManager.signoutRedirectCallback();
}

export default userManager;


