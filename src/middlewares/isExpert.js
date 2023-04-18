// This middleware is used to check if the user is an expert or not
const isExpert = (req, res, next) => {
    // If the user is an expert, continue the request
    if (req.user.isExpert) {
        next();
    } else {
        // If the user is not an expert, return an error
        return res.status(401).send({ status: "error", message: "Only experts can perform this action" });
    }
};

module.exports = isExpert;