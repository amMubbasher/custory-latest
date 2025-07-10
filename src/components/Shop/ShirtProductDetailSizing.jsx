import React, { useState } from 'react';
import useAppStore from "../../hooks/useAppStore";
import calculatePrice from '../../utils/functions/calculatePrice';
import {Radio, RadioGroup, Box, InputAdornment, FormControlLabel,Select, MenuItem,FormControl} from "@mui/material";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { MdOutlineFileDownload,MdClose } from "react-icons/md";
import { downloadImageFromS3 } from "../../utils/functions/S3Functions";

const ShirtProductDetailSizing = (props) => {
  const {quantity, availableSizes, selectedSizes, setSelectedSizes, setTotalPrice, setQuantity, totalPrice, minQuantity, productData,printProofing,setPrintProofing,colorNumber} = props;
  const showMinQuantityWarning = useAppStore(state => state.showMinQuantityWarning);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const values = productData?.price.map(item => item.pricePerUnit);
  // const getMaxPrice = (productData) => {
  //   const availablePrices = ["Embroidery", "Screen Printing", "Heat Transfer"]
  //     .map(key => productData.price[key])
  //     .filter(price => price !== undefined);

  //   return availablePrices.length > 0 ? Math.max(...availablePrices) : 0;
  // };
  // const maxPrice = Math.max(...values) + getMaxPrice(productData) * 2;

  const handleSizeChange = (index, event) => {
    const newSelectedSizes = [...selectedSizes];
    newSelectedSizes[index] = event.target.value;
    setSelectedSizes(newSelectedSizes);
    const {calculatedPrice} = calculatePrice(productData.price, quantity, {}, '0' ,colorNumber, productData?.printingType);
    setTotalPrice(calculatedPrice);
    const totalSelectedSizes = newSelectedSizes.reduce((total, size) => {
      return total + (parseInt(size) || 0);
    }, 0);
    if (totalSelectedSizes > parseInt(quantity)) {
      setQuantity(totalSelectedSizes.toString());
    }
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      {showMinQuantityWarning && (
        <div></div>
        // <div className="text-red-500 text-sm mt-2">Minimum quantity requirement of {minQuantity} not met!</div>
      )}

      <div className="flex justify-between items-center my-4">
      <div className='font-bold text-[16px] pt-2 flex gap-2 items-center'>
          <span className='w-[20px] h-[20px] flex items-center justify-center rounded text-white text-[12px] bg-custoryPrimary'>5</span> Select Sizes   <IoIosInformationCircleOutline
              data-tooltip-html="<div> Embroidery requires a minimum quantity of 30 Units. </div>"
              data-tooltip-id="info-message"
              className="cursor-pointer text-custoryPrimary"
          >
        </IoIosInformationCircleOutline>
        <ReactTooltip id="info-message" place="top" />
        </div>
        <div className="font-normal text-xs underline cursor-pointer" onClick={toggleModal}>Sizing Chart</div>
      </div>
      <div className='text-xs font-normal my-5 flex items-center justify-end'>

        <span className='font-medium'>Current Total: {quantity}</span>
      </div>

      <div className="flex items-center gap-3 max-md:flex-wrap">
        {availableSizes.map((sizeOption, index) => (
          <div key={index} className="flex items-center">
            <div className="relative">
              <span className='absolute top-[10px] left-[13px]'>{sizeOption?.sizeName.toUpperCase()}</span>
              <select
                id={`size-${index}`}
                className={`text-sm rounded-md py-[10px] pr-[5px] dark:bg-orange-50 min-w-[97px]  ${sizeOption.sizeName.length > 3 ? 'pl-[60px] text-end' : 'pl-[40px] text-center'}`}
                value={selectedSizes[index] || ''}
                onChange={(event) => handleSizeChange(index, event)}
              >
                <option value="">0</option>
                {[...Array(999).keys()].map((num) => (
                  <option key={num + 1} value={(num + 1).toString()}>
                    {num + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>

      <div className='font-bold text-[16px] pt-2 flex gap-2 items-center my-4'>
          <span className='w-[20px] h-[20px] flex items-center justify-center rounded text-white text-[12px] bg-custoryPrimary'>6</span> Print Confirmation
        </div>
        <span className='text-xs font-normal my-3 block'>Get a exact replica of how your print will appear on your product in a PDF format.</span>
        <Box className="flex space-x-4">
          <RadioGroup
            className={`gap-4 max-md:justify-center`}
            row
            aria-labelledby="printProofing"
            defaultValue="false"
            name="printProofing"
            value={printProofing}
            onChange={({target})=>setPrintProofing(target.value)}
          >
            <Box className="rounded-lg p-[10px] bg-orange-50 w-[240px] flex items-start">
              <FormControlLabel
                value="Print Now"
                control={<Radio sx={{padding:0,paddingLeft: 1.25}} color='warning'/>}
              />
                 <Box className="ml-[-10px]">
                    <span className="font-extrabold text-sm">Print Now</span>
                    <span className="text-sm font-medium block">Free</span>
                    <p className="text-xs font-normal block mt-[5px]">If your file passes review, we will print ASAP. If there is an issue we cannot fix, we will contact you</p>
                  </Box>
            </Box>
            <Box className="rounded-lg p-[10px] bg-orange-50 w-[240px] flex items-start">
              <FormControlLabel
                value="Wait for Online Confirmation"
                control={<Radio sx={{padding:0,paddingLeft: 1.25}} color='warning'/>}
              />
                 <Box className="ml-[-10px]">
                    <span className="font-extrabold text-sm">Wait for Online Confirmation</span>
                    <span className="text-sm font-medium block">Free</span>
                    <p className="text-xs font-normal block mt-[5px]">You will receive a email with PDF proof of your design. We will only start printing once you approve of the email. This may delay your order process by a few business days.</p>
                  </Box>
            </Box>
          </RadioGroup>
        </Box>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all my-8 sm:align-middle sm:max-w-[850px] sm:h-[560px] sm:w-full p-4 mt-20">
              <div className='flex items-center justify-end gap-2 px-3'>
                <button className='outline-none' onClick={() => downloadImageFromS3("custorybucket", "Products/sizing.png",'Size Chart')}><MdOutlineFileDownload className='inline ml-[4px] outline-none border-none' size={25}/></button>
                <button className='outline-none' onClick={toggleModal}><MdClose className='inline ml-[4px]' size={25}/></button>
              </div>
              <img src={`https://custorybucket.s3.ap-southeast-1.amazonaws.com/Products/2ff257ea-a2b3-4686-a3a3-58d12b05abb6/sizing.png`} alt="" className='sm:w-1/2 mx-auto sm:mt-[-15px] mt-[5px]' onContextMenu={(e) => e.preventDefault()} />
            </div>
          </div>
        </div>
      )}

        <div className='text-black'>
          <div className='font-bold text-[16px] pt-2 flex gap-2 items-center my-4'>
          <span className='w-[20px] h-[20px] flex items-center justify-center rounded text-white text-[12px] bg-custoryPrimary'>7</span> Price Summary
        </div>
          <div className="flex items-center">
            <div className='text-[16px] font-medium mr-1'>
              Quantity:
            </div>
            <div className='text-[16px] font-medium'>
              {quantity}
            </div>
          </div>
          <div className="text-[16px] font-medium flex items-center">
            <div className="mr-1">Price per item:</div>
            ${totalPrice / 100} <span className="text-[16px] font-medium"></span>
          </div>
          <div className="text-[20px] font-bold flex items-center">
            <div className="mr-4">Total Price:</div> ${((totalPrice / 100) * quantity).toFixed(2)}
          </div>
        </div>
    </div>
  );
};

export default ShirtProductDetailSizing;