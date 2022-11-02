require('dotenv').config();
const jwt = require('jsonwebtoken');


const createAccessToken = userID => {
    return jwt.sign({ userID }, process.env.JWT_TOKEN_SECRET, {
        expiresIn: '1h',
    })
};

const createRefreshToken = userID => {
    return jwt.sign({ userID }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d',
    })
};

const sendAccessToken = (req, res, accessToken) => {
    res.send({
        accessToken,
        email: req.body.Email,
    })
};

const sendRefreshToken = (res, refreshToken) => {
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        path: '/refresh_token',
    });
}


module.exports = {
    createAccessToken,
    createRefreshToken,
    sendAccessToken,
    sendRefreshToken
}