const express = require('express');
const router = express.Router();

const authenticateJWT = require("../middlewares/authenticateJWT");

const authControllers = require("../controllers/auth.controllers");

// Check if user is logged in
router.route('/check')
.get(authenticateJWT, authControllers.check);

// Login route
router.route('/login')
.post(authControllers.login);

// Register route
router.route('/register')
.post(authControllers.register);

module.exports = router;