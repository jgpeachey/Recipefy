
import 'package:flutter/material.dart';
import 'package:recipefy_mobile/widgets/big_text.dart';
import 'package:recipefy_mobile/views/food.dart';


import '../../utils/colors.dart';
// import '../../utils/dimensions.dart';
import '../../widgets/small_text.dart';

void main() {
  runApp(
    HomePage()
  );
}

class HomePage extends StatefulWidget {
  const HomePage({super.key});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage>{

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Column(
        children: [
          Container(
            child: Container(
              margin: EdgeInsets.only(
                  top: 45, bottom: 15),
              padding: EdgeInsets.only(
                  left: 20, right: 20),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    children: [
                      BigText(
                          text: "Recipefy",
                          color: AppColors.mainColor,
                          size: 30),
                      Row(
                        // ADD CONNECTION TO API HERE
                        // PROFILE PICTURE AND FIRST NAME
                        // DELETE THIS COMMENT
                        children: [
                          Icon(Icons.person),
                          Text('User'),
                        ],
                      ),
                    ],
                  ),
                  Center(
                    child: Container(
                      width: 45,
                      height: 45,
                      child: Icon(Icons.search,
                          color: Colors.white, size: 24),
                      decoration: BoxDecoration(
                        borderRadius:
                            BorderRadius.circular(15),
                        color: AppColors.mainColor,
                      ),
                    ),
                  )
                ],
              ),
            ),
          ),
          Expanded(
            child: SingleChildScrollView(
              child: FoodPageBody(),
            ),
          ),
        ],
      ),
    );
  }
}