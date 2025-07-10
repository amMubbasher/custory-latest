import { FormControlLabel, Radio, RadioGroup, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import CartAndTotal from "../components/Checkout/CartAndTotal";
import CheckoutForm from "../components/Checkout/CheckoutForm";

import Layout from "../components/Layout/Layout";
import useCart from "../hooks/useCart";

import CircularProgress from "@mui/material/CircularProgress";
import { checkoutValidation } from "../utils/functions/checkoutValidation";
import CheckoutComplete from "../components/Checkout/CheckoutComplete";
import useOrder from "../hooks/useOrder";
import { useQueryClient } from "@tanstack/react-query";
import useAppStore from "../hooks/useAppStore";
import { toast } from "react-hot-toast";
import EmptyCart from "../components/Checkout/EmptyCart";
import { useParams } from "react-router-dom";
import { useStripe } from "../hooks/useStripe";
import { useQueryParams } from "../hooks/useQueryParams";
import useReferral from "../hooks/useReferral";
import { useGetDraft } from "../hooks/useDraft";

const INITIAL_FORM = {
  email: JSON.parse(localStorage.getItem('CUSTORY_AUTH') || '{}')?.user?.email,
  phoneNumber: "",
  shippingDate: "",
  fastService: "",
  firstName: "",
  lastName: "",
  address: "",
  orderNotes: "",
  shippingType: "",
  shippingCost: "",
  totalWeight: "",
  // billing section
  billingFirstName: "",
  billingLastName: "",
  billingAddress: "",
  isSameAsShipping: false,
};

const Checkout = () => {
  const {id} = useParams();
  const { isFetchCartLoading,totalItems, refetch } = useCart();
  const getDraft = id ? useGetDraft({ id })?.getDraft : null;
  const [form, setForm] = useState(INITIAL_FORM);
  const [error, setError] = useState(INITIAL_FORM);
  const [referralForm, setReferralForm] = useState({personName:'', personEmail:''})
  const [checkoutCompleted, setCheckoutCompleted] = useState(false);
  const [isReferAnyPerson, setIsReferAnyPerson] = useState(false);
  const queryClient = useQueryClient();
  const clearCartDetails = useAppStore((state) => state.clearCartDetails);
  const {stripeCall} = useStripe();
  const {getParam} = useQueryParams();
  const [deliveryType, setDeliveryType] = useState("No Delivery Type Selected");
  const [deliveryDate, setDeliveryDate] = useState("No Delivery Type Selected");
  const [calculatedShipping, setCalculatedShipping] = useState(null);
  const [calculatedWeight, setCalculatedWeight] = useState(null);
  const {addReferralPerson} = useReferral();
  const handleCalculatedShipping = (value) => {
    setCalculatedShipping(value);
  };
  const handleCalculatedWeight = (value) => {
    setCalculatedWeight(value);
  };
  const { isPlaceOrderLoading, placeOrder, placeOrderError,placeOrderData } = useOrder({
    placeOrderSuccessCallback: (data) => {
      setCheckoutCompleted(true);
      setForm(INITIAL_FORM);
      clearCartDetails();
      queryClient.invalidateQueries(["cart"]);
    },
    placeOrderErrorCallback: (error) => {
      toast.error(error?.response?.data?.message || "Something went wrong!");
    },
  });

  const handleCheckout = (discountId,subTotal) => {
    form.email = JSON.parse(localStorage.getItem('CUSTORY_AUTH') || '{}')?.user?.email;
    const isValidated = checkoutValidation(form, setError);
    if (!isValidated) return;
    let data = {
      customerEmail : form.email,
      customerAddress: form.address,
      customerPhoneNumber: form.phoneNumber,
      fastService: form.fastService,
      shippingDate: deliveryDate,
      customerFirstName: form.firstName,
      customerLastName: form.lastName,
      orderNotes: form.orderNotes,
      shippingType: deliveryType,
      shippingCost: calculatedShipping,
      subTotal, // subTotal amount
      totalWeight: calculatedWeight,
      // billing section
      billingFirstName : form.billingFirstName,
      billingLastName: form.billingLastName,
      billingAddress: form.billingAddress,
      isSameAsShipping: form.isSameAsShipping,
      // Discount ID
      discountId,
      status: 'payment received'
    }
    if(referralForm.personEmail.trim() !== '' && referralForm.personName.trim() !== '' ){
      sessionStorage.setItem('referralForm', JSON.stringify(referralForm))
    }
    stripeCall.mutate({ data });

    // placeOrder({data});
  };

  useEffect(()=>{
    if(getDraft?.data){
      refetch();
      setForm((prevForm) => ({
        ...prevForm,
        shippingDate: getDraft.data.shippingDate,
        fastService: getDraft.data.fastService,
        shippingType: getDraft.data.shippingType,
        shippingCost: getDraft.data.shippingCost,
        totalWeight: getDraft.data.totalWeight,
        email: getDraft.data.customerEmail,
        phoneNumber: getDraft.data.customerPhoneNumber,
        firstName: getDraft.data.customerFirstName,
        lastName: getDraft.data.customerLastName,
        address: getDraft.data.customerAddress,
        isSameAsShipping: getDraft.data.isSameAsShipping,
        billingFirstName: getDraft.data.billingFirstName,
        billingLastName: getDraft.data.billingLastName,
        billingAddress: getDraft.data.billingAddress,
        orderNotes: getDraft.data.orderNotes,
      }));
      setDeliveryType(getDraft.data.shippingType);
      setCalculatedShipping(getDraft.data.shippingCost);
    }
  },[id, getDraft?.data])

  useEffect(()=>{
    let isCompleted = getParam('completed');
    if (isCompleted === 'true') {
      const referralData = JSON.parse(sessionStorage.getItem('referralForm') || '{}');
      if (Object.keys(referralData).length !== 0) {
        addReferralPerson({
          name: referralData.personName,
          email: referralData.personEmail
        });
        sessionStorage.removeItem('referralForm');
      }
      setCheckoutCompleted(true);
      const { user, token } = JSON.parse(localStorage.getItem('CUSTORY_AUTH') || '')
      if(user.isFirstOrder){
        localStorage.setItem('CUSTORY_AUTH', JSON.stringify({ user: {...user, isFirstOrder: false }, token }))
      }
    }else{
      sessionStorage.removeItem('referralForm');
    }
  }, [])

  const addWorkingDays = (startDate, daysToAdd) => {
    let currentDate = new Date(startDate.getTime());
    currentDate.setDate(currentDate.getDate() + daysToAdd);
    return currentDate;
  }
  const today = new Date();
  const regularDeliveryStartDate = addWorkingDays(today, 21);
  const regularDeliveryEndDate = addWorkingDays(today, 28);
  const fastDeliveryStartDate = addWorkingDays(today, 7);
  const fastDeliveryEndDate = addWorkingDays(today, 14);

  const formatDate = (date) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  };
  const regularDeliveryRange = `${formatDate(regularDeliveryStartDate)} - ${formatDate(regularDeliveryEndDate)}`;
  const fastDeliveryRange = `${formatDate(fastDeliveryStartDate)} - ${formatDate(fastDeliveryEndDate)}`;

  return (
    <Layout>
      {checkoutCompleted ? (
        <CheckoutComplete orderId={getParam('orderId') || ''} />
      ) : (
        <>
          {isFetchCartLoading ? (
            <div className="h-[20vh] w-full flex items-center flex-col justify-center">
              <CircularProgress sx={{ color: "#f97b64" }} size={40} />
              <div className="mt-4 text-center text-lg font-[500]">
                Fetching Cart...
              </div>
            </div>
          ) : !totalItems ? <div className="mt-16 py-8"><EmptyCart/></div> : (
            <>
            <div className="mt-6 max-sm:mt-36 max-xs:mt-6 px-20 max-xl:px-10 max-lg:px-7 max-sm:px-3 max-content-width">
              <div className="grid mt-16 max-md:mt-12 max-sm:mt-8 max-lg:gap-12 max-md:gap-9 max-md:grid-cols-1 gap-20 max-xl:grid-cols-[2fr_1.7fr] grid-cols-[2fr_1.4fr]">
                <CheckoutForm
                  error={error}
                  setError={setError}
                  form={form}
                  setForm={setForm}
                  referralForm={referralForm}
                  setReferralForm={setReferralForm}
                  setDeliveryType={setDeliveryType}
                  setDeliveryDate={setDeliveryDate}
                  setIsReferAnyPerson={setIsReferAnyPerson}
                  isReferAnyPerson ={isReferAnyPerson}
                  regularDeliveryRange = {regularDeliveryRange}
                  fastDeliveryRange = {fastDeliveryRange}
                  regularDeliveryEndDate = {regularDeliveryEndDate}
                  fastDeliveryEndDate = {fastDeliveryEndDate}
                  formatDate = {formatDate}
                />
                <CartAndTotal
                  isLoading={stripeCall.isLoading}
                  fastService={form.fastService === "Yes"}
                  handleCheckout={handleCheckout}
                  deliveryType={deliveryType}
                  onCalculatedShipping={handleCalculatedShipping}
                  onCalculatedWeight={handleCalculatedWeight}
                  isReferAnyPerson ={isReferAnyPerson}
                  form={form}
                  regularDeliveryRange = {regularDeliveryRange}
                  fastDeliveryRange = {fastDeliveryRange}
                  regularDeliveryEndDate = {regularDeliveryEndDate}
                  fastDeliveryEndDate = {fastDeliveryEndDate}
                  formatDate = {formatDate}
                  calculatedShipping = {calculatedShipping}
                  calculatedWeight = {calculatedWeight}
                  deliveryDate = {deliveryDate}
                />
              </div>
            </div>
            </>
          )}
        </>
      )}
    </Layout>
  );
};

export default Checkout;