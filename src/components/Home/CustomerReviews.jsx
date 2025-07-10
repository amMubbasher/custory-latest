import React from "react";
import groupImage from "../../assets/groupImage.png";
import googleGroup from "../../assets/googleGroup.png";

const CustomerReviews = () => {
  return (
    <>
      <div className="flex flex-col h-[430px] max-sm:h-[600px] md:flex-row items-center gap-[30px] mx-6 md:mx-12 my-6">
        <div
          className="w-[50%] max-sm:w-full h-full rounded-[20px]"
          style={{ background: `url(${groupImage}) center center/cover` }}
        ></div>

        <div className="md:w-1/2 mt-6 max-sm:mt-0 md:mt-0 md:ml-8 text-left">
          <p className="text-gray-700 text-base leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.
          </p>
          <p className="mt-4 text-gray-900 font-semibold float-right mr-6">
            - Bryan Ryan, NTU
          </p>
        </div>
      </div>
      <div className="flex flex-col-reverse h-[430px] max-sm:h-[600px] md:flex-row items-center gap-[30px] mx-6 md:mx-12 my-6">
        <div className="md:w-1/2 mt-6 max-sm:mt-0 md:mt-0 md:mr-8 text-left">
          <p className="text-gray-700 text-base leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Ut enim ad minim veniam, quis
            nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat.{" "}
          </p>
          <p className="mt-4 text-gray-900 font-semibold float-right mr-6">
            - Kacie James, NTU
          </p>
        </div>

        <div
          className="w-[50%] max-sm:w-full h-full rounded-[20px]"
          style={{ background: `url(${googleGroup}) center center/cover` }}
        ></div>
      </div>
    </>
  );
};

export default CustomerReviews;
