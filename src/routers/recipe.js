const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Recipe = require("../models/recipe");
const User = require('../models/user')
const { verifyAccessToken } = require("../middleware/tokens");
const { json } = require("body-parser");
const cloudinary = require('../utils/cloudinary');

router.use(express.json({ limit: "50mb" }));
router.use(express.urlencoded({ limit: "50mb", extended: true }));

router.post("/addrecipe", verifyAccessToken, async (req, res, next) => {
  var foodpic = "https://res.cloudinary.com/dnkvi73mv/image/upload/v1668547871/pexels-ella-olsson-1640777_k7oghj.jpg";
  if(req.body.Pic != ""){
    try {
      foodpic = (await cloudinary.uploader.upload(req.body.Pic)).secure_url;
    } catch (error) {
      return res.status(409).json({error: "Image uploading error", message: error})
    }
  }
  const user = await User.findOne({ _id: req.auth.userId }).exec();
  //console.log(user)
  if(!user){
    return res.status(409).json({error: "User DNE"});
  }
  const recipeInfo = new Recipe({
    _id: new mongoose.Types.ObjectId(),
    User_ID: req.auth.userId,
    Username: user.Username,
    profilePic: user.Pic,
    Title: req.body.Title,
    Ingredients: req.body.Ingredients,
    Instructions: req.body.Instructions,
    Description: req.body.Description,
    Calories: req.body.Calories,
    Sodium: req.body.Sodium,
    Pic: foodpic,
    Likes: 0,
  });

  const result = await recipeInfo.save();

  //console.log(result);
  return res.status(201).json({
    message: "recipe created",
  });
});

// Update recipe API
router.post("/updaterecipe", verifyAccessToken, async (req, res, next) => {
  const recipe = Recipe.findOne({
    _id: req.body._id,
    User_ID: req.auth.userId,
  });
  if (!recipe) {
    return res.status(409).json({
      error: "Invalid recipe",
    });
  }
  let pic = "https://res.cloudinary.com/dnkvi73mv/image/upload/v1668547871/pexels-ella-olsson-1640777_k7oghj.jpg"
  if(req.body.Info.Pic == ""){
    req.body.Info.Pic = pic;
  } else if( req.body.Info.hasOwnProperty("Pic") && req.body.Info.Pic.length > 30){
    req.body.Info.Pic = (
      await cloudinary.uploader.upload(req.body.Info.Pic)
    ).secure_url;
  }
  try {
    const result = await Recipe.updateOne(
      { _id: req.body._id, User_ID: req.auth.userId },
      { $set: req.body.Info }
    );
    if (result.matchedCount > 0) {
      return res.status(201).json({
        error: ""
      });
    } else {
      return res.status(409).json({
        error: "Invalid recipe",
      });
    }
  } catch (e) {
    return res.send({
      error: `${e.message}`,
    });
  }
});

router.delete("/removerecipe", verifyAccessToken, async (req, res, next) => {
  await Recipe.deleteOne({ _id: req.body._id, User_ID: req.auth.userId });
  return res.status(200).end();
});

// searchs for recipe for a specific user
router.post("/findRecipe", verifyAccessToken, async (req, res, next) => {
  const page = parseInt(req.query.page);
  const count = parseInt(req.query.count);
  const search = req.query.search;
  const filter = { User_ID: req.auth.userId };

  if (search?.length) {
    filter.Title = {
      $regex: new RegExp(search, "i"),
    };
  }

  const startIndex = (page - 1) * count;
  const endIndex = page * count;

  const results = {};

  if (endIndex < (await Recipe.countDocuments(filter).exec())) {
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
    results.results = await Recipe.find(filter)
      .limit(count)
      .skip(startIndex)
      .exec();
    return res.json(results);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// gets all recipes associated with other users
router.post("/getUserRecipe", verifyAccessToken, async (req, res, next) => {
    const page = parseInt(req.query.page);
    const count = parseInt(req.query.count);
    const search = req.query.search;
    const filter = { User_ID: req.body.userId };
  
    if (search?.length) {
      filter.Title = {
        $regex: new RegExp(search, "i"),
      };
    }
  
    const startIndex = (page - 1) * count;
    const endIndex = page * count;
  
    const results = {};
  
    if (endIndex < (await Recipe.countDocuments(filter).exec())) {
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
      results.results = await Recipe.find(filter)
        .limit(count)
        .skip(startIndex)
        .exec();
      return res.json(results);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  });

// searchs all recipes
router.post("/findAllRecipe", verifyAccessToken, async (req, res, next) => {
  const page = parseInt(req.query.page);
  const count = parseInt(req.query.count);
  const search = req.query.search;
  const filter = {};

  if (search?.length) {
    filter.Title = {
      $regex: new RegExp(search, "i"),
    };
  }

  const startIndex = (page - 1) * count;
  const endIndex = page * count;

  const results = {};

  if (endIndex < (await Recipe.countDocuments(filter).exec())) {
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
    results.results = await Recipe.find(filter)
      .limit(count)
      .skip(startIndex)
      .exec();
    res.json(results);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/getLikedRecipes", verifyAccessToken , async (req, res, next) => {
  const user = await User.findOne({_id: mongoose.Types.ObjectId(req.auth.userId)});
  if(!user){
    return res.status(201).json({
      error: "Invalid User"
    })
  }
  //const page = req.query.page;
  //const count = req.query.count;
  const likes = user.Likes;
  let results = {error: "", results: []}
  // first prune likes in the case of a nonexistent recipe
  for(let i = likes.length - 1; i >= 0; i--){
    const recipe = await Recipe.findOne({_id: mongoose.Types.ObjectId(likes[i])});
    if(!recipe){
      await User.updateOne({_id: mongoose.Types.ObjectId(req.auth.userId)}, { $pull: mongoose.Types.ObjectId(likes[i])})
      likes.splice(i, 1);
    } else {
      results.results.push(recipe);
    }
  }
  return res.status(201).json(results);
})

// likerecipe endpoint
router.post("/likerecipe", verifyAccessToken, async (req, res, next) => {
  const user = await User.findOne({_id: mongoose.Types.ObjectId(req.auth.userId)});
  if(!user){
    return res.status(201).json({
      error: "Invalid User"
    })
  }
  const recipe = await Recipe.findOne({_id: mongoose.Types.ObjectId(req.body.recipeId)});
  if(!recipe){
    return res.status(201).json({
      error: "Recipe DNE"
    })
  }
  //console.log(user.Likes);
  // one more check that the user didnt already like the recipe
  if(user.Likes.includes(mongoose.Types.ObjectId(req.body.recipeId))){
    return res.status(201).json({
      error: "Already Liked"
    })
  }
  // now that both recipe and user exist we can do stuff
  await Recipe.updateOne({_id: mongoose.Types.ObjectId(req.body.recipeId)}, { $inc: { Likes: 1}})
  await User.updateOne({ _id: mongoose.Types.ObjectId(req.auth.userId)}, { $push: {Likes: mongoose.Types.ObjectId(req.body.recipeId)}})

  // finished
  return res.status(201).json({
    error: ""
  })
})

// remove like endpoint
router.post("/unlikeRecipe", verifyAccessToken, async (req, res, next) => {
  const user = await User.findOne({_id: mongoose.Types.ObjectId(req.auth.userId)});
  if(!user){
    return res.status(201).json({
      error: "Invalid User"
    })
  }
  const recipe = await Recipe.findOne({_id: mongoose.Types.ObjectId(req.body.recipeId)});
  if(!recipe){
    return res.status(201).json({
      error: "Recipe DNE"
    })
  }
  // now that both recipe and user exist we can do stuff
  await Recipe.updateOne({_id: mongoose.Types.ObjectId(req.body.recipeId)}, { $inc: { Likes: -1}})
  await User.updateOne({ _id: mongoose.Types.ObjectId(req.auth.userId)}, { $pull: {Likes: mongoose.Types.ObjectId(req.body.recipeId)}})
  return res.status(201).json({
    error: ""
  })
})



module.exports = router;
