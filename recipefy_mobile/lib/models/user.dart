import 'dart:convert';

List<User> userFromJson(String str) =>
    List<User>.from(jsonDecode(str).map((x) => User.fromJson(x)));

String userToJson(List<User> data) =>
    jsonEncode(List<dynamic>.from(data.map((x) => x.toJson())));

class User {
  User({
    required this.firstName,
    required this.lastName,
    required this.profilePic,
    required this.username,
    required this.email,
    required this.password,
    this.emailToken,
    this.refreshToken,
    this.isVerified,
  });

  String firstName;
  String lastName;
  String profilePic;
  String username;
  String email;
  String password;
  String? emailToken;
  String? refreshToken;
  String? isVerified;

  factory User.fromJson(Map<String, dynamic> json) => User(
        firstName: json["firstName"],
        lastName: json["lastName"],
        profilePic: json["profilePic"],
        username: json["username"],
        email: json["email"],
        password: json["password"],
        emailToken: json["emailToken"],
        refreshToken: json["refreshToken"],
        isVerified: json["isVerified"],
      );

  Map<String, dynamic> toJson() => {
        "firstName": firstName,
        "lastName": lastName,
        "profilePic": profilePic,
        "username": username,
        "email": email,
        "password": password,
        "emailToken": emailToken,
        "refreshToken": refreshToken,
        "isVerified": isVerified,
      };
}
