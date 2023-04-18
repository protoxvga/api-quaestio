const isExpert = (req, res, next) => {
    if (req.user.isExpert) {
        next();
    } else {
        return res.status(401).send({ status: "error", message: "Only experts can perform this action" });
    }
};

module.exports = isExpert;