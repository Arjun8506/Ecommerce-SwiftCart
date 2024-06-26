import bcryptjs from "bcryptjs"
import User from "../models/user.model.js"
import { errorHandler } from "../utility/errorHandler.js"
import jwt from "jsonwebtoken"

export const registerUser = async (req, res, next) => {
    try {
        const { fullname, email, password } = req.body
        const hashedPassword = bcryptjs.hashSync(password, 10)

        const newUser = new User({
            fullname,
            email,
            password: hashedPassword
        })
        if (!newUser) return next(errorHandler(500, "unable to register , Try Again"))
        await newUser.save()
        res.status(201).json({
            success: true,
            message: "user created successfully"
        })
    } catch (error) {
        next(error)
    }
}

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const validUser = await User.findOne({ email: email })
        if (!validUser) return next(errorHandler(404, "user not found"))
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if (!validPassword) return next(errorHandler(401, "invalid credentials"))

        const userToSend = { ...validUser._doc };
        delete userToSend.password;

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '15d' })
        res.cookie("shopingCookie", token, { maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true }).status(200).json({
            success: true,
            statusCode: 200,
            user: userToSend
        })
    } catch (error) {
        next(error)
    }
}

export const logoutUser = async (req, res, next) => {
    try {
        res.clearCookie("shopingCookie")
        res.cookie("clearCookie", "", { maxAge: 0, httpOnly: true }).status(200).json({
            success: true,
            statusCode: 200,
            message: "Logout Successful"
        })
    } catch (error) {
        next(error)
    }
}

export const googleAuth = async (req, res, next) => {
    try {
        const { fullname, email, profilePic } = req.body
        console.log(req.body);

        const user = await User.findOne({ email: email })
        if (user) {
            console.log("found");
            const userToSend = { ...user._doc };
            delete userToSend.password;

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '15d' })
            res.cookie("shopingCookie", token, { maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true }).status(200).json({
                success: true,
                statusCode: 200,
                user: userToSend
            })
        }
        if (!user) {
            console.log("not found");
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}|[];\':"<>?,./';

            let password = '';
            for (let i = 0; i < 9; i++) {
                const randomIndex = Math.floor(Math.random() * chars.length);
                password += chars[randomIndex];
            }
            console.log(password)
            const hashedPassword = bcryptjs.hashSync(password, 10)

            const newUser = new User({
                fullname,
                email,
                password: hashedPassword,
                profilePic
            })
            if (!newUser) return next(errorHandler(500, "unable to register , Try Again"))
            await newUser.save()

            const userToSend = { ...newUser._doc };
            delete userToSend.password;

            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '15d' })
            res.cookie("shopingCookie", token, { maxAge: 15 * 24 * 60 * 60 * 1000, httpOnly: true }).status(200).json({
                success: true,
                statusCode: 200,
                user: userToSend
            })
        }
    } catch (error) {
        next(error)
    }
}