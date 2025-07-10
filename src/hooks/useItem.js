import { useMutation} from "@tanstack/react-query";
import React from "react";
import { toast } from "react-hot-toast";
import { updateItemAPI} from "../api/item.api";
import useAppStore from './useAppStore';

const useItem = (props={})=>{
  const {orders,setOrders} = useAppStore()

  const {isLoading : isUpdateItemLoading,mutate : updateItem} = useMutation(updateItemAPI, {
      onSuccess : (data)=>{
        let itemIndex;
        const orderIndex = orders.findIndex(order => {
          itemIndex = order.items.findIndex(item => item.id === data.updatedItem.id);
          if (itemIndex !== -1) {
              return true;
          }
          return false;
        });
        if(orderIndex > -1){
          orders[orderIndex].items[itemIndex] = data.updatedItem;
          setOrders([...orders]);
        }
        toast.dismiss();
        toast.success('Item has been updated successfully!');
      },
      onError : (error)=>{
        toast.dismiss();
        toast.error(error?.response?.data?.message || 'Something went wrong!');
      }
    })

  return {
    updateItem,
  }
}

export default useItem;