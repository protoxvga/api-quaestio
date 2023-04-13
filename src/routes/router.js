const express = require("express");

const router = express.Router();

const authRoutes = require("./auth.routes");

router.use("/auth", authRoutes);

router.get('/', function (req, res) {
    res.send(res.json({ message: "Hello world !" }));
});

module.exports = router;