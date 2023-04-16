const Question = require('../database/models/Question.model');

exports.create = async (req, res) => {
    if (!req.body.title || !req.body.content || !req.body.category)
        return res.status(400).json({ status: 'error', message: 'Missing required parameters' });
    
    const question = new Question({
        title: req.body.title,
        content: req.body.title,
        category: req.body.category,
        author: req.user.id,
        created_at: new Date(),
        answers: [],
    })

    await question.save();
    return res.status(200).json({ status: 'success', message: 'Question successfully created' });
}

// Controller for the register request
exports.list = async (req, res) => {
    const allQuestions = await Question.find()
    .populate('author', 'firstname lastname fullname email isExpert');

    res.status(200).send({ questions: allQuestions, status: "success" })
}