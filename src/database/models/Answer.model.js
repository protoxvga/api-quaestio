const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Vote = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userData'
    },
    vote: {
        type: Number,
        required: true,
        default: 0
    }
});

const AnswerSchema = new Schema({
    content: {
        type: String,
        required: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userData'
    },
    upvotes: {
        type: Number,
        required: true,
        default: 0
    },
    votes: [Vote],
    created_at: {
        type: Date,
        required: true,
        default: Date.now
    }
});

// Upvote answer
AnswerSchema.methods.upVote = function(user) {
    // Check if the user has already voted
    const existingVote = this.votes.find(vote => String(vote.user) === String(user.id));

    // If the user has not voted, add a new vote
    if (!existingVote) {
        this.votes.push({ user: user.id, vote: 1 });
        this.upvotes++;
    // If the user has already voted down, remove the vote and add an upvote
    } else if (existingVote.vote === -1) {
        const index = this.votes.findIndex(vote => String(vote.user) === String(user.id));
        this.votes.splice(index, 1);
        this.upvotes++;
    } else {
        throw new Error('User has already up voted this answer');
    }
};

AnswerSchema.methods.downVote = function(user) {
    // Check if the user has already voted
    const existingVote = this.votes.find(vote => String(vote.user) === String(user.id));

    // If the user has not voted, add a new vote
    if (!existingVote) {
        this.votes.push({ user: user.id, vote: -1 });
        this.upvotes--;
    // If the user has already voted up, remove the vote and add a downvote
    } else if (existingVote.vote === 1) {
        const index = this.votes.findIndex(vote => String(vote.user) === String(user.id));
        this.votes.splice(index, 1);
        this.upvotes--;
    } else {
        throw new Error('User has already down voted this answer');
    }
};

module.exports = mongoose.model('Answer', AnswerSchema, 'answers');