import 'package:flutter/cupertino.dart';

// import '../utils/dimensions.dart';

class BigText extends StatelessWidget {
  Color? color;
  final String text;
  double size;
  TextOverflow overFlow;

  BigText({Key? key, this.color = const Color(0xFF2E2E2E),
    required this.text,
    this.size = 0,
    this.overFlow=TextOverflow.ellipsis,
  }): super(key: key);

  @override
  Widget build(BuildContext context) {
    return Text(
      text,
      maxLines: 1,
      overflow: overFlow,
      style: TextStyle(
        fontFamily: 'Roboto',
        fontSize: size==0?20:size,
        color: color,
        fontWeight: FontWeight.w700,
      ),
    );
  }
}