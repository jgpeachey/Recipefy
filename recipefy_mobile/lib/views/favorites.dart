import 'package:flutter/material.dart';

void main() {
  runApp(
    FavoritesPage()
  );
}

class FavoritesPage extends StatefulWidget {
  const FavoritesPage({super.key});

  @override
  State<FavoritesPage> createState() => _FavoritesPageState();
}

class _FavoritesPageState extends State<FavoritesPage>{

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Favorites Page',
      home: Scaffold(
        appBar: AppBar(
          title: Text('Favorites Page'),
        ),
        body: Center(
          child: Text('Favorites Page'),
        )
      )
    );
  }
}