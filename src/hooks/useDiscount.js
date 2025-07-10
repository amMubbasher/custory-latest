import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-hot-toast";
import { deleteDiscountAPI, getDiscountsAPI, updateDiscountAPI, addItemToDiscountAPI, deleteDiscountByIdAPI } from "../api/discount.api";
import useAppStore from '../hooks/useAppStore';

const useDiscount = (props={})=>{
    const discounts = useAppStore(state=>state.discounts);
    const setDiscounts = useAppStore(state=>state.setDiscounts);

    // Show Discounts That Have Expiry Dates
    const displayDiscountInfo = ({ expiryDate }) => {
      const today = new Date();
      const expiry = new Date(expiryDate);
      const timeDiff = expiry - today;
      if (timeDiff <= 0 && expiryDate) {
        return { expired: true };
      } else {
        const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
        return { expired: false, daysLeft };
      }
    };

    const {data : discountsData, error : fetchDiscountError} = useQuery(['discount'],getDiscountsAPI, {
        select : (data)=> data.discounts,
        onSuccess: (selectedDiscounts) => {
            setDiscounts(selectedDiscounts);
        },
        onError : (error)=>{
            toast.error(error?.response?.data?.message);
        },
        refetchOnWindowFocus : false,
        refetchOnMount : false,
        refetchOnReconnect : false,
        retry : 0,
    });

    const {isLoading : isUpdateDiscountLoading,mutate : updateDiscount} = useMutation(updateDiscountAPI, {
        onSuccess : (data)=>{
             const index = discounts.findIndex((discount)=> discount.id === data.updatedDiscount.id);
            if(index > -1){
                discounts[index] = data.updatedDiscount;
                setDiscounts([...discounts]);
            }
            toast.dismiss();
            toast.success('Discount has been updated successfully!');
        },
        onError : (error)=>{
          toast.dismiss();
          toast.error(error?.response?.data?.message || 'Something went wrong!');
        }
      })

    const {mutate : deleteDiscount, data : deleteDiscountData,isLoading : isDeleteDiscountLoading, error : deleteDiscountError } = useMutation(deleteDiscountByIdAPI, {
        onSuccess : (data)=>{
            const index = discounts.findIndex((discount)=> discount.id === data.result.id);
            if(index > -1){
                discounts.splice(index, 1);
                setDiscounts([...discounts]);
            }
            toast.dismiss();
            toast.success('Deleted discount successfully!');
        },
        onError : (data)=>{
            toast.dismiss();
            toast.error(data?.response?.data?.message || 'Something went wrong!');
        }
    });

    const {mutate : addItemToDiscount, isLoading : isAddItemToDiscountLoading, error : addItemToDiscountError} = useMutation(addItemToDiscountAPI, {
        onSuccess: async (data) => {
            discounts.push(data.discount)
            setDiscounts([...discounts]);
            toast.dismiss();
            toast.success('Item added to discounts successfully!');
            // Optionally, you can refetch the discount data after adding the item
        },
        onError: (error) => {
            // Handle error when adding item to cart
            // You can display an error message or perform any necessary actions
            toast.dismiss();
            toast.error(error?.response?.data?.message || 'Failed to add item to discount');
        },
    });

    return {
        isUpdateDiscountLoading,
        updateDiscount,
        addItemToDiscount,
        isAddItemToDiscountLoading,
        deleteDiscount,
        deleteDiscountData,
        deleteDiscountError,
        isDeleteDiscountLoading,
        deleteDiscount,
        discounts,
        displayDiscountInfo
    }
}

export default useDiscount;