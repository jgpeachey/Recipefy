import 'package:flutter/material.dart';
import 'package:recipefy_mobile/routes/routes.dart';
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
      routes: Routes.getroutes,
      // home: getRecipes(),
    );
  }
}
