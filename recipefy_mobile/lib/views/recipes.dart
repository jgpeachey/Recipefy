import 'package:flutter/material.dart';
import 'package:recipefy_mobile/utils/colors.dart';
import 'package:recipefy_mobile/widgets/big_text.dart';
import 'package:recipefy_mobile/widgets/icon_and_text_widget.dart';
import 'package:recipefy_mobile/widgets/small_text.dart';

class MyRecipesBody extends StatefulWidget {
  const MyRecipesBody({super.key});

  @override
  State<MyRecipesBody> createState() => _MyRecipesBodyState();
}

class _MyRecipesBodyState extends State<MyRecipesBody> {
  @override
  Widget build(BuildContext context) {
    return Container(
          // color: Colors.redAccent,
          child: ListView.builder(
            physics: NeverScrollableScrollPhysics(),
            shrinkWrap: true,
            itemCount: 10,
            itemBuilder: (context, index) {
              return Container(
                margin: EdgeInsets.only(
                    left: MediaQuery.of(context).size.width * 0.05,
                    right: MediaQuery.of(context).size.width * 0.05,
                    bottom: MediaQuery.of(context).size.height * 0.03),
                child: Row(
                  children: [
                    // image section
                    Container(
                      width: MediaQuery.of(context).size.width * 0.3,
                      height: MediaQuery.of(context).size.height * 0.15,
                      decoration: BoxDecoration(
                        borderRadius: BorderRadius.only(
                          topLeft: Radius.circular(30),
                          bottomLeft: Radius.circular(30),
                        ),
                        color: Colors.red,
                        image: DecorationImage(
                          fit: BoxFit.cover,
                          image: AssetImage("assets/images/pasta.jpg"),
                        ),
                      ),
                    ),
                    // text section
                    Expanded(
                      child: Container(
                          height: MediaQuery.of(context).size.height * 0.15,
                          // width: 200,
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.only(
                              topRight: Radius.circular(MediaQuery.of(context).size.width * 0.05),
                              bottomRight: Radius.circular(MediaQuery.of(context).size.width * 0.05),
                            ),
                            color: Colors.cyan,
                          ),
                          child: Padding(
                              padding: EdgeInsets.only(
                                  left: MediaQuery.of(context).size.width * 0.02,
                                  right: MediaQuery.of(context).size.width * 0.02),
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  BigText(text: "Nutritious fruit meal in Italy"),
                                  SizedBox(height: MediaQuery.of(context).size.height * 0.02),
                                  SmallText(
                                      text: "With sicilian characteristics"),
                                  SizedBox(height: MediaQuery.of(context).size.height * 0.02),
                                  Row(
                                    mainAxisAlignment: MainAxisAlignment.start,
                                    children: [
                                      IconAndTextWdiget(
                                          icon: Icons.house,
                                          text: 'Date posted',
                                          color: AppColors.mainColor,
                                          iconColor: AppColors.iconColor),
                                      SizedBox(width: 20),
                                      IconAndTextWdiget(
                                          icon: Icons.person,
                                          text: 'User',
                                          color: AppColors.mainColor,
                                          iconColor: Colors.deepPurple),
                                    ],
                                  ),
                                ],
                              ))),
                    ),
                  ],
                ),
              );
            },
          ),
        );
  }
}