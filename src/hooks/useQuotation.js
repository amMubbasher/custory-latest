import { useMutation, useQuery} from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import {addQuotationAPI, getQuotationsAPI} from '../api/quotation.api'
import { useEffect } from "react";
const useQuotation = (props={})=>{

    const {data : quotation, mutate : addQuotation, isLoading : isAddQuotation, error : addQuotationError} = useMutation(addQuotationAPI, {
        onSuccess: async (data) => {
            toast.dismiss();
            toast.success('Quotation has been successfully added!');
        },
        onError: (error) => {
            toast.dismiss();
            toast.error(error?.response?.data?.message || 'Failed to add the quotation.');
        },
    });

    const fetchQuotations = useQuery(['quotation'], getQuotationsAPI, {
        onError : (error)=>{
            toast.error(error?.response?.data?.message);
        },
        refetchOnWindowFocus : false,
        refetchOnMount : false,
        refetchOnReconnect : false,
        retry : 0,
        select : (data)=>(data.quotations || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
    })

    useEffect(()=>{fetchQuotations.refetch()},[])
    return { addQuotation,quotation, fetchQuotations }
}

export default useQuotation;