const Users = require("../models/user");
const validate = require("../helpers/users/validation/validation");
const { default: mongoose } = require("mongoose");
const { createError } = require("../helpers/errorFunc");

class User {
    /**
     * @param {Object} req
     * @param {Object} res
     * @param {Middleware Function} next
     * @returns {JSON} success message and new product object
     */
    static async create(req, res, next) {
        try {
            let payload = await validate.validateCreatePayload(req.body);
            await validate.exist(payload.email);
            const newUser = new Users({ ...payload });
            let user = await newUser.save();
            if (user) {
                return res.status(201).send({ message: "User successfully created", user });
            }
        } catch (error) {
            next(error);
        }
    }

    /**
     * @param {Object} req
     * @param {Object} res
     * @param {Middleware Function} next
     * @returns {Array} returns an array of products of calls the error handler
     */
    static async all(req, res, next) {
        try {
            let users = await Users.find({});
            users.length > 0 ? res.status(200).send(users) : res.status(200).send({message: "Application has no user"});
        } catch (error) {
            next(error);
        }
    }

    /**
     * @param {Object} req
     * @param {Object} res
     * @param {Middleware Function} next
     * @returns {Object} JSON of a single product details
     */
    static async one(req, res, next) {
        try {
            let user = await validate.checkId(req.params.id);
            if (user) { return res.status(200).send(user) }
        } catch (error) {
            next(error);
        }
    }

    /**
     * @param {Object} req
     * @param {Object} res
     * @param {Middleware Function} next
     * @returns {JSON} success message
     */
    static async delete(req, res, next) {
        try {
            let user = await validate.checkId(req.params.id);
            if (user) {
                let del = await Users.deleteOne(user);
                if (del.deletedCount == 1) { return res.status(200).send({ messages: `User deleted successfully` }) }
                return res.status(200).send({ messages: 'User not deleted!' });
            }
        } catch (error) {
            next(error);
        }
    }

    /**
     * @param {Object} req
     * @param {Object} res
     * @param {Middleware Function} next
     * @returns {JSON} updated product
     */
    static async update(req, res, next) {
        const { firstName, lastName } = req.body;
        try {
            const user = await validate.checkId(req.params.id);
            const payload = await validate.validateUpdatePayload(req.body);
            if (JSON.stringify(payload) === "{}") { createError("Empty update request", 400) };
            let update = await Users.updateOne({ _id: user._id }, {
                $set: { firstName, lastName },
            });
            if (update.modifiedCount === 1) {
                return res.status(200).send({ message: 'Update was successful' });
            }
            return res.status(200).send({ message: "Updated failed" });
        } catch (error) {
            next(error);
        }
    }

    static async changePassword(req, res, next) {
        try {
            const user = await validate.checkId(req.params.id);
            const { oldPassword, newPassword } = req.body;
            const payload = await validate.validateUpdatePayload({
                oldPassword,
                newPassword,
            });
            if (JSON.stringify(payload) === "{}") {
                createError("Empty update request", 400);
            }
            await user.changePassword({ oldPassword, newPassword });
            res.status(201).send({ message: "Password sucessfully changed" });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = User;