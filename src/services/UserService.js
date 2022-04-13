import { UserManager } from 'oidc-client';
import { BASE_URL } from "../constants";

const config = {
    authority: process.env.REACT_APP_AUTHORITY,
    client_id: "dwh.his-test",
    redirect_uri: BASE_URL+"/signin-oidc",
    response_type: "id_token token",
    scope: "openid profile apiApp",
    post_logout_redirect_uri: BASE_URL,
}

const userManager = new UserManager(config);

export function signinRedirect() {
    return userManager.signinRedirect();
}

export function signinRedirectCallback() {   
    if (window.location.hash) {
        try {
            sessionStorage.setItem("isAuthenticated", "true");
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


