import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useModel } from '../hooks/useModel';
import ImageUploader from '../components/ImageUploader';
import ImagePreview from '../components/ImagePreview';
import PredictionResults from '../components/PredictionResults';
import LoadingSpinner from '../components/LoadingSpinner';

function DetectionScreen() {
  const navigate = useNavigate();
  const { model, error: modelError, isLoading } = useModel();
  const [image, setImage] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!model) {
      setError('Model is not loaded yet. Please wait or refresh the page.');
      return;
    }

    try {
      setIsAnalyzing(true);
      setError(null);

      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);

      const img = new Image();
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = imageUrl;
      });

      const result = await model.predict(img);
      setPredictions(result);

      URL.revokeObjectURL(imageUrl);
    } catch (err) {
      setError('Failed to analyze the image. Please try again.');
      console.error('Analysis error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <LoadingSpinner message="Loading model..." />
      </div>
    );
  }

  if (modelError) {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-2xl mx-auto bg-red-50 p-4 rounded-lg">
          <h2 className="text-red-800 font-semibold">Error Loading Model</h2>
          <p className="text-red-600">{modelError}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Disease Detection</h1>
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-800"
          >
            Back
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          {error && (
            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          
          <ImagePreview image={image} />
          
          {isAnalyzing ? (
            <LoadingSpinner message="Analyzing image..." />
          ) : (
            <ImageUploader
              onImageUpload={handleImageUpload}
              isAnalyzing={isAnalyzing}
              fileInputRef={fileInputRef}
            />
          )}
          
          <PredictionResults predictions={predictions} />
        </div>
      </div>
    </div>
  );
}

export default DetectionScreen;