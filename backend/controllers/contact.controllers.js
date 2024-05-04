import Contact from "../models/contact.model.js"

export const sendMessage = async (req, res, next) => {
    try {
        const { name, email, message } = req.body
        console.log(req.body);
        const newMessage = new Contact({
            name,
            email,
            message
        })
        await newMessage.save()
        res.status(200).json({
            success: true,
            message: "message sended successfully"
        })
    } catch (error) {
        next(error)
    }
}