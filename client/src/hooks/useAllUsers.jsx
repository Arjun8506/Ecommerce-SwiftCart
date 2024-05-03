import { useState } from "react"
import axios from "axios"
import { useCountContext } from "../context/CountContext"

export const useGetAllUsers = () => {

    const [loading, setloading] = useState(false)
    const [error, seterror] = useState(null)
    const [users, setusers] = useState([])

    const getAllUsers = async () => {
        
        setloading(true)
        try {
            const res = await axios.get("http://localhost:3000/api/users/allusers")
            
            if (res.data.success === false) {
                seterror(res.data.message)
                setloading(false)
                return
            }

            setloading(false)
            seterror(null)
            setusers(res.data.users)

        } catch (error) {
            setloading(false)
            seterror(error.message)
        }
    }

    return { loading, error , getAllUsers, users }
}