const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization; // Corrected spelling
    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("User not authorized!");
            }
            req.user = decoded.user;
            next();
        });
    } else {
        res.status(401);
        throw new Error("User not authorized or token expired!");
    }
});

module.exports = validateToken;
