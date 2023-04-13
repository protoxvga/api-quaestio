const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// User Schema
const User = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    isExpert: {
        type: Boolean,
        required: true,
    }
});

module.exports = mongoose.model('userData', User, 'userData');