const jwt = require('jsonwebtoken');
const secrets = require('./../configs/secrets');
const User = require('./../models/Users');
const { createResponse } = require('./Controllers.Helpers');

function Authenticate(req, res, next) {
    User.findOne({
        email: req.body.email
    }).then(user => {
        user.verifyPassword(req.body.password).then(valid => {
            if (valid) {
                req.user = user;
                next();
            } else {
                console.log('invalid credential')
                next(new Error('Invalid credentials'))
            }
        }).catch(err => {
            console.log(err);
            next(err);
        })
    }).catch(err => {
        console.log(err);
        next(err);
    })
}

function GenerateToken(req, res, next) {
    if (!req.user) return next();

    req.token = jwt.sign({
        id: req.user._id
    }, secrets.jwtSecret);
    next();
}

function SendTokenAndUserDoc(req, res) {
    if (req.user) {
        let responseSendTokenAndUserDoc = createResponse(
            false,
            201,
            "User create successfully", {
                user: req.user,
                jwt: req.token
            }
        )
        res.json(responseSendTokenAndUserDoc);
    } else {
        let responseSendTokenAndUserDoc = createResponse(true, 500, "Error to created the user", err.errors)
        res.json(responseSendTokenAndUserDoc);
    }
}

module.exports = {
    SendTokenAndUserDoc,
    GenerateToken,
    Authenticate
}