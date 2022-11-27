import 'package:flutter/material.dart';
import 'package:recipefy_mobile/models/search_recipe_model.dart';
import 'package:recipefy_mobile/services/remote_services.dart';
import 'package:recipefy_mobile/utils/colors.dart';
import 'package:recipefy_mobile/widgets/big_text.dart';
import 'package:recipefy_mobile/widgets/icon_and_text_widget.dart';
import 'package:recipefy_mobile/widgets/small_text.dart';

class FavoritesPage extends StatefulWidget {
  const FavoritesPage({super.key});

  @override
  State<FavoritesPage> createState() => _FavoritesPageState();
}

class _FavoritesPageState extends State<FavoritesPage> {
  Future<List<RecipeResult>> _calculation = Future<List<RecipeResult>>.delayed(
    const Duration(seconds: 2),
    RemoteService().getLikedRecipes,
  );

  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        FutureBuilder(
          future: _calculation,
          builder: (BuildContext context,
              AsyncSnapshot<List<RecipeResult>> snapshot) {
            List<Widget> children; 

            // FAVORITE RECIPES
            if (snapshot.hasData) {
              children = [
                SizedBox(height: MediaQuery.of(context).size.height * 0.1),
                Row(
                  children: [
                    SizedBox(width: MediaQuery.of(context).size.width * 0.1),
                    Text("User's Favorite Recipes",
                        style: TextStyle(fontSize: 20)),
                  ],
                ),
                Column(
                  children: [
                    
                    // LIST VIEW OF FAVORITE RECIPES
                    ListView.builder(
                      physics: NeverScrollableScrollPhysics(),
                      shrinkWrap: true,
                      itemCount: snapshot.data!.length,
                      itemBuilder: (context, index) {
                        return Container(
                          margin: EdgeInsets.only(
                              left: MediaQuery.of(context).size.width * 0.05,
                              right: MediaQuery.of(context).size.width * 0.05,
                              bottom:
                                  MediaQuery.of(context).size.height * 0.03),
                          child: Row(
                            children: [
                              // image section
                              Container(
                                width: MediaQuery.of(context).size.width * 0.3,
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
                                    image:
                                        NetworkImage(snapshot.data![index].pic),
                                  ),
                                ),
                              ),
                              // text section
                              Expanded(
                                child: Container(
                                    height: MediaQuery.of(context).size.height *
                                        0.15,
                                    // width: 200,
                                    decoration: BoxDecoration(
                                      borderRadius: BorderRadius.only(
                                        topRight: Radius.circular(
                                            MediaQuery.of(context).size.width *
                                                0.05),
                                        bottomRight: Radius.circular(
                                            MediaQuery.of(context).size.width *
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
                                                text:
                                                    snapshot.data![index].title),
                                            SizedBox(
                                                height: MediaQuery.of(context)
                                                        .size
                                                        .height *
                                                    0.02),
                                            Expanded(
                                              child: SmallText(
                                                  text:
                                                      snapshot.data![index].description),
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
                                                    text: '${snapshot.data![index].createdAt.month}-${snapshot.data![index].createdAt.day}-${snapshot.data![index].createdAt.year}',
                                                    color: AppColors.mainColor,
                                                    iconColor:
                                                        AppColors.iconColor),
                                                SizedBox(width: 20),
                                                IconAndTextWdiget(
                                                    icon: Icons.person,
                                                    text: snapshot
                                                        .data![index].username,
                                                    color: AppColors.mainColor,
                                                    iconColor:
                                                        Colors.deepPurple),
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
                  ],
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
          //  Column(
          //     children: [
          //       SizedBox(height: MediaQuery.of(context).size.height * 0.1),
          //       Row(children: [
          //         SizedBox(width: MediaQuery.of(context).size.width * 0.1),
          //         Text("User's Favorite Recipes", style: TextStyle(fontSize: 20)),
          //       ],),
          //       Expanded(
          //         child: SingleChildScrollView(
          //           child: Container(
          //             // color: Colors.redAccent,
          //             child: ListView.builder(
          //               physics: NeverScrollableScrollPhysics(),
          //               shrinkWrap: true,
          //               itemCount: 9,
          //               itemBuilder: (context, index) {
          //                 return Container(
          //                   margin: EdgeInsets.only(
          //                       left: MediaQuery.of(context).size.width * 0.05,
          //                       right: MediaQuery.of(context).size.width * 0.05,
          //                       bottom: MediaQuery.of(context).size.height * 0.03),
          //                   child: Row(
          //                     children: [
          //                       // image section
          //                       Container(
          //                         width: MediaQuery.of(context).size.width * 0.3,
          //                         height: MediaQuery.of(context).size.height * 0.15,
          //                         decoration: BoxDecoration(
          //                           borderRadius: BorderRadius.only(
          //                             topLeft: Radius.circular(30),
          //                             bottomLeft: Radius.circular(30),
          //                           ),
          //                           color: Colors.red,
          //                           image: DecorationImage(
          //                             fit: BoxFit.cover,
          //                             image: AssetImage("assets/images/pasta.jpg"),
          //                           ),
          //                         ),
          //                       ),
          //                       // text section
          //                       Expanded(
          //                         child: Container(
          //                             height: MediaQuery.of(context).size.height * 0.15,
          //                             // width: 200,
          //                             decoration: BoxDecoration(
          //                               borderRadius: BorderRadius.only(
          //                                 topRight: Radius.circular(
          //                                     MediaQuery.of(context).size.width * 0.05),
          //                                 bottomRight: Radius.circular(
          //                                     MediaQuery.of(context).size.width * 0.05),
          //                               ),
          //                               color: Colors.cyan,
          //                             ),
          //                             child: Padding(
          //                                 padding: EdgeInsets.only(
          //                                     left:
          //                                         MediaQuery.of(context).size.width * 0.02,
          //                                     right:
          //                                         MediaQuery.of(context).size.width * 0.02),
          //                                 child: Column(
          //                                   crossAxisAlignment: CrossAxisAlignment.start,
          //                                   mainAxisAlignment: MainAxisAlignment.center,
          //                                   children: [
          //                                     BigText(
          //                                         text: "Nutritious fruit meal in Italy"),
          //                                     SizedBox(
          //                                         height:
          //                                             MediaQuery.of(context).size.height *
          //                                                 0.02),
          //                                     SmallText(
          //                                         text: "With sicilian characteristics"),
          //                                     SizedBox(
          //                                         height:
          //                                             MediaQuery.of(context).size.height *
          //                                                 0.02),
          //                                     Row(
          //                                       mainAxisAlignment: MainAxisAlignment.start,
          //                                       children: [
          //                                         IconAndTextWdiget(
          //                                             icon: Icons.house,
          //                                             text: 'Date posted',
          //                                             color: AppColors.mainColor,
          //                                             iconColor: AppColors.iconColor),
          //                                         SizedBox(width: 20),
          //                                         IconAndTextWdiget(
          //                                             icon: Icons.person,
          //                                             text: 'User',
          //                                             color: AppColors.mainColor,
          //                                             iconColor: Colors.deepPurple),
          //                                       ],
          //                                     ),
          //                                   ],
          //                                 ))),
          //                       ),
          //                     ],
          //                   ),
          //                 );
          //               },
          //             ),
          //           ),
          //         ),
          //       )
          //     ],
          //   ),
        ),
      ],
    );
  }
}
