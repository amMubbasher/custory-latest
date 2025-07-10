import { useMutation } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { resetPasswordAPI, verifyResetPasswordTokenAPI } from "../api/auth.api";
import Logo from "../assets/logo.svg";
import ErrorState from "../components/ResetPassword/ErrorState";
import LoadingState from "../components/ResetPassword/LoadingState";
import Input from "../components/ResetPassword/ResetPasswordInput";
import { useQueryParams } from "../hooks/useQueryParams";

const ResetPassword = () => {
  const [errorValues,setErrorValues] = useState({
    newPassword : '',
    confirmPassword : ''
  })
    const[loading,setLoading] = useState(true);
    const [error,setError] = useState(false);
    const [done,setDone] = useState(false);
    const [form,setForm] = useState({
        newPassword : '',
        token : '',
        confirmPassword : ''
    })
    const navigate = useNavigate();
    const {mutate} = useMutation(verifyResetPasswordTokenAPI, {
        onSuccess : (data)=>{
        },
        onError : (err)=>{
            setError(err);
        },
        onSettled : ()=>{
            setLoading(false);
        }
    })
    const {getParam} = useQueryParams();
  useEffect(() => {
    const token = getParam('token');
    setForm(prev=>({...prev,token}));
    mutate({data : {token}});
  }, []);
  const {mutate : resetPassCall, isLoading : resetPassLoading} = useMutation(resetPasswordAPI, {
    onSuccess : (data)=>{
        toast.success('Your password has been updated successfully!');
        setError(false);
        setTimeout(()=>{
            navigate('/');
        }, 1000)
    },
    onError : (err)=>{
        setError(err?.response?.data?.message || 'Something went wrong!');
        toast.error(err?.response?.data?.message || 'Something went wrong!');
    }
  });

  const handleChange = (e)=>setForm(prev=>({...prev,[e.target.name] : e.target.value}));


  const handleReset = ()=>{
    let errorObj = {};
    if (!form.newPassword) errorObj.newPassword = 'New Password is required';
    if (!form.confirmPassword) errorObj.confirmPassword = 'Confirm password is required';
    if (form.confirmPassword && form.newPassword && form.confirmPassword !== form.newPassword) error.confirmPassword = 'Passwords dont match';
    setErrorValues(errorObj);
    if (Object.keys(errorObj).length) return;
    resetPassCall({data : form});
  }



  return (
    <>
    <div className="">
      <div className="w-full flex justify-between items-center py-10 max-md:px-10 max-sm:px-6 px-24">
        <Link to="/">
          <div className="flex jus items-center gap-2 uppercase">
            <img src={Logo} className="w-[120px] h-auto" onContextMenu={(e) => e.preventDefault()} />
          </div>
        </Link>
        <button className="py-2 px-6 font-[600] text-sm text-white bg-black rounded-md">
          <Link to="/pricing">Go back to Home</Link>
        </button>
      </div>
      {error?<ErrorState/>:loading?<LoadingState/>:<div>
      <div className="mt-20  flex flex-col items-center justify-center mx-auto w-[30%] 2max-xl:w-[40%] max-xl:w-[50%] max-lg:w-[55%] max-lg:mt-20 max-sm:mt-12 max-xs:mt-10 max-md:w-[70%] max-sm:w-[90%]  pb-10">
        <div className="text-5xl font-bold text-homePrimary">
          Reset Password.
        </div>
        <div className="mt-14 w-full">
          <div className="space-y-5">
            <Input error={errorValues.newPassword} name='newPassword' value={form.newPassword} onChange={handleChange} label="New Password" placeholder="Password" />
            <Input error={errorValues.confirmPassword} name='confirmPassword' value={form.confirmPassword} onChange={handleChange} label="Confirm Password" placeholder="Confirm Password" />
          </div>
          <button onClick={handleReset} disabled={resetPassLoading} className="mt-8 w-full rounded-lg bg-black font-bold disabled:opacity-70 text-white py-3">
            {resetPassLoading?'Loading..':'Reset Password'}
          </button>
        </div>
      </div>
      </div>}
    </div>
    </>
  );
};

export default ResetPassword;