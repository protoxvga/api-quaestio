const Answer = require('../database/models/Answer.models');
const Question = require('../database/models/Question.models');

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
    
        question.answers.push(answer);
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