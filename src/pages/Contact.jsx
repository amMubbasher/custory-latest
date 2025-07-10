import React, { useState } from 'react'

import ContactForm from '../components/Contact/ContactForm'
import ContactInformation from '../components/Contact/ContactInformation'

import Modal from '../components/Contact/SubmitModal'

import Layout from '../components/Layout/Layout'


const Contact = () => {
 
  const [modal, setIsModal] = useState(false);
  return (
    <>
     
      {modal && <Modal setIsModal={setIsModal} />}
      <Layout>
        <div className='mt-20 px-44 max-xl:px-30 max-[1100px]:px-24 max-lg:px-10 max-md:mt-16 max-sm:mt-12 container max-sm:px-4'>
          <div className='grid grid-cols-[1.5fr_2fr] max-md:grid-cols-1 max-md:space-y-5 max-xl:grid-cols-[1.2fr_2fr] max-xl:gap-16 max-lg:gap-10 gap-24'>
            <ContactInformation />
            <ContactForm setIsModal={setIsModal} />
          </div>
        </div>
      </Layout>
    </>
  )
}

export default Contact