import * as tf from '@tensorflow/tfjs';
import * as tflite from '@tensorflow/tfjs-tflite';

class ModelService {
  static instance = null;
  tfliteModel = null;
  labels = {
    0: "Healthy",
    1: "Bacterial Leaf Blight",
    2: "Brown Spot",
    3: "Leaf Blast"
  };

  static async getInstance() {
    if (!ModelService.instance) {
      ModelService.instance = new ModelService();
      await ModelService.instance.initialize();
    }
    return ModelService.instance;
  }

  async initialize() {
    try {
      await tflite.setWasmPath('/tflite/');
      this.tfliteModel = await tflite.loadTFLiteModel('/models/model.tflite');
      console.log('TFLite model loaded successfully');
    } catch (error) {
      console.error('Error initializing model:', error);
      throw new Error('Failed to initialize model');
    }
  }

  async predict(imageElement) {
    if (!this.tfliteModel) {
      throw new Error('Model not initialized');
    }

    const tensor = tf.tidy(() => {
      return tf.browser.fromPixels(imageElement)
        .resizeNearestNeighbor([224, 224])
        .expandDims()
        .toFloat()
        .div(255.0);
    });

    try {
      const predictions = await this.tfliteModel.predict(tensor);
      const probabilities = await predictions.data();
      
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

export default ModelService;