import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "react-hot-toast"
import { deleteDraftAPI, getDraftAPI, getDraftsAPI, updateDraftAPI, addDraftAPI } from "../api/draft.api"
import useAppStore from "./useAppStore";

export const useGetDrafts = ()=>{
    const isLoggedin = useAppStore(state=>state.isLoggedin);
    const getDrafts = useQuery(['draft'], getDraftsAPI, {
        select : (data)=>data.drafts,
        refetchOnWindowFocus : false,
        refetchOnMount : false,
        refetchOnReconnect : false,
        retry : 0,
        enabled : isLoggedin,
        onError : (error)=>{
            toast.error(error?.response?.data?.message || 'Something went wrong!')
        }
    })

    return {
        getDrafts
    }
}

export const useDeleteDraft = ()=>{
    const queryClient = useQueryClient();
    const deleteDraft = useMutation(deleteDraftAPI, {
        onSuccess : ()=>{
            queryClient.invalidateQueries(['draft']);
            toast.dismiss();
            toast.success('Draft has been deleted successfully!');
        },
        onError : (error)=>{
            toast.error(error?.response?.data?.message || 'Something went wrong!');
        }
    })
    return {
        deleteDraft
    }
}

export const useGetDraft = ({id})=>{
    const getDraft = useQuery(['draft',id],()=>getDraftAPI({draftId : id}), {
        select : (data)=>data.draft,
        refetchOnWindowFocus : false,
        refetchOnMount : false,
        refetchOnReconnect : false,
        retry : 0,
        onError : (error)=>{
            toast.error(error?.response?.data?.message || 'Something went wrong!');
        }
    });

    return {
        getDraft
    }
}

export const useUpdateDraft = ()=>{
    const queryClient = useQueryClient();
    const updateDraft = useMutation(updateDraftAPI, {
        onSuccess : (data)=>{
            queryClient.setQueryData(['draft', data?.draft?.draftId], data?.draft);
            toast.dismiss();
            toast.success('Draft has been updated!');
        },
        onError: (error) => {
            toast.dismiss();
            toast.error(error?.response?.data?.message || 'Something went wrong!');
        }
    })

    return {
        updateDraft
    }
}
export const useCreateDraft = ()=>{
    const addItemToDraft = useMutation(addDraftAPI, {
        onSuccess: async (data) => {
            toast.dismiss();
            toast.success('Item added to draft successfully!');
            // Optionally, you can refetch the discount data after adding the item
        },
        onError: (error) => {
            // Handle error when adding item to cart
            // You can display an error message or perform any necessary actions
            toast.dismiss();
            toast.error(error?.response?.data?.message || 'Failed to add item to draft');
        },
    });

    return {
        addItemToDraft
    }
}