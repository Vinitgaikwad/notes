const { Router } = require("express");
const UserModel = require('../models/User');
const { CheckUserInputMiddleware, CheckUserExist } = require('../middlewares/UserMiddleware');
const { createToken } = require("../utils/jwt");

const UserRouter = Router();

// sign-up
UserRouter.post('/sign-up', CheckUserInputMiddleware, CheckUserExist, async (req, res) => {
    const { username, password } = req.body;

    try {
        const newUser = new UserModel({ username, password });

        const acknowledgementUser = await newUser.save();

        if (process.env.NODE_ENV === 'test') {
            console.log(acknowledgementUser);
        }

        res.status(200).json({
            auth: createToken({ username })
        });

    } catch (error) {
        res.status(500).json({
            error
        });
    }
});


// sign-in
UserRouter.get('/sign-in', CheckUserInputMiddleware, async (req, res) => {
    const { username, password } = req.body;

    try {
        const ifValidUser = await UserModel.findOne({ username, password });

        if (ifValidUser) {
            res.status(200).json({
                auth: createToken({ username }),
                error: null
            });
            return;
        }

        res.status(404).json({
            error: "Invalid Credentials"
        });

    } catch (error) {
        res.status(500).json({
            error
        });
    }
});

module.exports = UserRouter;