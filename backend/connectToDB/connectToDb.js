import mongoose from "mongoose";

const connectToDatabase = async (req, res, next) => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("connect to DB");
    } catch (error) {
        next(error)
    }
}

export default connectToDatabase 