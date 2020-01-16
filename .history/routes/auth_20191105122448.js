const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user')

router.post('/signup', (req, res) => {
    res.send('hit the signup route')
});

router.post('/login', (req, res) => {
    res.send('hit the login route')
});

router.post('/me/from/token', (req, res) => {
    res.send('hit the verification route')
});

module.exports = router;