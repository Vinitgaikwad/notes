const UserInfoSchema = require('../zod/UserSchema')
const UserModel = require('../models/User')

function CheckUserInputMiddleware(req, res, next) {
    try {
        const { username, password } = req.body;

        UserInfoSchema.parse({ username, password });

        req.body = { username, password };

        next();

    } catch (error) {
        res.status(400).json({
            error
        });
        return;
    }
}

async function CheckUserExist(req, res, next) {
    const { username, password } = req.body;

    try {
        const checkIfExist = await UserModel.exists({ username });

        if (checkIfExist) {
            res.status(400).json({
                error: "Id Already Taken"
            });
            return;
        }
        req.body = { username, password }
        next();
    } catch (error) {
        res.status(400).json({
            error
        });
        return;
    }
}

module.exports = { CheckUserInputMiddleware, CheckUserExist }