const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user')

router.post('/signup', (req, res) => {
    // See if the email is already in the db
    User.findOne({email: req.body.email}, (err, user) => {
        if (user) {
            res.json({
                type: 'error',
                message: 'Email already in db'
            })
        } else {
            // if yes, return an error
            // if no, create the user in the db
            let user = new User(req.body);
            user.save((err, user) => {
                if (err) {
                    res.json({
                        type: 'error',
                        message: 'Database error creating user',
                        error: err
                    })
                } else {
                    // sign a token
                    const token = jwt.sign(user.toObject(), process.env.JWT_SECRET, {
                        expiresIn: '7d'
                    });
                    // return the token
                    res.status(200).json({
                        type: 'success',
                        user: user.toObject(),
                        token: 
                    })
                }
            })
        }
    })
});

router.post('/login', (req, res) => {
    // Find the user in the db
    User.findOne({ email: req.body.email }, (err, user) => {
        // if no user, retunr an error
        if (!user) {
            res.json({
                type: 'error',
                message: 'account not found'
            })
        } else {
            // if user check auth
            if (user.authenticated(req.body.password)) {
                // if authenticated sign a token
                const token = jwt.sign(user.toObject(), process.env.JWT_SECRET, {
                    expiresIn: '7d'
                });
                // return the token
                res.status(200).json({
                    type: 'success',
                    user: user.toObject(),
                    token
                })
            } else {
                // auth failed
                res.json({
                    type: 'error',
                    message: 'Authentication failure'
                })
            }
        }
    })
});

router.post('/me/from/token', (req, res) => {
    // request must contain a token
    let token = req.body.token;
    if (!token) {
        // if no token return an error
        res.json({
            type: 'error',
            message: 'you must include a valid token'
        })
    } else {
        // if token verify it
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                // if any errors during verifictio, return an error
                return 
            }
        })
    }
            // if token is valid, use token to look up the user
                // if no user return error
                // if user, return user and token to front
});

module.exports = router;