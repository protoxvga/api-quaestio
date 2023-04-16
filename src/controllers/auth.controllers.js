const User = require('../database/models/User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Controller for the login request
exports.login = (req, res) => {
    if (!req.body.email || !req.body.password)
        return res.status(400).json({ status: 'error', message: 'Missing required parameters' });

    // Check if the user exists in the database and if the password is correct
    User.findOne({ email: req.body.email }).then(async (user) => {
        // If the user exists
        if (user) {
            // Compare the password with the hashed password
            let match = await bcrypt.compare(req.body.password, user.password);

            if (match) {
                const accessToken = jwt.sign({ id: user._id,  isExpert: user.isExpert }, process.env.TOKEN_SECRET);

                return res.status(200).send({ status: "success", message: "User successfully logged in", token: accessToken });
            } else {
                // If the password is incorrect return an error
                return res.status(401).send({ status: "error", message: "Bad credentials" });
            }
        } else {
            return res.status(401).send({ status: "error", message: "Bad credentials" });
        }
    })
}

// Controller for the register request
exports.register = (req, res) => {
    if (!req.body.firstname || !req.body.lastname || !req.body.email || !req.body.password || typeof req.body.isExpert !== "boolean") {
        return res.status(400).json({ status: 'error', message: 'Missing or invalid required parameters' });
    }

    // Check if the user exists in the database
    User.findOne({ email: req.body.email }).then(async (user) => {
        // If the user exists return an error
        if (user) {
            return res.status(409).send({ status: 'error', message: 'email already in use' });
        } else {
            // If the user doesn't exist, create a new user and save it to the database
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const newUser = new User({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: hashedPassword,
                isExpert: req.body.isExpert,
            })
            await newUser.save();

            // Redirect to the home page
            return res.status(200).send({ status: 'success', message: 'User successfully created' });
        }
    })
}

exports.check = (req, res) => {
    res.send({ message: "Victoire !" })
}