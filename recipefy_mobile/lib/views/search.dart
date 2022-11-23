import 'package:flutter/material.dart';

void main() {
  runApp(
    SearchPage()
  );
}

class SearchPage extends StatefulWidget {
  const SearchPage({super.key});

  @override
  State<SearchPage> createState() => _SearchPageState();
}

class _SearchPageState extends State<SearchPage>{

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Search Page',
      home: Scaffold(
        appBar: AppBar(
          title: Text('Search Page'),
        ),
        body: Center(
          child: Text('Search Page'),
        )
      )
    );
  }
}