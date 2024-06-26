import Review from "../models/review.model.js"
import { errorHandler } from "../utility/errorHandler.js"

export const sendReview = async (req, res, next) => {
    try {
        const { productId, userId, comment, ratings } = req.body
        const existedUser = await Review.findOne({ userId: userId, productId: productId })
        if (existedUser) return next(errorHandler(402, "you already sended messages")) 
        const newReview = new Review({
            productId,
            userId,
            ratings,
            comment
        })
        await newReview.save()
        if (!newReview) return next(errorHandler(403, "unable to create review"))
        res.status(201).json({
            success: true,
            message: "sended review successfully"
        })
    } catch (error) {
        next(error)
    }
}

export const getAllReview = async (req, res, next) => {
    try {
        const allReviews = await Review.find().sort({ createdAt: -1 }).populate("productId userId")
        if (!allReviews) return next(errorHandler(403, "unable to get review"))
        res.status(200).json({
            success: true,
            allReviews
        })
    } catch (error) {
        next(error)
    }
}

export const getProductReview = async (req, res, next) => {
    try {
        const productId = req.params.id
        const productReview = await Review.find( { productId: productId } ).sort({ createdAt: -1 }).populate("productId userId")
        if (!productReview) return next(errorHandler(403, "unable to get review"))
        res.status(200).json({
            success: true,
            productReview
        })
    } catch (error) {
        next(error)
    }
}

export const deleteReview = async (req, res, next) => {
    try {
        const reviewId = req.params.id
        const deleteReview = await Review.findByIdAndDelete(reviewId)
        if (!deleteReview) return next(errorHandler(403, "unable to delete review"))
        res.status(200).json({
            success: true,
            message: "deleted review successfully",
            deleteReview
        })
    } catch (error) {
        next(error)
    }
}