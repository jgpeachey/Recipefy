const mongoose = require("mongoose");

const recipeInfo = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  User_ID: mongoose.Schema.Types.ObjectId,
  Username: { type: String, require: true },
  profilePic: { type: String, require: true},
  Title: { type: String, require: true },
  Ingredients: { type: Array, require: true },
  Instructions: { type: Array, require: true },
  Calories: { type: String },
  Sodium: { type: String },
  Description: { type: String, require: true },
  CreatedAt: { type: Date, require: true, default: Date.now() },
  Pic: { type: String, require: true},
  Likes: { type: Number, require: true },
});

module.exports = mongoose.model("recipe", recipeInfo);
