import 'package:tflite/tflite.dart';

class TFLiteService {
  static Future<void> loadModel() async {
    await Tflite.loadModel(
      model: "assets/models/model.tflite",
      labels: "assets/models/labels.txt",
    );
  }

  static Future<String> detectDisease(String imagePath) async {
    try {
      await loadModel();
      
      final List? results = await Tflite.runModelOnImage(
        path: imagePath,
        numResults: 1,
        threshold: 0.5,
        imageMean: 127.5,
        imageStd: 127.5,
      );

      if (results != null && results.isNotEmpty) {
        return "${results[0]["label"]} (${(results[0]["confidence"] * 100).toStringAsFixed(2)}%)";
      }
      
      return "No disease detected";
    } catch (e) {
      print('Error detecting disease: $e');
      return "Error detecting disease";
    } finally {
      await Tflite.close();
    }
  }
}