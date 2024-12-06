import React from 'react';

function ImageUploader({ onImageUpload, isAnalyzing, fileInputRef }) {
  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={() => fileInputRef.current.click()}
        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
        disabled={isAnalyzing}
      >
        Upload Image
      </button>
      <input
        type="file"
        accept="image/*"
        onChange={onImageUpload}
        ref={fileInputRef}
        className="hidden"
      />
    </div>
  );
}

export default ImageUploader;