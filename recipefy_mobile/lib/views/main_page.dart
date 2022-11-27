

import 'package:flutter/material.dart';
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
  late List pages = [
    HomePage(user: widget.user),
    SearchPage(),
    AddRecipePage(),
    FavoritesPage(),
    ProfilePage(user: widget.user),
  ];

  @override

  @override
  Widget build(BuildContext context) {
    // print("current height is"+MediaQuery.of(context).size.height.toString());
    return Scaffold(
      body: pages[currentIndex],
      bottomNavigationBar: BottomNavigationBar(
          type: BottomNavigationBarType.fixed,
          backgroundColor: Colors.black,
          selectedItemColor: Colors.white,
          unselectedItemColor: Colors.white70,
          iconSize: 30,
          showSelectedLabels: false,
          showUnselectedLabels: false,
          currentIndex: currentIndex,
          onTap: (index) => setState(() {
                currentIndex = index;
              }),
          items: [
            BottomNavigationBarItem(
              icon: Icon(Icons.home),
              label: 'Home',
              // backgroundColor: Colors.blue
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.search),
              label: 'Search',
              // backgroundColor: Colors.grey,
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.add),
              label: 'Add',
              // backgroundColor: Colors.green,
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.favorite),
              label: 'Favorites',
              // backgroundColor: Colors.red,
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.person),
              label: 'Profile',
              // backgroundColor: Colors.black,
            ),
          ]),
      backgroundColor: Colors.white,
    );
  }
}
