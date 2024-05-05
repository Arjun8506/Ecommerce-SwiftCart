import News from "../models/news.model.js"
import { errorHandler } from "../utility/errorHandler.js"

export const createNews = async (req, res, next) => {
    try {
        const { image, highlight, details } = req.body
        const newNews = new News({
            image,
            highlight,
            details
        })
        await newNews.save()
        res.status(201).json({
            success: true,
            message: "news Created successfully"
        })
    } catch (error) {
        next(error)
    }
}

export const getAllNews = async (req, res, next) => {
    try {
        const news = await News.find().sort({ createdAt: -1 })
        if (!news) return next(errorHandler(404, "unable to find the news"))
        res.status(201).json({
            success: true,
            news
        })
    } catch (error) {
        next(error)
    }
}