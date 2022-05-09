/* Conventional error construct */
exports.createError = function (msg, code) {
    const error = new Error(msg);
    error.status = code;
    throw (error);
}