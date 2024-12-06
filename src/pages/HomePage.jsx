import React, {useContext, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const HomePage = () => {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(()=>{
        if (user) {
            navigate('/dashboard');
        } else {
            navigate('/login');
        }
    }, [user,navigate]);

    return null;
}

export default HomePage;