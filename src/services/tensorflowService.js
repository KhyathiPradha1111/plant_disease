import ModelLoader from './modelLoader';

export async function loadModel() {
  try {
    const modelLoader = await ModelLoader.getInstance();
    return modelLoader;
  } catch (error) {
    console.error('Error loading model:', error);
    throw new Error('Failed to load the model. Please ensure model files are present in the public/models directory.');
  }
}

export async function detectDisease(modelLoader, imageUrl) {
  try {
    // Create image element
    const img = new Image();
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = imageUrl;
    });

    // Get prediction
    const result = await modelLoader.predict(img);
    return result;
  } catch (error) {
    console.error('Error during detection:', error);
    throw new Error('Failed to analyze the image. Please try again.');
  }
}