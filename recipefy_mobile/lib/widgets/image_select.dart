import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:image_picker/image_picker.dart';
import 'dart:io';
import 'dart:convert';

class ImageSelect extends StatefulWidget {
  const ImageSelect({Key? key}) : super(key: key);

  @override
  State<ImageSelect> createState() => _ImageSelectState();
}

class _ImageSelectState extends State<ImageSelect> {
  File? image;
  String base64Image = "";

  String getBase64Image() {
    return base64Image;
  }

  Future selectImage() async {
    try {
      final image = await ImagePicker().pickImage(source: ImageSource.gallery);
      if (image == null) {
        return;
      }
      final imageTemp = File(image.path);
      List<int> imageBytes = await image.readAsBytes();
      String imageBase64Temp = base64Encode(imageBytes);
      setState(() {
        this.image = imageTemp;
        base64Image = imageBase64Temp;
      });
    } on PlatformException catch (error) {
      print("Failed to select image: $error");
    }
  }

  @override
  Widget build(BuildContext context) {
    return MaterialButton(
      color: Colors.blue,
      child: const Text(
        "Select Image from Gallery",
      ),
      onPressed: () {
        selectImage();
      },
    );
  }
}
