import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import userManager, { signinRedirectCallback } from '../../services/UserService';



function SigninOidc() {
    // const history = useHistory()
    useEffect(() => {
        async function signinAsync() {
            await signinRedirectCallback()
            window.location.href = '/'
        }
        signinAsync()
    }, [])

    return (
        <div>
            Redirecting...
        </div>
    )
}

export default SigninOidc

