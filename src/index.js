import { app } from "./server.js";
import { env } from "./utils/env.js";

const PORT = env.PORT;

app.listen(PORT, ()=>{
    console.log(`App is running as http://localhost:${PORT}`)
})