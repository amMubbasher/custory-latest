import React, { useState } from "react";
import { MdArrowBack } from "react-icons/md";
import AccountLayout from "../../../components/Account/AccountLayout";
import { useFetchAdminOrders, useFetchGifts } from "../../../hooks/useGifts";
import BasicModal from "../../../components/common/BasicModal";
import noDraftSVG from "../../../assets/no-drafts.svg";
import ErrorState from "../../../components/Account/ErrorState";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { usePrices } from "../../../hooks/usePrices";
import { IconButton, TextField, Button } from "@mui/material";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { Close } from '@mui/icons-material';
import useOrder from "../../../hooks/useOrder";
import useAppStore from "../../../hooks/useAppStore";
import { useStripe } from "../../../hooks/useStripe";
import { disableCancelBtn } from "../../../utils/Enums";

export const ConfirmationModal = ({open, handleClose, orderId, paymentIntentId}) =>{
  const [cancellationReason, setCancellationReason] = useState('');
  const setOrders = useAppStore(state=>state.setOrders);
  const orders = useAppStore(state=>state.orders);
  const {stripeRefundCall} = useStripe();
  const { updateOrder } = useOrder({
    placeOrderSuccessCallback:(data)=>{
      if (data?.status) {
        const index = orders.findIndex(
          (order) => order.id === data?.updatedDetails.id
        );
        if (index > -1) {
          orders[index] = data.updatedDetails;
          setOrders([...orders]);
        }
        stripeRefundCall.mutate({data:{paymentIntentId, orderId, updatedDetail: data?.updatedDetails}})
      }
    }
  });

  const handleModalClose = ()=>{
    handleClose();
    setCancellationReason("")
  }

  return(
    <BasicModal open={open} handleClose={handleModalClose}>
      <div className='w-[500px] max-sm:w-[90vw] max-sm:px-3 bg-white px-6 py-4 rounded-md'>
        <div className='text-2xl font-semibold max-sm:text-xl text-black flex items-center justify-between'>
          <span>Provide Cancellation Reason</span>
          <IconButton onClick={() => handleModalClose()} sx={{padding:0}}><Close sx={{}}/></IconButton>
        </div>
        <div className='w-full mt-5'>
          <TextField
            fullWidth
            sx={{ marginTop: "16px" }}
            size="small"
            rows={3}
            multiline
            label="Reason for Cancelling the Order"
            variant="outlined"
            required
            name="cancellationReason"
            value={cancellationReason}
            type="text"
            onChange={({target:{value}})=>setCancellationReason(value)}
            id="code-field"
          />
        </div>
        <div className="flex items-center justify-end pt-3 max-sm: gap-2">
          <Button autoFocus variant="contained" color="error" onClick={() => handleModalClose()}>
            Decline
          </Button>
          <Button disabled={!cancellationReason} variant="contained" color="success" autoFocus 
            onClick={() => {
              updateOrder({
                data: { 
                  id: orderId,
                  status: 'cancelled',
                  cancelReason: cancellationReason
                },
              });
              handleClose();
              setCancellationReason('');
            }} 
          >
            Proceed
          </Button>
        </div>
      </div>
    </BasicModal>
  )
}

const OrderItem = ({ order }) => {
  const [openConfirmationModel,setOpenConfirmationModel] = useState(false)
  const userSidePhases= [ "delivery in progress", "delivery not started", "supplier has delivered order to warehouse", "supplier’s order has arrived at warehouse", "Warehouse has dispatched the order", "Warehouse has completed quality check"]
  const navigate = useNavigate();
  const {p,f} = usePrices();
  return (
    <>
      <div className="lg:hidden border-2 rounded-md flex flex-col items-center p-2 space-x-4">
        <div className="p-0.5 flex flex-row items-center gap-3 w-full">
          {order?.items?.sort((a,b)=> a?.noOfSidesPrinted - b?.noOfSidesPrinted)?.slice(0, 4).map((item) => {
            return (
              <div key={item.id}>
                <img
                  alt="product"
                  src={`https://custorybucket.s3.ap-southeast-1.amazonaws.com/Products/${item?.productId}/${item?.color}/front.jpg`}
                  className="w-[70px] object-contain h-[70px]"
                  onContextMenu={(e) => e.preventDefault()}
                />
              </div>
            );
          })}
          {order?.items?.length > 4 ? 
            <span className="text-xs" onClick={() => navigate(`/account/mygifts/${order.id}`)}>
              + {order?.items?.length - 4} more items
            </span> : null          
          }
        </div>
        <div className="flex items-start flex-col justify-start w-full">
          <div className="font-bold my-2">
            {order?.items?.at(0)?.product?.title}{" "}
            {order?.items?.length > 1 ? ` and ${order?.items?.length - 1} more items` : ""}
          </div>
          <div className="flex flex-col text-sm w-full">
            <div className="flex items-center gap-2 w-full">
              <span className="text-sm w-[35%] whitespace-nowrap">Order No :</span>
              <span className="capitalize font-semibold text-sm w-[60%] whitespace-nowrap">#{`${order?.id.slice(0, 12)}...${order?.id.slice(-4)}`}</span>
            </div>
            <div className="flex items-center gap-2 w-full">
              <span className="text-sm w-[35%] whitespace-nowrap">Shipping Date :</span>
              <span className="capitalize font-semibold text-sm w-[60%] whitespace-nowrap">{order?.shippingDate}</span>
            </div>
            <div className="flex items-center gap-2 w-full">
              <span className="text-sm w-[35%] whitespace-nowrap">Delivered To :</span>
              <span className="capitalize font-semibold text-sm w-[60%] whitespace-nowrap">
                {order?.customerFirstName} {order?.customerLastName}
              </span>
            </div>
            <div className="flex items-center gap-2 w-full">
              <span className="text-sm w-[35%] whitespace-nowrap">Order Status :</span>
              <span className="capitalize font-semibold text-sm w-[60%] whitespace-nowrap">{userSidePhases.includes(order?.status) ? 'Order Pending Dispatch' : order?.status == "delivery is completed" ? "Order Dispatched" : order?.status}</span>
            </div>
          </div>
          {/* <div className='text-xs  text-blue-600'>Status : In Transit</div> */}
          <div className="w-full flex flex-col items-center gap-3 mt-4 pr-4">
            <button onClick={() => navigate(`/account/mygifts/${order.id}`)} className="w-full outline-none text-sm cursor-pointer font-semibold px-4 py-[2px] border-2 rounded-md shadow-lg xl:text-sm 2xl:px-8" >
              View order details
            </button>
            {(!['cancelled', 'refunded']?.includes(order?.status)) ? <button
              onClick={()=>setOpenConfirmationModel(true)}
              disabled={disableCancelBtn.includes(order?.status)}
              className="w-full text-sm cursor-pointer px-4 py-[2px] text-center font-semibold disabled:cursor-not-allowed disabled:text-gray-400 text-[#EC1C24] border-2 rounded-md shadow-lg xl:text-sm 2xl:px-8 outline-none"
              data-tooltip-html={disableCancelBtn.includes(order?.status) ? "<div class='w-[300px]'> This order cannot be canceled because production has already started </div>" : ""}
              data-tooltip-id="disable-cancel-btn"
            >
              <span>Cancel Order</span>
            </button> : null}
            <ReactTooltip id="disable-cancel-btn" place="bottom" />
          </div>
        </div>
      </div>
      <div className="hidden lg:block rounded-md font-default border-2">
        <div className="">
          <div className="justify-between p-3 bg-gray-100 text-gray-500 flex items-center">
            <div className="flex space-x-7 items-center text-sm">
              <div className="flex flex-col">
                <div className="">Shipping Date</div>
                <div className="font-semibold">{order?.shippingDate}</div>
              </div>
              <div className="flex flex-col">
                <div>Total</div>
                <div className="font-semibold">{f(p(order?.total) /100)}</div>
              </div>
              <div className="flex flex-col">
                <div>Delivered To</div>
                <div className="font-semibold">
                  {order?.customerFirstName} {order?.customerLastName}
                </div>
              </div>
            </div>
            <div className="flex flex-col text-sm">
              <div className="flex items-center gap-2">
                <span className="text-sm">Order No :</span>
                <span className="capitalize font-semibold text-sm">#{`${order?.id.slice(0, 12)}...${order?.id.slice(-4)}`}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm">Order Status :</span>
                <span className="capitalize font-semibold text-sm">{userSidePhases.includes(order?.status) ? 'Order Pending Dispatch' : order?.status == "delivery is completed" ? "Order Dispatched" : order?.status}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 mt-1 flex justify-between 3xl:p-5">
          <div>
            <div className="flex space-x-5 items-center mt-3">
              {order?.items?.sort((a,b)=> a?.noOfSidesPrinted - b?.noOfSidesPrinted)?.slice(0, 10).map(item => {
                return (
                  <div key={item.id}>
                    <div className="w-[55px] h-[55px] max-sm:h-[45px] max-sm:w-[45px] rounded-md"
                      style={{ background: `url(https://custorybucket.s3.ap-southeast-1.amazonaws.com/Products/${item?.productId}/${item?.color}/front.jpg) center center/cover` }}
                    ></div>
                  </div>
                );
              })}
              {order?.items?.length > 10 ? 
                <span className="text-sm cursor-pointer" onClick={() => navigate(`/account/mygifts/${order.id}`)}>
                  + {order?.items?.length - 10} more items
                </span> : null          
              }
            </div>
            <div className="mt-2 text-sm">
              {order?.items?.length} Items in this Order
            </div>
          </div>
          <div>
            <button onClick={() => navigate(`/account/mygifts/${order.id}`)} className="w-full block disabled:cursor-not-allowed text-xs font-semibold outline-none cursor-pointer px-4 py-[2px] border-2 rounded-md shadow-lg xl:text-sm 2xl:px-8" >
              View order details
            </button>
            {(!['cancelled', 'refunded']?.includes(order?.status)) ? <button
              onClick={()=>setOpenConfirmationModel(true)}
              disabled={disableCancelBtn.includes(order?.status)}
              className="w-full block text-xs outline-none cursor-pointer px-4 py-[2px] disabled:cursor-not-allowed disabled:text-gray-400 mt-2 text-center font-semibold text-[#EC1C24] border-2 rounded-md shadow-lg xl:text-sm 2xl:px-8"
              data-tooltip-html={disableCancelBtn.includes(order?.status) ? "<div> This order cannot be canceled because production has already started </div>" : ""}
              data-tooltip-id="disable-cancel-btn"
            >
              Cancel Order
            </button> : null}
            <ReactTooltip id="disable-cancel-btn" place="top" />
          </div>
        </div>
      </div>
      <hr className="lg:hidden" />
      <ConfirmationModal open={openConfirmationModel} handleClose={()=>setOpenConfirmationModel(false)} orderId={order?.id} paymentIntentId={order?.paymentId}/>
    </>
  );
};

const Orders = () => {
  const { role } = JSON.parse(localStorage.getItem('CUSTORY_AUTH') || '{}')?.user || {};
  const fetchGifts = role === "admin" ? useFetchAdminOrders()?.fetchGifts : useFetchGifts()?.fetchGifts;
  const { data: giftData = null, isLoading = false, error = null } = fetchGifts || {};
  const orders = useAppStore(state=>state.orders);
  const navigate = useNavigate();
  return (
    <AccountLayout>
      <div className="p-3 font-poppins lg:p-4">
        <div className="text-2xl font-semibold flex items-center gap-4">
          <MdArrowBack onClick={()=>navigate('/account')} className="hidden max-md:block" /> MY ORDERS
        </div>
        <div className="w-[5%] mt-1 h-[5px] bg-primary"></div>
        {/* <div className="mt-4 flex space-x-3 items-center">
          <div className="w-[100%]">
            <input
              type="text"
              className="text-sm border-2 outline-none w-[100%] lg:p-2 p-[6px] rounded-md"
              placeholder="Search All Orders"
            />
          </div>
          <div>
            <select
              name="filterOrders"
              className="border-2 lg:p-[7px] p-1 rounded-md"
              id="filterOrder"
            >
              <option value="AllOrders">All Orders</option>
              <option value="Active Orders">Active Orders</option>
              <option value="Active Orders">Delivered Orders</option>
              <option value="cancelledOrders">Cancelled Orders</option>
            </select>
          </div>
        </div> */}
        <hr className="lg:hidden" />
        {error ? (
          <ErrorState />
        ) : isLoading ? (
          <div className="w-full flex-col text-primary h-[50vh] flex items-center justify-center">
            <CircularProgress color="inherit" />
            <div className="text-center mt-2 text-base text-black">
              Loading..
            </div>
          </div>
        ) : orders?.length === 0 ? (
          <div className="w-full h-[300px] flex items-center justify-center mt-16 flex-col">
            <img src={noDraftSVG} className="w-[60%] object-contain h-full" onContextMenu={(e) => e.preventDefault()} />
            <div className="mt-6 text-xl">No Orders Found!</div>
          </div>
        ) : (
          <div className="mt-6 space-y-3 lg:space-y-6">
            {orders?.map((item) => (
              <OrderItem key={item.id} order={item} />
            ))}
          </div>
        )}
      </div>
    </AccountLayout>
  );
};

export default Orders;