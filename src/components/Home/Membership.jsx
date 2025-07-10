import React from 'react'
import eventImage from "../../assets/TEMPrecurringevent.jpg";

const Membership = () => {
  return (
    <div className='mx-5 sm:mx-10 lg:mx-20'>
      <div style={{ backgroundImage: `url(${eventImage})` }} className='bg-center bg-cover relative overflow-clip rounded-xl bg-custoryPrimary flex flex-col justify-center items-center w-full h-full pl-10 pr-10 py-12 text-white'>
        <div className='absolute w-full h-full bg-gradient-to-r from-neutral-300/10 via-neutral-900/70 to-neutral-300/10 z-10'></div>
         
        <div className=' text-3xl font-bold z-20'>
          <p className='font-normal'>
            Recurring purchases?  
          </p>
          <p>
            {" "}Get up to 15% off!
          </p>
        </div>
        {/* <div className='text-xl'>
          <p>
            Check your discount codes below
          </p>
        </div> */}
        <button className='py-2 px-6 bg-white rounded-full text-black mt-6 z-20'>
          Check discounts
        </button>

      </div>
    </div>
  )
}

export default Membership