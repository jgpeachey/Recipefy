import 'package:flutter_test/flutter_test.dart';
import 'package:recipefy_mobile/services/remote_services.dart';
import 'package:recipefy_mobile/models/search_recipe_model.dart';
import 'package:recipefy_mobile/models/search_user_model.dart';

void main() {
  test('Login should complete', () async {
    await RemoteService().login("demo@gmail.com", "Yessir1!");

    expect((RemoteService.header["authorization"] != null), true);
  });

  test('Recipe should be retrieved', () async {
    List<RecipeResult> response = await RemoteService().findAllRecipe("", 1, 1);

    expect(response.length, 1);
  });

  test('User should be retrieved', () async {
    List<UserResult> response = await RemoteService().searchUsers("", 1, 1);

    expect(response.length, 1);
  });
}
