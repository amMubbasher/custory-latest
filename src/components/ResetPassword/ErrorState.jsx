import React from 'react'
import ResetErrorImg from '../../assets/reseterror.svg';
import Button from '../common/Button';
const ErrorState = () => {
  return (
    <div className='h-[70vh] flex items-center justify-center flex-col w-full'>
        <img src={ResetErrorImg} className='max-w-[300px]' onContextMenu={(e) => e.preventDefault()}/>
        <div className='text-center mt-4 text-2xl font-semibold text-black text-opacity-80'>Invalid Token! Please Retry</div>
        <Button className={'mt-5'} primary>Go Back Home</Button>
    </div>
  )
}

export default ErrorState