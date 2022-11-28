import 'package:flutter/material.dart';
import 'package:recipefy_mobile/models/login_model.dart';
import 'package:recipefy_mobile/views/popular.dart';
import 'package:recipefy_mobile/views/profile.dart';

class FollowingPage extends StatefulWidget {
  final User? user;

  const FollowingPage({super.key, required this.user});

  @override
  State<FollowingPage> createState() => _FollowingPageState();
}

class _FollowingPageState extends State<FollowingPage> {

  @override
  Widget build(BuildContext context) {
    return Container(
        child: ListView.builder(
            shrinkWrap: true,
            itemCount: widget.user!.following.length,
            itemBuilder: (context, index) {
              return GestureDetector(
                onTap: () {
                  

                  Navigator.push(
                    context,
                    MaterialPageRoute(
                        builder: (context) => ProfilePage(
                              user: widget.user,
                            )),
                  );
                },
                child: Container(child: Row(
                  children: [
                    SizedBox(width: MediaQuery.of(context).size.width * 0.1,),
                    // Text("following user index: ${widget.user!.following[index]}"),
                  ],
                )),
              );
            }));
  }
}
