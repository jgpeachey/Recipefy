import 'package:flutter/material.dart';
import 'package:recipefy_mobile/models/search_recipe_model.dart';
import 'package:recipefy_mobile/utils/colors.dart';
import 'package:recipefy_mobile/widgets/big_text.dart';
import 'package:recipefy_mobile/widgets/icon_and_text_widget.dart';

class AppColumn extends StatefulWidget {
  final RecipeResult recipe;

  const AppColumn({super.key, required this.recipe});

  @override
  State<AppColumn> createState() => _AppColumnState();
}

class _AppColumnState extends State<AppColumn> {
  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        BigText(

          // API CONNECTION HERE
          // RECIPE TITLE
          text: widget.recipe.title,
          size: 26,
        ),
        SizedBox(height: 2),
        Text(widget.recipe.description),
        SizedBox(height: 10),
        Row(
          mainAxisAlignment: MainAxisAlignment.start,
          children: [
            
            // API CONNECTION HERE
            // DATE AND USERNAME
            IconAndTextWdiget(
                icon: Icons.house,
                text: "${widget.recipe.createdAt.month}-${widget.recipe.createdAt.day}-${widget.recipe.createdAt.year}",
                color: Colors.black,
                iconColor: Colors.blue),
            SizedBox(width: 20,),
            IconAndTextWdiget(
                icon: Icons.person,
                text: widget.recipe.username,
                color: Colors.black,
                iconColor: Colors.deepPurple),
          ],
        ),
      ],
    );
  }
}