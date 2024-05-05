import { Router } from "express";
import { createNews, getAllNews } from "../controllers/news.controllers.js";

const router = Router()

router.post("/createnews", createNews)

router.get("/allnews", getAllNews)

export default router