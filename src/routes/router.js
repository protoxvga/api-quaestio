const express = require("express");

const router = express.Router();

const authRoutes = require("./auth.routes");

const questionsRoutes = require("./questions.routes");
const answersRoutes = require("./answers.routes");

router.use("/auth", authRoutes);

router.use("/", questionsRoutes);
router.use("/", answersRoutes);

module.exports = router;