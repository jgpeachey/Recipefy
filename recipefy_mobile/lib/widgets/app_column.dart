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
        BigText(text: text, size: 26,),
        SizedBox(height: 10),
        Row(
          // mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Wrap(
              children: List.generate(
                5,
                ((index) =>
                    Icon(Icons.star, color: AppColors.mainColor, size: 15)),
              ),
            ),
            SizedBox(width: 10),
            SmallText(text: "4.5"),
            SizedBox(width: 20),
            SmallText(text: "1287"),
            SizedBox(width: 10),
            SmallText(text: "comments"),
          ],
        ),
        SizedBox(height: 20),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            IconAndTextWdiget(
                icon: Icons.house,
                text: 'abc',
                color: AppColors.mainColor,
                iconColor: AppColors.iconColor),
            IconAndTextWdiget(
                icon: Icons.person,
                text: 'person',
                color: AppColors.mainColor,
                iconColor: Colors.deepPurple),
            IconAndTextWdiget(
                icon: Icons.food_bank,
                text: 'food',
                color: AppColors.mainColor,
                iconColor: Colors.pinkAccent),
          ],
        ),
      ],
    );
  }
}
