import 'package:recipefy_mobile/services/remote_services.dart';
import 'package:recipefy_mobile/views/register_confirm.dart';
import 'package:flutter/material.dart';

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
  String passwordInput = "";
  String repPasswordInput = "";
  String errorText = "";

  bool isValidEmail(String email) {
    return RegExp(
            r"^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,253}[a-zA-Z0-9])?)*$")
        .hasMatch(email);
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
                      Text(
                        errorText,
                        textAlign: TextAlign.center,
                        style: TextStyle(
                          color: Colors.red,
                          fontSize: 18,
                        ),
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
                              // Call API to attempt to register user
                              try {
                                var response = await RemoteService().register(
                                    firstNameInput,
                                    lastNameInput,
                                    usernameInput,
                                    emailInput,
                                    "",
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
                      const SizedBox(height: 40.0),
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
