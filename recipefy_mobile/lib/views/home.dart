import 'package:flutter/material.dart';
import 'package:recipefy_mobile/models/login_model.dart';
import 'package:recipefy_mobile/services/remote_services.dart';
import 'package:recipefy_mobile/widgets/big_text.dart';
import 'package:recipefy_mobile/views/food.dart';
import '../../utils/colors.dart';
import '../../widgets/small_text.dart';

class HomePage extends StatefulWidget {
  final User? user;

  const HomePage({super.key, this.user});

  @override
  State<HomePage> createState() => _HomePageState();
}

class _HomePageState extends State<HomePage> {
  @override
  Widget build(BuildContext context) {
    String search = "";
    var count = 1;
    var page = 1;

    return Scaffold(
      // Home page background color
      backgroundColor: Colors.white,
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            // ADD API CONNECTION HERE
            // USERS FIRST NAME ALWAYS AT THE TOP OF THE APP BAR
            title: Text(widget.user!.firstName),
            backgroundColor: Colors.black,
            automaticallyImplyLeading: false,
            // backgroundColor: Colors.black,
            stretch: true,
            pinned: true,
            expandedHeight: MediaQuery.of(context).size.height * 0.06,
          ),
          // Container(
          //   child: Container(
          //     margin: EdgeInsets.only(top: 45, bottom: 15),
          //     padding: EdgeInsets.only(left: 20, right: 20),
          //     child: Row(
          //       mainAxisAlignment: MainAxisAlignment.spaceBetween,
          //       children: [
          //         Column(
          //           children: [
          //             BigText(
          //                 text: "Recipefy",
          //                 color: AppColors.mainColor,
          //                 size: 30),
          //             Row(
          //               // API CONNECTION HERE
          //               // PROFILE PICTURE AND FIRST NAME
          //               children: [
          //                 Icon(Icons.person),
          //                 Text(widget.user!.firstName),
          //               ],
          //             ),
          //           ],
          //         ),
          //       ],
          //     ),
          //   ),
          // ),
          SliverList(
            delegate: SliverChildListDelegate([
              Expanded(
                child: SingleChildScrollView(
                  child: FoodPageBody(),
                ),
              ),
            ]),
          )

          // getRecipes(),
          // SizedBox(width: 20),
        ],
      ),
    );
  }
}
