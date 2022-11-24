// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'user.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

User _$UserFromJson(Map<String, dynamic> json) => User(
      firstName: json['firstName'] as String,
      lastName: json['lastName'] as String,
      profilePic: json['profilePic'] as String,
      username: json['username'] as String,
      email: json['email'] as String,
      password: json['password'] as String,
      emailToken: json['emailToken'] as String?,
      refreshToken: json['refreshToken'] as String?,
      isVerified: json['isVerified'] as String?,
    );

Map<String, dynamic> _$UserToJson(User instance) => <String, dynamic>{
      'firstName': instance.firstName,
      'lastName': instance.lastName,
      'profilePic': instance.profilePic,
      'username': instance.username,
      'email': instance.email,
      'password': instance.password,
      'emailToken': instance.emailToken,
      'refreshToken': instance.refreshToken,
      'isVerified': instance.isVerified,
    };
