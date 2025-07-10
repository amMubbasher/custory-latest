import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { deleteCartAPI, getCartAPI, updateCartAPI, addItemToCartAPI, deleteCartItemAPI } from "../api/cart.api";
import useAppStore from "./useAppStore";
import downloadImage from "../utils/functions/downloadImage";
import uploadImageToS3 from "../utils/functions/uploadImageToS3";
import { useGetDrafts } from "./useDraft";


const useCart = (props={})=>{
    const {updateCartErrorCallback = false, updateCartSuccessCallback = false} = props;
    // const {isLoggedin} = useAuth();
    const isLoggedin = useAppStore(state=>state.isLoggedin);
    const queryClient = useQueryClient();

    const setSelectedImage = useAppStore(state=>state.setSelectedImage);
    const updateSelectedProducts = useAppStore(state=>state.updateSelectedProducts);
    const frontUploadedImage = useAppStore(state=>state.frontUploadedImage);
    const backUploadedImage = useAppStore(state=>state.backUploadedImage);
    const frontUploadedLogo = useAppStore(state => state.frontUploadedLogo);
    const backUploadedLogo = useAppStore(state => state.backUploadedLogo);
    const uploadedFiles = useAppStore(state=>state.uploadedFiles);
    const productDataUpdated = useAppStore(state => state.productDataUpdated);
    const selectedColorUpdated = useAppStore(state => state.selectedColorUpdated);
    const {getDrafts} = useGetDrafts()


    const setClientState = ()=>{
        let data = queryClient.getQueryData(['cart']);
        if (data && data?.cart && data?.cart?.items?.length>0) {
            let cart = data?.cart;
            let {momentsImage, items} = cart;
            setSelectedImage(momentsImage);
            items.forEach(item=>{
                updateSelectedProducts({product : item.product, quantity : item.quantity, content : item.content});
            })
        }
    }

    const {data : cart, isLoading : isFetchCartLoading, isError : isFetchCartError, error : fetchCartError, refetch} = useQuery(['cart'],getCartAPI, {
        staleTime : 1000*60,
        cacheTime : 10*60*10000,
        refetchOnWindowFocus : false,
        refetchOnMount : false,
        refetchOnReconnect : false,
        retry : 0,
        enabled : isLoggedin,
        select : (data)=>data?.cart
    });

    useEffect(()=>{
        if (isLoggedin) {
            setClientState();
        }
    }, [cart?._id])

    const {mutate : updateCart,data : updatedCartData, isLoading : isUpdateCartLoading,isError : isUpdateCartError, error : updateCartError} = useMutation(updateCartAPI, {
        onSuccess : (data)=>{
            let currentData = queryClient.getQueryData(['cart']);
            queryClient.setQueryData(['cart'],{
                ...currentData,
                cart : data.cart
            });
            if (updateCartSuccessCallback) updateCartSuccessCallback(data);
        },
        onError : (error)=>{
            toast.dismiss();
            toast.error(error?.response?.data?.message || 'Something went wrong!');
            if (updateCartErrorCallback) updateCartErrorCallback(error);
        },
    });

    const {mutate : deleteCart, data : deleteCartData,isLoading : isDeleteCartLoading, error : deleteCartError } = useMutation(deleteCartAPI, {
        onSuccess : (data)=>{
            getDrafts.refetch();
            queryClient.setQueryData(['cart'],null);
            // toast.success('Deleted Cart successfully!');
        },
        onError : (data)=>{
            toast.dismiss();
            toast.error(data?.response?.data?.message || 'Something went wrong!');
        }
    });

    const {mutate: deleteItemFromCart, isLoading: isDeleteCartItemLoading, error: deleteItemFromCartError} = useMutation(deleteCartItemAPI, {
        onSuccess: async (data) => {
            let currentData = queryClient.getQueryData(['cart']);
            currentData.cart.items = currentData.cart.items.filter((item)=> item.id !== data.result.itemId)
            queryClient.setQueryData(['cart'], { ...currentData });
            refetch();
            getDrafts.refetch();
            toast.dismiss();
            toast.success('Item successfully removed from cart!');
        },
        onError: (error) => {
            // Handle error when adding item to cart
            toast.dismiss();
            toast.error(error?.response?.data?.message || 'Failed to remove item from cart');
        },
    });

    const {mutate : addItemToCart, isLoading : isAddItemToCartLoading, error : addItemToCartError} = useMutation(addItemToCartAPI, {
        onSuccess: async (data) => {
            const frontPresignedUrl = data.presignedUrls.frontUrl
            const backPresignedUrl = data.presignedUrls.backUrl
            const frontLogoresignedUrl = data.presignedUrls.frontWithoutTemplate
            const backLogoPresignedUrl = data.presignedUrls.backWithoutTemplate

            // Front Upload Logo

            if(frontUploadedLogo!=null){
              const frontLogoData = await downloadImage(frontUploadedLogo)
              uploadImageToS3(frontLogoresignedUrl, frontLogoData)
            }

            // Front Uploaded Image

            if(frontUploadedImage!=null){
              const frontImageData = await downloadImage(frontUploadedImage)
              uploadImageToS3(frontPresignedUrl, frontImageData)
            } else if(localStorage['frontImage']) {
                const frontImageData = await downloadImage(localStorage['frontImage'])
                uploadImageToS3(frontPresignedUrl, frontImageData)
            } else {
                const frontImage = `https://custorybucket.s3.ap-southeast-1.amazonaws.com/Products/${productDataUpdated.id}/${selectedColorUpdated}/front.jpg?cacheclearer=4`
                const frontImageData = await downloadImage(frontImage)
                uploadImageToS3(frontPresignedUrl, frontImageData)
            }

            // Back Upload Logo

            if(backUploadedLogo!=null){
                const backLogoData = await downloadImage(backUploadedLogo)
                uploadImageToS3(backLogoPresignedUrl, backLogoData)
            }

            // Front Uploaded Image
            
            if(backUploadedImage!=null){
                const backImageData = await downloadImage(backUploadedImage)
                uploadImageToS3(backPresignedUrl, backImageData)
            } else if(localStorage['backImage']) {
                const backImageData = await downloadImage(localStorage['backImage'])
                uploadImageToS3(backPresignedUrl, backImageData)
            } else {
                const backImage = `https://custorybucket.s3.ap-southeast-1.amazonaws.com/Products/${productDataUpdated.id}/${selectedColorUpdated}/back.jpg?cacheclearer=4`
                const backImageData = await downloadImage(backImage)
                uploadImageToS3(backPresignedUrl, backImageData)
            }

            for (let index = 0; index < data.presignedUrls.additionalFiles.length; index++) {
                uploadImageToS3(data.presignedUrls.additionalFiles[index], uploadedFiles[index])
            }

            delete localStorage['frontImage'];
            delete localStorage['editorProduct'];
            delete localStorage['backImage'];

            // Handle successful addition of item to cart
            // You can update UI, show a success message, etc.
            toast.dismiss();
            toast.success('Item added to cart successfully!');
            // Optionally, you can refetch the cart data after adding the item
            queryClient.invalidateQueries('cart');
        },
        onError: (error) => {
            // Handle error when adding item to cart
            // You can display an error message or perform any necessary actions
            toast.dismiss();
            toast.error(error?.response?.data?.message || 'Failed to add item to cart');
        },
    });

    return {
        cart : cart || {},
        isFetchCartLoading,
        isFetchCartError,
        fetchCartError,
        isUpdateCartLoading,
        isUpdateCartError,
        updateCartError,
        setClientState,
        updateCart,
        addItemToCart,
        isAddItemToCartLoading,
        setClientState,
        items : cart?.items || [],
        total : cart?.total || 0,
        totalItems : cart?.items?.length || 0,
        deleteCart,
        deleteCartData,
        deleteCartError,
        isDeleteCartLoading,
        deleteItemFromCart,
        refetch
    }
}

export default useCart;