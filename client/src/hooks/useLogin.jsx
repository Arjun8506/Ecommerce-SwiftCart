import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useAuthContext } from "../context/AuthContext"

export const useLogin = () => {

    const { setauthUser } = useAuthContext()

    const navigate = useNavigate()
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState(null)

    const login = async (formData) => {
        
        setloading(true)
        try {
            const res = await axios.post("http://localhost:3000/api/auth/login", formData)

            console.log(res);
            
            if (res.data.success === false) {
                seterror(res.response.data.message)
                setloading(false)
                return
            }

            localStorage.setItem("chat-user", JSON.stringify(res.data.user))
            setauthUser(res.data.user)

            setloading(false)
            seterror(null)
            navigate("/")
            
        } catch (error) {
            setloading(false)
            seterror(error.message)
        }
    }

    return { loading, error , login }
}