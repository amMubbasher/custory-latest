import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import BasicModal from './BasicModal'

const RemindMeModal = ({open,handleClose}) => {
    const [email,setEmail] = useState('');
    const handleSubmit = ()=>{
        toast.success("We've got your contact! We'll be in touch soon");
        handleClose();
    }
  return (
    <BasicModal open={open} handleClose={handleClose}>
        <div className='w-[500px] max-sm:w-[90vw] max-sm:px-3 bg-white px-6 py-4 rounded-md'>
            <div className='text-center text-2xl font-semibold max-sm:text-xl text-black'>Enter your Email</div>
            <div className='w-full mt-5'>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email' className='w-full py-3 px-6 border-[1px] bg-gray-50 rounded-md'/>
            </div>
            <button onClick={handleSubmit} disabled={!email} className='mt-4 w-full py-3 disabled:opacity-70 text-center bg-primary text-black rounded-md'>Submit</button>
        </div>
    </BasicModal>
  )
}

export default RemindMeModal