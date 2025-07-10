import React from 'react'

const AuthInput = ({...props}) => {
  return (
    <div className='w-full'>
        <input {...props} className='py-[10px] rounded-full outline-none border-[1px] w-full pl-4 placeholder:text-[#333] border-gray-600'/>
    </div>
  )
}

export default AuthInput