import bcryptjs from "bcryptjs"
import User from "../models/user.model,js"

export const registerUser = async (req, res, next) => {
    try {
        const { fullname, email, password } = req.body
        const hashedPassword = bcryptjs.hashSync(password, 10)

        const newUser = new User({
            fullname,
            email,
            password: hashedPassword
        })
        if (condition) {
            
        }
    } catch (error) {
        next(error)
    }
}