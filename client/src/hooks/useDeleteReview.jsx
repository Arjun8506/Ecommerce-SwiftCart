import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const useDeleteReview = () => {

    const navigate = useNavigate()
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState(null)

    const deleteReview = async (id) => {
        const confirmed = window.confirm("Are you sure you want to delete this product?");

        if (confirmed) {
            setloading(true)
            try {
                const res = await axios.delete(`http://localhost:3000/api/reviews/review/${id}`)
                
                if (res.data.success === false) {
                    seterror(res.data.message)
                    setloading(false)
                    return
                }
    
                setloading(false)
                seterror(null)
                alert(res.data.message)
                navigate("/admin/reviws")
                window.location.reload()
                
            } catch (error) {
                setloading(false)
                seterror(error.message)
            }
        }else{
            alert("You Canceled!")
        }
    }

    return { loading, error , deleteReview }
}