import React,{ createContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user,setUser] = useState(null);

    const login = async (email,password) => {
        const { data } = await axiosInstance.post('/user/login',{email,password});
        localStorage.setItem('token',data.token);
        setUser(data);
    }

    const register = async (name,email,password,role) => {
        await axiosInstance.post('/user/register', {name,email,password, role });
    };

    const logout = () =>{
        localStorage.removeItem('token');
        setUser(null);
    }

    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token) {
            axiosInstance.get('/user/me').then(({ data }) => setUser(data)).catch(() => logout());
        }
    },[]);

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    )
}