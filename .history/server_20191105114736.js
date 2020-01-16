require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const expressJWT = require('express-jwt');

// app
const app = express();

// middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// mongoose stuff
mongoose.connect(`mongodv://localhost/jwt`, {useNewUrlParser: true, useUnifiedTopology: true})


app.listen(3001)