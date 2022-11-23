import 'package:flutter/material.dart';

void main() {
  runApp(
    AddPage()
  );
}

class AddPage extends StatefulWidget {
  const AddPage({super.key});

  @override
  State<AddPage> createState() => _AddPageState();
}

class _AddPageState extends State<AddPage>{

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Add Page',
      home: Scaffold(
        appBar: AppBar(
          title: Text('Add Page'),
        ),
        body: Center(
          child: Text('Add Page'),
        )
      )
    );
  }
}