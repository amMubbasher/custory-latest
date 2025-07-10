import { CircularProgress } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { getAdminOrderAPI } from '../api/order.api';
import ErrorState from '../components/Account/ErrorState';
import Layout from '../components/Layout/Layout';
import { usePrices } from '../hooks/usePrices';
import { useQueryParams } from '../hooks/useQueryParams'
import { OrderItem } from './Account/myorders/OrderDetail';

const AdminOrder = () => {
    const {getParam} = useQueryParams();
    const [data,setData] = useState(null)
    const token = getParam("token");
    const navigate = useNavigate();
  const {p,f} = usePrices();

  
    if (!token) {
      navigate('/');
    }
    const {mutate, data:fetchedD, isLoading,isError, error} = useMutation(getAdminOrderAPI, {
        onSuccess: (data) => {
            setData(data?.order)
        },
        onError: (error) => {
            toast.error(error?.resonse?.data?.message || 'Something went wrong');
        }
    })
    useEffect(()=>{
        mutate({
            token
        })
    }, [])
  return (
    <Layout>
    {error ? (
        <ErrorState
          error={error?.response?.data?.message || "Something went wrong!"}
        />
      ) : isLoading ? (
        <div className="h-[60vh]  flex items-center justify-center w-full flex-col text-primary">
          <CircularProgress color="inherit" size={45} />
          <div className="text-lg mt-2 text-black">Loading..</div>
        </div>
      ) : (
        <div className="font-default px-12 max-sm:px-6">
          <div className="p-2 pb-3 border-b-[2px] ">
            <div className="text-sm text-gray-500 font-semibold">
              #{data?._id?.substr(0, 10)}
            </div>
            <div className="mt-1 text-2xl font-bold font-poppins ">
              ORDER DETAILS
            </div>
          </div>
          <div className="mt-3 p-2">
            <div className="font-semibold text-lg">Items in this Order</div>
            <div className="mt-2 space-y-3">
              {data?.items?.map((item) => (
                <OrderItem key={item._id} data={item} />
              ))}
            </div>
          </div>
          <div className="mt-3 p-2">
            <div className="font-semibold text-lg">Drawing Style</div>
            <div className="mt-2 flex items-center p-1 rounded-md border-[1px] justify-between">
              <div className="flex items-center gap-3">
                <div
                  style={{
                    background: `url(${data?.drawingStyle?.images?.at(
                      0
                    )}) center center/cover`,
                  }}
                  className="w-[50px] bg-gray-200 rounded-full h-[50px]"
                ></div>
                <div>
                  <div className="text-base font-semibold">
                    {data?.drawingStyle?.title}
                  </div>
                  <div className="text-gray-500 text-sm">
                    Price: ${p(data?.drawingStyle?.price)} * {data?.numberOfPeople}{" "}
                    (People) = 
                    {f(p(+data?.drawingStyle?.price * +data?.numberOfPeople))}{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-5 p-2">
            <div className="font-semibold text-lg">Order Summary</div>
            <div className="mt-3">
              <div className="justify-between flex">
                <div>Items Subtotal(3) : </div>
                <div>{f(p(data?.subTotal))}</div>
              </div>
              <div className="justify-between flex">
                <div>Delivery Charges : </div>
                <div>{f(p(data?.total - data?.subTotal))}</div>
              </div>
              <div className="justify-between flex mt-3">
                <div className="font-bold">Grand Total : </div>
                <div className="font-bold">{f(p(data?.total))}</div>
              </div>
            </div>
          </div>
         {data?.additionalComments&&<div className="mt-5 p-2">
            <div className="text-lg font-semibold">Additional Comments</div>
            <div className="mt-1">
              <div className="text-base opacity-70">{data?.additionalComments}</div>
            </div>
          </div>}
          <div className="mt-5 p-2">
            <div className="text-lg font-semibold">Delivery Address</div>
            <div className="mt-2">
              <div className="text-sm font-[600]">
                {data?.customerFirstName} {data?.customerLastName}
              </div>
              <div>{data?.customerEmail} | {data?.customerPhoneNumber}</div>
              <div>{data?.customerAddress}</div>
              <div>
                <span className="font-[600]">Shipping Date: </span>
                {data?.shippingDate}
              </div>
            </div>
          </div>
          <div className="flex mt-7 p-2">
            <div className="px-3 py-1 bg-accent text-white rounded-md">
              Cancel Order
            </div>
          </div>
        </div>)}
    </Layout>
  )
}

export default AdminOrder