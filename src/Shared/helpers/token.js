const Jwt = require("jsonwebtoken");
require("dotenv").config();

exports.verifyToken = (token) => {
    return Jwt.verify(token, process.env.secret);
};