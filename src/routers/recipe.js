const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Recipe = require("../models/recipe");

router.use(express.json({ limit: '50mb' }));
router.use(express.urlencoded({ limit: '50mb', extended: true }));

router.post('/newRecipe', async(req, res, next) => {
    const recipeInfo = new Recipe({
        _id: new mongoose.Types.ObjectId(),
        //User_ID: ,
        Title: req.body.Title,
        Ingredients: req.body.Ingredients,
        Instructions: req.body.Instructions,
        Nutritional_Value: {
            Calories: req.body.Calories,
            Sodium: req.body.Sodium
        },
        Likes: 0
    });

    const result = await recipeInfo.save();

    console.log(result);
    res.status(201).json({
        message: 'recipe created'
    });
})

module.exports = router; 