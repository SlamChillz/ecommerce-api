const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const Userschema = new Schema(
    {
        firstName: {
            type: String,
            set: (v) => v.slice(0, 1).toUpperCase() + v.slice(1).toLowerCase(),
            trim: true,
        },
        lastName: {
            type: String,
            set: (v) => v.slice(0, 1).toUpperCase() + v.slice(1).toLowerCase(),
            trim: true,
        },
        email: {
            type: String,
            set: (v) => v.toLowerCase(),
            immuutable: true,
            trim: true,
        },
        password: {
            type: String,
            trim: true,
        },
        role: {
            type: String,
            trim: true,
            default: 'regular',
        },
        refreshToken: {
            type: String,
            trim: true,
        }
    },
    { timestamps: true }
);

Userschema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(11);
        const hashPassword = await bcrypt.hash(this.password, salt);
        this.password = hashPassword;
        next();
    } catch (error) {
        next(error);
    }
});

Userschema.methods.validatePassword = async function (password) {
    let check = await bcrypt.compare(password, this.password);
    if (!check) {
        const { createError } = await require('../helpers/errors/errorFunc');
        createError("Invalid credentials", 400);
    }
}

/**
 * @param {Object} :{ oldpassword, newpassword }
 */
Userschema.methods.changePassword = async function ({ oldPassword, newPassword }) {
    let same = await bcrypt.compare(oldPassword, this.password);
    if (same) {
        const salt = await bcrypt.genSalt(11);
        const hashPassword = await bcrypt.hash(newPassword, salt);
        this.password = hashPassword;
    } else {
        const { createError } = await require('../helpers/errors/errorFunc');
        createError("Old password is not correct!", 422);
    }
}

const Users = mongoose.model('Users', Userschema);
module.exports = Users;