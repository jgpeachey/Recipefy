import 'package:flutter/material.dart';
import 'package:recipefy_mobile/views/add.dart';
// import 'package:recipefy_mobile/views/add.dart';
import 'package:recipefy_mobile/views/add_recipe.dart';
import 'package:recipefy_mobile/views/favorites.dart';
import 'package:recipefy_mobile/views/food.dart';
import 'package:recipefy_mobile/views/login.dart';
import 'package:recipefy_mobile/views/main_page.dart';
import 'package:recipefy_mobile/views/popular.dart';
import 'package:recipefy_mobile/views/profile.dart';
import 'package:recipefy_mobile/views/settings.dart';

class Routes {
  static const String MAINSCREEN = '/main';
  static const String FOODSCREEN = '/food';
  static const String POPULARSCREEN = '/popular';
  static const String ADDRECIPESCREEN = '/add_recipe';
  static const String FAVORITESCREEN = '/favorites';
  static const String PROFILESCREEN = '/profile';
  static const String SETTINGSCREEN = '/settings';
  static const String LOGINSCREEN = '/login';

  // routes of pages in the app
  static Map<String, Widget Function(BuildContext)> get getroutes => {
    '/': (context) => LoginPage(),
    MAINSCREEN: (context) => MainFoodPage(),
    FOODSCREEN: (context) => FoodPageBody(),
    // POPULARSCREEN: (context) => PopularFoodDetail(),
    ADDRECIPESCREEN: (context) => AddRecipePage(),
    FAVORITESCREEN: (context) => FavoritesPage(),
    PROFILESCREEN: (context) => ProfilePage(),
    SETTINGSCREEN: (context) => SettingsPage(),
    LOGINSCREEN: (context) => LoginPage(),
  };
}