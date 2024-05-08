import { instance } from "../index.js"
import crypto from "crypto"
import { errorHandler } from "../utility/errorHandler.js";
import Order from "../models/order.model.js";

export const payNowFunction = async (req, res, next) => {
    try {
        const options = {
            amount: Number(req.body.totalAmount) * 100,
            currency: "INR",
        };
        const order = await instance.orders.create(options);

        res.status(200).json({
            success: true,
            order
        })

    } catch (error) {
        next(error)
    }
}

export const paymentVerification = async (req, res, next) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, totalAmount } = req.body

        const sha = crypto.createHmac("sha256", process.env.RAZORPAY_API_SECRET)
        sha.update(`${razorpay_order_id}|${razorpay_payment_id}`)
        const digest = sha.digest("hex")
        if (digest !== razorpay_signature) {
            return res.json({
                success: false,
                message: "Transaction is not legit!"
            })
        }
        const userid = req.params.id

        const newOrder = new Order({
            userid,
            orderid: razorpay_order_id,
            paymentid: razorpay_payment_id,
            amount: totalAmount
        })
        await newOrder.save()

        res.status(200).json({
            success: true,
            orderId: razorpay_order_id,
            paymentId: razorpay_payment_id,
            newOrder
        })

    } catch (error) {
        next(error)
    }
}