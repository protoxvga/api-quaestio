const express = require('express');
const router = express.Router();

const authenticateJWT = require("../middlewares/authenticateJWT");

const answersControllers = require("../controllers/answers.controllers");

router.route('/answers')
.get(authenticateJWT, answersControllers.list)
.post(authenticateJWT, answersControllers.create);

router.route('/up-vote')
.put(authenticateJWT, answersControllers.upVoteAnswer)

router.route('/down-vote')
.put(authenticateJWT, answersControllers.downVoteAnswer)

module.exports = router;