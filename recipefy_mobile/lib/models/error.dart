import 'dart:convert';

Error errorFromJson(String str) => Error.fromJson(json.decode(str));

String errorToJson(Error data) => json.encode(data.toJson());

class Error {
  Error({
    required this.message,
  });

  String message;

  factory Error.fromJson(Map<String, dynamic> json) => Error(
        message: json["error"],
      );

  Map<String, dynamic> toJson() => {
        "error": message,
      };
}
