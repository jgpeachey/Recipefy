import 'package:flutter/material.dart';
import 'views/login.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  static const String _title = 'Recipefy';

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: _title,
      theme: ThemeData(
          // CHANGE LATER
          primarySwatch: Colors.blue),
      debugShowCheckedModeBanner: false,
      home: const LoginPage(),
    );
  }
}
