import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import { AiOutlineFacebook, AiOutlineInstagram } from "react-icons/ai";
import { FaTiktok } from "react-icons/fa";
import Logo from '../assets/custorynavbarlogotransparent.png'
import {addToMailingList} from '../api/mailing.api'
import Reviews from "../components/Home/Reviews";

const UnderConstructionV2 = () => {
    const [ip,setIp] = useState('');
    const handleEmailSubmit = async () => {
      if (!ip) {
          toast.error('Please enter a valid email address');
          return;
      }
      
      try {
          await addToMailingList(ip);
          toast.success('You will be notified by us.');
          setIp('');
      } catch (error) {
          console.error('Error adding email to mailing list:', error);
      }
  };
  return (
    <div className="min-h-[100v]">
      <Toaster/>

      {/* First section */}
      <div className="min-h-[40vh] py-20 flex flex-col items-center justify-center bg-[#F0E0C5]">
        <div className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold text-custoryPrimary text-center max-w-[80%]">
          We're building something exciting. Stay tuned. 
        </div>
        <div className="mt-12 max-sm:w-full max-sm:px-8">
          <input
          value={ip} onChange={(e)=>setIp(e.target.value)}
            className="w-[400px] block py-2 max-sm:w-full placeholder:text-black bg-[#fbfae8] outline-none text-center text-black"
            placeholder="Enter your email"
          />
          <button
          onClick={handleEmailSubmit}
            className="w-[400px] block max-sm:w-full py-2 text-white mt-4 bg-black outline-none text-center "
            placeholder="Notify me"
          >Notify me!</button>
        </div>
      </div>

      {/* Second section */}
      <div className="min-h-[40vh] py-5 bg-custoryPrimary px-10 max-sm:px-4 flex items-center justify-center flex-col">
        <div className="max-w-[50%]">
          <img src={Logo} onContextMenu={(e) => e.preventDefault()}/>
        </div>
        
      </div>

      <Reviews/>

      {/* Third section */}
        <div className="min-h-[40vh] max-lg:min-h-fit h-fit py-20 flex flex-col items-center justify-center bg-[#F0E0C5]">
        <div className="font-black text-center">Join Our Family</div>
        <br/>
        <div className="text-center mt-1 font-bold">
          Something amazing is on its way, and we want you to be the first to know. <br />
          Stay connected with us, and be part of Custory.  <br />
          Exclusive offers only to our OG fam. <br /> 
        </div>

        <div className="flex mt-4 text-black items-center gap-5 justify-center">

          <a target="_blank" href="https://www.instagram.com/custory.co/">
          <AiOutlineInstagram
            className="hover:text-primary cursor-pointer"
            size={50}
          />
          </a>
          <a target="_blank" href="https://www.facebook.com/people/Custory/61556835771548/">
          <AiOutlineFacebook
            className="hover:text-primary cursor-pointer"
            size={50}
          /></a>
          <a target="_blank" href="https://www.tiktok.com/@custoryofficial">
          <FaTiktok className="hover:text-primary cursor-pointer" size={40} />
          </a>
        </div>
        <div className="mt-6 w-full text-black text-center">
            © Copyright 2024 Custory
        </div>
      </div>
    </div>
  );
};

export default UnderConstructionV2;
