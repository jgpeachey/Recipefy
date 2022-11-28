import 'package:flutter/material.dart';
import 'package:recipefy_mobile/models/search_recipe_model.dart';
import 'package:recipefy_mobile/services/remote_services.dart';
import 'package:recipefy_mobile/widgets/app_column.dart';
import 'package:recipefy_mobile/widgets/big_text.dart';
import 'package:recipefy_mobile/widgets/expandable_text_widget.dart';

class PopularFoodDetail extends StatefulWidget {
  final RecipeResult recipe;

  const PopularFoodDetail({super.key, required this.recipe});

  @override
  State<PopularFoodDetail> createState() => _PopularFoodDetailState();
}

class _PopularFoodDetailState extends State<PopularFoodDetail> {
  int currentIndex = 0;
  final screens = [
    Center(child: Text('Home', style: TextStyle(fontSize: 60))),
    Center(child: Text('Search', style: TextStyle(fontSize: 60))),
    Center(child: Text('Add', style: TextStyle(fontSize: 60))),
    Center(child: Text('Favorites', style: TextStyle(fontSize: 60))),
    Center(child: Text('Profile', style: TextStyle(fontSize: 60))),
  ];
  // const PopularFoodDetail({super.key});

  void _showDialog() {
    showDialog(
        context: context,
        builder: (context) {
          return AlertDialog(title: Text('Delete recipe?'), actions: [
            TextButton(
              onPressed: () => Navigator.pop(context, 'Cancel'),
              child: const Text('Cancel'),
            ),
            TextButton(
              onPressed: () => Navigator.pop(context, 'Cancel'),
              child: const Text('Yes'),
            ),
          ]);
        });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // backgroundColor: Colors.grey,
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            title: Text(widget.recipe.title),
            backgroundColor: Colors.black,
            flexibleSpace: FlexibleSpaceBar(
                // ADD API CONNECTION HERE
                // ONCE THE TITLE DISAPPEARS AFTER SCROLLING DOWN
                // CHANGE THE APP BAR TEXT TO THE RECIPE NAME
                // DELETE THIS COMMENT

                // title: Text('Testing App Bar', style: TextStyle(fontSize: 15.0)),
                // background: Image.network(widget.recipe.pic),
                ),
            actions: [
              // ADD CONNECTION TO API HERE
              // DELETE THIS COMMENT
              PopupMenuButton(
                itemBuilder: (context) => [
                  PopupMenuItem(
                    child: Text('Like'),
                    onTap: () async {
                      try {
                        await RemoteService().likeRecipe(widget.recipe.id);
                      } catch (error) {
                        debugPrint(error.toString());
                      }
                    },
                  ),
                  PopupMenuItem(
                    child: Text('Unlike'),
                    onTap: () async {
                      try {
                        await RemoteService().unlikeRecipe(widget.recipe.id);
                      } catch (error) {
                        debugPrint(error.toString());
                      }
                    },
                  ),
                  PopupMenuItem(
                    child: Text('Delete'),
                    onTap: () {
                      Future.delayed(const Duration(), (() => _showDialog()));
                    },
                  ),
                ],
              ),
            ],
            stretch: true,
            pinned: true,
            expandedHeight: MediaQuery.of(context).size.height * 0.06,
          ),
          SliverList(
            delegate: SliverChildListDelegate(
              [
                Container(
                    height: MediaQuery.of(context).size.height * 0.2,
                    width: MediaQuery.of(context).size.height * 0.1,
                    decoration: BoxDecoration(

                        // API CONNECTION HERE
                        // RECIPE IMAGE
                        image: DecorationImage(
                      image: NetworkImage(widget.recipe.pic),
                      fit: BoxFit.fill,
                    ))),
                Container(
                  padding:
                      EdgeInsets.only(left: 10, right: 10, top: 10, bottom: 10),
                  margin: EdgeInsets.only(left: 0, right: 0, top: 0),

                  // API CONNECTION HERE
                  // RECIPE TITLE
                  child: AppColumn(recipe: widget.recipe),
                ),

                Divider(height: 5, color: Colors.grey),

                // Ingredients section
                Container(
                    margin: EdgeInsets.fromLTRB(10, 10, 10, 0),
                    child: BigText(text: "Ingredients")),
                Container(
                  margin: EdgeInsets.fromLTRB(10, 0, 10, 10),
                  child: Expanded(
                    child: SingleChildScrollView(
                      child: ExpandableTextWidget(
                          string_array: widget.recipe.ingredients),
                    ),
                  ),
                ),

                Divider(height: 5, color: Colors.grey),

                // Instructions section
                Container(
                    margin: EdgeInsets.fromLTRB(10, 0, 10, 0),
                    child: BigText(text: "Instructions")),
                Container(
                  margin: EdgeInsets.fromLTRB(10, 0, 10, 10),
                  child: Expanded(
                    child: SingleChildScrollView(
                      child: ExpandableTextWidget(
                        string_array: widget.recipe.instructions,
                      ),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
