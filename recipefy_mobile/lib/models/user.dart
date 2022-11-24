import 'package:json_annotation/json_annotation.dart';

part 'user.g.dart';

@JsonSerializable()
class User {
  String firstName;
  String lastName;
  String profilePic;
  String username;
  String email;
  String password;
  String? emailToken;
  String? refreshToken;
  String? isVerified;

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

  factory User.fromJson(Map<String, dynamic> data) => _$UserFromJson(data);

  Map<String, dynamic> toJson() => _$UserToJson(this);
}
