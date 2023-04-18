const Question = require('../database/models/Question.model');

// Controller to create a new question
exports.create = async (req, res) => {
    // Check if the required parameters are present
    if (!req.body.title || !req.body.content || !req.body.category)
        return res.status(400).json({ status: 'error', message: 'Missing required parameters' });
    
    // Create a new question object and save it to the database
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

// Controller to list all questions in the database
exports.list = async (req, res) => {
    // Find all questions in the database and populate the author field
    const allQuestions = await Question.find()
    .populate('author', 'firstname lastname fullname email isExpert');

    res.status(200).send({ questions: allQuestions, status: "success" })
}