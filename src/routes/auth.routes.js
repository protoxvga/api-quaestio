const express = require('express');
const router = express.Router();

const authenticateJWT = require("../middlewares/authenticateJWT");

const authControllers = require("../controllers/auth.controllers");

router.route('/check')
.get(authenticateJWT, authControllers.check);

// Get the login page and handle login requests
router.route('/login')
.post(authControllers.login);

// Get the register page and handle register requests
router.route('/register')
.post(authControllers.register);

module.exports = router;