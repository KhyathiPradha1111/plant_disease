# Model Directory Structure

This directory contains the TensorFlow.js model files for plant disease detection.

## Required Files

1. `model.json` - The main model architecture and metadata file
2. `weights.bin` - The model weights binary file(s)
3. `labels.json` - The disease labels mapping file

## Model Specifications

- Input Size: 224x224 pixels
- Input Channels: 3 (RGB)
- Output: Probability distribution across disease classes
- Framework: TensorFlow.js (Converted from TFLite)

## Converting TFLite to TensorFlow.js

To convert your .tflite model to TensorFlow.js format:

1. Install tensorflowjs converter:
```bash
pip install tensorflowjs
```

2. Convert the model:
```bash
tensorflowjs_converter \
  --input_format=tflite \
  --output_format=tfjs_graph_model \
  your_model.tflite \
  ./public/models/
```