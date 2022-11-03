const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const express = require("express");
const userRouter = require("./routers/user");
const recipeRouter = require("./routers/recipe");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();
const connectionString = process.env.API_KEY;

const app = express();
const port = process.env.PORT || 3001;
const link = (process.env.NODE_ENV === 'production') ? "https://recipefy-g1.herokuapp.com/" : `https://localhost:${port}`

app.use(express.static(path.join(__dirname + "/public")));

app.use(cookieParser());

app.use(
  cors({
    origin: link,
    credentials: true,
  })
);

mongoose.connect(connectionString);

app.use(async (req, res, next) => {
  try {
    return await next();
  } catch (error) {
    console.log("Error caight in middleware", error);
  }
});
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/user", userRouter);
app.use("/recipe", recipeRouter);

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
