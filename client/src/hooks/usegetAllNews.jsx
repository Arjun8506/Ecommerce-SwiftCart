import { useState } from "react"
import axios from "axios"

export const useGetAllNews = () => {

    const [loading, setloading] = useState(false)
    const [error, seterror] = useState(null)
    const [news, setnews] = useState([])

    const getAllNews = async () => {
        
        setloading(true)
        try {
            const res = await axios.get("http://localhost:3000/api/news/allnews")
            
            if (res.data.success === false) {
                seterror(res.response.data.message)
                setloading(false)
                return
            }

            setloading(false)
            seterror(null)
            setnews(res.data.news)

        } catch (error) {
            setloading(false)
            seterror(error.message)
        }
    }

    return { loading, error , getAllNews, news }
}