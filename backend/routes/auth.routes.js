import { Router } from "express";
import { registerUser } from "../controllers/auth.controllers.js";

const router = Router()

router.get("/register", registerUser)

export default router