import 'package:flutter/material.dart';
import 'package:persistent_bottom_nav_bar/persistent-tab-view.dart';
import 'package:recipefy_mobile/models/login_model.dart';
import 'package:recipefy_mobile/views/add_recipe.dart';
import 'package:recipefy_mobile/views/favorites.dart';
import 'package:recipefy_mobile/views/home.dart';
import 'package:recipefy_mobile/views/profile.dart';
import 'package:recipefy_mobile/views/search.dart';

class MainFoodPage extends StatefulWidget {
  final User? user;

  const MainFoodPage({super.key, this.user});

  @override
  State<MainFoodPage> createState() => _MainFoodPageState();
}

class _MainFoodPageState extends State<MainFoodPage> {
  int currentIndex = 0;

  @override
  Widget build(BuildContext context) {
    // print("current height is"+MediaQuery.of(context).size.height.toString());
    return Scaffold(
      
      // PERSISTENT BOTTOM NAVIGATION BAR
      body: PersistentTabView(
        backgroundColor: Colors.black,
        context,
        screens: screens(),
        items: navBarItems(),
      ),
      backgroundColor: Colors.white,
    );
  }

  // BOTTOM NAVIGATION BAR SCREENS
  List<Widget> screens() {
    return [
      HomePage(user: widget.user),
      SearchPage(),
      AddRecipePage(),
      FavoritesPage(),
      ProfilePage(user: widget.user),
    ];
  }

  // BOTTOM NAVIGATION BAR ITEMS
  List<PersistentBottomNavBarItem> navBarItems() {
    return [
      PersistentBottomNavBarItem(
          icon: Icon(
            Icons.home,
          ),
          activeColorPrimary: Colors.white,
          inactiveColorPrimary: Colors.grey),
      PersistentBottomNavBarItem(
          icon: Icon(
            Icons.search,
          ),
          activeColorPrimary: Colors.white,
          inactiveColorPrimary: Colors.grey),
      PersistentBottomNavBarItem(
          icon: Icon(
            Icons.add,
          ),
          activeColorPrimary: Colors.white,
          inactiveColorPrimary: Colors.grey),
      PersistentBottomNavBarItem(
          icon: Icon(
            Icons.favorite,
          ),
          activeColorPrimary: Colors.white,
          inactiveColorPrimary: Colors.grey),
      PersistentBottomNavBarItem(
          icon: Icon(
            Icons.person,
          ),
          activeColorPrimary: Colors.white,
          inactiveColorPrimary: Colors.grey)
    ];
  }
}
