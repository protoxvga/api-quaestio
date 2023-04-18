const Answer = require('../database/models/Answer.model');
const Question = require('../database/models/Question.model');

// Controller to create a new answer for a question
exports.create = async (req, res) => {
    // Check if the required parameters are present
    if (!req.body.content)
        return res.status(400).json({ status: 'error', message: 'Missing content or question id' });

    // Find the question in the database
    const question = await Question.findById(req.query.id);

    // If the question exists create a new answer and save it to the database
    if (question) {
        const answer = new Answer({
            content: req.body.content,
            author: req.user.id,
            created_at: new Date(),
            vote: 0,
        })
    
        await answer.save();
        // Add the answer to the question
        question.answers.push(answer._id);
        // Save the question to the database
        await question.save();
    
        return res.status(200).json({ status: 'success', message: 'Answer successfully created' });
    } else {
        return res.status(400).json({ status: 'error', message: 'Invalid question id' });
    }
}

// Controller to list all answers for a question
exports.list = async (req, res) => {
    try {
        // Find the question in the database and populate the author and answers fields
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

        // If the question exists send the answers to the client
        if (question) {
            res.status(200).send({ answers: question.answers, status: "success" })
        } else {
            res.status(400).send({ message: "Invalid question id", status: "error" })
        }
    } catch (err) {
        res.status(500).send({ error: err.message, status: "error" })
    }
}

// Controller to upvote an answer
exports.upVoteAnswer = async function(req, res) {
    try {
        // Find the answer in the database
        const answer = await Answer.findById(req.query.id);

        // If the answer does not exist send a 404 response
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

// Controller to downvote an answer
exports.downVoteAnswer = async function(req, res) {
    try {
        // Find the answer in the database
        const answer = await Answer.findById(req.query.id);

        // If the answer does not exist send a 404 response
        if (!answer) {
            return res.status(404).send({ message: 'Answer not found' });
        }

        // Call the `downVote` method on the answer to upvote it
        answer.downVote(req.user);

        // Save the updated answer to the database
        await answer.save();

        res.status(200).send({ message: 'Answer down voted successfully' });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
};