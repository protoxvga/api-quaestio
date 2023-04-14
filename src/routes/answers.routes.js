const express = require('express');
const router = express.Router();

const authenticateJWT = require("../middlewares/authenticateJWT");

const answersControllers = require("../controllers/answers.controllers");

router.route('/answers')
.get(authenticateJWT, answersControllers.list)
.post(authenticateJWT, answersControllers.create);

module.exports = router;