const express = require('express');
const router = express.Router();

const authenticateJWT = require("../middlewares/authenticateJWT");

const authControllers = require("../controllers/auth.controllers");

router.route('/check')
.get(authenticateJWT, authControllers.check);

router.route('/login')
.post(authControllers.login);

router.route('/register')
.post(authControllers.register);

module.exports = router;