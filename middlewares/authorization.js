const { Item, User } = require("../models/index")
const { verifyToken } = require("../helpers/jwt")


const authentication = (req, res, next) => {
    try {
        const { access_token } = req.headers;
        const payload = verifyToken(access_token);

        req.user = {
            id: payload.id,
            email: payload.email,
            role: payload.role,
            avatar: payload.avatar,
            steamURL: payload.steamURL
        };

        next();
    } catch (error) {
        throw{ name: "Unauthorized", code: 401}
    }
};

module.exports = {authentication}