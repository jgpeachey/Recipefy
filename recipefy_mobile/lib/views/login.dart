import 'package:recipefy_mobile/services/remote_services.dart';
import 'register.dart';

import 'package:flutter/material.dart';

class LoginPage extends StatefulWidget {
  const LoginPage({Key? key}) : super(key: key);

  @override
  State<LoginPage> createState() => _LoginPageState();
}

class _LoginPageState extends State<LoginPage> {
  String emailInput = "";
  String passwordInput = "";

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
                SizedBox(
                  height: 180.0,
                  child: Image.asset(
                    "assets/images/temp_login_image.jpg",
                    fit: BoxFit.contain,
                  ),
                ),
                const SizedBox(height: 60.0),
                const Text(
                  "Sign In",
                  textAlign: TextAlign.center,
                  style: TextStyle(
                    fontSize: 36,
                  ),
                ),
                const SizedBox(height: 30.0),
                TextField(
                  obscureText: false,
                  decoration: InputDecoration(
                      contentPadding:
                          const EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),
                      hintText: "Email Address",
                      border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(32.0))),
                  onChanged: (text) {
                    emailInput = text;
                  },
                ),
                const SizedBox(height: 25.0),
                TextField(
                  obscureText: true,
                  decoration: InputDecoration(
                      contentPadding:
                          const EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),
                      hintText: "Password",
                      border: OutlineInputBorder(
                          borderRadius: BorderRadius.circular(32.0))),
                  onChanged: (text) {
                    passwordInput = text;
                  },
                ),
                const SizedBox(height: 35.0),
                Material(
                  elevation: 5.0,
                  borderRadius: BorderRadius.circular(30.0),
                  color: Colors.green,
                  child: MaterialButton(
                      minWidth: MediaQuery.of(context).size.width,
                      padding:
                          const EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),
                      onPressed: () async {
                        var response = await RemoteService()
                            .login(emailInput, passwordInput)
                            .catchError((error) {
                          debugPrint(error.toString());
                        });
                      },
                      child: const Text("Login", textAlign: TextAlign.center)),
                ),
                const SizedBox(height: 40.0),
                const Text("Don't Have an Account?",
                    textAlign: TextAlign.center),
                const SizedBox(height: 15.0),
                Material(
                  elevation: 5.0,
                  borderRadius: BorderRadius.circular(30.0),
                  color: Colors.green,
                  child: MaterialButton(
                      minWidth: MediaQuery.of(context).size.width,
                      padding:
                          const EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),
                      onPressed: () {
                        Navigator.of(context).push(MaterialPageRoute(
                            builder: (context) => const RegisterPage()));
                      },
                      child:
                          const Text("Sign Up", textAlign: TextAlign.center)),
                ),
              ],
            )),
      )),
    );
  }
}