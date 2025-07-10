import React from 'react'
import { BsTelephone } from 'react-icons/bs';
import { HiOutlineMail, HiOutlineLocationMarker } from 'react-icons/hi';

const ContactInfoItem = ({ className, title, value, icon }) => {
  return (
    <div className={`${className} items-center flex gap-5 max-sm:gap-3`}>
      <div className='w-[60px] h-[60px] bg-primary rounded-lg shrink-0 flex items-center text-black justify-center'>{icon}</div>
      <div className=''>
        <div className='text-sm font-[400] uppercase'>{title}</div>
        <div className='text-xl font-oswald font-semibold max-sm:text-lg mt-1'>{value}</div>
      </div>
    </div>
  )
}

const ContactInformation = () => {

  return (
    <div className='text-black'>
      <div className='font-semibold text-xl s1'>Contact Information</div>
      <div className='mt-2 text-gray-500 s2 max-xl:text-sm'>Get in touch with us. Please enter your inquiry below, and we will respond to you with more information.
      </div>
      <div className='mt-10 space-y-10'>
        {/* <ContactInfoItem icon={<BsTelephone size={22} />} className='s3' title="Call Us" value="+91 83194 75916" /> */}
        <ContactInfoItem icon={<HiOutlineMail size={23} />} className='s4' title="Write to Us" value="admin@custory.sg" />
        {/* <ContactInfoItem icon={<BsTelephone size={24} />} className='s5' title="Contact Us" value={`+1 8888888888`} /> */}
      </div>
    </div>
  )
}

export default ContactInformation