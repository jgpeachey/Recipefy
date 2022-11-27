import 'package:recipefy_mobile/models/search_recipe_model.dart';
import 'package:recipefy_mobile/utils/colors.dart';
// import 'package:recipefy_mobile/utils/dimensions.dart';
import 'package:recipefy_mobile/widgets/small_text.dart';
import 'package:flutter/material.dart';

class ExpandableTextWidget extends StatefulWidget {
  final List<String> string_array;

  const ExpandableTextWidget({super.key, required this.string_array});

  @override
  State<ExpandableTextWidget> createState() => _ExpandableTextWidgetState();
}

class _ExpandableTextWidgetState extends State<ExpandableTextWidget> {
  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      child: Expanded(
        child: SingleChildScrollView(
          child: ListView.builder(
            scrollDirection: Axis.vertical,
            shrinkWrap: true,
            itemCount: widget.string_array.length,
            // prototypeItem: ListTile(
            //   title: Text("title"),
            // ),
            itemBuilder: (context, index) {
              return ListTile(
                title: Text(widget.string_array[index]),
              );
            },
          ),
        ),
      ),
    );
  }
}
