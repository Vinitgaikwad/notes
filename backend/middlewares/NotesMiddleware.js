const { verifyToken } = require("../utils/jwt");

function CheckAuth(req, res, next) {
    const { authorization } = req.headers;
    const decoded = verifyToken(authorization);

    if (decoded) {
        req.userId = decoded;
        console.log(decoded);
        next();
        return;
    }

    res.status(200).json({
        error: "Auth Not match!"
    });
}

module.exports = { CheckAuth }