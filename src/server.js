import express from "express"
import ApiResponse from "./utils/ApiResponse.js";
import ApiError from "./utils/ApiError.js";
import { asyncHandler } from "./utils/asyncHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";
const app = express();

// health routes
app.get("/health", asyncHandler((req, res) => {
    const response = new ApiResponse(200, { user: "Alex" }, "Fetched successfully")
    res.status(response.statusCode).json(response.toJSON())
}))

// lets make  a route to check api error

app.get("/error", asyncHandler((req, res) => {
    throw new ApiError(400, "Bad request")
}))

app.use(errorHandler);

export { app }