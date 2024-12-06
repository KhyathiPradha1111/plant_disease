import React from 'react';

function ImagePreview({ image }) {
  if (!image) return null;

  return (
    <div className="mb-6">
      <img
        src={image}
        alt="Uploaded plant"
        className="w-full h-64 object-cover rounded-lg"
      />
    </div>
  );
}

export default ImagePreview;