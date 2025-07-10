import React from 'react'


const ShirtProductDetailInfo = (props) => {
  const {productData, perItemPrice} = props
  return (
    <div >
        <span className='font-bold text-[20px]'>
            Starting from ${(perItemPrice / 100).toFixed(2)} /item
        </span>
        <div className="text-lg font-normal items-center mt-2 mb-2">
            <span className="rounded-lg">{productData?.materialType} {productData?.weight ? <>({productData?.weight * 1000} g)</> : null}</span>
        </div>
        <div className='text-sm font-semibold mt-2'>
            <span className="text-sm font-normal rounded-lg">{productData?.extraDescription}</span>
        </div>
        <div className='font-bold my-2'>
            <h1 className='font-bold text-[20px]'>Need a Quotation?</h1>
            <span className="text-sm font-normal">Complete the order and access a PDF copy of the quotation on the checkout page</span>
        </div>
        {/* <div className="text-md font-semibold flex items-center py-1 ">
            <div className="">Printing Type:</div>
            <span className="font-normal  px-3 rounded-lg">{productData?.printingType}</span>
        </div> */}
        {/* <div className="text-md font-semibold items-center py-1 ">
            <div className="">Size of Design:</div>
            <span className="font-normal text-sm rounded-lg">{productData?.sizeOfDesign}</span>
        </div> */}
    </div>
  )
}

export default ShirtProductDetailInfo