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
                    const token = jwt.sign(user.toObject(), process.env.JWT_SECRET)
                }
            })
        }
    })
        // return the token
});

router.post('/login', (req, res) => {
    // Find the user in the db
        // if no user, retunr an error
        // if user check auth
            // if authenticated sign a token
            // return the token
});

router.post('/me/from/token', (req, res) => {
    // request must contain a token
        // if no token return an error
        // if no token verify it
            // if any errors during verifictio, return an error
            // if token is valid, use token to look up the user
                // if no user return error
                // if user, return user and token to front
});

module.exports = router;