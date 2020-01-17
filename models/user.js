const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, 'You must enter a name'],
        minlength: [1, 'Name must be between 1 and 99 characters'],
        maxlength: [99, 'Name must be between 1 and 99 characters']
    },
    password: {
        type: String,
        required: [true, 'you need a password'],
        minlength: [8, 'must be at least 8 charecters'],
        maxlength: [128, 'password must be under 128 characters']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'You must enter a email'],
        minlength: [5, 'email must be at least 5 charecters'],
        maxlength: [99, 'email must be under 99 characters']
    },
    todo: Array
});

userSchema.set(`toObject`, {
    transform: function(doc, ret, options) {
        let returnJson = {
            _id: ret._id,
            email: ret.email,
            name: ret.name,
            todo: ret.todo
        }
        return returnJson
    }
});

userSchema.methods.authenticated = function(password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.pre('save', function(next) {
    if (this.isNew) {
        let hash = bcrypt.hashSync(this.password, 12);
        this.password = hash
    }
    next();
})

module.exports = mongoose.model('User', userSchema)