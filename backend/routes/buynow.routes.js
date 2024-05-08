import { Router } from "express";
import { payNowFunction, paymentVerification } from "../controllers/paynow.controllers.js";

const router = Router()

router.post("/paynow", payNowFunction)

router.post("/paymentverification/:id", paymentVerification)

export default router