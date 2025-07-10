import { useQuery } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { getAllCategories } from "../api/category.api"

export const useFetchCategories = ()=>{
    const fetchCategories = useQuery(['category'], getAllCategories, {
        onError : (error)=>{
            toast.error(error?.response?.data?.message);
        },
        select : (data)=> data.categories,
        refetchOnWindowFocus : false,
        refetchOnMount : false,
        refetchOnReconnect : false,
        retry : 0,
    })
    return { fetchCategories }
}