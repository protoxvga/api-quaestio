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

AnswerSchema.methods.upVote = function(user) {
    const existingVote = this.votes.find(vote => String(vote.user) === String(user.id));

    if (!existingVote) {
        this.votes.push({ user: user.id, vote: 1 });
        this.upvotes++;
    } else if (existingVote.vote === -1) {
        const index = this.votes.findIndex(vote => String(vote.user) === String(user.id));
        this.votes.splice(index, 1);
        this.upvotes++;
    } else {
        throw new Error('User has already up voted this answer');
    }
};

AnswerSchema.methods.downVote = function(user) {
    const existingVote = this.votes.find(vote => String(vote.user) === String(user.id));

    if (!existingVote) {
        this.votes.push({ user: user.id, vote: -1 });
        this.upvotes--;
    } else if (existingVote.vote === 1) {
        const index = this.votes.findIndex(vote => String(vote.user) === String(user.id));
        this.votes.splice(index, 1);
        this.upvotes--;
    } else {
        throw new Error('User has already down voted this answer');
    }
};

module.exports = mongoose.model('Answer', AnswerSchema, 'answers');