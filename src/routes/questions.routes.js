const express = require('express');
const router = express.Router();

const authenticateJWT = require("../middlewares/authenticateJWT");

const questionsControllers = require("../controllers/questions.controllers");

// Get all questions or create a new question
router.route('/questions')
.get(questionsControllers.list)
.post(authenticateJWT, questionsControllers.create);

router.route('/questions/:id')
.get(questionsControllers.get)

module.exports = router;