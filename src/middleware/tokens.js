require('dotenv').config();
const jwt = require('jsonwebtoken');

const createAccessToken = userId => {
    return jwt.sign({ userId }, process.env.JWT_TOKEN_SECRET, {
        expiresIn: '6h',
    })
};

function verifyAccessToken(req, res, next) {
    const token = req.headers['authorization'];
    if(!token?.length) return res.status(401).end();

    jwt.verify(token, process.env.JWT_TOKEN_SECRET, (err, auth) => {
        if(err) return res.status(403).end();
        req.auth = auth;
        return next();
    })
}

module.exports = {
    createAccessToken,
    verifyAccessToken
}