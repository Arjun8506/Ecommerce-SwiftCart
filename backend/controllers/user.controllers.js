import User from "../models/user.model.js"
import { errorHandler } from "../utility/errorHandler.js"

export const allUsers = async (req, res, next) => {
    try {
        const allUsers = await User.find()
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
        const updatedUser = await User.findByIdAndUpdate(userId, { $set: updateData } , { new: true })
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
        const deleteUser = await User.findByIdAndDelete(userId)
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