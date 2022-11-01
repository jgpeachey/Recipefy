const mongoose = require("mongoose");

const recipeInfo = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  User_ID: mongoose.Schema.Types.ObjectId,
  Title: { type: String, require: true },
  Ingredients: { type: Array, require: true },
  Instructions: { type: Array, require: true },
  Nutritional_Value: {
    Calories: { type: String },
    Sodium: { type: String },
  },
  Likes: { type: Number, require: true },
});

module.exports = mongoose.model("recipe", recipeInfo);
