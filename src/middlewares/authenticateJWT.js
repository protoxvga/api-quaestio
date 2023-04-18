const jwt = require("jsonwebtoken");

// Middleware to check if the user is logged in
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        // Get the token from the header
        const token = authHeader.split(' ')[1];

        // Verify the token
        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            // If the token is invalid, return an error
            if (err)
                return res.status(403).send({ status: "error", message: "Invalid authorization" });

            // If the token is valid, continue the request
            req.user = user;
            next();
        });
    } else {
        // If the user is not logged in, return an error
        return res.status(401).send({ status: "error", message: "No authorization header" });
    }
};

module.exports = authenticateJWT;