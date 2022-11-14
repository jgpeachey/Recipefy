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
}
