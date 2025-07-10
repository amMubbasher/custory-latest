import { useMutation } from "@tanstack/react-query"
import { placeOrderAPI, updateOrderAPI, fetchPresignedUrlProduction } from "../api/order.api"
import { toast } from "react-hot-toast";
import useAppStore from "./useAppStore";

export default function useOrder(props={}) {
  const {placeOrderSuccessCallback, placeOrderErrorCallback} = props
  const orders = useAppStore(state=>state.orders);
  const {mutateAsync : placeOrder, isLoading : isPlaceOrderLoading, data : placeOrderData, error : placeOrderError} = useMutation(placeOrderAPI, {
      onSuccess: (data)=>{
          placeOrderSuccessCallback && placeOrderSuccessCallback(data)
      },
      onError: (error)=>{
          placeOrderErrorCallback && placeOrderErrorCallback(error)
      }
  });

  const {mutateAsync: presignedUrlProduction, isLoading : isPresignedUrlProduction, data : presignedUrlProductionData, error : presignedUrlProductionError} = useMutation(fetchPresignedUrlProduction, {
    onSuccess: (data)=>{
      placeOrderSuccessCallback && placeOrderSuccessCallback(data)
    },
    onError: (error)=>{
      console.log(`Error presignedUrlProduction: `, error)
    }
});

  const {data : updatedOrder, isLoading : isUpdateOrderLoading, mutate : updateOrder} = useMutation(updateOrderAPI, {
      onSuccess : (data)=>{
        if(data.updatedDetails){
          const findOrder = orders.find((order)=> order?.shippingDate == data.updatedDetails?.shippingDate) 
          if(findOrder){
            const status = data?.updatedDetails?.status?.split(" ")[0]?.replace(/['’]s/g, "");
            const statusName = status === 'supplier' ? 'Warehouse' : ['pending', 'order'].includes(status) ? 'Order Receive' : status === 'delivery' ? 'Shipping' : status;
            toast.dismiss();
            toast.success(`${statusName[0].toUpperCase()  + statusName.slice(1)} phase has been successfully updated.`);
          }else{
            toast.dismiss();
            toast.success('Shipping Date has been successfully updated.');
          }
        }
        placeOrderSuccessCallback && placeOrderSuccessCallback(data)
      },
      onError : (error)=>{
        toast.dismiss();
        toast.error(error?.response?.data?.message || 'Something went wrong!');
      }
    })

  return {
      placeOrder,
      isPlaceOrderLoading,
      placeOrderData,
      placeOrderError,
      updateOrder,
      presignedUrlProduction,
      presignedUrlProductionData,
      updatedOrder,
      isUpdateOrderLoading
  }
}