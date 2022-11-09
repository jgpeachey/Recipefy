const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { verifyAccessToken } = require("../middleware/tokens");
const User = require("../models/user");
const crypto = require("crypto");
const sgMail = require("@sendgrid/mail");
const cloudinary = require("../utils/cloudinary");
const axios = require("axios");
const {
  createAccessToken,
} = require("../middleware/tokens");

const { appendFile } = require("fs");

require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_KEY);

// register apis
router.post("/register", async function (req, res) {
  if (typeof req.body?.Username !== "string" || !req.body?.Username?.length) {
    return res.status(409).json({
      error: "Username required",
    });
  }

  if(typeof req.body?.Email !== 'string' ||
    !req.body?.Email?.length ) {
    return res.status(409).json({
      error: "Email required",
    });
  }

  if(typeof req.body?.Password !== 'string' ||
    !req.body?.Password?.length ) {
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
  let picurl =
    "https://res.cloudinary.com/dnkvi73mv/image/upload/v1667587410/user_jrsnx1.png";
  //console.log(req.body.pic);
  if (req.body.Pic != "") {
    try {
      picurl = (await cloudinary.uploader.upload(req.body.Pic)).secure_url;
    } catch (error) {
      return res
        .status(409)
        .json({ error: "Image uploading error.", message: error });
    }
  }

  const userInfo = new User({
    _id: new mongoose.Types.ObjectId(),
    Firstname: req.body.Firstname,
    Lastname: req.body.Lastname,
    Username: req.body.Username,
    Pic: picurl,
    Email: req.body.Email,
    emailToken: crypto.randomBytes(64).toString("hex"),
    isVerified: false,
    Password: hash,
  });

  const result = await userInfo.save();

  const msg = {
    from: "recipefyservices@gmail.com",
    to: req.body.Email,
    subject: "Recipefy - Verify your Email",
    text: `
            Hey! Thank you for registering!
            Copy and paste the address below to verify your account.
            http://localhost:3001/user/verify?token=${result.emailToken}
        `,
    html: `
            <h1>Hello</h1>
            <p>Thank you for Registering!<p>
            <p>Please click the link below to verify your account<p>
            <a href= "http://localhost:3001/user/verify?token=${result.emailToken}">Verify your Account</a>
        `,
  };

  void sgMail.send(msg);

  return res.status(201).json({
    error: "",
  });
});

router.get("/verify", async (req, res, next) => {
  try {
    const user = await User.findOne({ emailToken: req.query.token });
    if (!user) {
        return res.status(201).json({
            error: "user DNE",
          });
    }
    user.emailToken = null;
    user.isVerified = true;
    await user.save();
    return res.redirect("http://localhost:3000");
  } catch (error) {
    console.log(error);
    return res.status(201).json({
        error: error,
      });
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

        if(user.isVerified === false) {
            const msg = {
                from: "recipefyservices@gmail.com",
                to: req.body.Email,
                subject: "Recipefy - Verify your Email",
                text: `
                        Hey! Thank you for registering!
                        Copy and paste the address below to verify your account.
                        http://localhost:3001/user/verify?token=${user.emailToken}
                    `,
                html: `
                        <h1>Hello</h1>
                        <p>Thank you for Registering!<p>
                        <p>Please click the link below to verify your account<p>
                        <a href= "http://localhost:3001/user/verify?token=${user.emailToken}">Verify your Account</a>
                    `,
              };
            
            void sgMail.send(msg);
            return res.status(400).json({
            error: "Please verify your email first",
            }).end();
        }

      return res.status(201).json({
        error: "",
        user: {
          id: user._id,
          firstName: user.Firstname,
          lastName: user.Lastname,
          email: user.Email,
          isVerified: user.isVerified,
          pic: user.Pic,
        },
        auth: {
          accessToken: accessToken,
        },
      });
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

router.get("/searchUsers", verifyAccessToken, async (req, res, next) => {
  const page = parseInt(req.query.page);
  const count = parseInt(req.query.count);
  const search = req.query.search;
  const filter = { User_ID: req.auth.userId };

  if (search?.length) {
    filter.Username = {
      $regex: new RegExp(search, "i"),
    };
  }

  const startIndex = (page - 1) * count;
  const endIndex = page * count;

  const results = {};

  if (endIndex < (await User.countDocuments(filter).exec())) {
    results.next = {
      page: page + 1,
      count: count,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      count: count,
    };
  }

  try {
    results.results = await User.find(filter)
      .limit(count)
      .skip(startIndex)
      .exec();
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// router.post("/catch", async (req, res, next) => {
//   const { token } = req.body;
//   await axios.post(
//     `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.REACT_APP_SECRET_KEY}&response=${token}`
//   );
//   if (res.status(200)) {
//     return res.status(200).json({
//       pass: "Human",
//     });
//   } else {
//     return res.status(200).json({
//       pass: "Robot",
//     });
//   }
// });

module.exports = router;
