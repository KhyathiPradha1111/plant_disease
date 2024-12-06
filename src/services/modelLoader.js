import * as tf from '@tensorflow/tfjs';
import * as tflite from '@tensorflow/tfjs-tflite';

class ModelLoader {
  static instance = null;
  model = null;
  labels = null;

  static async getInstance() {
    if (!ModelLoader.instance) {
      ModelLoader.instance = new ModelLoader();
      await ModelLoader.instance.initialize();
    }
    return ModelLoader.instance;
  }

  async initialize() {
    try {
      // Register TFLite backend
      await tflite.setWasmPath('/tflite/');
      
      // Load model
      this.model = await tflite.loadTFLiteModel('/models/model.tflite');
      
      // Load labels
      const response = await fetch('/models/labels.json');
      this.labels = await response.json();
      
      console.log('Model and labels loaded successfully');
    } catch (error) {
      console.error('Error initializing model:', error);
      throw new Error('Failed to initialize model and labels');
    }
  }

  async predict(imageElement) {
    if (!this.model || !this.labels) {
      throw new Error('Model not initialized');
    }

    const tensor = tf.tidy(() => {
      // Preprocess image
      const imageTensor = tf.browser.fromPixels(imageElement)
        .resizeNearestNeighbor([224, 224])
        .toFloat()
        .expandDims();
      
      // Normalize
      return imageTensor.div(255.0);
    });

    try {
      // Get prediction
      const predictions = await this.model.predict(tensor);
      const probabilities = await predictions.data();
      
      // Get highest confidence prediction
      const maxIndex = probabilities.indexOf(Math.max(...probabilities));
      const confidence = probabilities[maxIndex] * 100;

      return {
        disease: this.labels[maxIndex],
        confidence: confidence.toFixed(2),
        allPredictions: Object.keys(this.labels).map(index => ({
          label: this.labels[index],
          confidence: (probabilities[index] * 100).toFixed(2)
        }))
      };
    } finally {
      tensor.dispose();
    }
  }
}

export default ModelLoader;