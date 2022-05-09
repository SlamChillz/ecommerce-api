const Joi = require("joi");

exports.UserCreateSchema = Joi.object({
    firstName: Joi.string().min(3).max(30).required(),
    lastName: Joi.string().min(3).required(),
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(8).required(),
});

exports.UserUpdateSchema = Joi.object({
    firstName: Joi.string().min(3).max(30),
    lastName: Joi.string().min(3),
    oldPassword: Joi.string().min(8),
    newPassword: Joi.string().min(8)
});
