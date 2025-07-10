import React, { useEffect, useState } from 'react'
import { buildStyles, CircularProgressbar, CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import ProcessingOrderIcon from '../../assets/checkout-icons/order-processed.png';
import PaymentVerifiedIcon from '../../assets/checkout-icons/credit-card.png';
import OrderPlacedIcon from '../../assets/checkout-icons/thumbs-up.png';
import SendingOrderIcon from '../../assets/checkout-icons/mail.png';
import useCart from '../../hooks/useCart';
import useOrder from "../../hooks/useOrder";

const CheckoutComplete = ({orderId}) => {
    const [progress,setProgress] = useState(0);
    const [message,setMessage] = useState(null);
    const { deleteCart } = useCart();
    const {updateOrder} = useOrder();

    useEffect(()=>{
        // temporary, just for localhost
        if(window.location.href.includes('http://localhost:5173')){
            // Delete Cart
            setTimeout(() => { deleteCart() }, 5000);
            if(orderId){
                updateOrder({
                    data: { id: orderId, isLocalOrder: true }
                })
            }
        }

        const interval = setInterval(()=>{
            setProgress(prev=>prev+10)
            if (progress >=100)  clearInterval(interval);
        },800)
        if (progress)
        return ()=>clearInterval(interval)
    }, [])
    const navigate = useNavigate();
    useEffect(()=>{
        if (progress === 0) setMessage({text : 'Processing your order',color : 'text-yellow-500', emoji : ProcessingOrderIcon})
        else if (progress <= 30) setMessage({text : 'Verifying payment',color : 'text-orange-500', emoji :  SendingOrderIcon})
        else if (progress <= 70) setMessage({text : 'Order placed successfully!',color : 'text-blue-400', emoji : PaymentVerifiedIcon})
        else  setMessage({text : 'We are now reviewing your order!',color : 'text-orange-600', emoji : OrderPlacedIcon})

        if (progress>=100) {
            setTimeout(()=>{
                navigate(`/account/mygifts/${orderId}`)
            }, [1500])
        }
    }, [progress])
  return (
    <div className='flex items-center flex-col mt-12 justify-center'>
    <div className={`${progress>=100?'h-[250px] w-[250px]':'h-[400px] max-sm:h-[320px] w-[400px] max-sm:w-[320px]'} transition-all duration-500`}>
        <CircularProgressbarWithChildren styles={buildStyles({
            pathColor : '#fcb53f'
        })} value={progress} maxValue={100}>
            {message&&<div className=''><img src={message?.emoji} className='w-[60px]' onContextMenu={(e) => e.preventDefault()}/></div>}
            {message&&progress<100&&<div className={`mt-2 font-[600] text-lg max-sm:text-[15px] ${message?.color}`}>{message?.text}</div>}
        </CircularProgressbarWithChildren>
    </div>
    {progress>=100&&<div className='mt-4 font-[500] text-lg'>Your order is now under review.<span className='font-semibold text-center block'>Redirecting to Order Details!</span></div>}
    </div>
  )
}

export default CheckoutComplete