import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:recipefy_mobile/services/remote_services.dart';
import 'dart:io';
import 'dart:convert';

class AddRecipePage extends StatefulWidget {
  const AddRecipePage({Key? key}) : super(key: key);

  @override
  State<AddRecipePage> createState() => _AddRecipePageState();
}

class _AddRecipePageState extends State<AddRecipePage> {
  String titleInput = "";
  List<String> ingredientsInput = [];
  String currentIngredientInput = "";
  List<String> instructionsInput = [];
  String currentInstructionInput = "";
  String caloriesInput = "";
  String sodiumInput = "";
  String imageInput = "";
  int likes = 0;

  File? image;

  Future selectImage() async {
    try {
      final image = await ImagePicker().pickImage(source: ImageSource.gallery);
      if (image == null) {
        return;
      }
      final imageTemp = File(image.path);
      List<int> imageBytes = await image.readAsBytes();
      final len = imageBytes.length;
      final kb = len / 1024;
      final mb = kb / 1024;
      if (mb > 8) {
        throw ("Image Too Big");
      }
      String imageBase64Temp = base64Encode(imageBytes);
      setState(() {
        this.image = imageTemp;
        imageInput = imageBase64Temp;
      });
    } on Exception catch (error) {
      debugPrint("Failed to select image: $error");
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      resizeToAvoidBottomInset: false,
      appBar: AppBar(
        backgroundColor: Colors.black,
        automaticallyImplyLeading: false,
        title: const Text("Add Recipe"),
        centerTitle: true,
      ),
      body: Center(
          child: Container(
        color: Colors.white,
        child: Padding(
          padding: const EdgeInsets.all(36.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              TextField(
                obscureText: false,
                decoration: InputDecoration(
                    contentPadding:
                        const EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),
                    hintText: "Title",
                    border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(32.0))),
                onChanged: (text) {
                  titleInput = text;
                },
              ),
              const SizedBox(height: 20.0),
              const Text(
                "Ingredients",
                style: const TextStyle(fontSize: 18),
              ),
              const SizedBox(height: 10.0),
              ListView.builder(
                shrinkWrap: true,
                itemCount: ingredientsInput.length,
                itemBuilder: (context, index) {
                  String item = ingredientsInput[index];
                  return ListTile(
                    title: Text(item),
                  );
                },
              ),
              Row(
                children: <Widget>[
                  Expanded(
                    child: TextField(
                      obscureText: false,
                      decoration: InputDecoration(
                          contentPadding:
                              const EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),
                          hintText: "Ingredient",
                          border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(32.0))),
                      onChanged: (text) {
                        currentIngredientInput = text;
                      },
                    ),
                  ),
                  const SizedBox(width: 10.0),
                  MaterialButton(
                      color: Colors.blue,
                      child: const Icon(
                        Icons.add,
                        color: Colors.white,
                      ),
                      onPressed: () {
                        setState(() {
                          ingredientsInput.add(currentIngredientInput);
                        });
                      }),
                ],
              ),
              const SizedBox(height: 20.0),
              const Text(
                "Instructions",
                style: const TextStyle(fontSize: 18),
              ),
              const SizedBox(height: 20.0),
              ListView.builder(
                shrinkWrap: true,
                itemCount: instructionsInput.length,
                itemBuilder: (context, index) {
                  String item = instructionsInput[index];
                  return ListTile(
                    title: Text(item),
                  );
                },
              ),
              Row(
                children: <Widget>[
                  Expanded(
                    child: TextField(
                      obscureText: false,
                      decoration: InputDecoration(
                          contentPadding:
                              const EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),
                          hintText: "Instruction",
                          border: OutlineInputBorder(
                              borderRadius: BorderRadius.circular(32.0))),
                      onChanged: (text) {
                        currentInstructionInput = text;
                      },
                    ),
                  ),
                  const SizedBox(width: 10.0),
                  MaterialButton(
                      color: Colors.blue,
                      child: const Icon(
                        Icons.add,
                        color: Colors.white,
                      ),
                      onPressed: () {
                        setState(() {
                          instructionsInput.add(currentInstructionInput);
                        });
                      }),
                ],
              ),
              const SizedBox(height: 20.0),
              TextField(
                obscureText: false,
                decoration: InputDecoration(
                    contentPadding:
                        const EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),
                    hintText: "Calories",
                    border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(32.0))),
                onChanged: (text) {
                  caloriesInput = text;
                },
              ),
              const SizedBox(height: 20.0),
              TextField(
                obscureText: false,
                decoration: InputDecoration(
                    contentPadding:
                        const EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),
                    hintText: "Sodium",
                    border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(32.0))),
                onChanged: (text) {
                  sodiumInput = text;
                },
              ),
              const SizedBox(height: 20.0),
              MaterialButton(
                color: Colors.blue,
                child: const Text(
                  "Select Image from Gallery",
                ),
                onPressed: () {
                  selectImage();
                },
              ),
              const SizedBox(height: 20.0),
              Material(
                elevation: 5.0,
                borderRadius: BorderRadius.circular(30.0),
                color: Colors.green,
                child: MaterialButton(
                  child: const Text("Add Recipe"),
                  minWidth: MediaQuery.of(context).size.width,
                  padding: const EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),
                  onPressed: () async {
                    try {
                      await RemoteService().addRecipe(
                          titleInput,
                          ingredientsInput,
                          instructionsInput,
                          caloriesInput,
                          sodiumInput,
                          imageInput);

                      debugPrint("$titleInput added.");
                      Navigator.pop(context);
                    } catch (error) {
                      debugPrint(error.toString());
                    }
                  },
                ),
              ),
            ],
          ),
        ),
      )),
    );
  }
}
