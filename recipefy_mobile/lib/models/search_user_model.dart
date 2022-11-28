// To parse this JSON data, do
//
//     final searchUser = searchUserFromJson(jsonString);

import 'dart:convert';

SearchUser searchUserFromJson(String str) =>
    SearchUser.fromJson(json.decode(str));

String searchUserToJson(SearchUser data) => json.encode(data.toJson());

class SearchUser {
  SearchUser({
    this.next,
    required this.results,
  });

  Next? next;
  List<UserResult> results;

  factory SearchUser.fromJson(Map<String, dynamic> json) => SearchUser(
        next: Next.fromJson(json["next"]),
        results: List<UserResult>.from(
            json["results"].map((x) => UserResult.fromJson(x))),
      );

  Map<String, dynamic> toJson() => {
        "next": next?.toJson(),
        "results": List<dynamic>.from(results.map((x) => x.toJson())),
      };
}

class Next {
  Next({
    required this.page,
    required this.count,
  });

  int page;
  int count;

  factory Next.fromJson(Map<String, dynamic> json) => Next(
        page: json["page"],
        count: json["count"],
      );

  Map<String, dynamic> toJson() => {
        "page": page,
        "count": count,
      };
}

class UserResult {
  UserResult({
    required this.id,
    required this.firstname,
    required this.lastname,
    required this.username,
    required this.pic,
    required this.email,
    required this.isVerified,
  });

  String id;
  String firstname;
  String lastname;
  String username;
  String pic;
  String email;
  bool isVerified;

  factory UserResult.fromJson(Map<String, dynamic> json) => UserResult(
        id: json["_id"],
        firstname: json["Firstname"],
        lastname: json["Lastname"],
        username: json["Username"],
        pic: json["Pic"],
        email: json["Email"],
        isVerified: json["isVerified"],
      );

  Map<String, dynamic> toJson() => {
        "_id": id,
        "Firstname": firstname,
        "Lastname": lastname,
        "Username": username,
        "Pic": pic,
        "Email": email,
        "isVerified": isVerified,
      };
}
