import { CircularProgress } from '@mui/material'
import React from 'react'

const LoadingState = () => {
  return (
    <div className='h-[70vh] flex items-center justify-center w-full flex-col'>
        <CircularProgress size={70} color='inherit' className='text-primary'/>
        <div className='mt-5 text-center font-[500] text-xl'>Verifying Token</div>
    </div>
  )
}

export default LoadingState