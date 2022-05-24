const { preferences } = require('joi');
const jwt = require('jsonwebtoken')
const Users = require('../../models/user');
const { createError } = require('../errors/errorFunc');

exports.generateToken = async (user = {}) => {
    const { _id: id, role } = user;
    console.log(id);
    try {
        const accessToken = await jwt.sign(
            { id, role },
            process.env.ACCESS_TOKEN, { expiresIn: 900}
        );
        const refreshToken = await jwt.sign({ id, role }, process.env.REFRESH_TOKEN, {expiresIn: '24h'});
        await Users.updateOne({ _id: id }, { $set: { refreshToken } });
        return ({ accessToken, refreshToken });
    } catch (error) {
        throw error;
    }
}

exports.generateRefreshToken = async (refreshToken = '') => {
    try {
        if (refreshToken == null) {
            createError("Access denied, Log in!", 401);
        }
        const user = await Users.findOne({ refreshToken });
        if (user == null) {
            createError("Access denied, Invalid credentials!", 403);
        }
        const bearer = await jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN
        );
        if (bearer == null || user._id != bearer.id) {
            createError("Access denied, Invalid identity!", 403);
        }
        const accessToken = await jwt.sign(
            { id: user._id, role: user.role },
            process.env.ACCESS_TOKEN,
            { expiresIn: "15m" }
        );
        return (accessToken);
    } catch (error) {
        throw (error);
    }
}