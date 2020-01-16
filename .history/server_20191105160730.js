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
mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.once('open', () => {
    console.log(`connected to mongodb on ${db.host}:${db.port}... `)
});
db.on('error', (err) => {
    console.log(`Database Error: \n${err}`)
})

// mounting
app.use('/auth', require('./routes/auth'));
app.use('/locked',
        expressJWT({ secret: process.env.JWT_SECRET }).unless({ method: 'POST' }), 
        require('./routes/locked'));

app.listen(process.env.PORT, () => {
    console.log(`listening on port: ${process.env.PORT}`)
});