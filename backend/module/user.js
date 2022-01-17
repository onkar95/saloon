const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter a name']
    },
    State: {
        type: String,
        required: [true, 'Please enter your state'],
    },
    City: {
        type: String,
        required: [true, 'Please enter a city'],
    },
    email: {
        type: String,
        required: [true, 'Please enter a email'],
        unique: true,
        lowercase: true,
        validate: [isEmail, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Please enter password'],
        minlength: [6, 'The password should be at least 6 characters long']
    },
    Confirmpassword: {
        type: String,
        required: [true, 'Please enter password'],
        minlength: [6, 'The password should be at least 6 characters long']
    },
    phoneNo: {
        type: Number,
        required: [true, 'Please enter your phone no'],
    },
    Pincode: {
        type: Number,
        required: [true, 'Please enter your phone no'],
    },
    Role: {
        type: String,
        default: "user",
        enum: ["shopkeeper", "user"]
    },
}, { timestamp: true })

module.exports = mongoose.model('user', userSchema)