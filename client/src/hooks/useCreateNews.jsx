import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const useCreateNews = () => {

    const navigate = useNavigate()
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState(null)

    const createNews = async (formData) => {
        
        setloading(true)
        try {
            const res = await axios.post("http://localhost:3000/api/news/createnews", formData)
            
            if (res.data.success === false) {
                seterror(res.response.data.message)
                setloading(false)
                return
            }

            setloading(false)
            seterror(null)
            alert(res.data.message)
            navigate("/admin/dashboard")
            window.location.reload()
            
        } catch (error) {
            setloading(false)
            seterror(error.message)
        }
    }

    return { loading, error , createNews }
}