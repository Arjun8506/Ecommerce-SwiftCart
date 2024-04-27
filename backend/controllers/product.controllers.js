import Product from "../models/product.model.js"
import { errorHandler } from "../utility/errorHandler.js"

export const createProduct = async (req, res, next) => {
    try {

        const { name, description, price, images, category, brand, quantity, tags, availability } = req.body

        const newProduct = new Product({
            name,
            description,
            price,
            images,
            category,
            brand,
            availability,
            quantity,
            tags
        })
        if (!newProduct) return next(errorHandler(500, "Unable to create product"))
        await newProduct.save()
        res.status(201).json({
            success: true,
            message: "created product successfully"
        })
    } catch (error) {
        next(error)
    }
}

export const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 })
        res.status(200).json({
            success: true,
            products
        })

    } catch (error) {
        next(error)
    }
}


