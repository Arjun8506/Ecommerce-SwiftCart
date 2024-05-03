import { Router } from "express";
import { deleteReview, getAllReview, getProductReview, sendReview } from "../controllers/review.controllers.js";

const router = Router()

router.post("/send", sendReview)

router.get("/allreviews", getAllReview)

router.get("/productreviews/:id", getProductReview)

// router.put("/review/:id", updateUser)

router.delete("/review/:id", deleteReview)

export default router