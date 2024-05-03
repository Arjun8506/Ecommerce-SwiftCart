import { Router } from "express";
import { allUsers, deleteUser, updateUser } from "../controllers/user.controllers.js";

const router = Router()

router.get("/allusers", allUsers)

router.put("/user/:id", updateUser)

router.delete("/user/:id", deleteUser)

export default router