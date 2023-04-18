const express = require('express');
const router = express.Router();

const authenticateJWT = require("../middlewares/authenticateJWT");
const isExpert = require("../middlewares/isExpert");

const answersControllers = require("../controllers/answers.controllers");

// Get all answers for a question or create a new answer
router.route('/answers')
.get(answersControllers.list)
.post(authenticateJWT, isExpert, answersControllers.create);

// Upvote an answer 
router.route('/up-vote')
.put(authenticateJWT, answersControllers.upVoteAnswer)

// Downvote an answer
router.route('/down-vote')
.put(authenticateJWT, answersControllers.downVoteAnswer)

module.exports = router;