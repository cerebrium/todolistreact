const mongoose = require('mongoose')

const googleUserSchema = new mongoose.Schema ({
    name: {
        type: String,
        minlength: [1, 'Name must be between 1 and 99 characters'],
        maxlength: [99, 'Name must be between 1 and 99 characters']
    },
    email: {
        type: String,
        minlength: [5, 'email must be at least 5 charecters'],
        maxlength: [99, 'email must be under 99 characters']
    }
})

module.exports = mongoose.model('GoogleUser', googleUserSchema)