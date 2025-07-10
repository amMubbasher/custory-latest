import { ArrowBackIos } from "@mui/icons-material";
import { Button as MUIButton, FormControlLabel, Radio, RadioGroup, TextField, Box, Checkbox } from "@mui/material";
import moment from "moment";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { AiOutlineFieldTime } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import useAppStore from "../../hooks/useAppStore";
import Button from "../common/Button";
import ValidateEmail from "../../utils/functions/validateEmail";
import { getReferralPersonsAPI } from "../../api/referral.api";


const CheckoutForm = ({form, setForm, error, setDeliveryType, deliveryType, setDeliveryDate, deliveryDate,setIsReferAnyPerson,isReferAnyPerson,referralForm,setReferralForm, regularDeliveryRange, fastDeliveryRange, regularDeliveryEndDate, fastDeliveryEndDate, formatDate}) => {
  const [addSuccessFully, setAddSuccessFully] = useState(false)
  const [referralFormError, setReferralFormError] = useState(referralForm)

  const handleChange = ({ target: { name, type, value } })=>{
    setForm(prev=>({...prev, [name] : value}));
    if (name === 'fastService') {
      if (value === 'Regular') {
        setDeliveryType("Regular Delivery");
        setDeliveryDate(formatDate(regularDeliveryEndDate));
      } else {
        setDeliveryType("Fast Delivery");
        setDeliveryDate(formatDate(fastDeliveryEndDate));
      }
    }
  };

  const handleIsSameAsShipping = ({ target: { name, checked } })=>{
    const billingInfo = {
      billingFirstName: checked ? form.firstName : '',
      billingLastName: checked ? form.lastName : '',
      billingAddress: checked ? form.address : '',
      isSameAsShipping: checked
    }

    setForm(prev=>({...prev, ...billingInfo}));
  };

  const handleReferralForm = ({ target: { name, value } }) => {
    setReferralForm(prev => {
      const updatedForm = { ...prev, [name]: value };
      setIsReferAnyPerson(updatedForm.personEmail.trim() !== '' && updatedForm.personName.trim() !== '');
      return updatedForm;
    });
  };
  const handleReferralPerson = async () => {
    let err = {};
    if (!referralForm.personEmail) {
      err.personEmail = "Referral Person email is required";
    } else if (!ValidateEmail(referralForm.personEmail)) {
      err.personEmail = "Enter a valid email address";
    }
    if (!referralForm.personName) {
      err.personName = "Referral Person name is required";
    }
    if (Object.keys(err).length > 0) {
      setReferralFormError(err);
      return;
    }
    try {
      const referralPersons = await getReferralPersonsAPI();
      const bool = referralPersons?.referrals.some((item) => item.email === referralForm.personEmail);
      if(bool){
        toast.error('This Referral Person is already Exist.')
      }else{
        toast.success('You can refer this Person.')
      }
      setAddSuccessFully(!bool)
      setIsReferAnyPerson(bool);
    } catch (error) {
      console.error("Failed to add referral person or fetch referral persons:", error);
    }
  };

  const setShowCart = useAppStore(state=>state.setShowCart);
  const navigate = useNavigate();

  return (
    <>
      <section className="max-md:order-1">
        <div className="text-2xl max-sm:text-xl font-semibold">
          Let us remind you when it's ready!
        </div>
        <div className="text-base max-sm:text-sm font-normal">
          Fill out the details below and click "Generate Quotation" when you're ready.
        </div>
        <div className="mt-8 max-sm:flex-col max-sm:items-start flex items-center justify-between">
          <div className="font-[500]">Contact Information</div>
          <div className="font-[500] hidden">
            <span className="opacity-60 font-[300] mr-2">
              Already have an account?
            </span>
            Login
          </div>
        </div>
        <div className="mt-4 space-y-3">
          <TextField
            size="small"
            fullWidth
            placeholder="Email (Required)*"
            name='email'
            color="primary"
            disabled
            value={JSON.parse(localStorage.getItem('CUSTORY_AUTH') || '{}')?.user?.email || form.email}
            required
            sx={{ input: { cursor: 'not-allowed' }, "& .MuiInputBase-input.Mui-disabled": { WebkitTextFillColor: "#2C2C2C" } }}
          />
          <TextField
            size="small"
            fullWidth
            placeholder="Phone Number (Required)*"
            type="tel"
            color="primary"
            name='phoneNumber'
            onChange={handleChange}
            value={form.phoneNumber}
            error={Boolean(error.phoneNumber)}
            helperText={error.phoneNumber}
            required
          />
        </div>
        <div className="mt-8">
          <div className="text-xl font-semibold max-sm:text-lg">
            How quick do you need your items? *
          </div>
          <div className="mt-3">
          <RadioGroup
            className={`gap-7 ${error.fastService ? ' p-3 border border-red-700' : ''}`}
            row
            sx={{ gap: "30px" }}
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="fastService"
            value={form.fastService}
            onChange={handleChange}
          >
            <Box>
              <FormControlLabel value="Regular" control={<Radio />} label="Regular (21-28 days)" />
              <div>Estimated delivery: {regularDeliveryRange}</div>
            </Box>
            <Box>
              <FormControlLabel value="Fast" control={<Radio />} label="Fast (7-14 days)" />
              <div>Estimated delivery: {fastDeliveryRange}</div>
            </Box>
            <span>Note: For assistance with a specific estimated delivery date, please contact our customer support team on WhatsApp at +65xxxxxxxx.</span>
          </RadioGroup>
          <div className="text-red-700  py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error.fastService}</span>
          </div>

          </div>
        </div>
        <div className="mt-8">
          <div className="text-xl font-semibold max-sm:text-lg">
            Shipping Address *
          </div>
          <div className="mt-5 grid grid-cols-2 gap-4 max-md:grid-cols-1">
            <TextField
              name='firstName'
              fullWidth
              size="small"
              error={Boolean(error?.firstName)}
              helperText={error?.firstName}
              color="primary"
              placeholder="First Name (Required)*"
              value={form.firstName}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              size="small"
              error={Boolean(error?.lastName)}
              helperText={error?.lastName}
              color="primary"
              name='lastName'
              value={form.lastName}
              onChange={handleChange}
              placeholder="Last Name (Required)*"
              required
            />
          </div>
          <TextField
            sx={{ marginTop: "16px" }}
            fullWidth
            rows={3}
            multiline
            size="small"
            name='address'
            value={form.address}
            onChange={handleChange}
            placeholder="Address (Required)*"
            color="primary"
            error={Boolean(error?.address)}
            helperText={error?.address}
            required
          />
        </div>
        <div className="mt-8">
          <div className="flex items-center max-sm:flex-wrap max-sm:justify-start">
            <span className="text-xl font-semibold max-sm:text-lg pr-2">
              Billing Address
            </span>
            <div className="max-sm:flex max-sm:flex-row-reverse max-sm:items-center ml-[6px]">
              <Checkbox
                name="isSameAsShipping"
                disabled={!form.firstName || !form.lastName || !form.address}
                checked={form.isSameAsShipping}
                onChange={handleIsSameAsShipping}
                sx={{paddingLeft: 0 }}
              />
              <span className="text-md font-semibold max-sm:text-sm ml-[-5px]">
                Same as Shipping Address *
              </span>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-4 max-md:grid-cols-1">
            <TextField
              name="billingFirstName"
              fullWidth
              size="small"
              disabled={form.isSameAsShipping}
              error={Boolean(error?.billingFirstName)}
              helperText={error?.billingFirstName}
              color="primary"
              placeholder="First Name (Required)*"
              value={form.billingFirstName}
              onChange={handleChange}
              required
            />
            <TextField
              fullWidth
              size="small"
              error={Boolean(error?.billingLastName)}
              helperText={error?.billingLastName}
              disabled={form.isSameAsShipping}
              color="primary"
              name="billingLastName"
              value={form.billingLastName}
              onChange={handleChange}
              required
              placeholder="Last Name (Required)*"
            />
          </div>
          <TextField
            sx={{ marginTop: "16px" }}
            fullWidth
            rows={3}
            multiline
            size="small"
            disabled={form.isSameAsShipping}
            name="billingAddress"
            value={form.billingAddress}
            onChange={handleChange}
            placeholder="Address (Required)*"
            color="primary"
            error={Boolean(error?.billingAddress)}
            required
            helperText={error?.billingAddress}
          />
        </div>
        <div className="mt-8">
          <div className="text-xl font-semibold max-sm:text-lg">
            Order Notes
          </div>
          <TextField
            sx={{ marginTop: "16px" }}
            fullWidth
            rows={3}
            multiline
            size="small"
            name='orderNotes'
            value={form.orderNotes}
            onChange={handleChange}
            placeholder="Order Notes"
            color='primary'
          />
        </div>
        {JSON.parse(localStorage.getItem('CUSTORY_AUTH') || '').user.isFirstOrder ?
          <div className="mt-8">
            <div className="flex flex-1 flex-col">
              <span className="text-xl font-semibold max-sm:text-lg">
                Referral Person
              </span>
              <span className="text-[14px] max-sm:text-xs">
                Refer a friend and earn 5% of their purchase amount when they complete their order successfully!
              </span>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-4 max-md:grid-cols-1">
              <TextField
                fullWidth
                size="small"
                error={Boolean(referralFormError?.personName)}
                helperText={referralFormError?.personName}
                color="primary"
                name="personName"
                value={referralForm.personName}
                onChange={handleReferralForm}
                placeholder="Name (Required)*"
                required
                InputProps={{
                  readOnly: addSuccessFully,
                }}
              />
              <TextField
                name="personEmail"
                fullWidth
                size="small"
                error={Boolean(referralFormError?.personEmail)}
                helperText={referralFormError?.personEmail}
                color="primary"
                placeholder="Email (Required)*"
                value={referralForm.personEmail}
                onChange={handleReferralForm}
                required
                InputProps={{
                  readOnly: addSuccessFully,
                }}
              />
            </div>
            <div className="mt-5 max-md:flex flex justify-end">
              <Button className='py-[10px] font-semibold px-4 border outline-none rounded max-md:w-full disabled:cursor-not-allowed' disabled={!isReferAnyPerson && !addSuccessFully}
                onClick={() => {
                  if(!isReferAnyPerson && addSuccessFully){
                    setReferralForm({personName:'', personEmail:''});
                    setIsReferAnyPerson(false)
                    setAddSuccessFully(false)
                  }else{
                    handleReferralPerson();
                  }
                }}>
                {!isReferAnyPerson && addSuccessFully ? 'Clear':'Claim Referral Discount'}
              </Button>
            </div>
          </div> : null
        }
        <div className="mt-44 max-md:mt-16  max-sm:gap-4 max-xs:gap-3 flex items-center justify-between max-md:hidden">
          <MUIButton onClick={()=>setShowCart(true)} sx={{ color: "black", fontSize  : {xs : 12, sm : 16} }} size='small' startIcon={<ArrowBackIos />}>
            Return To Cart
          </MUIButton>
          <Button onClick={()=>{
            navigate('/products')
          }} className="py-[10px] font-semibold px-4 border rounded" >
            Add another {<span className="max-md:hidden">product to cart</span>}
          </Button>
        </div>
      </section>
    </>
  );
};

export default CheckoutForm;