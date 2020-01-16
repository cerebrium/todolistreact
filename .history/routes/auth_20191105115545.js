const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/signup', (req, res) => {
    res.send('hit the signup route')
})