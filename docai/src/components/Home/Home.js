import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-900 to-blue-800 text-white overflow-x-hidden w-full m-0 p-0">
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <button className="px-4 py-2 text-sm md:text-base bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 hover:shadow-lg">
            About
          </button>

          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold absolute left-1/2 transform -translate-x-1/2">
            Chat With DocAI
          </h1>

          <button 
            onClick={() => navigate("/login")}
            className="px-4 py-2 text-sm md:text-base bg-blue-600 hover:bg-blue-700 rounded-lg transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 hover:shadow-lg"
          >
            Login | Sign Up
          </button>
        </div>

        <div className="flex justify-center items-center mt-32 md:mt-48 lg:mt-60">
          <button 
            onClick={() => navigate("/diagnose")}
            className="px-6 py-4 md:px-8 md:py-5 text-base md:text-lg bg-purple-600 hover:bg-purple-700 rounded-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 hover:shadow-lg"
          >
            DOCAI DIAGNOSE TOOL
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;