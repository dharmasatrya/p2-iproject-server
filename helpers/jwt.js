const jwt = require("jsonwebtoken")

const key = "rahasia"

function signToken(payload) {
    return jwt.sign(payload, key)
}

function verifyToken(token){
    return jwt.verify(token, key)
}

module.exports = { signToken, verifyToken }