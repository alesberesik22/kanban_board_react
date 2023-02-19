import React from 'react';
import jwtDecode from "jwt-decode";
import {Navigate, Outlet, useLocation} from "react-router-dom";
import useAuth from "../CustomHooks/useAuth";

interface Props {
    allowedRoles: string[];
}

const RouteAuth: React.FC<Props> = ({allowedRoles}) => {
    const {auth} = useAuth();
    const location = useLocation();
    const content = allowedRoles.some((roleElement) =>
        auth.userRole.includes(roleElement)) ? <Outlet/> : <Navigate to={"/"} state={{from: location}} replace/>
    return content;
};

export default RouteAuth;
