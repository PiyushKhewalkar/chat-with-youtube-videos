import { Router } from "express";

import { getSession, getSessions, askQuestion, launchSession, deleteSession } from "../controllers/session.controllers.js";

const sessionRouter = Router()

sessionRouter.get("/", getSessions)

sessionRouter.get("/:id", getSession)

sessionRouter.post("/new", launchSession)

sessionRouter.post("/:id", askQuestion)

sessionRouter.delete("/", deleteSession)

export default sessionRouter