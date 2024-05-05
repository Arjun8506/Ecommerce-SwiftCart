import { Router } from "express";
import { googleAuth, loginUser, logoutUser, registerUser } from "../controllers/auth.controllers.js";

const router = Router()

router.post("/register", registerUser)

router.post("/login", loginUser)

router.post("/google", googleAuth)

router.post("/logout", logoutUser)

export default router