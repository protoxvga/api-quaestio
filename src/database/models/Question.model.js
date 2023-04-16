const mongoose = require('mongoose');
const Answer = require('./Answer.model');

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
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
    answers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer'
    }],
});

module.exports = mongoose.model('Question', QuestionSchema, 'questions');