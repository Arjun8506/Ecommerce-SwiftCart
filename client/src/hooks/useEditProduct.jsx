import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const useDeleteProduct = () => {

    const navigate = useNavigate()
    const [loading, setloading] = useState(false)
    const [error, seterror] = useState(null)

    const deleteProduct = async (id) => {
        const confirmed = window.confirm("Are you sure you want to edit this product?");

        if (confirmed) {
            setloading(true)
            try {
                const res = await axios.put(`http://localhost:3000/api/product/productspacific/${id}`)
                
                if (res.data.success === false) {
                    seterror(res.data.message)
                    setloading(false)
                    return
                }
    
                setloading(false)
                seterror(null)
                alert(res.data.message)
                window.location.reload()
                navigate("/admin/products")
                
            } catch (error) {
                setloading(false)
                seterror(error.message)
            }
        }else{
            alert("You Canceled!")
        }
    }

    return { loading, error , deleteProduct }
}