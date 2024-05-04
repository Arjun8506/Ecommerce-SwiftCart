import { Router } from "express";
import { sendMessage } from "../controllers/contact.controllers.js";

const router = Router()

router.post("/sendmessage", sendMessage)

export default router