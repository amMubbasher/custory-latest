import React from "react";
import { useNavigate } from "react-router-dom";
import errorSVG from "../../assets/error-account.svg";
import Button from "../common/Button";
const ErrorState = ({error}) => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center flex-col justify-center h-[60vh] w-full">
      <img src={errorSVG} className="w-[400px] object-contain" onContextMenu={(e) => e.preventDefault()} />
      <div className="text-center text-xl font-[500] mt-5">{error || 'Something went wrong!'}</div>
      <Button onClick={()=>navigate(`/`)} className={'mt-4'}>Go Back {">"}</Button>
    </div>
  );
};

export default ErrorState;
