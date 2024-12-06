import React from 'react';

function PredictionResults({ predictions }) {
  if (!predictions) return null;

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-3">Detection Results:</h3>
      
      {/* Main prediction */}
      <div className="bg-green-50 p-4 rounded-lg mb-4">
        <p className="text-lg font-medium text-green-800">
          Primary Detection: {predictions.disease}
        </p>
        <p className="text-green-600">
          Confidence: {predictions.confidence}%
        </p>
      </div>

      {/* All predictions */}
      <div className="space-y-2">
        <h4 className="font-medium text-gray-700">All Detections:</h4>
        {predictions.allPredictions?.map((pred, index) => (
          <div 
            key={index}
            className="flex justify-between items-center bg-gray-50 p-2 rounded"
          >
            <span className="text-gray-700">{pred.label}</span>
            <span className="text-gray-600">{pred.confidence}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PredictionResults;