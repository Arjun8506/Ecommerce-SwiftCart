import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    ratings: {
        type: Number,
        required: [true, "Please Give Ratings"]
    },
    comment: String

}, { timestamps: true })

const Review = mongoose.model("Review", reviewSchema)

export default Review