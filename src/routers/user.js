const mongoose = require('mongoose');
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require("../models/user");
const crypto = require("crypto");
const sgMail = require('@sendgrid/mail');

const API_KEY = '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';
sgMail.setApiKey(API_KEY);

router.get('/landing', (req, res) => {
    res.render("Landing")
});

// register api
router.post('/register', async function (req, res) {
    const user = await User.findOne({ Email: req.body.Email }).exec();
    if(user) {
        return res.status(409).json({
            message: "email exists"
        });
    }

    const hash = await bcrypt.hash(req.body.Password, 10);

    const userInfo = new User({
        _id: new mongoose.Types.ObjectId(),
        Username: req.body.Username,
        Email: req.body.Email,
        emailToken:crypto.randomBytes(64).toString('hex'),
        isVerified: false,
        Password: hash
    });

    const result = await userInfo.save();

    console.log(result);
    res.status(201).json({
        message: 'User create'
    });
    
    const msg = {
        from: 'omarashry125@gmail.com',
        to: req.body.Email,
        subject: 'Recipefy - Verify your Email',
        text: `
            Hey! Thank you for registering!
            Copy and paste the address below to verify your account.
            http://${req.headers.host}/verifyEmail?token-${user.emailToken}
        `,
        html: `
            <h1>Hello</h1>
            <p>Thank you for Registering!<p>
            <p>Please click the link below to verify your account<p>
            <a href= "http://${req.headers.host}/verifyEmail?token-${user.emailToken}">Verify your Account</a>
        `
    };

    await sgMail.send(msg);

    console.log("email sent");

});


router.get('/verifyEmail', async(req, res, next) => {
    try{
        const user = await User.findOne({emailToken: req.query.token});
        if(!user){
            req.flash('error', 'token is invalid. please contact us for assistance');
            return res.redirect('/');
        }
        user.emailToken = null;
        user.isVerified = true;
        await user.save();
    } catch(error){
        console.log(error);
        req.flash('error', 'token is invalid. please contact us for assistance');
        res.redirect('/');
    }
});


// login api
router.post('/login',async (req, res, next) =>{
    const user = await User.findOne({Email: req.body.Email}).exec()
    if(!user) {
        return res.status(409).json({
            message: "Auth failed"
        });
    }

    try {
        const passAuth = await bcrypt.compare(req.body.Password, user.Password)
    
        if (passAuth) {
            return res.status(200).json({
                message: "Auth successful"
            });
        }
    } catch(e) {
        console.log("Error", error);
    }

    return res.status(401).json({
        message: "Auth failed"
    });
});



module.exports = router;