import { Router } from "express";
import { loggedInUser } from "../middleware/LoggedInUser.js";
import { createProduct, getAllProducts } from "../controllers/product.controllers.js";

const router = Router()

router.post("/create", createProduct)

router.get("/allproducts", getAllProducts)

export default router