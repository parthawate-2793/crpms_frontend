import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const DocumentViewer = () => {
    const { id } = useParams();
    const [document, setDocument] = useState(null);

    useEffect(() => {
        axiosInstance.get(`/documents/${id}`)
            .then(({ data }) => setDocument(data))
            .catch(() => console.error('Failed to load document'));
    }, [id]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-2xl">
                {document ? (
                    <>
                        <h2 className="text-3xl font-bold mb-4 text-gray-800">{document.title}</h2>
                        <p className="text-lg text-gray-600 whitespace-pre-line">{document.content}</p>
                    </>
                ) : (
                    <p className="text-lg text-gray-500">Loading...</p>
                )}
            </div>
        </div>
    );
};

export default DocumentViewer;