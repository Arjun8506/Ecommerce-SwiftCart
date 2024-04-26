import { Router } from "express";
import { loggedInUser } from "../middleware/LoggedInUser.js";
import { createProduct, getAllProducts } from "../controllers/product.controllers.js";

const router = Router()

router.post("/create", loggedInUser, createProduct)

router.get("/create", getAllProducts)

export default router