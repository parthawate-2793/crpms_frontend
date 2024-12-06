import React, { createContext, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

export const DocumentContext = createContext();

export const DocumentProvider = ({ children }) => {
    const [documents,setDocuments] = useState([]);
    
    const fetchDocuments = async(fetchAll = false) => {
        const endpoint = fetchAll ? '/documents/all':'/documents';
        const { data } = await axiosInstance.get(endpoint);
        setDocuments(data);
    };

    return(
        <DocumentContext.Provider value={{ documents,fetchDocuments}}>
            {children}
        </DocumentContext.Provider>
    )
}