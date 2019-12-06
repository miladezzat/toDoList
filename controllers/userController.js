const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const mongoose = require('mongoose')
const secretKey = 'tokenSecretKey';

var responseUserData = async(user) => {
    let userDataForToken = {
        userId: user._id
    }
    let token = jwt.sign(userDataForToken, secretKey);
    let userDataSent = {
        token: token,
        avatar: user.avatar,
        _id: user._id,
        fullName: user.fullName,
        userName: user.userName,
    }
    return userDataSent;
}

let user_signup = async(req, res) => {
    try {
        let userData = req.body;

        let newUser = new User({
            _id: new mongoose.Types.ObjectId,
            fullName: userData.fullName,
            userName: userData.userName,
            password: userData.password
        });

        let existUser = await User.findOne({
            $and: [
                { userName: userData.userName },
                { isDeleted: false }
            ]
        })
        if (existUser) {
            return res.status(401).json({
                message: "Username already Exist, please choice another one"
            });
        }

        let userSaved = await newUser.save();

        let registeredUser = await responseUserData(userSaved)

        res.status(200).json({
            registeredUser
        });

    } catch (error) {
        res.status(400).json({
            error: error.errors
        });
    }
}

let user_login = async(req, res) => {
    if (req.body.userName === null || req.body.userName === undefined &&
        req.body.password === null || req.body.password === undefined) {
        return res.status(401).json({
            message: "Please file username and password"
        });
    }
    let userData = req.body;


    let user = await User.findOne({
        $and: [
            { userName: userData.userName },
            { isDeleted: false }
        ]
    })
    if (!user) {
        return res.status(401).json({
            message: "Invaild UserName"
        });
    }
    if (user.password !== userData.password) {
        return res.status(401).json({
            message: "Invalid Password"
        });
    } else {
        let loggedUser = await responseUserData(user)
        res.status(200).json({
            loggedUser
        });
    }
}

module.exports = {
    user_signup,
    user_login
}