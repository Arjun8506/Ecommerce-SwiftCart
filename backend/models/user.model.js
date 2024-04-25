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
    profilePic: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTu51jEQvYu1xhUAaVtBcBl8-jqcV3YQ0DaCRnUVphWqZgSsK1lYbUXMgzKHPzatJ2ndXY&usqp=CAU"
    }

}, { timestamps: true })

const User = mongoose.model("User", userSchema)

export default User