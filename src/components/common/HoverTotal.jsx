import React, { useEffect } from 'react'
import useAppStore from '../../hooks/useAppStore'
import { usePrices } from '../../hooks/usePrices';

const calculateTotal = (selectedProducts,numberOfPeople,drawingStyle,currentProduct)=>{
    let products = [...selectedProducts];
    if (selectedProducts.length === 0 && currentProduct) products = [...products,{product : currentProduct, quantity : 1}];
    let total = 0;
    products.forEach(product=>{
        total += product.product.price * product.quantity;
    }
    )
    if (drawingStyle) {
    total+=numberOfPeople*(+(drawingStyle?.price || 0));
    }
    return total
}

const HoverTotal = () => {
  const {p} = usePrices();
    const selectedProducts = useAppStore(state=>state.selectedProducts)
    const numberOfPeople =  useAppStore(state=>state.numberOfPersonTobeDrawn);
    const currentProduct =  useAppStore(state=>state.product);
    const drawingStyle = useAppStore(state=>state.drawingStyle);
    const showTotal = useAppStore(state=>state.showTotal);
    const setShowTotal = useAppStore(state=>state.setShowTotal);

    useEffect(()=>{
      setShowTotal(true);
      const itl = setTimeout(()=>{
          setShowTotal(false);
      }, 3000);
      return ()=>clearTimeout(itl);
    }, [selectedProducts,numberOfPeople,drawingStyle,currentProduct])

  return (
    <div className={`flex ${showTotal?'opacity-100':'opacity-0'} flex-col transition-all fixed top-[60vh] text-white font-bold text-xl right-0 items-center text-shadow justify-end from-[#f09400] cursor-pointer hover:from-[#ffc258] hover:text-black  duration-500 hover:scale-[1.09] hover:to-[#f9dcb2] to-[#f9dcb2] h-auto py-1 px-6 pr-3  bg-gradient-to-tr`}>
   <div className='text-sm'> Total</div>
        ${p(calculateTotal(selectedProducts,numberOfPeople,drawingStyle,currentProduct))}
    </div>
  )
}

export default HoverTotal