import Order from "../models/order.model.js"
import { errorHandler } from "../utility/errorHandler.js"

export const allOrders = async (req, res, next) => {
    try {
        const orders = await Order.find().populate("userid").sort({ createdAt: -1 })
        if (!orders) return next(errorHandler(404, "orders not found"))
        res.status(200).json({
            success: true,
            orders
        }) 
    } catch (error) {
        next(error)
    }
}

export const allUsersOrders = async (req, res, next) => {
    try {
        const userId = req.params.id
        const orders = await Order.find({ userid: userId }).sort({ createdAt: -1 })
        if (!orders) return next(errorHandler(404, "orders not found"))
        res.status(200).json({
            success: true,
            orders
        }) 
    } catch (error) {
        next(error)
    }
}