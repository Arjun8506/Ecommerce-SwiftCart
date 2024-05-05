import { useState } from "react"
import axios from "axios"

export const useGetAllReviews = () => {

    const [loading, setloading] = useState(false)
    const [error, seterror] = useState(null)
    const [reviews, setreviews] = useState([])

    const getAllReviews = async () => {
        
        setloading(true)
        try {
            const res = await axios.get("http://localhost:3000/api/reviews/allreviews")
            
            if (res.data.success === false) {
                seterror(res.response.data.message)
                setloading(false)
                return
            }

            setloading(false)
            seterror(null)
            setreviews(res.data.allReviews)

        } catch (error) {
            setloading(false)
            seterror(error.message)
        }
    }

    return { loading, error , getAllReviews, reviews }
}