import 'package:flutter/material.dart';
import 'package:recipefy_mobile/models/search_recipe_model.dart';
import 'package:recipefy_mobile/services/remote_services.dart';

class SearchPage extends StatefulWidget {
  const SearchPage({super.key});

  @override
  State<SearchPage> createState() => _SearchPageState();
}

class _SearchPageState extends State<SearchPage> {
  static String inputSearch = "";
  final count = 5;
  int page = 1;
  List<RecipeResult> recipes = [];

  // FUTURE CALCULATION FOR SEARCH RECIPE API
  final Future<List<RecipeResult>> _calculation =
      Future<List<RecipeResult>>.delayed(
    const Duration(seconds: 1),
    () async => await RemoteService().findAllRecipe(inputSearch, 0, 0),
  );

  getRecipes() async {
    try {
      var response =
          await RemoteService().findAllRecipe(inputSearch, count, page);
      recipes = response;
    } catch (error) {
      debugPrint(error.toString());
    }
  }

  @override
  Widget build(BuildContext context) {
    // FOR THE SEARCH RECIPE API
    String search = "";
    var count = 0;
    var page = 0;

    return Scaffold(
        body: FutureBuilder(
            future: _calculation,
            builder: (BuildContext context,
                AsyncSnapshot<List<RecipeResult>> snapshot) {
              List<Widget> children;
              if (snapshot.hasData) {
                children = [
                  CustomScrollView(
                    shrinkWrap: true,
                    slivers: [
                      SliverAppBar(
                        centerTitle: true,
                        title: Text('Search'),
                        backgroundColor: Colors.black,
                        automaticallyImplyLeading: false,
                        actions: [
                          IconButton(
                              icon: Icon(Icons.search),
                              onPressed: () {
                                getRecipes();
                                showSearch(
                                  context: context,
                                  delegate: MySearchDelegate(recipes),
                                );
                              })
                        ],
                      )
                    ],
                  )
                ];
              } else if (snapshot.hasError) {
                children = <Widget>[
                  const Icon(
                    Icons.error_outline,
                    color: Colors.red,
                    size: 60,
                  ),
                  Padding(
                    padding: const EdgeInsets.only(top: 16),
                    child: Text('Error: ${snapshot.error}'),
                  ),
                ];
              } else {
                children = const <Widget>[
                  SizedBox(
                    width: 60,
                    height: 60,
                    child: CircularProgressIndicator(),
                  ),
                  Padding(
                    padding: EdgeInsets.only(top: 16),
                    // child: Text('Awaiting result...'),
                  ),
                ];
              }
              return Scaffold(
                body: Column(
                  children: children,
                ),
              );
            }));
  }
}

class MySearchDelegate extends SearchDelegate {
  List<RecipeResult> recipes;

  MySearchDelegate(this.recipes);

  @override
  Widget? buildLeading(BuildContext context) {
    IconButton(icon: Icon(Icons.arrow_back), onPressed: () {});
  }

  @override
  List<Widget>? buildActions(BuildContext context) {
    IconButton(
      icon: Icon(Icons.clear),
      onPressed: () {
        if (query.isEmpty) {
          close(context, null);
        } else {
          query = '';
        }
      },
    );
  }

  @override
  Widget buildResults(BuildContext context) {
    return ListView.builder(
        itemCount: recipes.length,
        itemBuilder: (context, index) {
          RecipeResult item = recipes[index];
          return ListTile(
            title: Text(item.title),
            onTap: () {
              // PULLS UP RECIPE PAGE
            },
          );
        });
  }

  @override
  Widget buildSuggestions(BuildContext context) {
    List<String> suggestions = [
      'Search for Pasta',
      'Search for Pizza',
      'Search for Salads',
    ];

    return ListView.builder(
      itemCount: suggestions.length,
      itemBuilder: (context, index) {
        final suggestion = suggestions[index];

        return ListTile(
            title: Text(suggestion),
            onTap: () {
              query = suggestion;
            });
      },
    );
  }
}
