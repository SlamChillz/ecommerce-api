/* wrong routes to api */

exports.invalidRoutes = async (req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
}

exports.errorHandler = async (err, req, res, next) => {
    res.status(err.status || 500)
        .send({
            error: {
                status: err.status || 500,
                message: err.message || "Server Error..."
            }
        });
    if (!err.status) { next(err) };
}