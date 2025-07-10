import React from 'react'
import { useNavigate } from "react-router-dom";
import { NoProductSVG } from '../../utils/Assets';
import Button from '../common/Button';
const EmptyCart = ({height, className, setShowCart}) => {
  const navigate = useNavigate();
  return (
    <div style={{height : height || '40vh'}} className={` w-full flex items-center justify-center flex-col ${className || ''}`}>
        <img src={NoProductSVG} className='h-[70%] w-auto' onContextMenu={(e) => e.preventDefault()}/>
        <div className='mt-5 text-xl'>Oops! Seems like your cart is empty.</div>
        <Button className={'mt-3'} onClick={()=> {setShowCart(false); navigate('/products')}}>Shop Now!</Button>
    </div>
  )
}

export default EmptyCart