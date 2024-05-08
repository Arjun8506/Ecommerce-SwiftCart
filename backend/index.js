import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import Razorpay from "razorpay"
import bodyParser from "body-parser"
import path from "path"

// Import of Files 
import authRoutes from "./routes/auth.routes.js"
import productRoutes from "./routes/product.routes.js"
import userRoutes from "./routes/user.routes.js"
import reviewRoutes from "./routes/review.routes.js"
import contactRoutes from "./routes/contact.routes.js"
import newsRoutes from "./routes/news.routes.js"
import paymentRoutes from "./routes/buynow.routes.js"
import orderRoutes from "./routes/order.routes.js"
import connectToDatabase from "./connectToDB/connectToDb.js"

const app = express()


app.use(cors())
app.use(express.json())
dotenv.config()
app.use(bodyParser.json())
const Port = process.env.PORT || 5000

const __dirname = path.resolve()

export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
});

app.use("/api/auth", authRoutes)
app.use("/api/product", productRoutes)
app.use("/api/users", userRoutes)
app.use("/api/reviews", reviewRoutes)
app.use("/api/contact", contactRoutes)
app.use("/api/news", newsRoutes)
app.use("/api/payment", paymentRoutes)
app.use("/api/orders", orderRoutes)

app.use(express.static(path.join(__dirname, "/client/dist")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
})

app.listen(Port, () => {
    connectToDatabase()
    console.log(`Server Running on PORT ${Port}`);
})

app.use((err, req, res, next) => {
    const status = err.statusCode || 500
    const message = err.message || "something went wrong"
    res.status(status).json({
        success: false,
        status: status,
        message: message
    })
})