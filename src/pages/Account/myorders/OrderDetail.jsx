import { CircularProgress,TextField, IconButton } from "@mui/material";
import { Close } from '@mui/icons-material';
import React, { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { MdOutlineFileDownload } from "react-icons/md";
import { ImPencil } from "react-icons/im";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useParams, useNavigate } from "react-router-dom";
import { Workspace } from "polotno/canvas/workspace";
import { createStore } from "polotno/model/store";
import { ConfirmationModal } from "./index";
import { Tooltip as ReactTooltip } from "react-tooltip";
import AccountLayout from "../../../components/Account/AccountLayout";
import ErrorState from "../../../components/Account/ErrorState";
import BasicModal from "../../../components/common/BasicModal";
import { useFetchGift } from "../../../hooks/useGifts";
import { getImageLinkFromTemplate } from "../../../utils/functions/getImageLinkFromTemplate";
import CustomLightBox from "../../../components/Account/CustomLightBox";
import { createImageSlides } from "../../../utils/functions/createImageSlides";
import { usePrices } from "../../../hooks/usePrices";
import { orderDetailPDF } from "../../../components/Checkout/GeneratePDF";
import { formatNumbers } from "../../../utils/functions/formatNumbers";
import useOrder from "../../../hooks/useOrder";
import { disableCancelBtn, orderPhasesArr, orderPhasesDisabledArr, userSidePhases } from "../../../utils/Enums";
// import useCart from '../../../hooks/useCart';

// AccountLayout

const store = createStore({
  key: "nFA5H9elEytDyPyvKL7T",
  // showCredit: true,
});

export const OrderItem = ({ data, orderId }) => {
  const [productionNotStarted, ...newStatusArray] = userSidePhases;
  const { f, p } = usePrices();
  const navigate = useNavigate();
  const [selectedData, setSelectedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const showImg = async () => {
    try {
      setIsLoading(true);
      const slides = await createImageSlides([
        data?.frontDesign,
        data?.backDesign,
      ]);
      setSelectedData(slides);
      setIsOpen(true);
    } catch (err) {
      toast.error("Image unavailable");
    } finally {
      setIsLoading(false);
    }
  };
  let url = `https://custorybucket.s3.ap-southeast-1.amazonaws.com/Products/${data?.productId}/${data?.product?.colours[0]}/front.jpg`;
  let modifiedFrontUrl = !window.location.href.includes('http://localhost:5173') ? `https://custory-order.s3.ap-southeast-1.amazonaws.com/${data?.frontDesign}`.replace('/custory-cart', ''): `https://custory-cart.s3.ap-southeast-1.amazonaws.com/${data?.frontDesign}`;
  let modifiedBackUrl = !window.location.href.includes('http://localhost:5173') ? `https://custory-order.s3.ap-southeast-1.amazonaws.com/${data?.backDesign}`.replace('/custory-cart', ''): `https://custory-cart.s3.ap-southeast-1.amazonaws.com/${data?.backDesign}`;

  return (
    <>
      {/* Start Items section 10002 */}
      <div>
        <div className="flex justify-between items-center p-1 px-2">
          <div className="hidden">
            <Workspace pageControlsEnabled={false} store={store} />
          </div>
          <CustomLightBox
            isOpen={isOpen}
            handleClose={() => {
              setSelectedData(null);
              setIsOpen(false);
            }}
            slides={selectedData || []}
          />
        </div>
        <div className="w-full bg-red-100 rounded-lg p-[10px] border border-red-300">
          <div className="flex justify-between items-start max-sm:flex-wrap">
            <div className="flex items-start gap-2 max-sm:gap-4">
              <span className="h-[60px] w-[60px] max-sm:w-[80px] rounded-md bg-white">
                <img className="w-full h-full object-contain" onContextMenu={(e) => e.preventDefault()} src={url} alt="" />
              </span>
              <div className="text-[10px] text-gray-500">
                <p className="text-[12px] text-base text-black">
                  {data?.product?.title}
                </p>
                <div className="font-bold text-xs mb-2 flex flex-1 items-center">
                  <span className="mr-2 text-gray-500">Colour:</span>
                  <button
                    className="w-full h-full rounded-full"
                    style={{
                      backgroundColor: "#" + data.color,
                      width: "16px",
                      height: "16px",
                      border: "1px solid #" + data.color,
                    }}
                  ></button>
                </div>
                <p>
                  {data?.itemProductSizes?.map((item, index) => (
                    <span key={index} className="pr-1 text-xs text-gray-500">
                      {`${item?.productSize?.sizeName?.toUpperCase()} (${
                        item?.quantityPurchased
                      } Qty)  `} &nbsp;
                      {data?.itemProductSizes?.length !== index + 1 ? " | " : ""}
                    </span>
                  ))}
                </p>
                <p>
                {Object.keys(data?.printingType)?.map((key, index) => (
                    <span key={index} className="pr-1 text-xs text-gray-500 capitalize">
                      {`${key} Print`} &nbsp;
                      {Object.keys(data?.printingType)?.length !== index + 1 ? " | " : ""}
                    </span>
                  ))}
                </p>
              </div>
            </div>
            <div className="text-sm text-black max-sm:flex max-sm:flex-col max-sm:gap-1 max-sm:mt-2">
              <p className="text-sm text-black">Quantity: {data?.quantity}</p>
              <p className="text-sm text-black">
                Unit Price:{" "} {f(p(formatNumbers(data?.price / 100 / data?.quantity)))}
              </p>
              <p className="text-sm text-black">Total Price : {f(p(formatNumbers(data?.price / 100)))}</p>
            </div>
          </div>
          <p className="text-[10px] text-base text-black mt-3 mb-1">
            Customization
          </p>
          <div className="flex items-start gap-2 max-sm:mb-3">
            <div className="text-[10px] text-black mb-1 max-sm:mr-6">
              <p className="text-sm">Front Print</p>
              <p className="text-xs text-gray-500">{data?.printingType?.front || 'No Print'}</p>
              <div
                className="h-24 w-20 max-sm:h-[65px] max-sm:w-[65px] rounded-md bg-white"
                style={{ background: `url(${modifiedFrontUrl}) center center/cover` }}
              ></div>
            </div>
            <div className="text-[10px] text-black mb-1">
              <p className="text-sm">Back Print</p>
              <p className="text-xs text-gray-500">{data?.printingType?.back || 'No Print'}</p>
              <div
                className="h-24 w-20 max-sm:h-[65px] max-sm:w-[65px] rounded-md bg-white"
                style={{ background: `url(${modifiedBackUrl}) center center/cover` }}
              ></div>
            </div>
          </div>
          <div className="flex items-center justify-between max-sm:flex-col mt-2">
            <div className="max-sm:w-full max-sm:flex max-sm:items-center max-sm:justify-between">
              <span className="text-gray-500 text-sm mt-1 uppercase max-sm:block hidden">{new Date(data?.updatedAt)?.toLocaleString("en-GB", {
                day: "2-digit", month: "2-digit", year: "numeric", hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:true
              })}</span>
              <button className="text-[#FF6600] capitalize text-base ml-5 max-sm:ml-0 outline-none hover:underline max-sm:hidden block" onClick={()=> navigate(`/reviewOrder/${orderId}/${data?.id}`)}>
                Review
              </button>
            </div>
            <div className="text-xs font-normal flex justify-end align-center gap-3 max-sm:justify-between max-sm:w-full max-sm:mt-1">
              <span className="text-gray-500 text-sm mt-1 uppercase max-sm:hidden ">{new Date(data?.updatedAt)?.toLocaleString("en-GB", {
                day: "2-digit", month: "2-digit", year: "numeric", hour:'2-digit', minute:'2-digit', second:'2-digit', hour12:true
              })}</span>
              <button className="text-[#FF6600] capitalize hidden max-sm:block text-base ml-5 max-sm:ml-0 outline-none" onClick={()=> navigate(`/reviewOrder/${orderId}/${data?.id}`)}>
                Review
              </button>
              <div className="flex items-center gap-5">
                <span className={`${["delivery is completed","design approved", "production started", ...newStatusArray].includes(data?.status) ? "bg-[#09AA00]": ["design rejected"].includes(data?.status) ? 'bg-[#FF2500]' : "bg-[#ff6a00]"} rounded-2xl text-sm text-white py-[5px] px-[12px] capitalize max-sm:whitespace-nowrap`}>
                  {userSidePhases.includes(data?.status) ? 'In Production' : data?.status === "delivery is completed" ? 'Completed' : data?.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* End Items section 10002 */}
    </>
  );
};

const validate = (values,setErrorValues)=>{
  const errObj = {};
  if (!values.firstName) errObj.firstName = 'Enter your First Name';
  if (!values.lastName) errObj.lastName = 'Enter your Last Name';
  if (!values.address) errObj.address = 'Enter your Address';
  setErrorValues(errObj);
  if (Object.keys(errObj)?.length==0) return true;
  return false;
}

const Order = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { p, f } = usePrices();
  const [openConfirmationModel,setOpenConfirmationModel] = useState(false)
  const [totalPrice, setTotalPrice] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [orderData, setOrderData] = useState({});
  const [form,setForm] = useState({firstName:'',lastName:'',address:''});
  const [formError,setFormError] = useState({firstName:'',lastName:'',address:''});
  const {fetchGift: { data, isLoading, error, refetch }} = useFetchGift({ orderId: id });
  const {updatedOrder, updateOrder,isUpdateOrderLoading} = useOrder();
  // const { deleteCart } = useCart();

  const messageBgColor = {
    red:["design rejected", "cancelled", 'refunded'],
    orange:["delivery not started","design pending approval","production pending","pending order receive","delivery in progress","supplier has delivered order to warehouse","supplier’s order has arrived at warehouse","Warehouse has completed quality check","Warehouse has dispatched the order","delivery not started","delivery in progress"],
    green:["payment received", "design approved", "production started", "delivery is completed", "order received"]
  }
  const userSidePhases= [ "delivery in progress", "delivery not started", "supplier has delivered order to warehouse", "supplier’s order has arrived at warehouse", "Warehouse has dispatched the order", "Warehouse has completed quality check"]

  useEffect(() => {
    const timer = setTimeout(() => { refetch(); }, 1000);
    return () => clearTimeout(timer);
  }, [openConfirmationModel, setOpenConfirmationModel]);

  useEffect(() => {
    if (data) {
      setOrderData(data);
      const total = data?.items?.reduce((sum, item) => sum + item.price, 0);
      if (total) {
        setTotalPrice(total / 100);
      }
      if (updatedOrder?.status) {
        setOrderData(prevState => ({
          ...prevState,
          customerAddress: updatedOrder?.updatedDetails?.customerAddress,
          customerFirstName: updatedOrder?.updatedDetails?.customerFirstName,
          customerLastName: updatedOrder?.updatedDetails?.customerLastName,
        }));
      }
      setForm({
        firstName: updatedOrder?.status ? updatedOrder?.updatedDetails?.customerFirstName : data?.customerFirstName,
        lastName: updatedOrder?.status ? updatedOrder?.updatedDetails?.customerLastName : data?.customerLastName,
        address: updatedOrder?.status ? updatedOrder?.updatedDetails?.customerAddress : data?.customerAddress,
      });
      setFormError({});
    }
  }, [data, updatedOrder, openModal]);

  const statusMessage = useMemo(() => {
    const [productionStarted, ...newArray] = orderPhasesArr?.shippingPhase
    const statusMessages = {
      'payment received': 'Thank you for your payment!',
      'design pending approval': 'Your design is under review.',
      'design rejected': 'Please revise and resubmit your design.',
      'design approved': 'Your design has been successfully approved!',
      'production pending': 'Your order is waiting to enter production.',
      'production started': 'Your order is now being produced.',
      'delivery is completed': 'Your order is on its way!',
      'pending order receive': 'Your order is on the way to you.',
      'order received': 'Your order has been received.',
      'cancelled': 'Your order has been cancelled.',
      'refunded': 'Your refund has been processed and will be credited within 5–10 business days'
    };

    return newArray.includes(orderData?.status)
      ? 'Your order has not been shipped out.'
      : statusMessages[orderData?.status] || '';
  }, [data, orderData]);

  const handleChange =({target})=>{
    setFormError(prev=>({...prev,[target.name] : ''}))
    setForm((prev)=>({...prev,[target.name] : target.value}))
  };

  const handleUpdateDeliveryDetails = async ()=>{
    const validation = validate(form,setFormError);
    if(!validation) return;
    updateOrder({
      data:{
        id: data?.id,
        customerFirstName:form?.firstName,
        customerLastName:form?.lastName,
        customerAddress:form?.address
      }
    })
    setOpenModal(false);
  }
  return (
    <AccountLayout>
      {error ? (
        <ErrorState
          error={error?.response?.data?.message || "Something went wrong!"}
        />
      ) : isLoading ? (
        <div className="h-[60vh] flex items-center justify-center w-full flex-col text-primary">
          <CircularProgress color="inherit" size={45} />
          <div className="text-lg mt-2 text-black">Loading..</div>
        </div>
      ) : (
        <div className="font-default 2xl:px-5">
          <div className="flex justify-between items-center">
            <div className="mt-1 text-2xl font-bold font-poppins ">
              ORDER DETAILS
            </div>
            <div className="text-sm text-gray-500 font-semibold">
              # {orderData?.id?.substr(0, 10)}
            </div>
          </div>

          {/* Start Order Status section 10001 */}
          <div className="max-w-[400px] w-fit rounded-xl text-[16px] my-[35px] bg-gray-100 max-sm:w-full">
              <p className="text-black font-normal px-[10px] py-[5px]">
                Expected Delivery: {orderData?.shippingDate}
              </p>
              <p className={`text-left text-white font-bold p-[10px] capitalize ${messageBgColor.green.includes(orderData?.status) ? "bg-[#08AA00]" : messageBgColor.orange.includes(orderData?.status) ? "bg-[#FF6600]": messageBgColor.red.includes(orderData?.status) && "bg-[#FF2500]"} rounded-t-xl`}>
                Current Status: {userSidePhases.includes(orderData?.status) ? 'Order Pending Dispatch' : orderData?.status == "delivery is completed" ? "Order Dispatched" : orderData?.status}
              </p>
            <div className="p-[10px] w-full">
              <p className={`font-normal ${messageBgColor.green.includes(orderData?.status) ? "text-[#08AA00]" : messageBgColor.orange.includes(orderData?.status) ? "text-[#FF6600]": messageBgColor.red.includes(orderData?.status) && "text-[#FF2500]"}`}>
              {statusMessage}
            </p>
              <p className="text-[12px] text-gray-500 font-normal">Last updated: <span className="uppercase">{new Date(orderData?.updatedAt)?.toLocaleString("en-GB", {
              day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute:"2-digit", second:"2-digit", hour12: true
            })}</span></p>
            </div>
          </div>
          {/* End Order Status section */}

          <div className="flex gap-4 mt-3 max-lg:flex-col justify-between">
            <div className="w-[20%] max-sm:w-full">
              <div className={`${(['cancelled', 'refunded']?.includes(orderData?.status)) ? 'bg-[#FFF5EC]' : 'bg-[#08AA00]'} h-7  border border-transparent rounded-[15px] mb-2`}></div>
              <span className="text-base mt-3 ml-2">Payment Received</span>
            </div>
            <div className="w-[20%] max-sm:w-full">
              <div className={`${orderData?.status == 'design pending approval' || orderData?.status == 'payment received' ? 'bg-[#FF6600]' : orderPhasesArr.designPhase.includes(orderData?.status)? 'bg-[#09AA00]' : (['cancelled', 'refunded']?.includes(orderData?.status)) ? 'bg-[#FFF5EC]' : 'bg-[#FF2500]'} h-7  border border-transparent rounded-[15px] mb-2`}></div>
              <span className="text-base mt-3 ml-2">{orderData?.status == 'design pending approval' || orderData?.status == 'payment received' ? 'Pending Design Approval' : orderPhasesArr.designPhase.includes(orderData?.status)? 'Design Approved' : 'Design Rejected'}</span>
            </div>
            <div className="w-[20%] max-sm:w-full">
              <div className={`${orderData?.status == 'design approved' || orderData?.status == 'production pending' ? 'bg-[#FF6600]' : orderPhasesArr.productionPhase.includes(orderData?.status)? 'bg-[#09AA00]' : orderPhasesDisabledArr.productionPhase.includes(orderData?.status) && 'bg-[#FFF5EC]'} h-7  border border-transparent rounded-[15px] mb-2`}></div>
              <span className="text-base mt-3 ml-2">
                {orderData?.status == 'design approved' || orderData?.status == 'production pending' ? 'Pending Production' : orderPhasesArr.productionPhase.includes(orderData?.status)? 'Order Confirmed and in Production' : orderPhasesDisabledArr.productionPhase.includes(orderData?.status) && 'Order Confirmed and in Production'}
              </span>
            </div>
            <div className="w-[20%] max-sm:w-full">
              <div className={`${orderPhasesArr.shippingPhase.includes(orderData?.status) ? 'bg-[#FF6600]' : ['order received', 'delivery is completed', 'pending order receive'].includes(orderData?.status) ? 'bg-[#09AA00]' : orderPhasesDisabledArr.warehousePhase.includes(orderData?.status) && 'bg-[#FFF5EC]'} h-7  border border-transparent rounded-[15px] mb-2`}></div>
              <span className="text-base mt-3 ml-2">{orderPhasesArr.shippingPhase.includes(orderData?.status) ? 'Pending Order Dispatch' : ['order received', 'delivery is completed', 'pending order receive'].includes(orderData?.status) ? 'Order Dispatched' : orderPhasesDisabledArr.warehousePhase.includes(orderData?.status) && 'Order Pending Dispatch'}</span>
            </div>
            <div className="w-[20%] max-sm:w-full">
              <div className={`${['delivery is completed', 'pending order receive'].includes(orderData?.status) ? 'bg-[#FF6600]' : orderData?.status == 'order received' ? 'bg-[#09AA00]' : orderPhasesDisabledArr.orderPhase.includes(orderData?.status) && 'bg-[#FFF5EC]'} h-7  border border-transparent rounded-[15px] mb-2`}></div>
              <span className="text-base mt-3 ml-2">{['delivery is completed', 'pending order receive'].includes(orderData?.status) ? 'Pending Order Receive' : orderData?.status == 'order received' ? 'Order Received' : orderPhasesDisabledArr.orderPhase.includes(orderData?.status) && 'Order Received'}</span>
            </div>
          </div>

          <div className="flex justify-center items-center gap-2 mt-9">
            <div className="h-4 w-4 rounded-full bg-[#FF2500]"></div>
            <div className="text-[16px] font-normal">Rejected</div>
            <div className="h-4 w-4 rounded-full bg-[#FF6600]"></div>
            <div className="text-[16px] font-normal">Pending</div>
            <div className="h-4 w-4 rounded-full bg-[#08AA00]"></div>
            <div className="text-[16px] font-normal">Approved</div>
          </div>

          <div className="mt-3 p-2">
            <div className="font-semibold text-lg">Items</div>
            <div className="mt-2 space-y-3">
              {orderData?.items?.sort((a,b)=> a?.noOfSidesPrinted - b?.noOfSidesPrinted)?.map((item, index) => (
                <OrderItem key={index} data={item} orderId = {id} />
              ))}
            </div>
          </div>
          {/* <div className="mt-3 p-2">
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
          </div> */}

          <div className="mt-5 p-2">
            <div className="flex justify-between align-center">
              <div className="font-semibold text-lg">Delivery Address</div>
              <div className="flex align-center gap-1">
                <button className="text-base font-medium outline-none" onClick={()=> setOpenModal(true)}><ImPencil className="inline" size={14} /> Edit Details</button>
              </div>
            </div>
            <div className="mt-3">
              <div className="justify-between flex w-full">
                <div className="max-sm:font-semibold">Name</div>
                <div className="max-sm:w-[45%] max-sm:text-end">
                  {orderData?.customerFirstName} {orderData?.customerLastName}
                </div>
              </div>
              <div className="justify-between flex max-sm:flex-wrap w-full">
                <div className="max-sm:font-semibold">Delivery Address</div>
                <div className="max-sm:w-[42%] max-sm:text-start">{orderData?.customerAddress}</div>
              </div>
              <div className="justify-between flex w-full">
                <div className="max-sm:font-semibold">Estimated Shipping Date</div>
                <div className="max-sm:w-[45%] max-sm:text-end">{orderData?.shippingDate}</div>
              </div>
            </div>
          </div>
          <div className="mt-5 p-2">
            <div className="font-semibold text-lg">Order Summary</div>
            <div className="mt-3">
              <div className="justify-between flex">
                <div>Sub-total</div>
                <div>{f(p(formatNumbers(orderData?.subTotal / 100)))}</div>
              </div>
              <div className="justify-between flex">
                <div>Discounts</div>
                <div>
                  {f(p(formatNumbers(totalPrice - (orderData?.subTotal / 100))))}
                </div>
              </div>
              <div className="justify-between flex">
                <div>Shipping Cost</div>
                <div>{f(p(formatNumbers(orderData?.shippingCost / 100)))}</div>
              </div>
              <div className="justify-between flex mt-3">
                <div className="font-bold">Total Price</div>
                <div className="font-bold">
                  {f(p(formatNumbers(orderData?.total / 100)))}
                </div>
              </div>
            </div>
          </div>

          <BasicModal open={openModal} handleClose={()=>setOpenModal(false)}>
            <div className='w-[50vw] max-md:w-[90vw] p-6'>
              <div className='flex items-center justify-between'>
                <div className='text-2xl font-semibold'>Delivery Details!</div>
                <IconButton onClick={() => setOpenModal(false)} sx={{padding:0}}><Close/></IconButton>
              </div>
              <form className='mt-12 mx-auto'>
                <div className='space-y-6'>
                  <TextField
                    fullWidth
                    label="First Name"
                    variant="outlined"
                    required
                    name="firstName"
                    value={form?.firstName}
                    type="text"
                    onChange={handleChange}
                    id="code-field"
                    error={Boolean(formError?.firstName)}
                    helperText={formError?.firstName || ''}
                  />
                  <TextField
                    fullWidth
                    label="Last Name"
                    variant="outlined"
                    required
                    name="lastName"
                    value={form?.lastName}
                    type="text"
                    onChange={handleChange}
                    id="code-field"
                    error={Boolean(formError?.lastName)}
                    helperText={formError?.lastName || ''}
                  />
                  <TextField
                    fullWidth
                    sx={{ marginTop: "16px" }}
                    size="small"
                    rows={3}
                    multiline
                    label="Address"
                    variant="outlined"
                    required
                    name="address"
                    value={form?.address}
                    type="text"
                    onChange={handleChange}
                    id="code-field"
                    error={Boolean(formError?.address)}
                    helperText={formError?.address || ''}
                  />
                  <button type="button" onClick={()=>handleUpdateDeliveryDetails()}  className='w-full disabled:opacity-50 py-2 bg-black text-white rounded-sm'>Update</button>
                </div>
              </form>
            </div>
          </BasicModal>

          {orderData?.additionalComments && (
            <div className="mt-5 p-2">
              <div className="text-lg font-semibold">Additional Comments</div>
              <div className="mt-1">
                <div className="text-base opacity-70">
                  {data?.additionalComments}
                </div>
              </div>
            </div>
          )}
          <div className="flex justify-end items-center gap-3 max-md:flex-col max-sm:flex-col-reverse">
            {(!['cancelled', 'refunded']?.includes(data?.status)) ? <button disabled={disableCancelBtn.includes(data?.status)} onClick={()=>setOpenConfirmationModel(true)} type="button"
              className="flex items-center justify-center disabled:cursor-not-allowed disabled:text-gray-400 disabled:border-gray-400 px-7 py-2 text-center rounded-md outline-none text-[#EC1C24] font-semibold border-2 border-[#EC1C24] text-lg max-md:w-full"
              data-tooltip-html={disableCancelBtn.includes(data?.status) ? "<div class='max-sm:w-[300px]'> This order cannot be canceled because production has already started </div>" : ""}
              data-tooltip-id="disable-cancel-btn"
            >
              <span>Cancel Order</span>
              <Close className="inline ml-[4px]" size={20} />
            </button> 
            : null}
            <ReactTooltip id="disable-cancel-btn" place="bottom" />
            
            <button
              onClick={() => {
                navigate("/products");
              }}
              type="button"
              className="flex items-center justify-center px-7 py-2 text-center rounded-md outline-none text-custoryPrimary font-semibold border-2 border-custoryPrimary text-lg max-md:w-full"
            >
              <span>Shop More</span>
              <HiOutlineShoppingBag className="inline ml-[4px]" size={20} />
            </button>
            <button
              onClick={() => orderDetailPDF(data, f, p)}
              type="button"
              className="flex items-center justify-center px-7 py-2 text-center rounded-md bg-custoryPrimary outline-none text-[#ffffff] border-custoryPrimary font-semibold border-2 text-lg max-md:w-full"
            >
              <span>Download Invoice</span>
              <MdOutlineFileDownload className="inline ml-[4px]" size={23} />
            </button>
          </div>
          <ConfirmationModal open={openConfirmationModel} handleClose={()=>setOpenConfirmationModel(false)} orderId={id} paymentIntentId={data?.paymentId}/>
        </div>
      )}
    </AccountLayout>
  );
};

export default Order;
