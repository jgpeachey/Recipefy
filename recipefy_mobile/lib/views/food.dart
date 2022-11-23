import 'package:recipefy_mobile/utils/colors.dart';
import 'package:recipefy_mobile/widgets/app_column.dart';
import 'package:recipefy_mobile/widgets/icon_and_text_widget.dart';
import 'package:recipefy_mobile/widgets/small_text.dart';
import 'package:dots_indicator/dots_indicator.dart';
import 'package:flutter/material.dart';

import '../../widgets/big_text.dart';

class FoodPageBody extends StatefulWidget {
  const FoodPageBody({super.key});

  @override
  State<FoodPageBody> createState() => _FoodPageBodyState();
}

class _FoodPageBodyState extends State<FoodPageBody> {
  PageController pageController = PageController(viewportFraction: 0.85);
  var _currPageValue = 0.0;
  double _scaleFactor = 0.8;
  // double _height = 0;
  

  @override
  void initState() {
    super.initState();
    pageController.addListener(() {
      setState(() {
        _currPageValue = pageController.page!;
      });
    });
  }

  @override
  void dispose() {
    pageController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        Container(
          // color: Colors.redAccent,
          height: MediaQuery.of(context).size.height * 0.35,
          child: PageView.builder(
            controller: pageController,
            itemCount: 5,
            itemBuilder: (context, position) {
              return _buildPageItem(position);
            },
          ),
        ),
        new DotsIndicator(
          dotsCount: 5,
          position: _currPageValue,
          decorator: DotsDecorator(
            activeColor: AppColors.mainColor,
            size: const Size.square(9.0),
            activeSize: const Size(18.0, 9.0),
            activeShape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(5.0)),
          ),
        ),
        SizedBox(height: MediaQuery.of(context).size.height * 0.03),
        Container(
          // color: Colors.redAccent,
          margin:
              EdgeInsets.only(left: MediaQuery.of(context).size.width * 0.08),
          child: Row(
            children: [
            BigText(text: "Popular"),
          ],)
        ),
        Container(
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
                            color: AppColors.titleColor,
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
        ),
      ],
    );
  }

  Widget _buildPageItem(int index) {
    double _height = MediaQuery.of(context).size.height * 0.25;
    Matrix4 matrix = new Matrix4.identity();
    if (index == _currPageValue.floor()) {
      var currScale = 1 - (_currPageValue - index) * (1 - _scaleFactor);
      var currTrans = _height * (1 - currScale) / 2;
      matrix = Matrix4.diagonal3Values(1, currScale, 1)
        ..setTranslationRaw(0, currTrans, 0);
    } else if (index == _currPageValue.floor() + 1) {
      var currScale =
          _scaleFactor + (_currPageValue - index + 1) * (1 - _scaleFactor);
      var currTrans = _height * (1 - currScale) / 2;
      matrix = Matrix4.diagonal3Values(1, currScale, 1);
      matrix = Matrix4.diagonal3Values(1, currScale, 1)
        ..setTranslationRaw(0, currTrans, 0);
    } else if (index == _currPageValue.floor() - 1) {
      var currScale = 1 - (_currPageValue - index) * (1 - _scaleFactor);
      var currTrans = _height * (1 - currScale) / 2;
      matrix = Matrix4.diagonal3Values(1, currScale, 1);
      matrix = Matrix4.diagonal3Values(1, currScale, 1)
        ..setTranslationRaw(0, currTrans, 0);
    } else {
      var currScale = 0.8;
      matrix = Matrix4.diagonal3Values(1, currScale, 1)
        ..setTranslationRaw(0, _height * (1 - _scaleFactor) / 2, 1);
    }

    return Transform(
      transform: matrix,
      child: Stack(
        children: [
          GestureDetector(
            onTap: () {
              Navigator.pushNamed(context, '/popular');
            },
            child: Container(
              height: MediaQuery.of(context).size.height * 0.3,
              margin: EdgeInsets.only(
                  left: MediaQuery.of(context).size.width * 0.02, right: MediaQuery.of(context).size.width * 0.02),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(MediaQuery.of(context).size.width * 0.07),
                color: index.isEven ? Color(0xFF69C5DF) : Color(0xFF9294CC),
                image: DecorationImage(
                  fit: BoxFit.cover,
                  image: AssetImage("assets/images/smoothie.jpg"),
                ),
              ),
            ),
          ),
          Align(
            alignment: Alignment.bottomCenter,
            child: Container(
              height: MediaQuery.of(context).size.height * 0.12,
              margin: EdgeInsets.only(
                  left: MediaQuery.of(context).size.width * 0.07,
                  right: MediaQuery.of(context).size.width * 0.07,
                  bottom: MediaQuery.of(context).size.width * 0.05),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(MediaQuery.of(context).size.width * 0.05),
                color: Colors.white,
                boxShadow: [
                  BoxShadow(
                    color: Color(0xFFE8E8E8),
                    // blurRadius: 5.0,
                    offset: Offset(0, 5),
                  ),
                  BoxShadow(
                    color: Colors.white,
                    // blurRadius: 5.0,
                    offset: Offset(-5, 0),
                  ),
                  BoxShadow(
                    color: Colors.white,
                    // blurRadius: 5.0,
                    offset: Offset(5, 0),
                  ),
                ],
              ),
              child: Container(
                padding: EdgeInsets.only(
                    top: MediaQuery.of(context).size.height * 0.015,
                    left: MediaQuery.of(context).size.height * 0.015,
                    right: MediaQuery.of(context).size.height * 0.015),
                child: AppColumn(text: "Strawberry Smoothie"),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
