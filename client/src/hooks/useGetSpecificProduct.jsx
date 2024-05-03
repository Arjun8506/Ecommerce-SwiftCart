import { useState } from "react"
import axios from "axios"

export const useGetSpecificProduct = () => {

    const [loading, setloading] = useState(false)
    const [error, seterror] = useState(null)
    const [product, setproduct] = useState({})

    const getSpecificProduct = async (id) => {

            setloading(true)
            try {
                const res = await axios.get(`http://localhost:3000/api/product/productspacific/${id}`)
                
                if (res.data.success === false) {
                    seterror(res.data.message)
                    setloading(false)
                    return
                }
    
                setloading(false)
                seterror(null)
                setproduct(res.data.product)
                
            } catch (error) {
                setloading(false)
                seterror(error.message)
            }
    }

    return { loading, error , getSpecificProduct, product }
}