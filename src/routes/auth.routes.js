const express = require('express');
const router = express.Router();

const authControllers = require("../controllers/auth.controller");

// Get the login page and handle login requests
router.route('/login')
.post(authControllers.login);

// Get the register page and handle register requests
router.route('/register')
.post(authControllers.register);

module.exports = router;