import { Schema, model } from "mongoose";

const orderSchema = new Schema({
    userid: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    orderid: String,
    paymentid: String,
    amount: Number
}, { timestamps: true })

const Order = model("Order", orderSchema)

export default Order