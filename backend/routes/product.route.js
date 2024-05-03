import { Router } from "express";
import { createProduct, deleteProduct, getAllProducts, getSpecificProduct, updateProduct } from "../controllers/product.controllers.js";

const router = Router()

router.post("/create", createProduct)

router.get("/allproducts", getAllProducts)

router.get("/productspacific/:id", getSpecificProduct)

router.put("/productspacific/:id", updateProduct)

router.delete("/productspacific/:id", deleteProduct)

export default router