import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    fullname: {
        type: String,
        required: [true , "Please Provide Your Fullname"]
    },
    email: {
        type: String,
        required: [true , "Please Provide Your Email"]
    },
    password: {
        type: String,
        required: [true , "Please Provide Your Password"]
    },

}, { timestamps: true })

const User = mongoose.model("User", userSchema)

export default User