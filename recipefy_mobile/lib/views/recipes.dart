import 'package:flutter/material.dart';
import 'package:recipefy_mobile/models/search_recipe_model.dart';
import 'package:recipefy_mobile/services/remote_services.dart';
import 'package:recipefy_mobile/utils/colors.dart';
import 'package:recipefy_mobile/views/popular.dart';
import 'package:recipefy_mobile/widgets/big_text.dart';
import 'package:recipefy_mobile/widgets/icon_and_text_widget.dart';
import 'package:recipefy_mobile/widgets/small_text.dart';

class MyRecipesBody extends StatefulWidget {
  const MyRecipesBody({super.key});

  @override
  State<MyRecipesBody> createState() => _MyRecipesBodyState();
}

class _MyRecipesBodyState extends State<MyRecipesBody> {
  Future<List<RecipeResult>> _calculation = Future<List<RecipeResult>>.delayed(
    const Duration(seconds: 2),
    () async => await RemoteService().findRecipe("", 0, 0),
  );

  @override
  Widget build(BuildContext context) {
    return Container(
      // color: Colors.redAccent,
      child: FutureBuilder(
          future: _calculation,
          builder: (BuildContext context,
              AsyncSnapshot<List<RecipeResult>> snapshot) {
            List<Widget> children;

            if (snapshot.hasData) {
              children = [
                ListView.builder(
                  physics: NeverScrollableScrollPhysics(),
                  shrinkWrap: true,
                  // THIS NEEDS TO BE DYNAMIC
                  // DEPENDING ON THE NUMBER OF RECIPES THE USER HAS
                  itemCount: snapshot.data!.length,
                  itemBuilder: (context, index) {
                    // return FutureBuilder(

                    return GestureDetector(
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
                                  image: NetworkImage(snapshot.data![index].pic),
                                ),
                              ),
                            ),
                            // text section
                            Expanded(
                              child: Container(
                                  height:
                                      MediaQuery.of(context).size.height * 0.15,
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
                                          left:
                                              MediaQuery.of(context).size.width *
                                                  0.02,
                                          right:
                                              MediaQuery.of(context).size.width *
                                                  0.02),
                                      child: Column(
                                        crossAxisAlignment:
                                            CrossAxisAlignment.start,
                                        mainAxisAlignment:
                                            MainAxisAlignment.center,
                                        children: [
                                          BigText(
                                              text: snapshot.data![index].title),
                                          SizedBox(
                                              height: MediaQuery.of(context)
                                                      .size
                                                      .height *
                                                  0.02),
                                          SmallText(
                                              text: snapshot
                                                  .data![index].description),
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
                                                  color: AppColors.mainColor,
                                                  iconColor: AppColors.iconColor),
                                              SizedBox(width: 20),
                                              IconAndTextWdiget(
                                                  icon: Icons.person,
                                                  text: snapshot
                                                      .data![index].username,
                                                  color: AppColors.mainColor,
                                                  iconColor: Colors.deepPurple),
                                            ],
                                          ),
                                        ],
                                      ))),
                            ),
                          ],
                        ),
                      ),
                    );
                  },
                )
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
          }),
    );
  }
}
