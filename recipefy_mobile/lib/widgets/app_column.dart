import 'package:recipefy_mobile/utils/colors.dart';
// import 'package:recipefy_mobile/utils/dimensions.dart';
import 'package:recipefy_mobile/widgets/big_text.dart';
import 'package:recipefy_mobile/widgets/icon_and_text_widget.dart';
import 'package:recipefy_mobile/widgets/small_text.dart';
import 'package:flutter/material.dart';

class AppColumn extends StatelessWidget {
  final String text;
  const AppColumn({Key? key, required this.text}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        BigText(
          text: text,
          size: 26,
        ),
        SizedBox(height: 10),
        Row(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            // ADD CONNECTION TO API HERE
            // DELETE THIS COMMENT
            IconAndTextWdiget(
                icon: Icons.house,
                text: '10-27-22',
                color: AppColors.mainColor,
                iconColor: AppColors.iconColor),
            SizedBox(width: 20,),
            IconAndTextWdiget(
                icon: Icons.person,
                text: 'User',
                color: AppColors.mainColor,
                iconColor: Colors.deepPurple),
          ],
        ),
      ],
    );
  }
}
