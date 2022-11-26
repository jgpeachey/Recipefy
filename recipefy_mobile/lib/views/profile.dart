import 'package:flutter/material.dart';
import 'package:recipefy_mobile/views/recipes.dart';
import 'package:recipefy_mobile/views/settings.dart';
import 'package:recipefy_mobile/widgets/profile_widget.dart';

void main() {
  runApp(ProfilePage());
}

class ProfilePage extends StatefulWidget {
  const ProfilePage({super.key});

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  final String imagePath = 'https://assets.vogue.com/photos/60ed85398ec46716d9a3ddff/master/pass/1288920.jpeg';
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: CustomScrollView(
        slivers: [
          SliverAppBar(

            // ADD API CONNECTION HERE
            // USERS FIRST NAME ALWAYS AT THE TOP OF THE APP BAR
            title: Text("User's name here"),
            backgroundColor: Colors.black,
            automaticallyImplyLeading: false,
            actions: [
              // ADD CONNECTION TO API HERE
              // DELETE THIS COMMENT
              IconButton(
                icon: Icon(Icons.settings),
                onPressed: () {
              Navigator.pushNamed(context, '/settings');
            },
              ),
            ],
            // backgroundColor: Colors.black,
            stretch: true,
            pinned: true,
            expandedHeight: MediaQuery.of(context).size.height * 0.06,
            
            
            
          ),
          SliverList(delegate: 
          SliverChildListDelegate([
            SizedBox(height: MediaQuery.of(context).size.height * 0.05),
            ProfileWidget(imagePath: imagePath, onClicked:() async{}),
            SizedBox(height: 10,),
            Row(
              children: [
                SizedBox(width: MediaQuery.of(context).size.width * 0.05),
                Text('My Recipes', style: TextStyle(fontSize: 20.0)),
              ],
            ),
            MyRecipesBody(),
          ]),)
        ],
      ),
    );
  }
}
