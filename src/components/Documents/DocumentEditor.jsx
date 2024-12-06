import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DocumentEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (id) {
      axiosInstance
        .get(`/documents/${id}`)
        .then(({ data }) => {
          setTitle(data.title);
          setContent(data.content);
        })
        .catch(() => toast.error("Failed to fetch document"));
    }
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { title, content };
    const request = id
      ? axiosInstance.put(`/documents/${id}`, payload)
      : axiosInstance.post("/documents", payload);

    request
      .then(() => {
        toast.success("Document saved successfully!");
        navigate("/dashboard");
      })
      .catch(() => toast.error("Failed to save document"));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full">
        <ToastContainer />
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          {id ? "Edit Document" : "Create Document"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Document Title
            </label>
            <input
              id="title"
              type="text"
              placeholder="Enter document title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-200"
            />
          </div>

          {/* Content Input */}
          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Document Content
            </label>
            <textarea
              id="content"
              placeholder="Enter document content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="w-full h-40 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition duration-200 resize-none"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default DocumentEditor;
