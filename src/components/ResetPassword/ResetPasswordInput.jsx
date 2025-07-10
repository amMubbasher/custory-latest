import React from 'react'

const ResetPasswordInput = ({label,error,...props}) => {
  return (
    <div>
        <label className='text-[#051626] font-[400]'>{label}</label>
        <input className='mt-2 rounded-lg placeholder:text-[#051626] placeholder:text-opacity-50 text-[16px] border-[2px] border-[#051626] w-full max-sm:py-[6px] py-[11px] px-5' {...props}/>
        {error&&<div className='text-sm mt-1 text-red-500 font-semibold italic'>{error}</div>}
    </div>
  )
}

export default ResetPasswordInput