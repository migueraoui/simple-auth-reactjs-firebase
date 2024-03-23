import { Navigate, useLocation } from "react-router-dom";

import React from 'react'
import { useAuth } from "./AuthContext";


const AuthRequire = ({children}) => {
    const {currentUser} = useAuth();
    const location = useLocation();
    if(!currentUser){
        return <Navigate to={"/login"} state={{path: location.pathname}}/>
    }
    return children;
}

export default AuthRequire