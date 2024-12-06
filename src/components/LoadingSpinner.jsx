import React from 'react';

function LoadingSpinner({ message }) {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
      {message && <p className="mt-2 text-gray-600">{message}</p>}
    </div>
  );
}

export default LoadingSpinner;