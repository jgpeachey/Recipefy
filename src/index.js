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
app.use(cors());
const port = process.env.PORT || 3001;
app.set("port", process.env.PORT || 3001);
// const link =
//   process.env.NODE_ENV === "production"
//     ? "https://recipefy-g1.herokuapp.com/"
//     : `https://localhost:${port}`;

// app.use(express.static(path.join(__dirname + "/public")));

app.use(express.json({ limit: "25mb" }));

app.use(cookieParser());

// app.use(
//   cors({
//     origin: link,
//     credentials: true,
//   })
// );
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("/client/build"));

  // app.get("/", (req, res) => {
  //   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  // });
  // app.get("/home", (req, res) => {
  //   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  // });
  // app.get("/register", (req, res) => {
  //   res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  // });

  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
  /*app.get("/forgotpassword", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  }) */
}

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

module.exports = app;
