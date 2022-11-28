import 'package:flutter/material.dart';
import 'package:recipefy_mobile/models/login_model.dart';
import 'package:recipefy_mobile/views/recipes.dart';
import 'package:recipefy_mobile/views/settings.dart';
import 'package:recipefy_mobile/widgets/following.dart';
import 'package:recipefy_mobile/widgets/profile_widget.dart';

class ProfilePage extends StatefulWidget {
  final User? user;

  const ProfilePage({super.key, this.user});

  @override
  State<ProfilePage> createState() => _ProfilePageState();
}

class _ProfilePageState extends State<ProfilePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            // API CONNECTION HERE
            // USERS FIRST NAME ALWAYS AT THE TOP OF THE APP BAR
            centerTitle: true,
            title: Text(widget.user!.firstName),
            backgroundColor: Colors.black,
            automaticallyImplyLeading: false,
            actions: [
              // ADD CONNECTION TO API HERE
              // DELETE THIS COMMENT
              IconButton(
                icon: Icon(Icons.settings),
                onPressed: () {
              Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (context) => SettingsPage(
                                    user: widget.user),
                              ),
                            );
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
            ProfileWidget(imagePath: widget.user!.pic, onClicked:() async{}),
            SizedBox(height: 10,),

            // FOLLOWING SECTION
            // SUBTITLE
            Row(
              children: [
                SizedBox(width: MediaQuery.of(context).size.width * 0.05),
                Text('Following', style: TextStyle(fontSize: 20.0)),
              ],
            ),
            FollowingPage(user: widget.user),

            // MY RECIPES SECTION
            // SUBTITLE
            Row(
              children: [
                SizedBox(width: MediaQuery.of(context).size.width * 0.05),
                Text('My Recipes', style: TextStyle(fontSize: 20.0)),
              ],
            ),

            // MY RECIPES BODY
            MyRecipesBody(),
          ]),)
        ],
      ),
    );
  }
}
