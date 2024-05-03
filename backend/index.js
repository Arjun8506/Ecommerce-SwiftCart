import express from "express"
import dotenv from "dotenv"
import cors from "cors"

// Import of Files 
import authRoutes from "./routes/auth.routes.js"
import productRoutes from "./routes/product.route.js"
import userRoutes from "./routes/user.routes.js"
import reviewRoutes from "./routes/review.routes.js"
import connectToDatabase from "./connectToDB/connectToDb.js"

const app = express()

app.use(cors())
app.use(express.json())
dotenv.config()
const Port = process.env.PORT || 5000

app.use("/api/auth", authRoutes)
app.use("/api/product", productRoutes)
app.use("/api/users", userRoutes)
app.use("/api/reviews", reviewRoutes)


app.use((err, req, res, next) => {
    const status = err.statusCode || 500
    const message = err.message || "something went wrong"
    res.status(status).json({
        success: false,
        status: status,
        message: message
    })
})

app.listen(Port, () => {
    connectToDatabase()
    console.log(`Server Running on PORT ${Port}`);
})