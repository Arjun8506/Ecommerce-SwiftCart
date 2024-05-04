import { useState } from "react"
import axios from "axios"

export const useSendReview = () => {

    const [loading, setloading] = useState(false)
    const [error, seterror] = useState(null)

    const sendReview = async (formData) => {
        
        setloading(true)
        try {
            const res = await axios.post("http://localhost:3000/api/reviews/send", formData)
            
            if (res.success === false) {
                seterror(res.message)
                setloading(false)
                return
            }

            setloading(false)
            seterror(null)
            alert(res.data.message)
            window.location.reload()
            
        } catch (error) {
            setloading(false)
            console.log(error);
            seterror(error.message)
        }
    }

    return { loading, error , sendReview }
}