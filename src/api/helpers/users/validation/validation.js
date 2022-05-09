const User = require('../../../models/user')
const { UserCreateSchema, UserUpdateSchema } = require('./schema')
const {createError} = require('../../errorFunc');
const { create } = require('../../../models/user');

/**
* @param {String} email 
*/
exports.exist = async (email) => {
    const user = await User.findOne({ email: email });
    if (user) {
        createError("User already exist", 400);
    }
}

/**
* @param {String} id
*/
exports.checkId = async (id) => {
    let user = await User.findById(id);
    if (!user) {
        createError(`User with ${id} does not exit`, 404);
    }
    return user;
}

/**
 * @param {Object} body 
 * @returns {Object}
 */
exports.validateCreatePayload = async (body = {}) => {
    const { error, value } = UserCreateSchema.validate({ ...body });
    if (error) {
        createError(error.details[0].message, 400);
    }
    return value;
}

/**
 * @param {Object} body 
 * @returns {Object}
 */
exports.validateUpdatePayload = async (body = {}) => {
    if (body.email) {
        createError("Email can not be updated!", 400);
    }
    const { error, value } = UserUpdateSchema.validate(body);
    if (error) {
        createError(error.details[0].message, 400)
    }
    return value;
};