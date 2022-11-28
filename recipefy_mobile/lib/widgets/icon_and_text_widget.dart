import 'package:flutter/material.dart';
import 'package:recipefy_mobile/widgets/big_text.dart';

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
        BigText(text: text, color: color, size: 12),
      ],
    );
  }
}
