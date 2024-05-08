import mongoose from "mongoose";

const connectToDatabase = async (req, res, next) => {
    try {
        console.log(process.env.MONGODB_URL);
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("connect to Database");
    } catch (error) {
        console.log(error);
        next(error)
    }
}

export default connectToDatabase 