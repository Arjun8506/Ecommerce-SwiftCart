import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const useRegister = () => {

    const navigate = useNavigate()
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState(null)

    const register = async (formData) => {
        
        setloading(true)
        try {
            const res = await axios.post("/api/auth/register", formData)
            
            if (res.success === false) {
                seterror(res.response.data.message)
                setloading(false)
                return
            }

            setloading(false)
            seterror(null)
            alert(res.data.message)
            navigate("/login")
            
        } catch (error) {
            setloading(false)
            console.log(error);
            seterror(error.message)
        }
    }

    return { loading, error , register }
}