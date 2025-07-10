import { useGoogleLogin } from "@react-oauth/google";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { googleOAuthLoginAPI, googleOAuthRegisterAPI } from "../api/oauth.api";


export const useGoogleRegister = (onSuccess=()=>{}) => {
  const googleRegister = useMutation(googleOAuthRegisterAPI, {
    onError: (err) => {
      console.log(err)
      toast.error(err.response.data.message || "Something went wrong!");
    },
    onSuccess : (data)=>{
        onSuccess(data);
    }
  });

  const register = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      googleRegister.mutate(
        {
          accessToken: tokenResponse.access_token,
        },
        
      );
    },
  });

  return {
    register,
    isLoading : googleRegister.isLoading
  };
};


export const useGoogleLoginUser = (onSuccess=()=>{}) => {
    const googleLogin = useMutation(googleOAuthLoginAPI, {
      onError: (err) => {
        toast.error(err.response.data.message || "Something went wrong!");
      // console.log(err)

      },
      onSuccess : (data)=>{
          onSuccess(data);
      }
    });
  
    const login = useGoogleLogin({
      onSuccess: (tokenResponse) => {
        googleLogin.mutate(
          {
            accessToken: tokenResponse.access_token,
          },
          
        );
      },
    });
  
    return {
      login,
      isLoading : googleLogin.isLoading
    };
  };
  