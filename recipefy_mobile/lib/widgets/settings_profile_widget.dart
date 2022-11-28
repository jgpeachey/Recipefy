import 'package:flutter/material.dart';

class SettingsProfileWidget extends StatefulWidget {
  final String imagePath;
  final VoidCallback onClicked;

  const SettingsProfileWidget(
      {super.key, required this.imagePath, required this.onClicked});

  @override
  State<SettingsProfileWidget> createState() => _SettingsProfileWidgetState();
}

class _SettingsProfileWidgetState extends State<SettingsProfileWidget> {

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Stack(children: [
        buildImage(),
        Positioned(bottom: 0, right: 4, child: buildEditIcon(Colors.grey)),
      ]),
    );
  }

  Widget buildImage() {
    final image = NetworkImage(widget.imagePath);

    return ClipOval(
      child: Material(
        child: Ink.image(
          image: image,
          fit: BoxFit.cover,
          width: 128,
          height: 128,
          child: InkWell(onTap: widget.onClicked),
        ),
      ),
    );
  }

  Widget buildEditIcon(Color color) => buildCircle(
      color: Colors.white,
      all: 3,
      child:
          buildCircle(color: color, all: 8, child: Icon(Icons.edit, size: 20)));

  Widget buildCircle({
    required Widget child,
    required double all,
    required Color color,
  }) =>
      ClipOval(
        child:
            Container(padding: EdgeInsets.all(all), color: color, child: child),
      );
}
