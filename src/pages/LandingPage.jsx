import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
        Welcome to the Collaborative Research Paper Management System
      </h1>
      <p className="text-lg text-gray-600 mb-8 text-center">
        Simplify your research paper writing process with features like real-time collaboration, citation management, 
        version control, and peer review. Start your journey with us today!
      </p>
      <div className="flex space-x-4">
        <button 
          className="px-6 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-200"
          onClick={() => navigate('/login')}
        >
          Login
        </button>
        <button 
          className="px-6 py-2 text-white bg-green-600 rounded hover:bg-green-700 transition duration-200"
          onClick={() => navigate('/register')}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default LandingPage;