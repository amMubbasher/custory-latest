import React, { useEffect, useState } from "react";
import { useGoogleAuth } from "../hooks/useGoogleAuth";

const GoogleRedirect = () => {
  const { googleSuccessCall, error, isError, isLoading } = useGoogleAuth();
  const [rendered, setIsRedered] = useState(false);
  useEffect(()=>{
    if (!rendered) {
      googleSuccessCall();
      setIsRedered(true);
    }
  }, [])
  return (
    <div className="min-h-[100vh] w-full h-full flex items-center justify-center">
      {isLoading ? (
        <div className="text-xl font-[400] text-center">
          Verifying Google Auth..
        </div>
      ) : isError ? (
        <div className="text-xl font-[400] text-red-500 text-center">
          {error?.response?.data?.message || "Something went wrong! try again!"}
        </div>
      ) : (
        <div className="text-xl font-[400] text-green-600 text-center">
          Google Auth Verified! Redirecting to Home
        </div>
      )}
    </div>
  );
};

export default GoogleRedirect;
