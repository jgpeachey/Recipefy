import 'package:http/retry.dart';
import 'package:recipefy_mobile/services/remote_services.dart';
import 'package:flutter/material.dart';

class RegisterConfirmPage extends StatelessWidget {
  const RegisterConfirmPage({Key? key}) : super(key: key);

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
                const Text("Registration Complete!",
                    textAlign: TextAlign.center),
                const SizedBox(height: 30.0),
                const Text("Next, please verify your email.",
                    textAlign: TextAlign.center),
                const SizedBox(height: 30.0),
                Material(
                  elevation: 5.0,
                  borderRadius: BorderRadius.circular(30.0),
                  color: Colors.green,
                  child: MaterialButton(
                      minWidth: MediaQuery.of(context).size.width,
                      padding:
                          const EdgeInsets.fromLTRB(20.0, 15.0, 20.0, 15.0),
                      onPressed: () {
                        // Return to Login
                        Navigator.of(context)
                            .popUntil((route) => route.isFirst);
                      },
                      child: const Text("Return to Login",
                          textAlign: TextAlign.center)),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
