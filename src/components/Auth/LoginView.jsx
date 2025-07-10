import React, { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Close } from "@mui/icons-material";
import { BsThreeDots } from "react-icons/bs";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import { AiFillGoogleCircle } from "react-icons/ai";
import { IconButton } from "@mui/material";
import { AUTH_MODAL_STATES } from "./AuthModal";
import useAuth from "../../hooks/useAuth";
import GoogleLoginButton from "./GoogleLoginButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useQueryParams } from "../../hooks/useQueryParams";

const INITIAL_FORM = {
  email: "",
  password: "",
};

const LoginView = ({ setView, handleClose }) => {
  const [form, setForm] = useState(INITIAL_FORM);
  const handleChange = ({ target }) => setForm((prev) => ({ ...prev, [target.name]: target.value }));
  const [error, setError] = useState(INITIAL_FORM);
  const location = useLocation();
  const {getParam} = useQueryParams();
  const naviagte = useNavigate();
  const { loginUser, isLoginUserLoading } = useAuth({
    loginSuccessCallback: async () => {
      let isEmail = getParam('email');
      if(isEmail == 'true'){
        naviagte(location.pathname);  
      }
      handleClose();
    },
  });
  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    loginUser({ data: form });
  };
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="text-2xl font-semibold text-center mt-3">Log In</div>
        </div>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </div>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-[60%] max-lg:w-[80%] max-md:w-[85%] max-sm:w-[90%] max-xs:w-[97%]  max-xl:w-[75%] mx-auto"
      >
        <div className="space-y-4">
          <AuthInput
            name="email"
            required={true}
            type="email"
            onChange={handleChange}
            value={form.email}
            error={error.email}
            placeholder="Email"
          />
          <AuthInput
            name="password"
            type="password"
            required={true}
            onChange={handleChange}
            error={form.password}
            value={form.password}
            placeholder="Password"
          />
        </div>
        .
        <div className="mt-2">
          <AuthButton
            type="submit"
            disabled={isLoginUserLoading}
            title={isLoginUserLoading ? "Loading.." : "Continue"}
          />
        </div>
        <div className="mt-4 text-md text-center max-sm:text-lg">
          Forgot Password?{" "}
          <button
            className="text-orange-600"
            onClick={() => setView(AUTH_MODAL_STATES.FORGOT_PASSWORD)}
          >
            Reset
          </button>{" "}
        </div>
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-3 text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <GoogleLoginButton
          handleClose={handleClose}
          isLogin={true}
          type="button"
          className="mt-6"
        />
        <div className="mt-5 text-md text-center cursor-pointer max-sm:text-lg">
          Don't have an account?{" "}
          <button
            className="text-orange-600"
            onClick={() => setView(AUTH_MODAL_STATES.REGISTER)}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginView;
