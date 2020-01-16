const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, 'You must enter a name']
    }
})