const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const crypto = require("crypto");
const sgMail = require("@sendgrid/mail");
const {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
} = require("../middleware/tokens");

require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_KEY);

// register api
router.post("/register", async function (req, res) {
  if (Object.keys(req.body.Username).length === 0) {
    return res.status(409).json({
      error: "Username required",
    });
  }
  if (Object.keys(req.body.Email).length === 0) {
    return res.status(409).json({
      error: "Email required",
    });
  }
  if (Object.keys(req.body.Password).length === 0) {
    return res.status(409).json({
      error: "Password required",
    });
  }
  const user = await User.findOne({ Username: req.body.Username }).exec();
  if (user) {
    return res.status(409).json({
      error: "Username Exists",
    });
  }

  const email = await User.findOne({ Email: req.body.Email }).exec();
  if (email) {
    return res.status(409).json({
      error: "Email Exists",
    });
  }

  const hash = await bcrypt.hash(req.body.Password, 10);

  const userInfo = new User({
    _id: new mongoose.Types.ObjectId(),
    Firstname: req.body.Firstname,
    Lastname: req.body.Lastname,
    Username: req.body.Username,
    Email: req.body.Email,
    emailToken: crypto.randomBytes(64).toString("hex"),
    refreshToken: "",
    isVerified: false,
    Password: hash,
  });

  const result = await userInfo.save();

  console.log(result);
  res.status(201).json({
    error: "",
  });

  const msg = {
    from: "omarashry125@gmail.com",
    to: req.body.Email,
    subject: "Recipefy - Verify your Email",
    text: `
            Hey! Thank you for registering!
            Copy and paste the address below to verify your account.
            http://${req.headers.host}/verifyEmail?token-${result.emailToken}
        `,
    html: `
            <h1>Hello</h1>
            <p>Thank you for Registering!<p>
            <p>Please click the link below to verify your account<p>
            <a href= "http://${req.headers.host}/verifyEmail?token-${result.emailToken}">Verify your Account</a>
        `,
  };

  await sgMail.send(msg);

  console.log("email sent");
});

router.get("/verifyEmail", async (req, res, next) => {
  try {
    const user = await User.findOne({ emailToken: req.query.token });
    if (!user) {
      req.flash("error", "token is invalid. please contact us for assistance");
      return res.redirect("/");
    }
    user.emailToken = null;
    user.isVerified = true;
    await user.save();
  } catch (error) {
    console.log(error);
    req.flash("error", "token is invalid. please contact us for assistance");
    res.redirect("/");
  }
});

// login api
router.post("/login", async (req, res, next) => {
  const user = await User.findOne({ Email: req.body.Email }).exec();
  if (!user) {
    return res.status(409).json({
      error: "Invalid Email",
    });
  }

  try {
    const passAuth = await bcrypt.compare(req.body.Password, user.Password);

    if (passAuth) {
      const accessToken = createAccessToken(user._id);
      const refreshToken = createRefreshToken(user._id);
      delete user.Password;
      delete user.emailToken;
      delete user.isVerified;
      //console.log(user.Password);
      user.refreshToken = refreshToken;
      return res.status(201).json({
        error: "",
        id: user._id,
        firstName: user.Firstname,
        lastName: user.Lastname,
        email: user.Email,
        isVerified: user.isVerified,
      });

      //sendRefreshToken(res, refreshToken);
      //sendAccessToken(req, res, accessToken);
    } else {
      return res.status(409).json({
        error: "Invalid Password",
      });
    }
  } catch (e) {
    return res.send({
      error: `${e.message}`,
    });
  }
});

// function authToken(req, res, next) {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
//     if(token === null) return res.sendStatus(401);

//     jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, user) => {
//         if(err) return res.sendStatus(403);
//         req.user = user;
//         next();
//     })
// }

module.exports = router;
