import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomeScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-6">Plant Disease Detector</h1>
        <p className="text-gray-600 mb-8">
          Upload a plant image to detect diseases
        </p>
        <button
          onClick={() => navigate('/detect')}
          className="bg-green-500 text-white px-8 py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
        >
          <span className="material-icons">search</span>
          Detect
        </button>
      </div>
    </div>
  );
}

export default HomeScreen;