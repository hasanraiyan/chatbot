import { app } from "./server.js";
import { env } from "./utils/env.js";
import connectDB from "./config/db.js";
import logger from "./config/logger.js";

const PORT = env.PORT;


// Call the function connectDb

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            logger.info(`App is running as http://localhost:${PORT}`)
        })
    })
    .catch((err) => {
        logger.info(`Failed to connect to the database: ${err}`)
    })



