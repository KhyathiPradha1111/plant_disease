import sys
import json
import tensorflow as tf
import tensorflowjs as tfjs

def convert_tflite_model(tflite_path):
    # Load TFLite model
    interpreter = tf.lite.Interpreter(model_path=tflite_path)
    interpreter.allocate_tensors()

    # Get input and output details
    input_details = interpreter.get_input_details()
    output_details = interpreter.get_output_details()

    # Print model details
    print("\nModel Details:")
    print(f"Input Shape: {input_details[0]['shape']}")
    print(f"Output Shape: {output_details[0]['shape']}")

    # Convert model
    print("\nConverting model to TensorFlow.js format...")
    tfjs.converters.convert_tf_saved_model(
        tflite_path,
        'public/models',
        input_format='tflite',
        output_format='tfjs_graph_model'
    )

    print("\nModel converted successfully!")
    print("Files have been saved to the public/models directory")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python convert_model.py <path_to_tflite_model>")
        sys.exit(1)
    
    tflite_path = sys.argv[1]
    convert_tflite_model(tflite_path)