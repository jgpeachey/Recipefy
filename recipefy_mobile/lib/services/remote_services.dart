import 'dart:convert';

import 'package:recipefy_mobile/models/login_model.dart';
import 'package:recipefy_mobile/models/search_user_model.dart';
import 'package:recipefy_mobile/models/search_recipe_model.dart';

import 'package:http/http.dart' as http;

class RemoteService {
  static Map<String, String> header = <String, String>{};

  Future<User?> login(String email, String password) async {
    Map<String, String> parameters = {
      "Email": email,
      "Password": password,
    };
    var uri = Uri.parse(
      'https://recipefy-g1.herokuapp.com/user/login',
    );
    var response = await http.post(uri, body: parameters);

    if (response.statusCode == 201) {
      Login loginResponse = loginFromJson(response.body);
      header["authorization"] = loginResponse.auth.accessToken;
      // print(header);
      return loginResponse.user;
    }
    var body = jsonDecode(response.body);
    String err = body["error"];
    throw Exception(err);
  }

  register(String firstName, String lastName, String username, String email,
      String pic, String password) async {
    Map<String, String> parameters = {
      'Firstname': firstName,
      'Lastname': lastName,
      'Username': username,
      'Email': email,
      'Pic': pic,
      'Password': password
    };
    var uri = Uri.parse(
      'https://recipefy-g1.herokuapp.com/user/register',
    );
    var response = await http.post(uri, body: parameters);
    var body = jsonDecode(response.body);
    if (response.statusCode == 200 || response.statusCode == 201) {
      return;
    }
    String err = body['error'];
    throw Exception(err);
  }

  deleteUser(String email, String password) async {
    Map<String, String> parameters = {
      "Email": email,
      "Password": password,
    };
    var uri = Uri.parse(
      'https://recipefy-g1.herokuapp.com/user/deleteuser',
    );
    // print("Code: ${response.statusCode}");

    var response = await http.delete(uri, body: parameters, headers: header);
    print("Code: ${response.statusCode}");

    if (response.statusCode == 200) {
      return;
    }
    throw Exception("Delete unsuccessful.");
  }

  Future<List<UserResult>> searchUsers(
      String search, int count, int page) async {
    Map<String, String> qParams = {
      "search": search,
      "count": count.toString(),
      "page": page.toString()
    };
    var uri = Uri.parse('https://recipefy-g1.herokuapp.com/user/searchUsers');
    String queryString = Uri(queryParameters: qParams).query;
    var requestUrl = '$uri?$queryString';
    var response = await http.post(Uri.parse(requestUrl), headers: header);

    if (response.statusCode == 200) {
      SearchUser searchUser = searchUserFromJson(response.body);
      return searchUser.results;
    }
    throw Exception("Search failed");
  }

  followUser(String id) async {
    var uri = Uri.parse(
      'https://recipefy-g1.herokuapp.com/user/followUser',
    );
    Map parameters = {"userId": id};
    var response = await http.post(uri, body: parameters, headers: header);
    var body = jsonDecode(response.body);
    if (response.statusCode == 200 || response.statusCode == 201) {
      return;
    }

    String err = body['error'];
    throw Exception(err);
  }

  unfollowUser(String id) async {
    var uri = Uri.parse(
      'https://recipefy-g1.herokuapp.com/user/unfollowUser',
    );
    Map parameters = {"userId": id};

    var response = await http.post(uri, body: parameters, headers: header);
    var body = jsonDecode(response.body);
    if (response.statusCode == 200 || response.statusCode == 201) {
      return;
    }
    String err = body['error'];
    throw Exception(err);
  }

  updateUser(String firstName, String lastName, String email, String password,
      String pic) async {
    var uri = Uri.parse(
      'https://recipefy-g1.herokuapp.com/user/updateuser',
    );
    Map parameters = {
      "Email": email,
      "Password": password,
      "Pic": pic,
      "Info": {
        "Fistname": firstName,
        "Lastname": lastName,
      }
    };
    var response =
        await http.post(uri, body: json.encode(parameters), headers: header);

    print("Code: ${response.statusCode}");

    var body = jsonDecode(response.body);
    if (response.statusCode == 200 || response.statusCode == 201) {
      return User.fromJson(jsonDecode(response.body));
    }
    String err = body['error'];
    throw Exception(err);
  }

  resetPasswordRequest(String email) async {
    var uri = Uri.parse(
      'https://recipefy-g1.herokuapp.com/user/resetPasswordRequest',
    );
    Map parameters = {"Email": email};
    var response = await http.post(uri, body: parameters, headers: header);
    var body = jsonDecode(response.body);
    if (response.statusCode == 201) {
      return;
    }
    String err = body['error'];
    throw Exception(err);
  }

  addRecipe(String title, List<String> ingredients, List<String> instructions,
      String calories, String sodium, String pic) async {
    var uri = Uri.parse(
      'https://recipefy-g1.herokuapp.com/recipes/addrecipe',
    );
    Map parameters = {
      "Title": title,
      "Ingredients": ingredients,
      "Instructions": instructions,
      "Calories": calories,
      "Sodium": sodium,
      "Pic": pic
    };
    var response = await http.post(uri, body: parameters, headers: header);
    var body = jsonDecode(response.body);
    if (response.statusCode == 200 || response.statusCode == 201) {
      return response.body;
    }
    String err = body['error'];
    throw Exception(err);
  }

  removeRecipe(String id) async {
    var uri = Uri.parse(
      'https://recipefy-g1.herokuapp.com/recipes/removerecipe',
    );
    Map parameters = {"_id": id};
    var response = await http.delete(uri, body: parameters, headers: header);
    if (response.statusCode == 200) {
      return;
    }
    throw Exception("Error when removing recipe");
  }

  Future<List<RecipeResult>> findRecipe(
      String search, int count, int page) async {
    Map<String, String> qParams = {
      "search": search,
      "count": count.toString(),
      "page": page.toString(),
    };
    // print(id);
    var uri = Uri.parse('https://recipefy-g1.herokuapp.com/recipe/findRecipe');
    String queryString = Uri(queryParameters: qParams).query;
    var requestUrl = '$uri?$queryString';
    var response = await http.post(Uri.parse(requestUrl), headers: header);

    if (response.statusCode == 200) {
      SearchRecipe searchRecipe = searchRecipeFromJson(response.body);
      return searchRecipe.results;
    }
    throw Exception(jsonDecode(response.body)["error"]);
  }

  Future<List<RecipeResult>> getUserRecipe(
      String search, int count, int page) async {
    Map<String, String> qParams = {
      "search": search,
      "count": count.toString(),
      "page": page.toString(),
    };
    var uri =
        Uri.parse('https://recipefy-g1.herokuapp.com/recipe/getUserRecipe');
    String queryString = Uri(queryParameters: qParams).query;
    var requestUrl = '$uri?$queryString';
    var response = await http.post(Uri.parse(requestUrl), headers: header);

    if (response.statusCode == 200) {
      SearchRecipe searchRecipe = searchRecipeFromJson(response.body);
      return searchRecipe.results;
    }
    throw Exception(jsonDecode(response.body)["error"]);
  }

  Future<List<RecipeResult>> findAllRecipe(
      String search, int count, int page) async {
    Map<String, String> qParams = {
      "search": search,
      "count": count.toString(),
      "page": page.toString(),
    };
    var uri =
        Uri.parse('https://recipefy-g1.herokuapp.com/recipe/findAllRecipe');
    String queryString = Uri(queryParameters: qParams).query;
    var requestUrl = '$uri?$queryString';
    // print(header);
    var response = await http.post(Uri.parse(requestUrl), headers: header);
    // print("Code: ${response.statusCode}");
    // print(response.body);
    if (response.statusCode == 200) {
      SearchRecipe searchRecipe = searchRecipeFromJson(response.body);
      return searchRecipe.results;
    }
    throw Exception(jsonDecode(response.body)["error"]);
  }

  Future<List<RecipeResult>> getLikedRecipes() async {
    var uri = Uri.parse(
      'https://recipefy-g1.herokuapp.com/recipe/getLikedRecipes',
    );
    var response = await http.post(uri, headers: header);
    // print("Code: ${response.statusCode}");

    if (response.statusCode == 200 || response.statusCode == 201) {
      SearchRecipe searchRecipe = searchRecipeFromJson(response.body);
      return searchRecipe.results;
    }
    throw Exception(jsonDecode(response.body)["error"]);
  }

  likeRecipe(String id) async {
    var uri = Uri.parse(
      'https://recipefy-g1.herokuapp.com/recipe/likeRecipe',
    );
    Map parameters = {"recipeId": id};
    var response = await http.post(uri, body: parameters, headers: header);
    var body = jsonDecode(response.body);
    if (response.statusCode == 200 || response.statusCode == 201) {
      return;
    }

    String err = body['error'];
    throw Exception(err);
  }

  unlikeRecipe(String id) async {
    var uri = Uri.parse(
      'https://recipefy-g1.herokuapp.com/recipe/unlikeRecipe',
    );
    Map parameters = {"recipeId": id};
    var response = await http.post(uri, body: parameters, headers: header);
    var body = jsonDecode(response.body);
    if (response.statusCode == 200 || response.statusCode == 201) {
      return;
    }

    String err = body['error'];
    throw Exception(err);
  }

  Future<List<UserResult>> getFollowing() async {
    var uri = Uri.parse(
      'https://recipefy-g1.herokuapp.com/user/getFollowing',
    );
    var response = await http.post(uri, headers: header);
    var body = jsonDecode(response.body);
    if (response.statusCode == 200 || response.statusCode == 201) {
      SearchUser searchUser = searchUserFromJson(response.body);
      return searchUser.results;
    }
    String err = body['error'];
    throw Exception(err);
  }
}
