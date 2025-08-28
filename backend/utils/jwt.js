const jwt = require('jsonwebtoken');

function createToken(userObj) {
    const authToken = jwt.sign(userObj, "1234");
    return authToken;
}

function verifyToken(authToken) {
    let decodeAuth = null;
    try {
        decodeAuth = jwt.verify(authToken, "1234");
    } catch (error) {
        decodeAuth = null;
    }
    return decodeAuth;
}

module.exports = { createToken, verifyToken }