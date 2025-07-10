import React, { useState } from "react";
import Input from "../Auth/AuthInput";
import serverInstance from "../../api";

const validate = (values,setErrorValues)=>{
  const errObj = {};
  const emailRegrex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (!values.email) errObj.email = 'Please enter email';
  if (!emailRegrex.test(values.email)) errObj.email = 'Enter a valid email address';
  if (!values.fullName) errObj.fullName = 'Enter a valid Full Name';
  if (!values.phone) errObj.phone = 'Enter a valid phone number';
  if (!values.message) errObj.message = 'Please enter a message';
  if (!values.subject) errObj.subject = 'Please enter a subject';
  setErrorValues(errObj);
  if (Object.keys(errObj).length==0) return true;
  return false;

}

const initalValues ={
  email : '',
  fullName : '',
  subject : '',
  phone : '',
  message : '',
}

const ContactForm = ({setIsModal}) => {

  const [formValues,setFormValues] = useState(initalValues);
  const [loading,setLoading] = useState(false);
  const [formError,setFormError] = useState({
    email : '',
    fullName : '',
    subject : '',
    phone : '',
    message : '',
  });

  const handleChange = (e)=>{
    setFormError(prev=>({...prev,[e.target.name] : ''}))
    setFormValues(prev=>({...prev,[e.target.name] : e.target.value}));
  }
  const handleSubmit = async(e)=>{
    const validation = validate(formValues,setFormError);
    if (!validation) return;
    try {
      setLoading(true);
      const result = await serverInstance.post('/contact', formValues);
      setFormValues(initalValues)
      setLoading(false);
      setIsModal(true);
    }catch(err) {
      console.log(err);
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="text-black text-xl font-semibold s4">Get in touch</div>
      <div className="mt-5 space-y-4 max-md:space-y-6 max-sm:mt-7">
        <div>
          <Input name='fullName' value={formValues.fullName} onChange={handleChange}  label="Full Name" className="s1" placeholder="Enter your full name *" />
          {formError && <span className='text-red-500'>{formError.fullName}</span>}
        </div>
        <div className="grid grid-cols-2 gap-5 max-sm:grid-cols-1">
          <div>
          <Input name='email' value={formValues.email} onChange={handleChange} label="Email" className="s2" placeholder="Enter email *" />
          {formError && <span className='text-red-500'>{formError.email}</span>}
          </div>
          <div>
          <Input name='phone' value={formValues.phone} onChange={handleChange} label="Phone Number" className="s3" placeholder="Enter Phone Number *" />
          {formError && <span className='text-red-500'>{formError.phone}</span>}
          </div>
        </div>
        <div>
        <Input onChange={handleChange} label="Subject" name='subject' value={formValues.subject} placeholder="Enter subject*" className="s5" />
        {formError && <span className='text-red-500'>{formError.subject}</span>}
        </div>
        <div>
        <Input onChange={handleChange} label="Message" area={true} className="s6" name='message' value={formValues.message} cols={3} placeholder="Enter your message here..  *"/>
        {formError && <span className='text-red-500'>{formError.message}</span>}
        </div>
        <div className="pt-3 flex justify-center s7">
          <button disabled={loading} onClick={handleSubmit} className="bg-primary disabled:opacity-50 px-6 py-2 duration-700 rounded-sm hover:text-white font-[600] group relative overflow-hidden">
            <div className="bg-black w-full h-full absolute top-0 left-0 z-[1] duration-500 ease-out -translate-x-[500px] group-hover:translate-x-0 transition-all"></div>
            <span className="relative z-[2]">{loading?'Loading...':'Send Message'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;