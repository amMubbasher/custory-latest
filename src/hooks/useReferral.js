import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { toast } from "react-hot-toast";
import { getReferralPersonsAPI, addReferralPersonAPI} from "../api/referral.api";
import useAppStore from './useAppStore';

const useReferral = (props={})=>{
    const {addReferralPersonSuccessCallback, addReferralPersonErrorCallback} = props

    const {mutate : addReferralPerson, isLoading : isAddReferralPerson, error : addReferralPersonError} = useMutation(addReferralPersonAPI, {
        onSuccess: async (data) => {
            addReferralPersonSuccessCallback && addReferralPersonSuccessCallback(data)
            toast.dismiss();
            toast.success('You have Successfully referred a Person.');
            // Optionally, you can refetch the discount data after adding the item
        },
        onError: (error) => {
            // Handle error when adding item to cart
            // You can display an error message or perform any necessary actions
            toast.dismiss();
            toast.error(error?.response?.data?.message || 'You have Failed to referred a Person.');
        },
    });

    return {
        addReferralPerson,
        isAddReferralPerson
    }
}

export default useReferral;