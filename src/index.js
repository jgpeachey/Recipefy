const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const express = require("express");
const userRouter = require("./routers/user");
const recipeRouter = require("./routers/recipe");
require("dotenv").config();
const connectionString = process.env.API_KEY;

const app = express();

mongoose.connect(connectionString);

app.use(async (req, res, next) => {
  try {
    return await next();
  } catch (error) {
    console.log("Error caight in middleware", error);
  }
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use("/user", userRouter);
app.use("/recipe", recipeRouter);

app.listen(3000, () => {
  console.log(`Server running at port 3000`);
});
