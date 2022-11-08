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
        ingredients: json["ingredients"],
        instructions: json["instructions"],
        nutriValue: json["nutriValue"],
        likes: json["likes"],
      );

  Map<String, dynamic> toJson() => {
        "title": title,
        "ingredients": ingredients,
        "instructions": instructions,
        "nutriValue": nutriValue,
        "likes": likes,
      };
}

class Nutrition {
  Nutrition({required this.calories, required this.sodium});

  String calories;
  String sodium;
}
