import { useState } from "react"
import axios from "axios"

export const useGetSpecificUser = () => {

    const [loading, setloading] = useState(false)
    const [error, seterror] = useState(null)
    const [user, setuser] = useState({})

    const getSpecificUser = async (id) => {

            setloading(true)
            try {
                const res = await axios.get(`http://localhost:3000/api/users/user/${id}`)
                
                if (res.data.success === false) {
                    seterror(res.response.data.message)
                    setloading(false)
                    return
                }
    
                setloading(false)
                seterror(null)
                setuser(res.data.user)
                
            } catch (error) {
                setloading(false)
                seterror(error.message)
            }
    }

    return { loading, error , getSpecificUser, user }
}