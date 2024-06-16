const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, 'username is required!'],
    },
    email: {
        type: String,
        required: [true, 'email is required!'],
        unique: [true, 'email already exists!'],
    },
    password: {
        type: String,
        required: [true, 'password field required!']
    }
})

module.exports = mongoose.model("Users", userSchema)