import Product from "../models/product.model.js"

export const createProduct = async (req, res, next) => {
    try {
        
        const { name, description, price, images, category, brand, quantity, tags, availability  } = req.body

        const newProduct = new Product({
            name, 
            description,
            price,
            images,
            
        })
    } catch (error) {
        next(error)
    }
}

export const getAllProducts = async (req, res, next) => {
    try {
        
    } catch (error) {
        next(error)
    }
}

