const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user')

router.post('/signup', (req, res) => {
    // See if the email is already in the db
        // if yes, return an error
        // if no, create the user in the db
        // sign a token
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
});

module.exports = router;