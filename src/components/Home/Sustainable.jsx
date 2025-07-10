import React from 'react'
import { useNavigate } from 'react-router-dom'



const Sustainable = () => {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col w-full items-center p-4 md:p-8'>
      <div className='mt-12 max-w-xl text-lg text-center'>
        <p>

          We meticulously select sustainable sources from around the world, ensuring that our supply chain not only supports the preservation of natural resources but also promotes ethical and responsible practices.
          <br/>
          <br/>
          Join our mission by supporting us below!
        </p>
      </div>
      <button onClick={()=>navigate("/products")} className='mt-8 py-3 px-8 text-white bg-custoryPrimary font-bold rounded-full ease-out transition-all hover:-translate-y-1 hover:bg-custoryMiddle' >
          Shop Now
        </button>
    </div>
  )
}

export default Sustainable