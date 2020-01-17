const mongoose = require('mongoose')

const googleUserSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: true,
        minlength: [1, 'Name must be between 1 and 99 characters'],
        maxlength: [99, 'Name must be between 1 and 99 characters']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'email must be at least 5 charecters'],
        maxlength: [99, 'email must be under 99 characters']
    },
    googleuser: String,
    todo: Array
})

module.exports = mongoose.model('GoogleUser', googleUserSchema)