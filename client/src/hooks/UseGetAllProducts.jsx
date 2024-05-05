import { useState } from "react"
import axios from "axios"

export const useGetAllProducts = () => {

    const [loading, setloading] = useState(false)
    const [error, seterror] = useState(null)
    const [products, setproducts] = useState([])

    const getAllProducts = async () => {
        
        setloading(true)
        try {
            const res = await axios.get("http://localhost:3000/api/product/allproducts")
            
            if (res.data.success === false) {
                seterror(res.response.data.message)
                setloading(false)
                return
            }

            setloading(false)
            seterror(null)
            setproducts(res.data.products)

        } catch (error) {
            setloading(false)
            seterror(error.message)
        }
    }

    return { loading, error , getAllProducts, products }
}