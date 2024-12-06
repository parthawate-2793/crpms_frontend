import React, { useContext } from "react";
import { DocumentContext } from "../../context/DocumentContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const DocumentList = ({ role }) => {
    const { documents } = useContext(DocumentContext);
    const navigate = useNavigate();

    const handleView = (id) => navigate(`/documents/${id}`);
    const handleEdit = (id) => navigate(`/documents/${id}/edit`);
    const handleDownload = async (id) => {
        try {
            const response = await axiosInstance.get(`/documents/${id}/download`, {
                responseType: "blob",
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `document-${id}.pdf`);
            document.body.appendChild(link);
            link.click();
        } catch (error) {
            console.log("Error downloading the document.");
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Your Documents</h2>
            {role === 'researcher' && (
                <button
                    onClick={() => navigate('/documents/new')}
                    className="mb-6 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                >
                    Create New Document
                </button>
            )}
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {documents.map((doc) => (
                    <li
                        key={doc._id}
                        className="flex flex-col items-start justify-between p-4 border rounded-lg shadow-sm hover:shadow-md transition duration-200"
                    >
                        <span className="text-lg font-medium text-gray-700 mb-4">
                            {doc.title}
                        </span>
                        <div className="flex flex-wrap gap-2">
                            <button
                                onClick={() => handleView(doc._id)}
                                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                            >
                                View
                            </button>
                            {role === 'researcher' ? (
                                <button
                                    onClick={() => handleEdit(doc._id)}
                                    className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 transition duration-200"
                                >
                                    Edit
                                </button>
                            ) : (
                                <button
                                    onClick={() => handleDownload(doc._id)}
                                    className="bg-gray-500 text-white font-semibold py-2 px-4 rounded hover:bg-gray-600 transition duration-200"
                                >
                                    Download PDF
                                </button>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DocumentList;
