import jwt from "jsonwebtoken"
import { errorHandler } from "../utility/errorHandler.js"

export const loggedInUser = async (req, res, next) => { 
    const token = req.cookies.shopingCookie
    if(!token) return next(errorHandler(401, "unauthorised"))

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if(err) return next(errorHandler(403, "Forbidden"))

        req.user = user
        next()
    })
}