const jwt = require("jsonwebtoken");

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if (err)
                return res.status(403).send({ status: "error", message: "Invalid authorization" });

            req.user = user;
            next();
        });
    } else {
        return res.status(401).send({ status: "error", message: "No authorization header" });
    }
};

module.exports = authenticateJWT;