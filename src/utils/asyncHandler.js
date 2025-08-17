/**
 * A higher order function that wraps an async function to catch Errors and pass them 
 * to the Express error-handling middleware
 */

const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        // This will return a promise
        Promise.resolve(requestHandler(req, res, next))
            .catch((err) => next(err));
    };
};

export { asyncHandler }