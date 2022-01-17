const jwt = require("jsonwebtoken");

// Authenticate user middleware
exports.requireLogin = (req, res, next) => {
    try {
        console.log(req.headers.authorization);
        if (req.headers.authorization) {
            // Get token from header
            const token = req.headers.authorization.split(" ")[1];
            // const token = req.headers["authorization"];
            // Verify token
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            // Attach token with request
            req.user = decode;
            
            next();
        } else {
            return res.status(400).json({ message: "Unauthorized" });
        }
    } catch (err) {
        console.log("Something went wrong");
    }
};

