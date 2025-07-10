import { useMutation } from "@tanstack/react-query"
import { toast } from "react-hot-toast";
import { stripeCheckoutSessionAPI, stripeRefundAPI } from "../api/order.api"

export const useStripe = ()=>{
    const stripeCall = useMutation(stripeCheckoutSessionAPI, {
        onSuccess: (data)=>{
            window.location.href = data?.url;

        },
        onError : (err)=>{
            toast.dismiss();
            toast.error(err?.response?.data?.message || 'Something went wrong');
        }
    });

    const stripeRefundCall = useMutation(stripeRefundAPI, {
        onSuccess: (data)=>{
            toast.dismiss();
            toast.success("Your refund has been processed and will be credited within 5-10 business days");
        },
        onError : (err)=>{
            console.log('err: ', err);
            toast.dismiss();
            toast.error(err?.response?.data?.message || 'Something went wrong');
        }
    });
    

    return {
        stripeCall, stripeRefundCall
    }
}