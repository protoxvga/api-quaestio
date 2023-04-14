const express = require("express");

const router = express.Router();

const authRoutes = require("./auth.routes");
const questionsRoutes = require("./questions.routes");

router.use("/auth", authRoutes);
router.use("/", questionsRoutes);

module.exports = router;