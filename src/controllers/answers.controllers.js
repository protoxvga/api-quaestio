const Answer = require('../database/models/Answer.model');
const Question = require('../database/models/Question.model');

exports.create = async (req, res) => {
    if (!req.body.content)
        return res.status(400).json({ status: 'error', message: 'Missing content or question id' });

    const question = await Question.findById(req.query.id);

    if (question) {
        const answer = new Answer({
            content: req.body.content,
            author: req.user.id,
            created_at: new Date(),
            vote: 0,
        })
    
        await answer.save();
        question.answers.push(answer._id);
        await question.save();
    
        return res.status(200).json({ status: 'success', message: 'Answer successfully created' });
    } else {
        return res.status(400).json({ status: 'error', message: 'Invalid question id' });
    }
}

// Controller for the register request
exports.list = async (req, res) => {
    try {
        const question = await Question.findById(req.query.id)
        .populate({
            path: 'answers',
            populate: { 
                path: 'author', 
                select: 'firstname lastname fullname email' 
            },
            populate: {
                path: 'votes.user',
                select: 'firstname lastname fullname email'
            }
        })
        .populate('author', 'firstname lastname fullname email');

        if (question) {
            res.status(200).send({ answers: question.answers, status: "success" })
        } else {
            res.status(400).send({ message: "Invalid question id", status: "error" })
        }
    } catch (err) {
        res.status(500).send({ error: err.message, status: "error" })
    }
}

exports.upVoteAnswer = async function(req, res) {
    try {
        const answer = await Answer.findById(req.query.id);

        if (!answer) {
            return res.status(404).send({ message: 'Answer not found' });
        }

        // Call the `upvote` method on the answer to upvote it
        answer.upVote(req.user);

        // Save the updated answer to the database
        await answer.save();

        res.status(200).send({ message: 'Answer up voted successfully' });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};

exports.downVoteAnswer = async function(req, res) {
    try {
        const answer = await Answer.findById(req.query.id);

        if (!answer) {
            return res.status(404).send({ message: 'Answer not found' });
        }

        // Call the `upvote` method on the answer to upvote it
        answer.downVote(req.user);

        // Save the updated answer to the database
        await answer.save();

        res.status(200).send({ message: 'Answer down voted successfully' });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};