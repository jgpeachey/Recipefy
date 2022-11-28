// To parse this JSON data, do
//
//     final login = loginFromJson(jsonString);

import 'dart:convert';

Login loginFromJson(String str) => Login.fromJson(json.decode(str));

String loginToJson(Login data) => json.encode(data.toJson());

class Login {
  Login({
    required this.error,
    required this.user,
    required this.auth,
  });

  String error;
  User user;
  Auth auth;

  factory Login.fromJson(Map<String, dynamic> json) => Login(
        error: json["error"],
        user: User.fromJson(json["user"]),
        auth: Auth.fromJson(json["auth"]),
      );

  Map<String, dynamic> toJson() => {
        "error": error,
        "user": user.toJson(),
        "auth": auth.toJson(),
      };
}

class Auth {
  Auth({
    required this.accessToken,
  });

  String accessToken;

  factory Auth.fromJson(Map<String, dynamic> json) => Auth(
        accessToken: json["accessToken"],
      );

  Map<String, String> toJson() => {
        "accessToken": accessToken,
      };
}

class User {
  User({
    required this.id,
    required this.userName,
    required this.firstName,
    required this.lastName,
    required this.email,
    required this.isVerified,
    required this.pic,
    required this.followers,
    required this.following,
    required this.likes,
  });

  String id;
  String userName;
  String firstName;
  String lastName;
  String email;
  bool isVerified;
  String pic;
  List<String> followers;
  List<String> following;
  List<String> likes;

  factory User.fromJson(Map<String, dynamic> json) => User(
        id: json["id"],
        userName: json["userName"],
        firstName: json["firstName"],
        lastName: json["lastName"],
        email: json["email"],
        isVerified: json["isVerified"],
        pic: json["pic"],
        followers: List<String>.from(json["followers"].map((x) => x)),
        following: List<String>.from(json["following"].map((x) => x)),
        likes: List<String>.from(json["likes"].map((x) => x)),
      );

  Map<String, dynamic> toJson() => {
        "id": id,
        "userName": userName,
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "isVerified": isVerified,
        "pic": pic,
        "followers": jsonEncode(followers),
        "following": jsonEncode(following),
        "likes": jsonEncode(likes),
      };
}
