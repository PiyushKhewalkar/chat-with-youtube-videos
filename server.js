import express from "express"

import sessionRouter from "./routes/session.routes.js"
import connectToDatabase from "./database/mongodb.js";

import cors from "cors"

// environment variables
import { PORT } from './config/env.js';

const app = express()

app.use(cors())

app.use(express.json())

app.use("/api/v1/session",sessionRouter)

app.use("/", (req, res) => {
    res.json({message : "Home"})
})

app.listen(PORT, async() => {
    console.log(`Your app is listening at http://localhost:${PORT}`)
    await connectToDatabase()
})