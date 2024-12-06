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
            fetchDocuments(true);
        }
    }, [user, navigate, fetchDocuments]);

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-50 p-4">
            <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-5xl space-y-8">
                <div className="flex justify-between items-center border-b pb-4">
                    <h1 className="text-3xl font-bold text-gray-800">
                        Welcome, <span className="text-blue-600">{user?.name}</span>
                    </h1>
                    <button
                        onClick={logout}
                        className="px-6 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
                    >
                        Logout
                    </button>
                </div>

                {/* Documents Section */}
                <div>
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                        Your Documents
                    </h2>
                    <div className="bg-gray-100 rounded-lg p-6 shadow-inner">
                <DocumentList role={user?.role} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;