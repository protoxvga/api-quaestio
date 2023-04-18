const express = require('express');
const router = express.Router();

const authenticateJWT = require("../middlewares/authenticateJWT");

const questionsControllers = require("../controllers/questions.controllers");

router.route('/questions')
.get(questionsControllers.list)
.post(authenticateJWT, questionsControllers.create);

module.exports = router;