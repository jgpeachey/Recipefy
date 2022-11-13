import 'package:flutter/material.dart';

import 'small_text.dart';

class IconAndTextWdiget extends StatelessWidget {
  final IconData icon;
  final String text;
  final Color color;
  final Color iconColor;
  const IconAndTextWdiget(
      {super.key,
      required this.icon,
      required this.text,
      required this.color,
      required this.iconColor});

  @override
  Widget build(BuildContext context) {
    return Row(
      children: [
        Icon(icon, color: iconColor),
        SizedBox(width: 5),
        SmallText(text: text, color: color),
      ],
    );
  }
}
