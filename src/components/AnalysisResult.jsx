import React from 'react';

function AnalysisResult({ isAnalyzing, result }) {
  if (isAnalyzing) {
    return (
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-2 text-gray-600">Analyzing image...</p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h3 className="font-semibold mb-2">Result:</h3>
      <p className="text-gray-700">{result}</p>
    </div>
  );
}

export default AnalysisResult;