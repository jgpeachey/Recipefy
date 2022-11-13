import 'dart:convert';

List<Recipe> recipeFromJson(String str) =>
    List<Recipe>.from(jsonDecode(str).map((x) => Recipe.fromJson(x)));

String recipeToJson(List<Recipe> data) =>
    jsonEncode(List<dynamic>.from(data.map((x) => x.toJson())));

class Recipe {
  Recipe({
    required this.title,
    required this.ingredients,
    required this.instructions,
    this.nutriValue,
    required this.likes,
  });

  String title;
  List<String> ingredients;
  List<String> instructions;
  Nutrition? nutriValue;
  int likes;

  factory Recipe.fromJson(Map<String, dynamic> json) => Recipe(
        title: json["title"],
        ingredients: List<String>.from(jsonDecode(json["ingredients"])),
        instructions: List<String>.from(jsonDecode(json["instructions"])),
        nutriValue: Nutrition.fromJson(json["nutriValue"]),
        likes: json["likes"],
      );

  Map<String, dynamic> toJson() => {
        "title": title,
        "ingredients": jsonEncode(ingredients),
        "instructions": jsonEncode(instructions),
        "nutriValue": jsonEncode(nutriValue),
        "likes": likes,
      };
}

class Nutrition {
  Nutrition({required this.calories, required this.sodium});

  String calories;
  String sodium;

  Nutrition.fromJson(Map<String, dynamic> json)
      : calories = json["calories"],
        sodium = json["sodium"];

  Map<String, dynamic> toJson() => {
        "calories": calories,
        "sodium": sodium,
      };
}
