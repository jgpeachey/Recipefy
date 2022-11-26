// To parse this JSON data, do
//
//     final searchRecipe = searchRecipeFromJson(jsonString);

import 'dart:convert';

SearchRecipe searchRecipeFromJson(String str) =>
    SearchRecipe.fromJson(json.decode(str));

String searchRecipeToJson(SearchRecipe data) => json.encode(data.toJson());

class SearchRecipe {
  SearchRecipe({
    required this.results,
  });

  List<RecipeResult> results;

  factory SearchRecipe.fromJson(Map<String, dynamic> json) => SearchRecipe(
        results: List<RecipeResult>.from(
            json["results"].map((x) => RecipeResult.fromJson(x))),
      );

  Map<String, dynamic> toJson() => {
        "results": List<dynamic>.from(results.map((x) => x.toJson())),
      };
}

class RecipeResult {
  RecipeResult({
    required this.id,
    required this.userId,
    required this.username,
    required this.profilePic,
    required this.title,
    required this.ingredients,
    required this.instructions,
    required this.calories,
    required this.sodium,
    required this.description,
    required this.createdAt,
    required this.pic,
    required this.likes,
    required this.v,
  });

  String id;
  String userId;
  String username;
  String profilePic;
  String title;
  List<String> ingredients;
  List<String> instructions;
  String calories;
  String sodium;
  String description;
  DateTime createdAt;
  String pic;
  int likes;
  int v;

  factory RecipeResult.fromJson(Map<String, dynamic> json) => RecipeResult(
        id: json["_id"],
        userId: json["User_ID"],
        username: json["Username"],
        profilePic: json["profilePic"],
        title: json["Title"],
        ingredients: List<String>.from(json["Ingredients"].map((x) => x)),
        instructions: List<String>.from(json["Instructions"].map((x) => x)),
        calories: json["Calories"],
        sodium: json["Sodium"],
        description: json["Description"],
        createdAt: DateTime.parse(json["CreatedAt"]),
        pic: json["Pic"],
        likes: json["Likes"],
        v: json["__v"],
      );

  Map<String, dynamic> toJson() => {
        "_id": id,
        "User_ID": userId,
        "Username": username,
        "profilePic": profilePic,
        "Title": title,
        "Ingredients": List<dynamic>.from(ingredients.map((x) => x)),
        "Instructions": List<dynamic>.from(instructions.map((x) => x)),
        "Calories": calories,
        "Sodium": sodium,
        "Description": description,
        "CreatedAt": createdAt.toIso8601String(),
        "Pic": pic,
        "Likes": likes,
        "__v": v,
      };
}
