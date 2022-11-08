class User {
  User({
    required this.firstName,
    required this.lastName,
    required this.username,
    required this.email,
    this.emailToken,
    this.refreshToken,
    this.isVerified,
    required this.password,
  });

  String firstName;
  String lastName;
  String username;
  String email;
  String? emailToken;
  String? refreshToken;
  String? isVerified;
  String password;

  factory User.fromJson(Map<String, dynamic> json) => User(
        firstName: json["firstName"],
        lastName: json["lastName"],
        username: json["username"],
        email: json["email"],
        emailToken: json["emailToken"],
        refreshToken: json["refreshToken"],
        isVerified: json["isVerified"],
        password: json["password"],
      );

  Map<String, dynamic> toJson() => {
        "firstName": firstName,
        "lastName": lastName,
        "username": username,
        "email": email,
        "emailToken": emailToken,
        "refreshToken": refreshToken,
        "isVerified": isVerified,
        "password": password,
      };
}
