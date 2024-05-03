import { json } from "express"
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

export const getSpecificProduct = async (req, res, next) => {
    try {

        const productId = req.params.id
        const product = await Product.findById(productId)
        if (!product) next(errorHandler(404, "Product Not Found"))
        res.status(200).json({
            success: true,
            product
        })

    } catch (error) {
        next(error)
    }
}

export const updateProduct = async (req, res, next) => {
    try {
        const productId = req.params.id
        const dataToUpdate = req.body
        const updatedProduct = await Product.findByIdAndUpdate(productId, { $set: dataToUpdate }, { new: true })
        res.status(200).json({
            success: true,
            updatedProduct
        })
    } catch (error) {
        next(error)
    }
}

export const deleteProduct = async (req, res, next) => {
    try {
        const productId = req.params.id
        const product = await Product.findByIdAndDelete(productId)
        res.status(200).json({
            success: true,
            product,
            message: "Deleted Item Successfully"
        })
    } catch (error) {
        next(error)
    }
}