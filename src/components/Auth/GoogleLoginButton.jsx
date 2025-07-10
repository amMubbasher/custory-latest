import { CircularProgress } from "@mui/material";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import { toast } from "react-hot-toast";
import { AiFillGoogleCircle } from "react-icons/ai";
import useAppStore from "../../hooks/useAppStore";
import { APP_AUTH_KEY } from "../../hooks/useAuth";
import { useGoogleLoginUser, useGoogleRegister } from "../../hooks/useGoogleOAuth";
import { FcGoogle } from "react-icons/fc";

const GoogleLoginButtonComponent = ({ className, handleClose, isLogin, ...props }) => {
  const setIsLoggedin = useAppStore((state) => state.setIsLoggedin);
  const setUser = useAppStore((state) => state.setUser);

  const loginSuccess = (user, token) => {
    if (!user || !token) return;
    localStorage.setItem(APP_AUTH_KEY, JSON.stringify({ user, token }));
    setIsLoggedin(true);
    setUser(user);
    handleClose();
  };

  const { register: googleRegister, isLoading: googleRegisterLoading } =
    useGoogleRegister((data) => {
      loginSuccess(data?.user, data?.token);
      toast.success("Registered Successfully!");
    });
  const { login: googleLogin, isLoading: googleLoginLoading } =
    useGoogleLoginUser((data) => {
      loginSuccess(data?.user, data?.token);
      toast.success("Logged in Successfully!");
    });

  const loginToGoogle = () => {
    if (isLogin) {
      googleLogin();
    } else {
      googleRegister();
    }
  };

  return (
    <div className="flex justify-center items-center gap-4">
  {/* Facebook Login */}
  <div
    {...props}
    className={`flex flex-col w-full max-w-[200px] cursor-pointer relative items-end justify-end`}
  >
    <svg viewBox="0 0 36 36" height="32" width="40">
      <path d="M20.181 35.87C29.094 34.791 36 27.202 36 18c0-9.941-8.059-18-18-18S0 8.059 0 18c0 8.442 5.811 15.526 13.652 17.471L14 34h5.5l.681 1.87Z" fill="#1877F2"></path>
      <path d="M13.651 35.471v-11.97H9.936V18h3.715v-2.37c0-6.127 2.772-8.964 8.784-8.964 1.138 0 3.103.223 3.91.446v4.983c-.425-.043-1.167-.065-2.081-.065-2.952 0-4.09 1.116-4.09 4.025V18h5.883l-1.008 5.5h-4.867v12.37a18.183 18.183 0 0 1-6.53-.399Z" fill="#fff"></path>
    </svg>
    <button
      type="button"
      className="w-full py-[10px] mt-2 text-white"
    >
      {/* Conditionally rendered text */}
      {/* {false ? "Loading.." : isLogin ? "Sign in with Facebook" : "Register with Facebook"} */}
    </button>
  </div>

  {/* Google Login */}
  <div
    onClick={loginToGoogle}
    {...props}
    className={`flex flex-col w-full max-w-[200px] cursor-pointer relative items-start justify-start`}
  >
    {googleLoginLoading || googleRegisterLoading ? (
      <CircularProgress className="text-white" color="inherit" size={32} />
    ) : (
      <FcGoogle size={32} className="flex justify-center items-center" />
    )}
    <button
      type="button"
      className="w-full py-[10px] mt-2 text-white"
    >
       {/* Conditionally rendered text */}
      {/* {false ? "Loading.." : isLogin ? "Sign in with Google" : "Register with Google"} */}
    </button>
  </div>
</div>
  );
};


const GoogleLoginButton = ({...props})=>{
    return (
      <GoogleOAuthProvider clientId="215857877611-ihf1kbfadeai02bjqsv536gs07rkgfsd.apps.googleusercontent.com">
        <GoogleLoginButtonComponent {...props}/>
      </GoogleOAuthProvider>
    )
}

export default GoogleLoginButton;
