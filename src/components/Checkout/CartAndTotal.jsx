import { React, useEffect, useMemo, useState } from "react";
import DoneIcon from "@mui/icons-material/Done";
import useAppStore from "../../hooks/useAppStore";
import useCart from "../../hooks/useCart";
import { usePrices } from "../../hooks/usePrices";
import { TEST_CART_IMAGE } from "../../utils/Assets";
import { formatNumbers } from "../../utils/functions/formatNumbers";
import Button from "../common/Button";
import CheckoutCartItem from "./CheckoutCartItem";
import { calculateShippingCostAPI } from "../../api/shipping.api";
import useDiscount from "../../hooks/useDiscount";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { ShoppingCartOutlined } from "@mui/icons-material";
import { MdOutlineFileDownload, MdOutlineDiscount } from "react-icons/md";
import { HiOutlineSaveAs } from "react-icons/hi";
import GeneratePDF from "./GeneratePDF";
import BasicModal from "../common/BasicModal";
import {FormControlLabel, Radio, RadioGroup, TextField, Box, IconButton} from "@mui/material";
import { RxCross1 } from "react-icons/rx";
import { useCreateDraft, useUpdateDraft } from "../../hooks/useDraft";

export const CheckoutDrawingStyleComponent = ({ data, numberOfPeople }) => {
  const { p, f } = usePrices();
  return (
    <div className="flex py-3 border-b-[1px] items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="w-[50px] h-[50px] rounded-full" style={{background : `url(https://custorybucket.s3.ap-southeast-1.amazonaws.com/Products/${data?.items[0].product.id}/${data?.items[0].product.colours[0]}/front.jpg) center center/cover`}}></div>
        <div>
          <div className="text-base font-[600]">{data?.title} <span className="font-bold">(${(p(data?.price / 100))})</span></div>
          <div className="text-sm opacity-70 mt-[2px]">{numberOfPeople} People</div>
        </div>
      </div>
      <div className="text-lg font-semibold">{f(p(formatNumbers((+data?.price)*numberOfPeople)))}</div>
    </div>
  )
}

const CartAndTotal = ({handleCheckout,fastService,isLoading,deliveryType,deliveryDate,onCalculatedShipping,onCalculatedWeight,isReferAnyPerson,form,regularDeliveryRange, fastDeliveryRange, calculatedWeight, calculatedShipping}) => {
  const {cart} = useCart();
  const draftId = cart?.items.find((item)=> item?.draftId)?.draftId
  const {p,f} = usePrices();
  const { addItemToDraft } = useCreateDraft();
  const { updateDraft } = useUpdateDraft();
  const newTotal = cart?.items?.reduce((acc, curr) => acc + curr.price, 0);
  const [shippingFee, setShippingFee] = useState(0);
  const [totalWithShipping, setTotalWithShipping] = useState(0);
  const [totalAmount, setTotalAmount] = useState(newTotal / 100);
  const [subtotal, setSubTotal] = useState(newTotal / 100);
  const [netWeight, setNetWeight] = useState(0);
  const [appliedDiscountIndex, setAppliedDiscountIndex] = useState(null);
  const [discountId, setDiscountId] = useState('');
  const [publicDiscountCode, setPublicDiscountCode] = useState('');
  const [orderQuantity, setOrderQuantity] = useState(0);
  const [isApplied, setIsApplied] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [savingAmount, setSavingAmount] = useState(0.0);
  const [enabledDiscounts, setEnabledDiscounts] = useState([]);
  const [enabledIndex, setEnabledIndex] = useState(-1);
  const { discounts, displayDiscountInfo } = useDiscount();
  const {orderNotes,shippingDate,shippingType,shippingCost,totalWeight, ...otherValues} = form;

  const calculateShippingCost = async () => {
    if (deliveryType === 'No Delivery Type Selected') {
      setShippingFee('Please select a delivery type to calculate the shipping cost.');
      return;
    }
    const netWeight = cart.items.reduce((total, item) => total + item.product.weight * item.quantity, 0);
    setNetWeight(netWeight);
    const data = {
      shippingType: deliveryType,
      totalWeight: netWeight,
    };

    const res = await calculateShippingCostAPI({ data });
    const cost = res.cost;
    setShippingFee(cost);
  };
  useEffect(()=>{
    const totalQuantity = cart?.items?.reduce((sum, item) => sum + item.quantity, 0);
    if(totalQuantity){
      setOrderQuantity(totalQuantity)
    }
  },[])

  useEffect(()=>{
    setTotalAmount(newTotal/100);
    setSubTotal(newTotal/100);
    setEnabledIndex(-1);
  },[newTotal])

  const nearDiscount = useMemo(()=>{
    const filteredValue = enabledDiscounts.filter((item)=>item.minimumSpend > subtotal)
    const nearest = filteredValue.reduce((prev, curr) => Math.abs(curr.minimumSpend - subtotal) < Math.abs(prev.minimumSpend - subtotal) ? curr : prev , filteredValue[0]);
    if(nearest){
      return `Order ${f(p(formatNumbers(nearest?.minimumSpend - subtotal)))} more to apply discount voucher(s) '${nearest?.code}'.`
    }
    return null;
  },[enabledDiscounts])

  useEffect(()=>{
    const availableDiscounts = discounts?.filter((item) => {
      const {expired} = displayDiscountInfo(item);
      return (item.isEnable && !expired)
    }).map((item) => {
      const { daysLeft } = displayDiscountInfo(item);
      return { ...item, daysLeft };
    });

    if(availableDiscounts.length > 0){
      setEnabledDiscounts(availableDiscounts)
    }
  },[discounts])

  useEffect(() => {
    if (typeof shippingFee === 'number') {
      setTotalWithShipping(subtotal + shippingFee);
    }else{
      setTotalWithShipping(subtotal)
    }
  }, [cart?.total,subtotal,shippingFee]);

  useEffect(() => {
    calculateShippingCost();
  }, [cart.items, deliveryType]);

  useEffect(() => {
    onCalculatedShipping(shippingFee);
  }, [shippingFee]);
  
  useEffect(() => {
    onCalculatedWeight(netWeight);
  }, [netWeight]);

  const handleApplyDiscount = (index, item) => {
    const { minimumSpend, percentage, type } = item;
    if(orderQuantity!== 0){
      if ((type === 'price' && minimumSpend <= totalAmount) || (type === 'quantity' && minimumSpend <= orderQuantity)) {
        const discountValue = (percentage / 100) * (newTotal / 100);
        setSavingAmount(discountValue);
        setIsApplied(true);
        if (appliedDiscountIndex === index) {
          return;
        }

        if(appliedDiscountIndex !== index){
          setSubTotal((newTotal / 100) - discountValue);
          setTotalWithShipping((newTotal / 100) - discountValue);
          setAppliedDiscountIndex(index);
          toast.dismiss();
          toast.success("The discount has been successfully applied!");
        }else{
          setSubTotal((newTotal / 100) - discountValue);
          setTotalWithShipping((newTotal / 100) - discountValue);
          setAppliedDiscountIndex(index);
          toast.dismiss();
          toast.success("The discount has been successfully applied!");
        }
      } else {
        toast.dismiss();
        toast.error("Minimum spend requirement not met.");
      }
    }
  };

  const handlePublicDiscount = ()=>{
    const index = enabledDiscounts?.findIndex(item => item.code === publicDiscountCode);
    const filteredDiscount = enabledDiscounts[index];
    if(filteredDiscount && !filteredDiscount.newUserDisc){
      handleApplyDiscount(index, filteredDiscount);
      setDiscountId(filteredDiscount.id);
    }else if(filteredDiscount.newUserDisc){
      toast.error("This discount is only valid for the first order.");
    }else{
      toast.error("No Discount found against this code");
    }
  }
  const checkDisabledDiscount = (item)=>{
    const {minimumSpend, type, newUserDisc} = item;
    if (newUserDisc && !(JSON.parse(localStorage.getItem('CUSTORY_AUTH') || '').user.isFirstOrder)) {
      return true;
    }
    if((type == 'quantity' && orderQuantity < minimumSpend) || (type =='price' && totalAmount < minimumSpend)){
      return true;
    }
  }

  useEffect(()=>{
    const {isFirstOrder} = JSON.parse(localStorage.getItem('CUSTORY_AUTH') || '').user
    const newUserIndex = enabledDiscounts.length > 0 ? enabledDiscounts.findIndex((item) => item.newUserDisc === true) : -1 ;
    if (newUserIndex !== -1 && isFirstOrder) {
      const { id, newUserDisc } = enabledDiscounts[newUserIndex];
      if (newUserDisc) {
        handleApplyDiscount(newUserIndex, enabledDiscounts[newUserIndex]);
        setDiscountId(id);
        setIsDisabled(true);
      }
    }
  },[enabledDiscounts, discounts])

  useEffect(() => {
    enabledDiscounts?.forEach((item, index) => {
      const disabled = checkDisabledDiscount(item);
      if (!disabled && !isDisabled && enabledIndex !== index) {
        setEnabledIndex(index);
      }
    });
  }, [enabledDiscounts, isDisabled, enabledIndex]);

  return (
    <div className="bg-primary relative max-md:rounded-md max-md:order-1 bg-opacity-5 h-auto py-5  px-6 max-sm:px-3 w-full">
      <div className="">Products</div>
      <div className="space-y-5 mt-1">
        {cart?.items?.map((item,index)=>(
          <CheckoutCartItem key={index} data={item}/>
        ))}
      </div>
      <div className="mt-10 max-sm:mt-7 flex items-center gap-4">
        <div className="w-full">
          <input
            className="w-full py-[7px] max-sm:py-[6px] border-[1px] px-3 rounded-md text-lg" name="publicDiscountCode" value={publicDiscountCode}
            placeholder="Claim discount" disabled={JSON.parse(localStorage.getItem('CUSTORY_AUTH') || '').user.isFirstOrder} onChange={({target: {value} }) => {setPublicDiscountCode(value)}}
            data-tooltip-html={
              JSON.parse(localStorage.getItem('CUSTORY_AUTH') || '').user?.isFirstOrder
                ? "<div> You can only receive a 10% discount exclusively on your first order. </div>"
                : null
            }
            data-tooltip-id="info-message"
          />
          <ReactTooltip id="info-message" place="top" />
        </div>
        <Button className="py-[7px] max-sm:py-[6px] text-lg outline-none" disabled={JSON.parse(localStorage.getItem('CUSTORY_AUTH') || '').user.isFirstOrder} onClick={()=>handlePublicDiscount()}>Claim</Button>
      </div>
      <div className="h-auto">
      <h1 className="mt-3 text-gray-400 text-lg">Available discounts</h1>
      {enabledDiscounts?.length
        ? enabledDiscounts.map((item, index) => {
            const { code, percentage, minimumSpend, daysLeft, type, expiryDate, newUserDisc} = item;
            const isClicked = appliedDiscountIndex === index;
            const disabled = checkDisabledDiscount(item)
            return (
              <div key={index} className="mt-3 border border-gray-400 rounded-md overflow-hidden">
                <div className="flex items-center md:px-1.5 px-0 bg-white">
                  <div className="md:w-[130px] w-20 md:mx-2 mx-1">
                    <span className={`${disabled ? "text-gray-400" : isApplied && isClicked ? "text-[var(--custory-primary)]" : isDisabled? "text-gray-400" : "text-orange-300"} text-center md:text-lg text-sm font-normal max-md:ml-2`}>{code}</span>
                  </div>
                  <div className='w-0 h-[80px] border-r border-gray-400'/>
                    <div className="w-full px-1 flex justify-between py-2">
                      <div className='whitespace-nowrap md:ml-2 ml-1 text-gray-400'>
                        <span className='text-md sm:text-md lg:text-md font-semibold text-black block'> {percentage}% OFF</span>
                         <span className="block"> Min spend {type == "price"
                          ? `$${String(minimumSpend)}`
                          : `${String(minimumSpend)} Items`}</span>
                          <span>{expiryDate ? (`Expires ${new Date(expiryDate).toLocaleDateString()} (${daysLeft} ${daysLeft > 1 ? "Days" : "Day"} Left)`) : 'No Expiry'}</span>
                      </div>
                    <button className={`${disabled ? 'text-gray-400' : isApplied && isClicked ? "text-[var(--custory-primary)]" : isDisabled ? "text-gray-400" : "text-orange-300"} font-semibold outline-none`} disabled={disabled || isDisabled} onClick={()=>{handleApplyDiscount(index,item); setDiscountId(item.id)}}>
                      {disabled ? 'Not Applicable' : isApplied && isClicked ? <>Applied<DoneIcon/></> : isDisabled ? 'Not Applicable' : 'Apply'}
                    </button>
                  </div>
                </div>
                <div className={`${disabled ? "bg-gray-400" : isApplied && isClicked ? "bg-custoryPrimary" : isDisabled ? "bg-gray-400" : "bg-orange-300"} px-4 py-1 text-white border-1 border-t-2 border-gray-400 flex justify-between whitespace-nowrap max-md:px-2 max-md:text-xs`}>
                  {newUserDisc ? <span>
                    This discount is only valid for the first order.
                  </span> : disabled ? <span>
                    Order {type === 'quantity' && orderQuantity <= minimumSpend ? `${minimumSpend-orderQuantity} QTY` : type === 'price' && totalAmount <= minimumSpend ? `${f(p(formatNumbers(minimumSpend-subtotal)))}`: 0} more to save {percentage}% OFF
                  </span>: <span>
                    {isApplied && isClicked ? `You Saved ${f(p(formatNumbers(savingAmount)))}` :`Discount available, Saves ${percentage}% `}
                  </span>}
                  {disabled ? <Link to='/products' className="float-right underline">
                    Go Shopping
                  </Link>:null}
                </div>
              </div>
            )
          })
        : null}
      </div>
      <div className="mt-4 max-sm:mt-7 border-t-[1px] text-gray-600 space-y-2 py-4 border-[#0000003c] border-b-[1px]">
        <div className="flex items-center text-base justify-between w-full font-[500] text-gray-500">
            <div>Subtotal</div>
            <div>{f(p(formatNumbers(subtotal)))}</div>
        </div>
        <div className="flex items-center text-base justify-between w-full font-[500] text-gray-500">
            <div>Discounts</div>
            <div>
              -{f(p(formatNumbers(savingAmount)))}
            </div>
        </div>
        <div className="flex items-center text-base justify-between w-full font-[500] text-gray-500">
          <div>Shipping</div>
          <div>
            {deliveryType === 'No Delivery Type Selected'
              ? 'Please select a delivery type.'
              : f(p(shippingFee))
            }
          </div>
        </div>
      </div>
      <div className="mt-4 pb-4 flex items-center justify-between border-[#0000003c] border-b">
        <div className="text-xl font-semibold">Total</div>
        <div className="font-[500] text-gray-500 text-base">
          {f(p(formatNumbers(totalWithShipping)))}
        </div>
      </div>
      {(nearDiscount && (!isApplied && enabledIndex === -1)) && <div className="mt-4 pb-4">
        <div className="font-[500] text-red-600 text-base">
          {nearDiscount}
        </div>
      </div>}
      <div className="mt-72 max-md:hidden"></div>
      <div className="mt-44 pt-4 flex flex-col gap-4 md:absolute right-5 bottom-5 justify-end max-md:mt-20">
        <div className="flex justify-between items-center max-sm:flex-col">
          <button type="button"
            data-tooltip-html={
              isReferAnyPerson || Object.values({ ...otherValues, isSameAsShipping: true }).some(value => value === "")
                ? "<div> Fill up the required fields to save order to draft. </div>"
                : null
            }
            data-tooltip-id="draft-message"
            disabled={isReferAnyPerson || Object.values({ ...otherValues, isSameAsShipping: true }).some(value => value === "")}
            className="flex items-center justify-center px-5 mr-3 disabled:border-gray-400 disabled:text-gray-400 py-2 text-center rounded-md hover:bg-opacity-50 bg-white outline-none text-custoryPrimary border-[#ff6600] font-semibold border-2 text-lg disabled:cursor-not-allowed max-sm:my-3 max-sm:mr-0 max-sm:w-full"
            onClick={()=>{
              const data = {
                customerEmail : form.email || JSON.parse(localStorage.getItem('CUSTORY_AUTH') || '{}')?.user?.email,
                customerAddress: form.address,
                customerPhoneNumber: form.phoneNumber,
                fastService: form.fastService,
                shippingDate: deliveryDate,
                customerFirstName: form.firstName,
                customerLastName: form.lastName,
                orderNotes: form.orderNotes,
                shippingType: deliveryType,
                shippingCost: calculatedShipping,
                subTotal: subtotal, // subTotal amount
                totalWeight: calculatedWeight,
                // billing section
                billingFirstName : form.billingFirstName,
                billingLastName: form.billingLastName,
                billingAddress: form.billingAddress,
                isSameAsShipping: form.isSameAsShipping,
                // Discount ID
                discountId,
              }
              if(draftId){
                updateDraft.mutate({
                  draftId,
                  data
                })
              }else{
                draftId
                addItemToDraft.mutate({
                  data
                });
              }
              window.location.href = "/account/drafts"
            }}
          >
            <span> Save as Draft</span>
            <HiOutlineSaveAs className="inline ml-[4px] mt-1" size={20}/>
          </button>
          <GeneratePDF
            form = {form}
            items = {cart?.items}
            shippingFee = {f(p(shippingFee))}
            orderQuantity = {orderQuantity}
            subtotal = {f(p(formatNumbers(subtotal)))}
            total = {totalWithShipping}
            percentage = {enabledDiscounts[appliedDiscountIndex]?.percentage || 0}
            isReferAnyPerson = {isReferAnyPerson}
            btnDisabled = {Object.values({ ...otherValues, isSameAsShipping: true }).some(value => value === "")}
          />
          <ReactTooltip id="quotation-message" place="top" />
          <ReactTooltip id="draft-message" place="top" />
        </div>
        <div className="flex flex-col items-end">
          <button
            disabled={
              isLoading ||
              isReferAnyPerson ||
              Object.values({ ...otherValues, isSameAsShipping: true }).some(
                (value) => value === ""
              )
            }
            className="px-7 py-2 text-center rounded-md bg-custoryPrimary text-white font-semibold disabled:bg-gray-400 text-lg disabled:cursor-not-allowed max-md:w-full"
            onClick={() => {
              setConfirmationModal(true);
            }}
            data-tooltip-html={
              isReferAnyPerson ||
              Object.values({ ...otherValues, isSameAsShipping: true }).some(
                (value) => value === ""
              )
                ? "<div> Fill up the required fields to enable the Checkout. </div>"
                : null
            }
            data-tooltip-id="checkOut-message"
          >
            {isLoading ? (
              "Loading.."
            ) : (
              <>
                Checkout{" "}
                <ShoppingCartOutlined className="inline ml-[4px]" size={20} />
              </>
            )}
          </button>
          <ReactTooltip id="checkOut-message" place="bottom" />
          <span className="max-md:mt-2">
            <MdOutlineDiscount className="inline" size={16} /> Saved{" "}
            {f(p(formatNumbers(savingAmount)))}
          </span>
        </div>
      </div>

      {/* Confirmation Modal on Checkout Page */}

      <BasicModal
        open={confirmationModal}
        handleClose={() => setConfirmationModal(false)}
      >
        <section className="h-[80vh] p-3 max-sm:w-[85vw]">
          <div className="flex items-center justify-between border-b border-[#DBDBDB]">
            <span className="text-2xl font-bold max-sm:text-xl">Confirmation</span>
            <IconButton
              onClick={() => setConfirmationModal(false)}
              className="cursor-pointer"
            >
              <RxCross1 size={15} />
            </IconButton>
          </div>
          <div className="h-[63vh] overflow-y-scroll p-1 max-sm:h-[55vh]">
            <div className="mt-2 max-sm:flex-col max-sm:items-start flex items-center justify-between">
              <div className="text-[18px] font-bold">Contact Information</div>
            </div>
            <div className="mt-2 space-y-2">
              <TextField
                size="small"
                fullWidth
                placeholder="Email (Required)*"
                name="email"
                color="primary"
                disabled
                value={
                  form.email ||
                  JSON.parse(localStorage.getItem("CUSTORY_AUTH") || "{}")?.user
                    ?.email
                }
                sx={{
                  input: { cursor: "not-allowed" },
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#2C2C2C",
                  },
                }}
              />
              <TextField
                size="small"
                fullWidth
                placeholder="Phone Number (Required)*"
                type="tel"
                color="primary"
                name="phoneNumber"
                value={form.phoneNumber}
                disabled
                sx={{
                  input: { cursor: "not-allowed" },
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#2C2C2C",
                  },
                }}
              />
            </div>
            <div className="mt-3">
              <div className="text-[18px] font-bold">
                How quick do you need your items? *
              </div>
              <div className="mt-1">
                <RadioGroup
                  className={"gap-5 p-2"}
                  row
                  sx={{ gap: "10px" }}
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="fastService"
                  value={form.fastService}
                  disabled
                >
                  <Box>
                    <FormControlLabel
                      value="Regular"
                      control={<Radio />}
                      label="Regular (15-20 days)"
                    />
                    <div>Estimated delivery: {regularDeliveryRange}</div>
                  </Box>
                  <Box>
                    <FormControlLabel
                      value="Fast"
                      control={<Radio />}
                      label="Fast (7-12 days)"
                    />
                    <div>Estimated delivery: {fastDeliveryRange}</div>
                  </Box>
                </RadioGroup>
              </div>
            </div>
            <div className="mt-3">
              <div className="text-[18px] font-bold">
                Shipping Address *
              </div>
              <div className="mt-3 grid grid-cols-2 gap-4 max-md:grid-cols-1">
                <TextField
                  name="firstName"
                  fullWidth
                  size="small"
                  color="primary"
                  placeholder="First Name (Required)*"
                  value={form.firstName}
                  disabled
                  sx={{
                  input: { cursor: "not-allowed" },
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#2C2C2C",
                  },
                }}
                />
                <TextField
                  fullWidth
                  size="small"
                  color="primary"
                  name="lastName"
                  value={form.lastName}
                  placeholder="Last Name (Required)*"
                  disabled
                  sx={{
                  input: { cursor: "not-allowed" },
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#2C2C2C",
                  },
                }}
                />
              </div>
              <TextField
                fullWidth
                rows={2}
                multiline
                size="small"
                name="address"
                placeholder="Address (Required)*"
                color="primary"
                value={form.address}
                disabled
                sx={{
                  marginTop: "16px",
                  input: { cursor: "not-allowed" },
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#2C2C2C",
                  },
                }}
              />
            </div>
            <div className="mt-3">
              <div className="flex flex-1 items-center">
                <span className="text-[18px] font-bold">
                  Billing Address
                </span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-4 max-md:grid-cols-1">
                <TextField
                  name="billingFirstName"
                  fullWidth
                  size="small"
                  color="primary"
                  placeholder="First Name (Required)*"
                  value={form.billingFirstName}
                  disabled
                  sx={{
                  input: { cursor: "not-allowed" },
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#2C2C2C",
                  },
                }}
                />
                <TextField
                  fullWidth
                  size="small"
                  color="primary"
                  name="billingLastName"
                  value={form.billingLastName}
                  placeholder="Last Name (Required)*"
                  disabled
                  sx={{
                  input: { cursor: "not-allowed" },
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#2C2C2C",
                  },
                }}
                />
              </div>
              <TextField
                fullWidth
                rows={2}
                multiline
                size="small"
                name="billingAddress"
                value={form.billingAddress}
                placeholder="Address (Required)*"
                color="primary"
                disabled
                sx={{
                  marginTop: "16px", 
                  input: { cursor: "not-allowed" },
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#2C2C2C",
                  },
                }}
              />
            </div>
            <div className="mt-3">
              <div className="text-[18px] font-bold">
                Order Notes
              </div>
              <TextField
                fullWidth
                rows={3}
                multiline
                size="small"
                name="orderNotes"
                value={form.orderNotes}
                placeholder="Order Notes"
                color="primary"
                disabled
                sx={{
                  marginTop: "12px",
                  input: { cursor: "not-allowed" },
                  "& .MuiInputBase-input.Mui-disabled": {
                    WebkitTextFillColor: "#2C2C2C",
                  },
                }}
              />
            </div>
          </div>
          <div className="flex items-center justify-end pt-3 max-sm:flex-col-reverse max-sm: gap-2">
            <button className="bg-[#EC1C24] text-white rounded-lg px-8 py-2.5 text-lg font-bold max-sm:w-full md:mr-3 mr-0"
              onClick={() => setConfirmationModal(false)}
            >
              Decline
            </button>
            <button
              className="bg-[#09AA00] text-white rounded-lg px-8 py-2.5 text-lg font-bold max-sm:w-full"
              onClick={() => {handleCheckout(discountId, subtotal); setConfirmationModal(false);}}
            >
              Proceed
            </button>
          </div>
        </section>
      </BasicModal>
    </div>
  );
};

export default CartAndTotal;
