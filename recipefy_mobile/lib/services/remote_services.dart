import 'package:recipefy_mobile/models/user.dart';
import 'package:recipefy_mobile/models/recipe.dart';
import 'package:recipefy_mobile/models/error.dart';

import 'package:http/http.dart' as http;

class RemoteService {
  var client = http.Client();

  /*
  Future<List<User>?> getUsers(String api) async {
    var uri = Uri.parse(baseUrl + api);
    var response = await client.get(uri);
    if (response.statusCode == 200) {
      var json = response.body;
      return userFromJson(json);
    }
    return null;
  }

  Future<List<Recipe>?> getRecipes(String api) async {
    var uri = Uri.parse(baseUrl + api);
    var response = await client.get(uri);
    if (response.statusCode == 200) {
      var json = response.body;
      return recipeFromJson(json);
    }
    return null;
  }
  */

  Future<dynamic> login(String email, String password) async {
    Map<String, String> parameters = {
      "Email": email,
      "Password": password,
    };
    var uri = Uri.parse(
      'https://recipefy-g1.herokuapp.com/user/login',
    );
    var response = await http.post(uri, body: parameters);
    if (response.statusCode == 200 || response.statusCode == 201) {
      return response.body;
    }
    Error err = errorFromJson(response.body);
    throw Exception(err.message);
  }

  Future<dynamic> register(String firstName, String lastName, String username,
      String email, String pic, String password) async {
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
    if (response.statusCode == 200 || response.statusCode == 201) {
      return response.body;
    }
    Error err = errorFromJson(response.body);
    throw Exception(err.message);
  }

  Future<dynamic> deleteUser(String email, String password) async {
    Map<String, String> parameters = {
      "Email": email,
      "Password": password,
    };
    var uri = Uri.parse(
      'https://recipefy-g1.herokuapp.com/user/delete',
    );
    var response = await http.post(uri, body: parameters);
    if (response.statusCode == 200 || response.statusCode == 201) {
      return response.body;
    }
    Error err = errorFromJson(response.body);
    throw Exception(err.message);
  }

  Future<dynamic> verify(String id) async {
    var uri = Uri.parse(
      'https://recipefy-g1.herokuapp.com/user/verify',
    );
    Map parameters = {"_id": id};
    var response = await http.post(uri, body: parameters);
    if (response.statusCode == 200 || response.statusCode == 201) {
      return response.body;
    }
    Error err = errorFromJson(response.body);
    throw Exception(err.message);
  }

  Future<dynamic> searchUsers() async {}

  Future<dynamic> updateUser(String email, String password, String pic) async {
    var uri = Uri.parse(
      'https://recipefy-g1.herokuapp.com/user/updateuser',
    );
    Map parameters = {"Email": email, "Password": password, "Pic": pic};
    var response = await http.post(uri, body: parameters);
    if (response.statusCode == 200 || response.statusCode == 201) {
      return response.body;
    }
    Error err = errorFromJson(response.body);
    throw Exception(err.message);
  }

  Future<dynamic> resetPasswordRequest(String email) async {
    var uri = Uri.parse(
      'https://recipefy-g1.herokuapp.com/user/verify',
    );
    Map parameters = {"Email": email};
    var response = await http.post(uri, body: parameters);
    if (response.statusCode == 200 || response.statusCode == 201) {
      return response.body;
    }
    Error err = errorFromJson(response.body);
    throw Exception(err.message);
  }

  Future<dynamic> resetPassword(String id, String token) async {
    var uri = Uri.parse(
      'https://recipefy-g1.herokuapp.com/user/resetPassword',
    );
    Map parameters = {"userId": id, "token": token};
    var response = await http.post(uri, body: parameters);
    if (response.statusCode == 200 || response.statusCode == 201) {
      return response.body;
    }
    Error err = errorFromJson(response.body);
    throw Exception(err.message);
  }

  Future<dynamic> addRecipe(String title, List ingredients, List instructions,
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
      "Pic": pic,
    };
    var response = await http.post(uri, body: parameters);
    if (response.statusCode == 200 || response.statusCode == 201) {
      return response.body;
    }
    Error err = errorFromJson(response.body);
    throw Exception(err.message);
  }

  Future<dynamic> updateRecipe(String id) async {
    var uri = Uri.parse(
      'https://recipefy-g1.herokuapp.com/recipe/updaterecipe',
    );
    Map parameters = {"_id": id};
    var response = await http.post(uri, body: parameters);
    if (response.statusCode == 200 || response.statusCode == 201) {
      return response.body;
    }
    Error err = errorFromJson(response.body);
    throw Exception(err.message);
  }

  Future<dynamic> removeRecipe(String id) async {
    var uri = Uri.parse(
      'https://recipefy-g1.herokuapp.com/recipes/removerecipe',
    );
    Map parameters = {"_id": id};
    var response = await http.post(uri, body: parameters);
    if (response.statusCode == 200 || response.statusCode == 201) {
      return response.body;
    }
    Error err = errorFromJson(response.body);
    throw Exception(err.message);
  }
}
