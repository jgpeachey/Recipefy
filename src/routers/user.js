const mongoose = require("mongoose");
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { verifyAccessToken } = require("../middleware/tokens");
const User = require("../models/user");
const Recipe = require("../models/recipe");
const crypto = require("crypto");
const sgMail = require("@sendgrid/mail");
const cloudinary = require("../utils/cloudinary");
const axios = require("axios");
const { createAccessToken } = require("../middleware/tokens");
const Token = require("../models/token");

const { appendFile } = require("fs");

require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_KEY);

const clientUrl =
  process.env.NODE_ENV === "production"
    ? "https://recipefy-g1.herokuapp.com"
    : "http://localhost:3000";

// register apis
router.post("/register", async function (req, res) {
  if (typeof req.body?.Username !== "string" || !req.body?.Username?.length) {
    return res.status(409).json({
      error: "Username required",
    });
  }

  if (typeof req.body?.Email !== "string" || !req.body?.Email?.length) {
    return res.status(409).json({
      error: "Email required",
    });
  }

  if (typeof req.body?.Password !== "string" || !req.body?.Password?.length) {
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
            ${clientUrl}/user/verify?token=${result.emailToken}
        `,
    html: `
            <h1>Hello</h1>
            <p>Thank you for Registering!<p>
            <p>Please click the link below to verify your account<p>
            <a href= "${clientUrl}/user/verify?token=${result.emailToken}">Verify your Account</a>
        `,
  };

  void sgMail.send(msg);

  return res.status(201).json({
    error: "",
  });
});
/*
// test
router.get('/test', async (req, res) => {
  try{
    const user = await User.findOne({ _id: new mongoose.Types.ObjectId(req.body.userId)})
    if(!user){
      return res.status(201).json({
        error: "Could not find User",
      })
    }
    return res.status(201).json({
      user: user
    })
  }catch(error){
    return res.status(201).json({
      error: error
    })
  }

})
*/
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
    return res.redirect(clientUrl);
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

      if (user.isVerified === false) {
        const msg = {
          from: "recipefyservices@gmail.com",
          to: req.body.Email,
          subject: "Recipefy - Verify your Email",
          text: `
                        Hey! Thank you for registering!
                        Copy and paste the address below to verify your account.
                        ${clientUrl}/user/verify?token=${user.emailToken}
                    `,
          html: `
                        <h1>Hello</h1>
                        <p>Thank you for Registering!<p>
                        <p>Please click the link below to verify your account<p>
                        <a href= "${clientUrl}/user/verify?token=${user.emailToken}">Verify your Account</a>
                    `,
        };

        void sgMail.send(msg);
        return res
          .status(400)
          .json({
            error: "Please verify your email first",
          })
          .end();
      }

      return res.status(201).json({
        error: "",
        user: {
          id: user._id,
          userName: user.Username,
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

// Update User
router.put("/updateuser", verifyAccessToken, async(req, res, next) =>{
  const user = await User.findOne({Email: req.body.Email }).exec();
  if(!user){
    return res.status(409).json({
      error: "Invalid email",
    });
  }

  try{
    const passAuth = await bcrypt.compare(req.body.Password, user.Password);
    if(passAuth) {
      if(req.body.Info.Password){
        const hash = await bcrypt.hash(req.body.Info.Password, 10);
        req.body.Info.Password = hash;
      }
      const result = await User.updateOne({Email: req.body.Email}, {$set: req.body.Info});
      
      

      return res.status(200).end();
    } else {
      return res.status(409).json({
        error: "Invalid Password",
      });
    }

  } catch(e) {
    return res.send({
      error: `${e.message}`,
    });
  }
});


// Delete user function
router.delete("/deleteuser", verifyAccessToken, async (req, res, next) => {
  const user = await User.findOne({ Email: req.body.Email }).exec();
  if (!user) {
    return res.status(409).json({
      error: "Invalid email",
    });
  }

  try {
    const passAuth = await bcrypt.compare(req.body.Password, user.Password);
    if (passAuth) {
      await Recipe.deleteMany({ User_ID: user._id });
      await User.deleteOne({ Email: req.body.Email });
     
      
      return res.status(200).end();
    } else {
      return res.status(409).json({
        error: "Invalid password",
      });
    }
  } catch (e) {
    return res.send({
      error: `${e.message}`,
    });
  }
});

// Search Users API
router.get("/searchUsers", verifyAccessToken, async (req, res, next) => {
  const page = parseInt(req.query.page);
  const count = parseInt(req.query.count);
  const search = req.query.search;
  const filter = {};

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


router.post('/resetPasswordRequest', async (req, res, next) => {
  // in this just send email
  const user = await User.findOne({ Email: req.body.Email });

  if(!user){
    return res.status(409).json({
      error: "Invalid Email"
    })
  }
  
  let token = await Token.findOne({ userId: user._id });
  if(token){
    await token.deleteOne();
  }

  let resetToken = crypto.randomBytes(32).toString("hex");

  const hash = await bcrypt.hash(resetToken, 10);

  await new Token({
    userId: user._id,
    token: hash,
    createdAt: Date.now()
  }).save();
  const emailLink = `${clientUrl}/forgotpassword?token=${resetToken}&id=${user._id}`;
  const msg = {
    from: "recipefyservices@gmail.com",
    to: req.body.Email,
    subject: "Recipefy - Password Reset Request",
    text: `
            Hey! Thank you for using Recipefy,
            you can reset your password by clicking this link or copy and pasting.
            The link will expire in an hour
            ${emailLink}
        `,
    html: `
            <h1>Hello</h1>
            <p>Thank you for using Recipefy<p>
            <p>Please click the link below to reset your password<p>
            <p>If you did not request to reset your password just ignore this email<p>
            <a href= "${emailLink}">Reset your password (expires in 1 hour)</a>
        `,
  }
  sgMail.send(msg).catch((error) => { console.error(error); });
  return res.status(201).json({
    error: ""
  })
})
// required fields will be userId, token, and then newPassword
router.post('/resetPassword', async (req, res, next) => {
  //console.log(req.body.userId);
  const userId = (req.body.userId).trim();
  console.log(req.body);
  //console.log(typeof userId);
  if((req.body.userId).length != 24){
    return res.status(409).json({
      error: "Invalid User Id"
    })
  }
  if(req.body.token == ''){
    return res.status(409).json({
      error: "Invalid token"
    })
  }
  const resetToken = await Token.findOne({userId: mongoose.Types.ObjectId(req.body.userId)});
  if(!resetToken){
    return res.status(409).json({
      error: "Invalid or expired password reset token"
    })
  }
  let valid = await bcrypt.compare(req.body.token, resetToken.token)
  if(!valid){
    return res.status(409).json({
      error: "Invalid or expired password reset token"
    })
  }
  // otherwise its valid
  const userCheck = await User.findOne({ _id: req.body.userId })
  //console.log(userCheck.Password)
  const check = await bcrypt.compare(req.body.newPassword, userCheck.Password);
  if(check){
    return res.status(409).json({
      error: "This is the same as the previous password, please change to a new password."
    })
  }
  const hash = await bcrypt.hash(req.body.newPassword, 10);
  await User.updateOne(
    { _id: req.body.userId },
    { $set: { Password: hash } },
    { new: true} 
  )
  await resetToken.deleteOne();
  const user = await User.findById({ _id: req.body.userId });
  const msg = {
    from: "recipefyservices@gmail.com",
    to: user.Email,
    subject: "Recipefy - Password Reset Successful",
    text: `
            ${user.Email}'s password was successfully changed. 
        `,
    html: `
            <h1>Hello</h1>
            <p>${user.Email}'s password was successfully changed<p>
        `,
  }
  sgMail.send(msg).catch((error) => { console.error(error); });
  return res.status(201).json({
    error: ""
  })
})
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
