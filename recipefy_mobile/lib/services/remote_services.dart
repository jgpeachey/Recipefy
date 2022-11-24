import 'package:recipefy_mobile/models/user.dart';
import 'package:recipefy_mobile/models/recipe.dart';
import 'package:recipefy_mobile/models/error.dart';

import 'package:http/http.dart' as http;

class RemoteService {
  var client = http.Client();
  Map<String, String> headers = {};
  void updateCookie(http.Response response) {
    var rawCookie = response.headers['set-cookie'];
    if (rawCookie != null) {
      int index = rawCookie.indexOf(';');
      headers['cookie'] =
          (index == -1) ? rawCookie : rawCookie.substring(0, index);
    }
  }

  Future<dynamic> login(String email, String password) async {
    Map<String, String> parameters = {
      "Email": email,
      "Password": password,
    };
    var uri = Uri.parse(
      'https://recipefy-g1.herokuapp.com/user/login',
    );
    var response = await http.post(uri, body: parameters, headers: headers);
    updateCookie(response);
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
    var response = await http.post(uri, body: parameters, headers: headers);
    updateCookie(response);
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
    var response = await http.post(uri, body: parameters, headers: headers);
    updateCookie(response);
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
    var response = await http.post(uri, body: parameters, headers: headers);
    updateCookie(response);
    if (response.statusCode == 200 || response.statusCode == 201) {
      return response.body;
    }
    Error err = errorFromJson(response.body);
    throw Exception(err.message);
  }

  Future<dynamic> searchUsers() async {}

  Future<dynamic> followUser(String id) async {
    var uri = Uri.parse(
      'https://recipefy-g1.herokuapp.com/user/followUser',
    );
    Map parameters = {"userId": id};
    var response = await http.post(uri, body: parameters, headers: headers);
    updateCookie(response);
    if (response.statusCode == 200 || response.statusCode == 201) {
      return response.body;
    }
    Error err = errorFromJson(response.body);
    throw Exception(err.message);
  }

  Future<dynamic> unfollowUser(String id) async {
    var uri = Uri.parse(
      'https://recipefy-g1.herokuapp.com/user/unfollowUser',
    );
    Map parameters = {"userId": id};
    var response = await http.post(uri, body: parameters, headers: headers);
    updateCookie(response);
    if (response.statusCode == 200 || response.statusCode == 201) {
      return response.body;
    }
    Error err = errorFromJson(response.body);
    throw Exception(err.message);
  }

  Future<dynamic> updateUser(String email, String password, String pic) async {
    var uri = Uri.parse(
      'https://recipefy-g1.herokuapp.com/user/updateuser',
    );
    Map parameters = {"Email": email, "Password": password, "Pic": pic};
    var response = await http.post(uri, body: parameters, headers: headers);
    updateCookie(response);
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
    var response = await http.post(uri, body: parameters, headers: headers);
    updateCookie(response);
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
    var response = await http.post(uri, body: parameters, headers: headers);
    updateCookie(response);
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
    var response = await http.post(uri, body: parameters, headers: headers);
    updateCookie(response);
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
    var response = await http.post(uri, body: parameters, headers: headers);
    updateCookie(response);
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
    var response = await http.post(uri, body: parameters, headers: headers);
    updateCookie(response);
    if (response.statusCode == 200 || response.statusCode == 201) {
      return response.body;
    }
    Error err = errorFromJson(response.body);
    throw Exception(err.message);
  }

  Future<dynamic> findRecipe() async {
    var uri = Uri.parse(
      'https://recipefy-g1.herokuapp.com/recipes/findRecipe',
    );
    var response = await http.get(uri);
    if (response.statusCode != 500) {
      return response.body;
    }
    Error err = errorFromJson(response.body);
    throw Exception(err.message);
  }

  Future<dynamic> getUserRecipe() async {}

  Future<dynamic> findAllRecipe() async {}
}
