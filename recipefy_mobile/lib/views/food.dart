import 'package:recipefy_mobile/models/search_recipe_model.dart';
import 'package:recipefy_mobile/services/remote_services.dart';
import 'package:recipefy_mobile/utils/colors.dart';
import 'package:recipefy_mobile/views/home.dart';
import 'package:recipefy_mobile/views/popular.dart';
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

  final Future<List<RecipeResult>> _calculation =
      Future<List<RecipeResult>>.delayed(
    const Duration(seconds: 1),
    () async => await RemoteService().findAllRecipe("", 0, 0),
  );

  @override
  Widget build(BuildContext context) {
    String search = "";
    var count = 0;
    var page = 0;

    return Column(
      children: [
        // SLIDE SHOW
        FutureBuilder(
          future: _calculation,
          builder: (BuildContext context,
              AsyncSnapshot<List<RecipeResult>> snapshot) {
            List<Widget> children;

            // SLIDE SHOW IF THERE IS DATA IN THE DATABASE
            if (snapshot.hasData) {
              children = [
                SizedBox(height: 20),
                Container(
                  // color: Colors.redAccent,
                  height: MediaQuery.of(context).size.height * 0.35,
                  child: PageView.builder(
                    // debugPrint("${snapshot.data![0].title}"),
                    controller: pageController,
                    itemCount: 5,
                    itemBuilder: (context, position) {
                      return _buildPageItem(position,
                          snapshot.data![snapshot.data!.length - position - 1]);
                    },
                  ),
                )
              ];
              // print('Result: ${snapshot.data![0].title}');
            }

            // SLIDE SHOW HAS AN ERROR
            // NO DATA
            else if (snapshot.hasError) {
              children = <Widget>[
                const Icon(
                  Icons.error_outline,
                  color: Colors.red,
                  size: 60,
                ),
                Padding(
                  padding: const EdgeInsets.only(top: 16),
                  child: Text('Error: ${snapshot.error}'),
                ),
              ];
            }

            // SLIDE SHOW IS WAITING FOR DATA
            else {
              children = const <Widget>[
                SizedBox(
                  width: 60,
                  height: 60,
                  child: CircularProgressIndicator(),
                ),
                Padding(
                  padding: EdgeInsets.only(top: 16),
                  // child: Text('Awaiting result...'),
                ),
              ];
            }
            return Center(
              child: Column(
                children: children,
              ),
            );
          },
        ),

        // DOTS INDICATOR
        DotsIndicator(
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

        // POPULAR SUBTITLE
        Container(
            margin:
                EdgeInsets.only(left: MediaQuery.of(context).size.width * 0.08),
            child: Row(
              children: [
                BigText(text: "Popular"),
              ],
            )),

        // POPULAR FOOD LIST VIEW
        FutureBuilder(
          future: _calculation,
          builder: (BuildContext context,
              AsyncSnapshot<List<RecipeResult>> snapshot) {
            List<Widget> children;

            if (snapshot.hasData) {
              children = [
                Container(
                  // color: Colors.redAccent,
                  child: ListView.builder(
                    physics: NeverScrollableScrollPhysics(),
                    shrinkWrap: true,
                    itemCount: 10,
                    itemBuilder: (context, index) {
                      return Stack(children: [
                        GestureDetector(
                          onTap: () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (context) => PopularFoodDetail(
                                    recipe: snapshot.data![index]),
                              ),
                            );
                          },
                          child: Container(
                            margin: EdgeInsets.only(
                                left: MediaQuery.of(context).size.width * 0.05,
                                right: MediaQuery.of(context).size.width * 0.05,
                                bottom:
                                    MediaQuery.of(context).size.height * 0.03),
                            child: Row(
                              children: [
                                // image section
                                Container(
                                  width:
                                      MediaQuery.of(context).size.width * 0.3,
                                  height:
                                      MediaQuery.of(context).size.height * 0.15,
                                  decoration: BoxDecoration(
                                    borderRadius: BorderRadius.only(
                                      topLeft: Radius.circular(30),
                                      bottomLeft: Radius.circular(30),
                                    ),
                                    color: Colors.red,
                                    image: DecorationImage(
                                      fit: BoxFit.cover,
                                      image: NetworkImage(
                                          snapshot.data![index].pic),
                                    ),
                                  ),
                                ),
                                // text section
                                Expanded(
                                  child: Container(
                                      height:
                                          MediaQuery.of(context).size.height *
                                              0.15,
                                      // width: 200,
                                      decoration: BoxDecoration(
                                        borderRadius: BorderRadius.only(
                                          topRight: Radius.circular(
                                              MediaQuery.of(context)
                                                      .size
                                                      .width *
                                                  0.05),
                                          bottomRight: Radius.circular(
                                              MediaQuery.of(context)
                                                      .size
                                                      .width *
                                                  0.05),
                                        ),
                                        color: Colors.cyan,
                                      ),
                                      child: Padding(
                                          padding: EdgeInsets.only(
                                              left: MediaQuery.of(context)
                                                      .size
                                                      .width *
                                                  0.02,
                                              right: MediaQuery.of(context)
                                                      .size
                                                      .width *
                                                  0.02),
                                          child: Column(
                                            crossAxisAlignment:
                                                CrossAxisAlignment.start,
                                            mainAxisAlignment:
                                                MainAxisAlignment.center,
                                            children: [
                                              BigText(
                                                  text: snapshot
                                                      .data![index].title),
                                              SizedBox(
                                                  height: MediaQuery.of(context)
                                                          .size
                                                          .height *
                                                      0.02),
                                              Expanded(
                                                child: SmallText(
                                                    text: snapshot.data![index]
                                                        .description),
                                              ),
                                              SizedBox(
                                                  height: MediaQuery.of(context)
                                                          .size
                                                          .height *
                                                      0.02),
                                              Row(
                                                mainAxisAlignment:
                                                    MainAxisAlignment.start,
                                                children: [
                                                  IconAndTextWdiget(
                                                      icon: Icons.house,
                                                      text:
                                                          '${snapshot.data![index].createdAt.month}-${snapshot.data![index].createdAt.day}-${snapshot.data![index].createdAt.year}',
                                                      color:
                                                          AppColors.mainColor,
                                                      iconColor:
                                                          AppColors.iconColor),
                                                  SizedBox(width: 20),
                                                  IconAndTextWdiget(
                                                      icon: Icons.person,
                                                      text: snapshot
                                                          .data![index]
                                                          .username,
                                                      color:
                                                          AppColors.mainColor,
                                                      iconColor:
                                                          Colors.deepPurple),
                                                ],
                                              ),
                                            ],
                                          ))),
                                ),
                              ],
                            ),
                          ),
                        ),
                      ]);
                    },
                  ),
                ),
              ];
            } else if (snapshot.hasError) {
              children = <Widget>[
                const Icon(
                  Icons.error_outline,
                  color: Colors.red,
                  size: 60,
                ),
                Padding(
                  padding: const EdgeInsets.only(top: 16),
                  child: Text('Error: ${snapshot.error}'),
                ),
              ];
            } else {
              children = const <Widget>[
                SizedBox(
                  width: 60,
                  height: 60,
                  child: CircularProgressIndicator(),
                ),
                Padding(
                  padding: EdgeInsets.only(top: 16),
                  // child: Text('Awaiting result...'),
                ),
              ];
            }
            return Center(
              child: Column(
                children: children,
              ),
            );
          },
        ),
      ],
    );
  }

  Widget _buildPageItem(int index, RecipeResult recipe) {
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

      child: Stack(children: [
        GestureDetector(
          // ADD API CONNECTION HERE
          // SEND THE USER TO THE SCREEN OF THE RECIPE THEY CLICKED ON
          // DELETE THIS COMMENT

          onTap: () {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) => PopularFoodDetail(recipe: recipe),
              ),
            );
          },
          child: Container(
            height: MediaQuery.of(context).size.height * 0.3,
            margin: EdgeInsets.only(
                left: MediaQuery.of(context).size.width * 0.02,
                right: MediaQuery.of(context).size.width * 0.02),
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(
                  MediaQuery.of(context).size.width * 0.07),
              color: index.isEven ? Color(0xFF69C5DF) : Color(0xFF9294CC),
              image: DecorationImage(
                fit: BoxFit.cover,

                // API CONNECTION HERE
                // THIS IS WHERE THE PICTURE FOR THE CAROUSEL GOES
                image: NetworkImage(recipe.pic),
              ),
            ),
          ),
        ),
      ]),
      // Align(
      //   alignment: Alignment.topCenter,
      //   child: Container(
      //     height: MediaQuery.of(context).size.height * 0.12,
      //     margin: EdgeInsets.only(
      //         left: MediaQuery.of(context).size.width * 0.07,
      //         right: MediaQuery.of(context).size.width * 0.07,
      //         bottom: MediaQuery.of(context).size.width * 0.05),
      //     decoration: BoxDecoration(
      //       borderRadius: BorderRadius.circular(
      //           MediaQuery.of(context).size.width * 0.05),
      //       color: Colors.white,
      //       boxShadow: [
      //         BoxShadow(
      //           color: Color(0xFFE8E8E8),
      //           // blurRadius: 5.0,
      //           offset: Offset(0, 5),
      //         ),
      //         BoxShadow(
      //           color: Colors.white,
      //           // blurRadius: 5.0,
      //           offset: Offset(-5, 0),
      //         ),
      //         BoxShadow(
      //           color: Colors.white,
      //           // blurRadius: 5.0,
      //           offset: Offset(5, 0),
      //         ),
      //       ],
      //     ),
      //     child: Container(
      //       padding: EdgeInsets.only(
      //           top: MediaQuery.of(context).size.height * 0.015,
      //           left: MediaQuery.of(context).size.height * 0.015,
      //           right: MediaQuery.of(context).size.height * 0.015),
      //       // child: AppColumn(text: "Strawberry Smoothie"),
      //     ),
      //   ),
      // ),

      //
    );
  }
}
