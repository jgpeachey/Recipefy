const mongoose = require("mongoose");

const userInfo = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  Firstname: { type: String, require: true },
  Lastname: { type: String, require: true },
  Username: { type: String, require: true },
  Email: {
    type: String,
    require: true,
    unique: true,
    match:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  emailToken: { type: String },
  isVerified: { type: Boolean },
  Password: { type: String, require: true },
});

module.exports = mongoose.model("User", userInfo);
