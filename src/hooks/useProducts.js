import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchProductsAPI, fetchProductAPI, addProductAPI, fetchSupplierProductsAPI, deleteProductAPI, updateProductAPI } from "../api/products.api";
import { toast } from "react-hot-toast";
import useAppStore from "./useAppStore";
import { useEffect } from "react";
import downloadImage from "../utils/functions/downloadImage";
import uploadImageToS3 from "../utils/functions/uploadImageToS3";
import useOrder from "./useOrder";

// Used to handle the products
export const useFetchAllProducts = () => {
  const fetchProducts = useQuery(["products"], fetchProductsAPI, {
    onError : (error)=>{
        toast.error(error?.response?.data?.message);
    },
    select: (data) => data?.products,
    refetchOnWindowFocus : false,
    refetchOnMount : false,
    refetchOnReconnect : false,
    retry : 0,
  });
  return {
    fetchProducts,
  };
};

export const useFetchProduct = (productId) => {
  const fetchProduct = useQuery(["product", productId], ()=>fetchProductAPI(productId), {
    onError : (error)=>{
        toast.error(error?.response?.data?.message);
    },
    select  :(data)=>data?.product,
    refetchOnWindowFocus : false,
    refetchOnMount : false,
    refetchOnReconnect : false,
    enabled: Boolean(productId),
    retry : 0,
  });
  return {
    fetchProduct,
  };
};

export const useFetchSupplierProduct = ({ userId }) => {
  const fetchProducts = useQuery(["products", userId], () => fetchSupplierProductsAPI(userId),{
    onError: (error) => {
      toast.error(error?.response?.data?.message);
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    retry: 0,
    select: (data) => (data.products || []).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
  });

  return { fetchProducts };
};

export const useDeleteProduct = (props={})=>{
  const {placeOrderSuccessCallback, placeOrderErrorCallback} = props
  const queryClient = useQueryClient();
  const deleteProduct = useMutation(deleteProductAPI, {
      onSuccess : (data)=>{
          queryClient.invalidateQueries(['product']);
          placeOrderSuccessCallback && placeOrderSuccessCallback(data)
          toast.dismiss();
          toast.success('Product has been deleted successfully!');
      },
      onError : (error)=>{
          toast.error(error?.response?.data?.message || 'Something went wrong!');
      }
  })
  return {
    deleteProduct
  }
}

// Used to handle add/update the products
const useProducts = () => {
  const addProductPayload = useAppStore((state)=> state.addProductPayload);
  const setAddProductPayload = useAppStore((state)=> state.setAddProductPayload);

  const { presignedUrlProduction, presignedUrlProductionData } = useOrder({
    placeOrderSuccessCallback: async (data) => {
      if (!data?.presignedUrl) return;
      
      const presignedUrlBase = data?.presignedUrl.split('?X-Amz')[0];
    
      for (const item of addProductPayload?.colours) {
        const itemColor = item.color.replace('#', '');
        
        // Check for front image
        if (presignedUrlBase.includes(itemColor) && presignedUrlBase.includes('front')) {
          const frontImageData = await downloadImage(item?.frontImage);
          await uploadImageToS3(data?.presignedUrl, frontImageData);
    
        // Check for back image
        } else if (presignedUrlBase.includes(itemColor) && presignedUrlBase.includes('back')) {
          const backImageData = await downloadImage(item?.backImage);
          await uploadImageToS3(data?.presignedUrl, backImageData);
        }
      }
    }      
  });

  const {mutate : addProduct, isLoading : isAddProductLoading, error : addProductError} = useMutation(addProductAPI, {
    onSuccess: async (data) => {
      if (data.status && Array.isArray(data?.coloursWithImages) && Array.isArray(addProductPayload?.colours)) {
        for (const element of data?.coloursWithImages) {
          for (const item of addProductPayload?.colours || []) {
            if (element?.color === item.color.replace('#', '')) {
              ['front','back'].map((key)=>{
                presignedUrlProduction({
                  data: {
                    url: `${element?.key}${key}.jpg`,
                    bucket: 'custorybucket'
                  },
                })
              })
            }
          }
        }
        if(addProductPayload?.sizingChartImage){
          const sizingChartImage = await downloadImage(addProductPayload?.sizingChartImage);
          await uploadImageToS3(data?.sizingChartURL, sizingChartImage);
        }
        setTimeout(() => {
          setAddProductPayload(null);        
        }, 1000);
      }      
      toast.dismiss();
      toast.success('Product added successfully!');
    },
    onError: (error) => {
        toast.dismiss();
        toast.error(error?.response?.data?.message || 'Failed to add Product');
    },
  });

  const {mutate : updateProduct, isLoading : isupdateProductLoading, error : updateProductError} = useMutation(updateProductAPI, {
    onSuccess: async (data) => {
      if (data.status && Array.isArray(data?.coloursWithImages) && Array.isArray(addProductPayload?.colours)) {
        for (const element of data?.coloursWithImages) {
          for (const item of addProductPayload?.colours || []) {
            if (element?.color === item.color.replace('#', '') && (!item?.frontImage?.includes('https://custorybucket.s3.ap-southeast-1.amazonaws.com/Products/') || !item?.backImage?.includes('https://custorybucket.s3.ap-southeast-1.amazonaws.com/Products/'))) {
              ['front','back'].map((key)=>{
                presignedUrlProduction({
                  data: {
                    url: `${element?.key}${key}.jpg`,
                    bucket: 'custorybucket'
                  },
                })
              })
            }
          }
        }
        if(!addProductPayload?.sizingChartImage?.includes('https://custorybucket.s3.ap-southeast-1.amazonaws.com/Sizes/') && addProductPayload?.sizingChartImage !== null){
          const sizingChartImage = await downloadImage(addProductPayload?.sizingChartImage);
          await uploadImageToS3(data?.sizingChartURL, sizingChartImage);
        }
        setTimeout(() => {
          setAddProductPayload(null);        
        }, 1000);
      }      
      toast.dismiss();
      toast.success('Product updated successfully!');
    },
    onError: (error) => {
      toast.dismiss();
      toast.error(error?.response?.data?.message || 'Failed to update Product');
    },
  });

  return {
    addProduct,
    updateProduct
  }
};

export default useProducts;
