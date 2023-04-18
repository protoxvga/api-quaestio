const express = require("express");

const router = express.Router();

const authRoutes = require("./auth.routes");

const questionsRoutes = require("./questions.routes");
const answersRoutes = require("./answers.routes");

// Authentication (login, register) routes
router.use("/auth", authRoutes);

// Questions routes
router.use("/", questionsRoutes);

// Answers routes
router.use("/", answersRoutes);

module.exports = router;