import React, { useEffect, useContext } from "react";
import { DocumentContext } from '../context/DocumentContext';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import DocumentList from '../components/Documents/DocumentList';

const DashboardPage = () => {
    const { user, logout } = useContext(AuthContext);
    const { fetchDocuments } = useContext(DocumentContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else {
            // fetchDocuments(user.role === 'reviewer');
            fetchDocuments(true);
        }
    }, [user, navigate, fetchDocuments]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-md w-full">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">
                    Welcome, {user?.name}
                </h1>
                <button
                    onClick={logout}
                    className="w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 mb-6"
                >
                    Logout
                </button>
                <DocumentList role={user?.role} />
            </div>
        </div>
    );
};

export default DashboardPage;