import ApiError from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({
            statusCode: err.statusCode,
            message: err.message,
            success: false,
            errors: err.errors,
        });
    }

    console.error(err);


    // Send generic 500 internal server Error response to the client
    return res.status(500).json({
        statusCode: 500,
        message: 'Internal Server Error',
        success: false,
        errors: []
    })
}

export { errorHandler };