const { createError } = require('../../helpers/errors/errorFunc');
const jwt = require('jsonwebtoken');

/* Authorization middleware */
exports.authorize = async (req, res, next) => {
    const authToken = req.headers["authorization"];
    const accessToken = authToken && authToken.split(' ')[1];
    try {
        if (accessToken == null) {
            createError("Not authenticated!", 401);
        } 
        const token = await jwt.verify(accessToken, process.env.ACCESS_TOKEN);
        if (!token) {
            createError("User not authorised!", 403);
        }
        req.user = token;
        next();
    } catch (error) {
        next(error);
    }
}
