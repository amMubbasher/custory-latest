import React, { useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Close } from "@mui/icons-material";
import { BsThreeDots } from "react-icons/bs";
import AuthInput from "./AuthInput";
import AuthButton from "./AuthButton";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { AiFillGoogleCircle } from "react-icons/ai";
import { IconButton } from "@mui/material";
import { AUTH_MODAL_STATES } from "./AuthModal";
import useAuth from "../../hooks/useAuth";
import GoogleLoginButton from "./GoogleLoginButton";

const INITIAL_FORM = {
  firstName: "",
  lastName: "",
  role: "customer",
  brandName: "",
  email: "",
  password: "",
};

const RegisterView = ({ handleClose, setView }) => {
  const [form, setForm] = useState(INITIAL_FORM);
  const [error, setError] = useState(INITIAL_FORM);
  const { isRegisterUserLoading, registerUser } = useAuth({
    registerSuccessCallback: () => {
      setView(AUTH_MODAL_STATES.LOGIN);
    },
  });
  const handleChange = ({ target }) =>
    setForm((prev) => ({ ...prev, [target.name]: target.value }));
  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }
    registerUser({ data: form });
  };
  const { brandName, ...otherValues } = form;
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="text-2xl font-semibold text-center mt-3">
            Register
          </div>
        </div>
        <IconButton onClick={handleClose}>
          <Close />
        </IconButton>
      </div>
      <form
        onSubmit={handleSubmit}
        className="mt-12 w-[65%] max-xl:w-[85%] max-lg:w-[90%] max-md:w-[99%] mx-auto"
      >
        <div className="space-y-4">
          <div className="w-full grid grid-cols-2 gap-3 max-sm:grid-cols-1">
            <AuthInput
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              required={true}
              placeholder="First Name"
            />
            <AuthInput
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              required={true}
              placeholder="Last Name"
            />
          </div>
          {/* <select name="role" placeholder='' required defaultValue={form.role} onChange={handleChange} className='py-[10px] outline-none border-b-[1px] w-full placeholder:text-[#333] border-black placeholder:text-center bg-[#fde9a1] text-center' >
            <option value="" disabled hidden selected>Select your Role</option>
            <option value="customer">Customer</option>
            <option value="supplier">Supplier</option>
            <option value="admin">Admin</option>
            </select> */}
          {form.role == "supplier" ? (
            <AuthInput
              name="brandName"
              type="text"
              value={form.brandName}
              onChange={handleChange}
              required={true}
              placeholder="Brand Name"
            />
          ) : null}
          <AuthInput
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required={true}
            placeholder="Email"
          />
          <AuthInput
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required={true}
            placeholder="Password"
          />
        </div>
        .
        <div className="mt-2">
          <AuthButton
            type="submit"
            disabled={Object.values({ ...otherValues }).some(
              (value) => value === ""
            )}
            title={isRegisterUserLoading ? "Loading.." : "Continue"}
            data-tooltip-html={
              Object.values({ ...otherValues }).some((value) => value === "")
                ? "<div> Fill up the required fields to enable the Sign Up. </div>"
                : null
            }
            data-tooltip-id="signUp-message"
          />
          <ReactTooltip id="signUp-message" place="top" />
        </div>
        <div className="flex items-center my-6">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-3 text-gray-500">OR</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>
        <GoogleLoginButton
          handleClose={handleClose}
          isLogin={false}
          type="button"
          className="mt-6"
        />
        <div className="mt-8 text-mg text-center cursor-pointer">
          Have an account?{" "}
          <button
            className="text-orange-600"
            onClick={() => setView(AUTH_MODAL_STATES.LOGIN)}
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterView;