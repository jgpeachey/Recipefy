import 'package:flutter/material.dart';
import 'package:recipefy_mobile/widgets/app_column.dart';
import 'package:recipefy_mobile/widgets/big_text.dart';
import 'package:recipefy_mobile/widgets/expandable_text_widget.dart';

class PopularFoodDetail extends StatefulWidget {
  const PopularFoodDetail({super.key});

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
            flexibleSpace: FlexibleSpaceBar(
              // ADD API CONNECTION HERE
              // ONCE THE TITLE DISAPPEARS AFTER SCROLLING DOWN
              // CHANGE THE APP BAR TEXT TO THE RECIPE NAME
              // DELETE THIS COMMENT

              // title: Text('Testing App Bar', style: TextStyle(fontSize: 15.0)),
              background: Image.asset('assets/images/smoothie.jpg'),
            ),
            actions: [
              // ADD CONNECTION TO API HERE
              // DELETE THIS COMMENT
              PopupMenuButton(
                itemBuilder: (context) => [
                  PopupMenuItem(
                    child: Text('Like'),
                  ),
                  PopupMenuItem(
                    child: Text('Unlike'),
                  ),
                  PopupMenuItem(
                      child: Text('Delete'),
                      onTap: () {
                        Future.delayed(const Duration(), (() => _showDialog()));
                      }),
                ],
              ),
            ],
            backgroundColor: Colors.black,
            stretch: true,
            pinned: true,
            expandedHeight: MediaQuery.of(context).size.height * 0.275,
          ),
          SliverList(
            delegate: SliverChildListDelegate(
              [
                Container(
                  padding:
                      EdgeInsets.only(left: 10, right: 10, top: 10, bottom: 10),
                  margin: EdgeInsets.only(left: 0, right: 0, top: 0),
                  child: AppColumn(text: "Strawberry Smoothie"),
                ),

                Divider(height: 5, color: Colors.grey),

                // Ingredients section
                Container(
                    margin: EdgeInsets.fromLTRB(10, 10, 10, 10),
                    child: BigText(text: "Ingredients")),
                Container(
                  margin: EdgeInsets.fromLTRB(10, 0, 10, 10),
                  child: Expanded(
                    child: SingleChildScrollView(
                      child: ExpandableTextWidget(
                          text:
                              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. "),
                    ),
                  ),
                ),

                Divider(height: 5, color: Colors.grey),

                // Instructions section
                Container(
                    margin: EdgeInsets.fromLTRB(10, 0, 10, 10),
                    child: BigText(text: "Instructions")),
                Container(
                  margin: EdgeInsets.fromLTRB(10, 0, 10, 10),
                  child: Expanded(
                    child: SingleChildScrollView(
                      child: ExpandableTextWidget(
                          text:
                              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. "),
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
