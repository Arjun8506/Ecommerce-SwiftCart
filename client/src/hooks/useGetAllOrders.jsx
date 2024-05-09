import { useState } from "react"
import axios from "axios"

export const useGetAllOrders = () => {

    const [loading, setloading] = useState(false)
    const [error, seterror] = useState(null)
    const [orders, setorders] = useState([])

    const getAllOrders = async () => {
        
        setloading(true)
        try {
            const res = await axios.get("/api/orders/order")
            
            if (res.data.success === false) {
                seterror(res.response.data.message)
                setloading(false)
                return
            }

            setloading(false)
            seterror(null)
            setorders(res.data.orders)

        } catch (error) {
            setloading(false)
            seterror(error.message)
        }
    }

    return { loading, error , getAllOrders, orders }
}