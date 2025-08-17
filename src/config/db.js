import mongoose from "mongoose";
import { env } from "../utils/env.js";
import logger from "./logger.js";
// import logger from "./logger.js";
// Function to connect to the Mongodb Database

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(env.MONGODB_URL);
        logger.info(`Connection Established at: ${conn.connection.host}`)
    } catch (err) {
        logger.error(`MongoDb connection error: ${err.message}`);
        process.exit(1);
    }
};


export default connectDB;