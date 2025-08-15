import express from "express"

const app = express();

// health routes
app.get("/health", (req, res)=> {
    res.send("ok")
})

export { app }