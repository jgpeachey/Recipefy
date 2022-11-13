const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Recipe = require("../models/recipe");
const { verifyAccessToken } = require('../middleware/tokens');
const { json } = require('body-parser');

router.use(express.json({ limit: '50mb' }));
router.use(express.urlencoded({ limit: '50mb', extended: true }));

router.post('/addrecipe', verifyAccessToken, async (req, res, next) => {
    const recipeInfo = new Recipe({
        _id: new mongoose.Types.ObjectId(),
        User_ID: req.auth.userId,
        Title: req.body.Title,
        Ingredients: req.body.Ingredients,
        Instructions: req.body.Instructions,
        Description: req.body.Description,
        Calories: req.body.Calories,
        Sodium: req.body.Sodium,
        Likes: 0
    });

    const result = await recipeInfo.save();

    console.log(result);
    return res.status(201).json({
        message: 'recipe created'
    });
})

// Update recipe API
router.put('/updaterecipe', verifyAccessToken, async(req, res, next) => {
    const recipe = Recipe.findOne({Title: req.body.Title, User_ID: req.auth.userId});
    if(!recipe){
        return res.status(409).json({
            error: "Invalid recipe",
          });
    }

    try{
        const result = await Recipe.updateOne({Title: req.body.Title, User_ID: req.auth.userId}, {$set: req.body.Info});
        if(result.matchedCount > 0){
            return res.status(200).end();
        } else {
            return res.status(409).json({
                error: "Invalid recipe",
              });
        }

    } catch(e) {
        return res.send({
          error: `${e.message}`,
        });
    }

});


router.delete('/removerecipe', verifyAccessToken, async(req, res, next) => {

    await Recipe.deleteOne({ _id: req.body._id, User_ID: req.auth.userId});
    return res.status(200).end();

})

// searchs for recipe for a specific user
router.get('/findRecipe', verifyAccessToken, async (req, res, next) => {
    const page = parseInt(req.query.page);
    const count = parseInt(req.query.count);
    const search = req.query.search;
    const filter = {User_ID: req.auth.userId};

    if(search?.length) {
        filter.Title = {
            $regex : new RegExp(search, "i")
        }
    }

    const startIndex = (page - 1) * count;
    const endIndex = page * count;

    const results = {};

    if (endIndex < await Recipe.countDocuments(filter).exec()) {
        results.next = {
            page: page + 1,
            count: count
        }
    }

    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            count: count
        }
    }

    try {
        results.results = await Recipe.find(filter).limit(count).skip(startIndex).exec();
        res.json(results);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// searchs all recipes
router.get('/findAllRecipe', verifyAccessToken, async (req, res, next) => {
    const page = parseInt(req.query.page);
    const count = parseInt(req.query.count);
    const search = req.query.search;
    const filter = {};

    if(search?.length) {
        filter.Title = {
            $regex : new RegExp(search, "i")
        }
    }

    const startIndex = (page - 1) * count;
    const endIndex = page * count;

    const results = {};

    if (endIndex < await Recipe.countDocuments(filter).exec()) {
        results.next = {
            page: page + 1,
            count: count
        }
    }

    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            count: count
        }
    }

    try {
        results.results = await Recipe.find(filter).limit(count).skip(startIndex).exec();
        res.json(results);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

module.exports = router; 