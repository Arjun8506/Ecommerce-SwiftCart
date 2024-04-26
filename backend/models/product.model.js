import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      images: {
        type: [String], // Array of image URLs
        required: true
      },
      category: {
        type: String,
        required: true
      },
      brand: String,
      availability: {
        type: String,
        enum: ["in stock", "out of stock"],
        default: "in stock"
      },
      quantity: {
        type: Number,
        default: 0
      },
      tags: [String],
}, { timestamps: true })

const Product = mongoose.model("Product", productSchema)

export default Product