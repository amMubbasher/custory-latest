import React from 'react'

const AuthButton = ({title, ...props}) => {
  return (
    <button {...props} className='w-full disabled:opacity-50 py-2 rounded-full bg-black text-white'>
        {title}
    </button>
  )
}

export default AuthButton