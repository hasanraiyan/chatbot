import mongoose from "mongoose";
import { env } from "../utils/env.js";

// Function to connect to the Mongodb Database

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(env.MONGODB_URL);
        console.log(`Connection Established at: ${conn.connection.host}`)
    } catch (err) {
        console.error(`MongoDb connection error: ${err.message}`);
        process.exit(1);
    }
};


export default connectDB;