import { useState } from "react"
import axios from "axios"

export const useGetProductReviews = () => {

    const [loading, setloading] = useState(false)
    const [error, seterror] = useState(null)
    const [productReviews, setproductReviews] = useState([])

    const getProductReviews = async (id) => {
        
        setloading(true)
        try {
            const res = await axios.get(`http://localhost:3000/api/reviews/productreviews/${id}`)
            
            if (res.data.success === false) {
                seterror(res.response.data.message)
                setloading(false)
                return
            }

            setloading(false)
            seterror(null)
            setproductReviews(res.data.productReview)

        } catch (error) {
            setloading(false)
            seterror(error.message)
        }
    }

    return { loading, error , getProductReviews, productReviews }
}