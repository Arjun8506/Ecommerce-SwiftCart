import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true , "Please Provide Your Fullname"]
    },
    email: {
        type: String,
        required: [true , "Please Provide Your Email"]
    },
    message: {
        type: String,
        required: [true , "Please Provide Your message"]
    },

}, { timestamps: true })

const Contact = mongoose.model("Contact", contactSchema)

export default Contact