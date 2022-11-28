import 'package:flutter/material.dart';
import 'package:recipefy_mobile/models/search_recipe_model.dart';
import 'package:recipefy_mobile/services/remote_services.dart';
import 'package:recipefy_mobile/utils/colors.dart';
import 'package:recipefy_mobile/views/popular.dart';
import 'package:recipefy_mobile/widgets/big_text.dart';
import 'package:recipefy_mobile/widgets/icon_and_text_widget.dart';
import 'package:recipefy_mobile/widgets/small_text.dart';

class SearchPage extends StatefulWidget {
  const SearchPage({super.key});

  @override
  State<SearchPage> createState() => _SearchPageState();
}

class _SearchPageState extends State<SearchPage> {
  final controller = TextEditingController();

  static String inputSearch = "";
  final count = 5;
  int page = 1;
  List<RecipeResult> recipes = [];

  // METHOD GETS THE RECIPES FROM THE DATA BASE
  getRecipes() async {
    try {
      var response =
          await RemoteService().findAllRecipe(inputSearch, count, page);
      recipes = response;
    } catch (error) {
      debugPrint(error.toString());
    }
  }

  // HANDLES THE SUGGESTIONS WHILE SEARCHING
  void searchRecipe(String query) {
    final suggestions = recipes.where((recipes) {
      final recipeTitle = recipes.title.toLowerCase();
      final input = query.toLowerCase();

      return recipeTitle.contains(input);
    }).toList();

    setState(() {
      recipes = suggestions;
    });
  }

  @override
  Widget build(BuildContext context) {
    // FOR THE SEARCH RECIPE API
    String search = "";
    var count = 0;
    var page = 0;

    return Scaffold(
      body: CustomScrollView(
        shrinkWrap: true,
        slivers: [
          SliverAppBar(
            pinned: true,
            centerTitle: true,
            title: Text('Search'),
            backgroundColor: Colors.black,
            automaticallyImplyLeading: false,
          ),
          SliverList(
            delegate: SliverChildListDelegate([
              TextField(
                onChanged: (value) {
                  getRecipes();
                  searchRecipe(value);
                  inputSearch = value;
                },
                controller: controller,
                decoration: InputDecoration(
                  prefixIcon: Icon(Icons.search),
                  hintText: 'Search any recipe',
                  border: OutlineInputBorder(
                    borderRadius: (BorderRadius.circular(20)),
                    borderSide: BorderSide(color: Colors.black),
                  ),
                ),
              ),
              ListView.builder(
                shrinkWrap: true,
                itemCount: recipes.length,
                itemBuilder: ((context, index) {
                  final recipe = recipes[index];

                  return Stack(children: [
                    GestureDetector(
                      onTap: () {
                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (context) =>
                                PopularFoodDetail(recipe: recipe),
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
                                  image: NetworkImage(recipe.pic),
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
                                          BigText(text: recipe.title),
                                          SizedBox(
                                              height: MediaQuery.of(context)
                                                      .size
                                                      .height *
                                                  0.02),
                                          Expanded(
                                            child: SmallText(
                                                text: recipe.description),
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
                                                      '${recipe.createdAt.month}-${recipe.createdAt.day}-${recipe.createdAt.year}',
                                                  color: AppColors.mainColor,
                                                  iconColor:
                                                      AppColors.iconColor),
                                              SizedBox(width: 20),
                                              IconAndTextWdiget(
                                                  icon: Icons.person,
                                                  text: recipe.username,
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
                    ),
                  ]);
                }),
              ),
            ]),
          )
        ],
      ),
    );
  }
}
