import { app } from "./server.js";
import { env } from "./utils/env.js";
import connectDB from "./config/db.js";

const PORT = env.PORT;


// Call the function connectDb

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`App is running as http://localhost:${PORT}`)
        })
    })
    .catch((err) => {
        console.error(`Failed to connect to the database: ${err}`)
    })



