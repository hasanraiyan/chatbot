import express from "express"
import ApiResponse from "./utils/ApiResponse.js";
import ApiError from "./utils/ApiError.js";

const app = express();

// health routes
app.get("/health", (req, res) => {
    const response = new ApiResponse(200, { user: "Alex" }, "Fetched successfully")

    res.status(response.statusCode).json(response.toJSON())
})

// lets make  a route to check api error

app.get("/error", (req, res) => {
throw new ApiError(400, "Bad request")
})

export { app }