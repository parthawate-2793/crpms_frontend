import React, { useContext } from "react";
import { DocumentContext } from "../../context/DocumentContext";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const DocumentList = ({ role }) => {
    console.log(role);
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
        <div className="bg-white shadow-md rounded-lg p-6 w-full">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Documents</h2>
            <button
                onClick={() => navigate('/documents/new')}
                className="mb-4 px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            >
                Create New Document
            </button>
            <ul className="space-y-4">
                {documents.map((doc) => (
                    <li
                        key={doc._id}
                        className="flex items-center justify-between p-4 border rounded-lg shadow-sm hover:shadow-md transition duration-200"
                    >
                        {/* Title Section */}
                        <span className="text-gray-700 font-medium flex-1">{doc.title}</span>
                        
                        {/* Buttons Section */}
                        <div className="flex flex-wrap items-center gap-2">
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

    )
}

export default DocumentList;