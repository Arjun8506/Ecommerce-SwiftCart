import { Router } from "express";
import { allOrders, allUsersOrders } from "../controllers/order.controllers.js";

const router = Router()

router.get("/order", allOrders)

router.get("/order/:id", allUsersOrders)

export default router