const mongoose = require('mongoose');

const Answer = require('./Answer.models')

const Schema = mongoose.Schema;

// Question Schema
const Question = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userData'
    },
    category: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        required: true,
    },
    answers: [Answer.schema],
});

module.exports = mongoose.model('questions', Question, 'questions');