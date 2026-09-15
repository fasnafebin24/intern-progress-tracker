const jwt = require("jsonwebtoken");

function getAuthToken() {
    return jwt.sign(
        {
            userId: "test-user-id",
            username: "fasna"
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h"
        }
    );
}

module.exports = {
    getAuthToken
};