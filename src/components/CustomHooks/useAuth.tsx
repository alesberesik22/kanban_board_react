import React, {useState} from 'react';
import jwtDecode from "jwt-decode";
import {UserInfo} from "../../interfaces/UserInfo";
import {Token} from "../../interfaces/Token";

const useAuth = () => {
    const token = localStorage.getItem("token");
    const [role] = useState<UserInfo>({userName: "", userRole: ""})
    let decodedToken;
    if (token !== null && token !== "") {
        decodedToken = jwtDecode<Token>(token);
        const auth = {userName: decodedToken.sub, userRole: decodedToken.roles}
        return {auth};
    }
    return {auth:role};
};

export default useAuth;
