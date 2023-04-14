const mongoose = require('mongoose');

// Create Model for Comment
const Schema = mongoose.Schema;

const Answer = new Schema({
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userData'
    },
    vote: {
        type: Number,
        default: 0,
        required: true,
    },
    created_at: {
        type: Date,
        required: true,
    }
});

module.exports = mongoose.model('answers', Answer, 'answers');