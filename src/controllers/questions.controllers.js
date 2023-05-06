const Question = require('../database/models/Question.model');

// Controller to create a new question
exports.create = async (req, res) => {
    // Check if the required parameters are present
    if (!req.body.title || !req.body.content || !req.body.category)
        return res.status(400).json({ status: 'error', message: 'Missing required parameters' });
    
    // Create a new question object and save it to the database
    const question = new Question({
        title: req.body.title,
        content: req.body.content,
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
    const { title, content } = req.query;

    // Setup filter object
    let filter = {};

    // If title query parameter is present, add it to the filter
    if (title) {
        filter.title = new RegExp(title, 'i'); // 'i' makes it case insensitive
    }

    // If content query parameter is present, add it to the filter
    if (content) {
        filter.content = new RegExp(content, 'i'); // 'i' makes it case insensitive
    }

    // Find all questions in the database matching the filter and populate the author field
    const questions = await Question.find(filter)
    .populate('author', 'firstname lastname fullname email isExpert');

    res.status(200).send({ questions: questions, status: "success" })
}

// Controller to list a question
exports.get = async (req, res) => {
    // Find all questions in the database and populate the author field
    try {
        const question = await Question.findById(req.params.id)
        .populate({
            path: 'answers',
            populate: { 
                path: 'author', 
                select: 'firstname lastname fullname email' 
            }
        })
        .populate({
            path: 'answers',
            populate: {
                path: 'votes.user',
                select: 'firstname lastname fullname email'
            }
        })
        .populate('author', 'firstname lastname fullname email');

        res.status(200).send({ question: question, status: "success" })
    } catch {
        res.status(400).send({ message: "question not found", status: "error" })
    }
}