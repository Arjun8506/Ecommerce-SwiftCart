import mongoose, { Schema } from "mongoose";

const newsSchema = new Schema({

    image: {
        type: String,
        required: [true , "Please Provide Image"]
    },
    highlight: {
        type: String,
        required: [true , "Please Provide Highlight"]
    },
    details: {
        type: String,
        required: [true , "Please Provide Details"]
    }

}, { timestamps: true })

const News = mongoose.model("News", newsSchema)

export default News