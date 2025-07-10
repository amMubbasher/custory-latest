import React, { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Close } from "@mui/icons-material";
import { BsThreeDots } from "react-icons/bs";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import { AiFillGoogleCircle } from "react-icons/ai";
import { AUTH_MODAL_STATES } from "./AuthModal";
import { IconButton } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { forgotPasswordAPI } from "../../api/auth.api";
import { toast } from "react-hot-toast";
import useAppStore from "../../hooks/useAppStore";

const ForgotPasswordView = ({ setView, handleClose }) => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const setShowAuthModal = useAppStore((state) => state.setShowAuthModal);
  const { isLoading, mutateAsync: forgotPass } = useMutation(
    forgotPasswordAPI,
    {
      onSuccess: (data) => {
        toast.success("Please check your email to reset your password");
        setShowAuthModal(false);
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || "Something went wrong!");
      },
    }
  );
  const handleForgot = () => {
    if (!email) {
      setError("Email is required!");
      return;
    }
    forgotPass({
      data: { email },
    });
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="text-2xl font-semibold text-center mt-3">
            Forget Password
          </div>
        </div>
        <IconButton
          onClick={() => {
            handleClose();
            setView(AUTH_MODAL_STATES.LOGIN);
          }}
        >
          <Close />
        </IconButton>
      </div>
      <div className="mt-12  w-[55%] max-lg:w-[70%] max-md:w-[85%] max-sm:w-[87%] max-xs:w-[96%]  max-xl:w-[75%] mx-auto">
        <div className="space-y-4">
          <AuthInput
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
        </div>
        .
        <div className="mt-2">
          <AuthButton
            onClick={handleForgot}
            disabled={isLoading}
            title={isLoading ? "Loading.." : "Submit"}
          />
        </div>
        <div
          onClick={() => setView(AUTH_MODAL_STATES.REGISTER)}
          className="mt-8 text-lg hover:underline text-center cursor-pointer text-orange-600"
        >
          Create Account
        </div>
        <div
          onClick={() => setView(AUTH_MODAL_STATES.LOGIN)}
          className="mt-5 text-lg text-center cursor-pointer text-orange-600"
        >
          Login
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordView;
