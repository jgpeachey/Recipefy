import 'package:recipefy_mobile/services/remote_services.dart';
import 'package:recipefy_mobile/views/register_confirm.dart';
import 'package:image_picker/image_picker.dart';
import 'package:flutter/material.dart';
import 'dart:io';
import 'dart:convert';

class RegisterPage extends StatefulWidget {
  const RegisterPage({Key? key}) : super(key: key);

  @override
  State<RegisterPage> createState() => _RegisterPageState();
}

class _RegisterPageState extends State<RegisterPage> {
  String firstNameInput = "";
  String lastNameInput = "";
  String emailInput = "";
  String usernameInput = "";
  String imageInput = "";
  String passwordInput = "";
  String repPasswordInput = "";
  String errorText = "";

  File? image;

  bool isValidEmail(String email) {
    return RegExp(
            r"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?)*$")
        .hasMatch(email);
  }

  bool isValidPassword(String password) {
    if (!RegExp("/[a-z]+/").hasMatch(password) ||
        !RegExp("/[A-Z]+/").hasMatch(password) ||
        !RegExp("/[0-9]+/").hasMatch(password) ||
        !RegExp("/[\$@#&!]+/").hasMatch(password) ||
        password.length < 8) {
      return false;
    }

    return true;
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
        title: const Text("Recipefy"),
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
                      const Text(
                        "Sign Up",
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          fontSize: 36,
                        ),
                      ),
                      const SizedBox(height: 30.0),
                      TextField(
                        obscureText: false,
                        decoration: InputDecoration(
                            contentPadding: const EdgeInsets.fromLTRB(
                                20.0, 15.0, 20.0, 15.0),
                            hintText: "First Name",
                            border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(32.0))),
                        onChanged: (text) {
                          firstNameInput = text;
                        },
                      ),
                      const SizedBox(height: 20.0),
                      TextField(
                        obscureText: false,
                        decoration: InputDecoration(
                            contentPadding: const EdgeInsets.fromLTRB(
                                20.0, 15.0, 20.0, 15.0),
                            hintText: "Last Name",
                            border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(32.0))),
                        onChanged: (text) {
                          lastNameInput = text;
                        },
                      ),
                      const SizedBox(height: 20.0),
                      TextField(
                        obscureText: false,
                        decoration: InputDecoration(
                            contentPadding: const EdgeInsets.fromLTRB(
                                20.0, 15.0, 20.0, 15.0),
                            hintText: "Username",
                            border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(32.0))),
                        onChanged: (text) {
                          usernameInput = text;
                        },
                      ),
                      const SizedBox(height: 20.0),
                      TextField(
                        obscureText: false,
                        decoration: InputDecoration(
                            contentPadding: const EdgeInsets.fromLTRB(
                                20.0, 15.0, 20.0, 15.0),
                            hintText: "Email Address",
                            border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(32.0))),
                        onChanged: (text) {
                          emailInput = text;
                        },
                      ),
                      const SizedBox(height: 20.0),
                      TextField(
                        obscureText: false,
                        decoration: InputDecoration(
                            contentPadding: const EdgeInsets.fromLTRB(
                                20.0, 15.0, 20.0, 15.0),
                            hintText: "Password",
                            border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(32.0))),
                        onChanged: (text) {
                          passwordInput = text;
                        },
                      ),
                      const SizedBox(height: 20.0),
                      TextField(
                        obscureText: false,
                        decoration: InputDecoration(
                            contentPadding: const EdgeInsets.fromLTRB(
                                20.0, 15.0, 20.0, 15.0),
                            hintText: "Retype Password",
                            border: OutlineInputBorder(
                                borderRadius: BorderRadius.circular(32.0))),
                        onChanged: (text) {
                          repPasswordInput = text;
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
                      Text(
                        errorText,
                        textAlign: TextAlign.center,
                        style: const TextStyle(
                          color: Colors.red,
                          fontSize: 18,
                        ),
                      ),
                      Material(
                        elevation: 5.0,
                        borderRadius: BorderRadius.circular(30.0),
                        color: Colors.green,
                        child: MaterialButton(
                            minWidth: MediaQuery.of(context).size.width,
                            padding: const EdgeInsets.fromLTRB(
                                20.0, 15.0, 20.0, 15.0),
                            onPressed: () async {
                              // Make sure all inputs are valid
                              if (firstNameInput == "") {
                                debugPrint("Enter first name");
                                errorText = "Enter first name";
                                setState(() {});
                                return;
                              }
                              if (lastNameInput == "") {
                                debugPrint("Enter last name");
                                errorText = "Enter last name";
                                setState(() {});
                                return;
                              }
                              if (usernameInput == "") {
                                debugPrint("Enter username");
                                errorText = "Enter username";
                                setState(() {});
                                return;
                              }
                              if (emailInput == "") {
                                debugPrint("Enter email");
                                errorText = "Enter email";
                                setState(() {});
                                return;
                              }
                              if (passwordInput == "") {
                                debugPrint("Enter password");
                                errorText = "Enter password";
                                setState(() {});
                                return;
                              }
                              if (!isValidEmail(emailInput)) {
                                debugPrint("Invalid Email");
                                errorText = "Invalid Email";
                                setState(() {});
                                return;
                              }
                              if (passwordInput != repPasswordInput) {
                                debugPrint("Passwords do not match");
                                errorText = "Passwords do not match";
                                setState(() {});
                                return;
                              }
                              if (!isValidPassword(passwordInput)) {
                                debugPrint(
                                    "Your password must contain a minimum of 8 characters, a lowercase letter, an uppercase letter, a number, and a symbol");
                                errorText =
                                    "Your password must contain a minimum of 8 characters, a lowercase letter, an uppercase letter, a number, and a symbol";
                                setState(() {});
                                return;
                              }
                              // Call API to attempt to register user
                              try {
                                await RemoteService().register(
                                    firstNameInput,
                                    lastNameInput,
                                    usernameInput,
                                    emailInput,
                                    imageInput,
                                    passwordInput);

                                debugPrint("$usernameInput registered.");
                                Navigator.of(context).push(MaterialPageRoute(
                                    builder: (context) =>
                                        const RegisterConfirmPage()));
                              } catch (error) {
                                debugPrint(error.toString());
                                errorText = error.toString();
                                setState(() {});
                              }
                            },
                            child: const Text("Register",
                                textAlign: TextAlign.center)),
                      ),
                      const SizedBox(height: 20.0),
                      Material(
                        elevation: 5.0,
                        borderRadius: BorderRadius.circular(30.0),
                        color: Colors.green,
                        child: MaterialButton(
                            minWidth: MediaQuery.of(context).size.width,
                            padding: const EdgeInsets.fromLTRB(
                                20.0, 15.0, 20.0, 15.0),
                            onPressed: () {
                              Navigator.pop(context);
                            },
                            child: const Text("Return to Login",
                                textAlign: TextAlign.center)),
                      ),
                    ]),
              ))),
    );
  }
}
