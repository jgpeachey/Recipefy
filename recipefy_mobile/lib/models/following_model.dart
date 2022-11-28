// To parse this JSON data, do
//
//     final followingModel = followingModelFromJson(jsonString);

import 'package:meta/meta.dart';
import 'dart:convert';

FollowingModel followingModelFromJson(String str) =>
    FollowingModel.fromJson(json.decode(str));

String followingModelToJson(FollowingModel data) => json.encode(data.toJson());

class FollowingModel {
  FollowingModel({
    required this.error,
    required this.results,
  });

  String error;
  List<Follower> results;

  factory FollowingModel.fromJson(Map<String, dynamic> json) => FollowingModel(
        error: json["error"],
        results: List<Follower>.from(
            json["results"].map((x) => Follower.fromJson(x))),
      );

  Map<String, dynamic> toJson() => {
        "error": error,
        "results": List<dynamic>.from(results.map((x) => x.toJson())),
      };
}

class Follower {
  Follower({
    required this.id,
    required this.firstname,
    required this.lastname,
    required this.username,
    required this.pic,
    required this.followers,
    required this.following,
  });

  String id;
  String firstname;
  String lastname;
  String username;
  String pic;
  List<String> followers;
  List<String> following;

  factory Follower.fromJson(Map<String, dynamic> json) => Follower(
        id: json["_id"],
        firstname: json["Firstname"],
        lastname: json["Lastname"],
        username: json["Username"],
        pic: json["Pic"],
        followers: List<String>.from(json["Followers"].map((x) => x)),
        following: List<String>.from(json["Following"].map((x) => x)),
      );

  Map<String, dynamic> toJson() => {
        "_id": id,
        "Firstname": firstname,
        "Lastname": lastname,
        "Username": username,
        "Pic": pic,
        "Followers": List<dynamic>.from(followers.map((x) => x)),
        "Following": List<dynamic>.from(following.map((x) => x)),
      };
}
