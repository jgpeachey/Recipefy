import 'package:recipefy_mobile/utils/colors.dart';
// import 'package:recipefy_mobile/utils/dimensions.dart';
import 'package:recipefy_mobile/widgets/small_text.dart';
import 'package:flutter/material.dart';

class ExpandableTextWidget extends StatefulWidget {
  final String text;
  const ExpandableTextWidget({super.key, required this.text});

  @override
  State<ExpandableTextWidget> createState() => _ExpandableTextWidgetState();
}

class _ExpandableTextWidgetState extends State<ExpandableTextWidget> {
  late String firstHalf;
  late String secondHalf;

  bool hiddenText = true;

  double textHeight = 888 / 5.63;

  @override
  void initState() {
    super.initState();
    if (widget.text.length > textHeight) {
      firstHalf = widget.text.substring(0, textHeight.toInt());
      secondHalf =
          widget.text.substring(textHeight.toInt() + 1, widget.text.length);
    } else {
      firstHalf = widget.text;
      secondHalf = "";
    }
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      child: secondHalf.isEmpty
          ? SmallText(color: AppColors.mainColor, size: 16, text: firstHalf)
          : Column(
              children: [
                SmallText(
                  // did not work to change margin between lines
                  // height: 5,
                  color: AppColors.mainColor,
                  size: 16,
                  text: hiddenText
                      ? (firstHalf + "...")
                      : (firstHalf + secondHalf),
                ),
                InkWell(
                  onTap: (){
                    setState(() {
                      hiddenText = !hiddenText;
                    });
                  },
                  child: Row(
                    children: [
                      SmallText(text: "Show more", color: AppColors.mainColor,),
                      Icon(hiddenText?Icons.arrow_drop_down:Icons.arrow_drop_up, color: AppColors.mainColor),
                    ],
                  )
                )
              ],
            ),
    );
  }
}
