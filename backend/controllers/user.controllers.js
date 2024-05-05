import User from "../models/user.model.js"
import { errorHandler } from "../utility/errorHandler.js"
import bcryptjs from "bcryptjs"

export const allUsers = async (req, res, next) => {
    try {
        const allUsers = await User.find().select("-password")
        if (!allUsers) return next(errorHandler(404, "Unable to find users"))
        res.status(200).json({
            success: true,
            users: allUsers
        })
    } catch (error) {
        next(error)
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const userId = req.params.id
        const updateData = req.body
        if ("password" in req.body) {
            const hashedPassword = bcryptjs.hashSync(updateData.password, 10)
            updateData.password = hashedPassword
        }
        const updatedUser = await User.findByIdAndUpdate(userId, { $set: updateData } , { new: true }).select("-password")
        if (!updatedUser) return next(errorHandler(403, "Unable to update the user"))

        res.status(200).json({
            success: true,
            user: updatedUser
        })

    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.id
        const deleteUser = await User.findByIdAndDelete(userId).select("-password")
        if (!deleteUser) return next(errorHandler(404, "Unable to delete the user"))
        res.status(200).json({
            success: true,
            user: deleteUser,
            message: "Deleted Successfully"
        })
    } catch (error) {
        next(error)
    }
}


export const getSpecificUser = async (req, res, next) => {
    try {
        const userId = req.params.id
        const user = await User.findById(userId).select("-password")
        if (!user) return next(errorHandler(404, "Unable to find user"))
        res.status(200).json({
            success: true,
            user: user
        })
    } catch (error) {
        next(error)
    }
}
