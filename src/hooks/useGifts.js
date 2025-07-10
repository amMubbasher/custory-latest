import { useQuery } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { fetchAdminOrdersAPI, fetchOrderAPI, fetchOrdersAPI } from "../api/order.api"
import useAppStore from "./useAppStore";
import { useEffect } from "react";
import useAuth from "./useAuth";

// Seems to sometimes be used interchangebly with orders. Find a way to combine it or see if this is needed
export const useFetchGifts = ()=>{
    const setOrders = useAppStore(state=>state.setOrders);
    const orders = useAppStore(state=>state.orders);
    const fetchGifts = useQuery(['orders'], fetchOrdersAPI, {
        onError : (error)=>{
            toast.error(error?.response?.data?.message);
        },
        refetchOnWindowFocus : false,
        refetchOnMount : false,
        refetchOnReconnect : false,
        retry : 0,
        enabled : !orders?.length,
        select : (data)=>(data.orders || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
        onSuccess: (orders) => {
            setOrders(orders);
        },
    })
    useEffect(() => {if (!orders?.length) fetchGifts.refetch()}, [orders?.length, orders]);
    return { fetchGifts }
}

export const useFetchAdminOrders = ()=>{
    const setOrders = useAppStore(state=>state.setOrders);
    const fetchGifts = useQuery(['orders'], fetchAdminOrdersAPI, {
        onError : (error)=>{
            toast.error(error?.response?.data?.message);
        },
        select : (data)=>(data.orders || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
        onSuccess: (orders) => {
            setOrders(orders);
        },
        refetchOnWindowFocus : false,
        refetchOnMount : false,
        refetchOnReconnect : false,
        retry : 0,
    })
    useEffect(() => {fetchGifts.refetch()}, []);
    return { fetchGifts }
}

export const useFetchGift = ({orderId})=>{
    const authData = localStorage.getItem('CUSTORY_AUTH');
    const isLoggedin = useAppStore(state=>state.isLoggedin);
    const isEnabled = Boolean(authData) && Boolean(isLoggedin) && Boolean(orderId);
    const fetchGift = useQuery(['order', orderId], ()=>fetchOrderAPI({orderId}), {
        onError : (error)=>{
            toast.error(error?.response?.data?.message);
        },
        select  :(data)=>data.order,
        refetchOnWindowFocus : false,
        refetchOnMount : false,
        refetchOnReconnect : false,
        enabled: isEnabled,
        retry : 0,
    })
    useEffect(() => {if (orderId && isEnabled) fetchGift.refetch()}, [orderId, isEnabled]);
    return {
        fetchGift
    }
}