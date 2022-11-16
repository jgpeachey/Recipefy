const mongoose = require('mongoose');
const { url } = require('../utils/cloudinary');

const userInfo = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    Firstname: {type: String, require: true},
    Lastname: {type: String, require: true},
    Username: {type: String, require: true},
    Pic: {type: String, require: true},
    Email: {type: String, 
        require: true, 
        unique: true, 
        match: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i
    },
    emailToken: {type: String},
    isVerified: {type: Boolean},
    Likes: {type: Array, require: true}, // will store references to liked recipes
    Password: {type: String, require: true}
});

module.exports = mongoose.model('User', userInfo);