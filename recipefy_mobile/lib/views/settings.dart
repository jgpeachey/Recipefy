import 'dart:convert';
import 'dart:io';

import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:persistent_bottom_nav_bar/persistent-tab-view.dart';
import 'package:recipefy_mobile/models/login_model.dart';
import 'package:recipefy_mobile/services/remote_services.dart';
import 'package:recipefy_mobile/views/login.dart';
import 'package:recipefy_mobile/widgets/profile_widget.dart';
import 'package:recipefy_mobile/widgets/settings_profile_widget.dart';

class SettingsPage extends StatefulWidget {
  final User? user;

  const SettingsPage({super.key, this.user});

  @override
  State<SettingsPage> createState() => _SettingsPageState();
}

class _SettingsPageState extends State<SettingsPage> {
  String passwordInput = "";
  String imageInput = "";
  String firstNameInput = "";
  String lastNameInput = "";
  File? image;

  final _controller = new TextEditingController();

  Future selectImage() async {
    try {
      final image = await ImagePicker().pickImage(source: ImageSource.gallery);
      if (image == null) {
        return;
      }
      final imageTemp = File(image.path);
      List<int> imageBytes = await image.readAsBytes();
      String imageBase64Temp = base64Encode(imageBytes);
      final len = imageBytes.length;
      final kb = len / 1024;
      final mb = kb / 1024;
      if (mb > 8) {
        throw ("Image Too Big");
      }
      setState(() {
        this.image = imageTemp;
        imageInput = imageBase64Temp;
      });
    } on Exception catch (error) {
      debugPrint("Failed to select image: $error");
    }
  }

  void _showDialog() {
    showDialog(
        context: context,
        builder: (context) {
          return AlertDialog(
            title: Text('Delete account?'),
            actions: [
              TextField(
                onChanged: (text) {
                  passwordInput = text;
                },
                obscureText: true,
                decoration: InputDecoration(
                    contentPadding:
                        const EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),

                    // API CONNECTION HERE
                    // USER FIRST NAME
                    hintText: 'Password',
                    border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(0))),
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: [
                  TextButton(
                    onPressed: () => Navigator.pop(context, 'Cancel'),
                    child: const Text('Cancel'),
                  ),
                  TextButton(
                    onPressed: () {
                      String email = widget.user!.email;
                      RemoteService().deleteUser(email, passwordInput);
                      Navigator.of(context, rootNavigator: true)
                          .pushAndRemoveUntil(
                        MaterialPageRoute(
                          builder: (BuildContext context) {
                            return const LoginPage();
                          },
                        ),
                        (_) => false,
                      );
                    },
                    child: const Text('Yes'),
                  ),
                ],
              ),
            ],
          );
        });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: CustomScrollView(slivers: [
        SliverAppBar(
          title:
              Center(child: Text('Settings', style: TextStyle(fontSize: 22))),
          backgroundColor: Colors.black,
          automaticallyImplyLeading: true,
          actions: [
            SizedBox(
              child: TextButton(

                  // API CONNECTION HERE
                  // UPDATE THE USER INFORMATION
                  // TEST THIS API ENDPOINT
                  // DELETE THIS COMMENT
                  onPressed: () {
                    RemoteService().updateUser(
                        firstNameInput,
                        lastNameInput,
                        widget.user!.email,
                        passwordInput,
                        imageInput);
                  },
                  child: const Text('Save',
                      style: TextStyle(
                          fontWeight: FontWeight.bold,
                          fontSize: 22,
                          color: Colors.green))),
            )
          ],
        ),
        SliverList(
          delegate: SliverChildListDelegate([
            // ADD API CONNECTION HERE
            // SHOW THE ACTIVE USER'S EMAIL AS THE APP BAR TITLE
            // DELETE THIS COMMENT
            SizedBox(
              width: MediaQuery.of(context).size.width,
              child: Text("Signed in as ${widget.user!.email}",
                  style: TextStyle(fontSize: 20)),
            ),
            Divider(
              thickness: 1,
            ),

            // PROFILE PICTURE
            // MAKE ON CLICK BRING UP THE IMAGE SELECTOR
            SettingsProfileWidget(
                imagePath: widget.user!.pic,
                onClicked: () async {
                  selectImage();
                }),

            // THIS BUTTON MAKES A POPUP TO CONFIRM PASSWORD AND ENTER NEW PASSWORD
            // ElevatedButton(
            //   onPressed: () {},
            //   child: Text('Change password?'),
            //   style: ElevatedButton.styleFrom(
            //     primary: Colors.red,
            //     textStyle: TextStyle(fontSize: 20),
            //   ),
            // ),

            // SIGNS OUT OF APP
            ElevatedButton(
              onPressed: () {
                Navigator.of(context, rootNavigator: true).pushAndRemoveUntil(
                  MaterialPageRoute(
                    builder: (BuildContext context) {
                      return const LoginPage();
                    },
                  ),
                  (_) => false,
                );
              },
              child: Text('Sign out'),
              style: ElevatedButton.styleFrom(
                primary: Colors.orange,
                textStyle: TextStyle(fontSize: 20),
              ),
            ),
            SizedBox(height: 20),
            Row(
              children: [
                SizedBox(
                  width: 20,
                ),
                Text('Profile', style: TextStyle(fontSize: 25)),
              ],
            ),
            SizedBox(height: 20),
            Row(
              children: [
                SizedBox(width: 20),
                Expanded(
                  // ADD API CONNECTION HERE
                  // SHOW THE USER'S FIRST NAME IN THE LEFT FIELD
                  // DELETE THIS COMMENT
                  child: TextField(
                    // controller:
                    //     TextEditingController(text: widget.user!.firstName),
                    onChanged: (text) {
                      firstNameInput = text;
                    },
                    onTap: () {
                      _controller.clear();
                    },
                    obscureText: false,
                    decoration: InputDecoration(
                        contentPadding:
                            const EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),

                        // API CONNECTION HERE
                        // USER FIRST NAME
                        hintText: widget.user!.firstName,
                        border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(32.0))),
                  ),
                ),
                SizedBox(width: 10),
                Expanded(
                  // API CONNECTION HERE
                  // SHOW THE USER'S LAST NAME IN THE RIGHT FIELD
                  child: TextField(
                    // controller:
                    //     TextEditingController(text: widget.user!.lastName),
                    onChanged: (text) {
                      lastNameInput = text;
                    },
                    obscureText: false,
                    decoration: InputDecoration(
                        contentPadding:
                            const EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),
                        hintText: widget.user!.lastName,
                        border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(32.0))),
                  ),
                ),
                SizedBox(width: 20),
              ],
            ),
            Row(
              children: [
                SizedBox(width: 20),
                Expanded(
                  child: TextField(
                    onChanged: (text) {
                      passwordInput = text;
                    },
                    obscureText: false,
                    decoration: InputDecoration(
                        contentPadding:
                            const EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),
                        hintText: "Password",
                        border: OutlineInputBorder(
                            borderRadius: BorderRadius.circular(32.0))),
                  ),
                ),
                SizedBox(width: 20),
              ],
            ),
            // ADD API CONNECTION HERE
            // UPDATE THE USER'S SETTINGS
            // DELETE THIS COMMENT
            // ElevatedButton(
            //   onPressed: () {},
            //   child: Text('Update'),
            //   style: ElevatedButton.styleFrom(
            //     primary: Colors.blue,
            //     textStyle: TextStyle(fontSize: 20),
            //   ),
            // ),
            SizedBox(height: 200),
            ElevatedButton(
              // ADD API CONNECTION HERE
              // DELETE USER'S ACCOUNT
              // DELETE THIS COMMENT
              onPressed: () {
                Future.delayed(const Duration(), (() => _showDialog()));
              },
              child: Text('Delete account'),
              style: ElevatedButton.styleFrom(
                primary: Colors.red,
                textStyle: TextStyle(fontSize: 20),
              ),
            ),
          ]),
        )
      ]),
    );
  }
}
