// import React, { useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import Button from "../common/Button";
// import {FaTiktok, FaTelegram} from 'react-icons/fa';
// import {AiOutlineFacebook,AiOutlineInstagram, AiOutlineLinkedin} from 'react-icons/ai'
// import Logo from "../../assets/CustoryBanner.png";
// import RemindMeModal from "../common/RemindMeModal";
// import { FiPhone } from "react-icons/fi";
// import { HiOutlineMail } from "react-icons/hi";
// const FooterLink = ({ title, link }) => {
//   return (
//     <div className="font-[400] max-xs:text-center sm:text-base text-sm text-[#111204]">
//       <Link to={link} onClick={()=>window.scrollTo(0, 0)}>{title}</Link>
//     </div>
//   );
// };

// const Footer = () => {
//   const path = useLocation().pathname;
//   const [remindMeModal,setRemindMeModal] = useState(false); 
//   return (
//     <>
//       {path !== "/" ? 
//         <div className="px-20 max-xl:px-10  max-lg:px-7 max-xs:px-4 max-content-width mt-20 border-t-[1px] py-5">
//           <RemindMeModal
//             open={remindMeModal}
//             handleClose={() => setRemindMeModal(false)}
//           />
//           <div className="grid grid-cols-4 max-sm:grid-cols-1 max-md:grid-cols-2 max-md:gap-y-12 w-full items-start">
//             <section className="text-center">
//               <div className="text-lg font-semibold max-xs:text-center">
//                 {FOOTER_LINKS.ABOUT.title}
//               </div>
//               <div className="mt-3 space-y-2">
//                 {FOOTER_LINKS.ABOUT.subLinks.map((link, index) => (
//                   <FooterLink key={index} title={link.title} link={link.link} />
//                 ))}
//               </div>
//             </section>
//             <section className="text-center">
//               <div className="text-lg font-semibold max-xs:text-center">
//                 {FOOTER_LINKS.HELP.title}
//               </div>
//               <div className="mt-3 space-y-2">
//                 {FOOTER_LINKS.HELP.subLinks.map((link, index) => (
//                   <FooterLink key={index} title={link.title} link={link.link} />
//                 ))}
//               </div>
//             </section>
//             <section className="text-center">
//               <div className="text-lg font-semibold max-xs:text-center">
//                 Contact us for support
//               </div>
//               <div className="mt-2 max-xs:mt-1 max-xs:text-center underline">
//                 <Link to="/contact">Contact Us</Link>
//               </div>
//               <div className="mt-2 max-xs:mt-1 max-xs:text-center underline">
//                 admin@custory.sg
//               </div>
//               <div className="max-xs:flex mt-4  max-xs:justify-center ">
//                 {/* <Button onClick={()=>setRemindMeModal(true)} className='max-xs:py-[6px] max-xs:mx-auto max-xs:w-fit' primary={true}>Remind Me</Button> */}
//               </div>
//             </section>
//             <section className="text-center">
//               <div className="font-semibold text-lg max-xs:text-center">
//                 Join Our Family
//               </div>
//               <div className="flex mt-2 items-center gap-5 justify-center">
//                 <a href="https://www.instagram.com/custoryofficial/">
//                   <AiOutlineInstagram
//                     className="hover:text-primary cursor-pointer"
//                     size={30}
//                   />
//                 </a>
//                 <a href="https://www.tiktok.com/@custoryofficial">
//                   <FaTiktok
//                     className="hover:text-primary cursor-pointer"
//                     size={25}
//                   />
//                 </a>
//                 <a href="https://www.facebook.com/people/Custory/61556835771548/">
//                   <AiOutlineFacebook
//                     className="hover:text-primary cursor-pointer"
//                     size={30}
//                   />
//                 </a>
//                 <a href="https://t.me/custory">
//                   <FaTelegram
//                     className="hover:text-primary cursor-pointer"
//                     size={25}
//                   />
//                 </a>
//                 <a href="https://www.linkedin.com/company/custory.co">
//                   <AiOutlineLinkedin
//                     className="hover:text-primary cursor-pointer"
//                     size={30}
//                   />
//                 </a>
//               </div>
//               <div className="mt-3 text-sm opacity-70 max-xs:text-center">
//                 © copyright 2024. Custory
//               </div>
//             </section>
//           </div>
//           <div className="flex items-center justify-center mt-12">
//             <a href="/">
//               <img
//                 src={Logo}
//                 style={{ width: "229px", height: "80px" }}
//                 onContextMenu={(e) => e.preventDefault()}
//               />
//             </a>
//           </div>
//         </div>
//         :
//         <footer className="bg-white text-black px-4 md:px-16 py-8">
//           <div className="flex flex-col sm:flex-row justify-between max-sm:items-center gap-8">
//             <div className="flex-1 max-sm:wfull">
//               <div className="flex items-center gap-2 mb-4 max-sm:justify-center">
//                 <a href="/">
//                   <img
//                     src={Logo}
//                     className="sm:w-[250px] w-[180px]"
//                     onContextMenu={(e) => e.preventDefault()}
//                   />
//                 </a>
//               </div>
//               <p className="sm:text-base text-sm text-[#111204] max-w-xs max-sm:max-w-full max-sm:text-center">
//                 Custory – a leading creative studio specializing in transforming brand stories into memorable, high-impact experiences for businesses of all sizes.
//               </p>
//             </div>
//             <div className="flex-1 flex flex-col gap-4 items-end">
//               <div className="flex flex-col gap-5 mr-4">
//                 <a className="sm:text-base text-sm text-[#111204]">
//                   <HiOutlineMail className="inline mr-2" size={25} />{" "}
//                   <span>admin@custory.co</span>
//                 </a>
//                 <a className="sm:text-base text-sm text-[#111204]">
//                   <FiPhone className="inline mr-2" size={25} />{" "}
//                   <span>+6580925936</span>
//                 </a>
//               </div>
//               <div className="flex items-center gap-4 mt-2 text-xl text-gray-700 justify-center sm:justify-end">
//                 <a href="https://www.instagram.com/custoryofficial/">
//                   <AiOutlineInstagram
//                     className="hover:text-primary cursor-pointer"
//                     size={25}
//                   />
//                 </a>
//                 <a href="https://www.tiktok.com/@custoryofficial">
//                   <FaTiktok
//                     className="hover:text-primary cursor-pointer"
//                     size={25}
//                   />
//                 </a>
//                 <a href="https://www.facebook.com/people/Custory/61556835771548/">
//                   <AiOutlineFacebook
//                     className="hover:text-primary cursor-pointer"
//                     size={25}
//                   />
//                 </a>
//                 <a href="https://t.me/custory">
//                   <FaTelegram
//                     className="hover:text-primary cursor-pointer"
//                     size={25}
//                   />
//                 </a>
//                 <a href="https://www.linkedin.com/company/custory.co">
//                   <AiOutlineLinkedin
//                     className="hover:text-primary cursor-pointer"
//                     size={25}
//                   />
//                 </a>
//               </div>
//             </div>
//           </div>
//           <hr className="my-6 border-gray-400" />
//           <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-700 gap-4">
//             <div className="flex gap-6 flex-wrap justify-center">
//               <section className="text-center">
//                 <div className="flex gap-4 items-center">
//                   {FOOTER_LINKS.ABOUT.subLinks.map((link, index) => (
//                     <FooterLink key={index} title={link.title} link={link.link} />
//                   ))}
//                 </div>
//               </section>
//               <section className="text-center">
//                 <div className="flex gap-4 items-center">
//                   {FOOTER_LINKS.HELP.subLinks.map((link, index) => (
//                     <FooterLink key={index} title={link.title} link={link.link} />
//                   ))}
//                 </div>
//               </section>
//             </div>
//             <p className="sm:text-base text-sm text-[#111204]">
//               © 2020–2025 Custory – All Rights Reserved
//             </p>
//           </div>
//         </footer>
//       }
//     </>
//   );
// };

// const FOOTER_LINKS = {
//   ABOUT: {
//     title: "About",
//     subLinks: [
//       { title: "Home", link: "/" },
//       { title: "Shop", link: "/products" },
//       { title: "My Account", link: "/account" },
//       { title: "My Orders", link: "/account/mygifts" },
//     ],
//   },
//   HELP: {
//     title: "Help",
//     subLinks: [
//       // { title: "FAQs", link: "/faq" },
//       // { title: "Contact Us", link: "/contact" },
//       { title: "Terms & Conditions", link: "/terms" },
//       // { title: "Shipping & Delivery", link: "/" },
//       // { title: "Reward System", link: "/" },
//       // { title: "Track your Parcel", link: "/" },
//     ],
//   },
// };

// export default Footer;

































































import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, useAnimation, useInView } from "framer-motion";
import Button from "../common/Button";
import { FaTiktok, FaTelegram } from 'react-icons/fa';
import { AiOutlineFacebook, AiOutlineInstagram, AiOutlineLinkedin } from 'react-icons/ai';
import { FiPhone, FiArrowUpRight } from "react-icons/fi";

import { FaWhatsapp } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import Logo from "../../assets/CustoryBanner.png";
import RemindMeModal from "../common/RemindMeModal";


const FooterLink = ({ title, link }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className="font-[400] max-xs:text-center sm:text-base text-sm text-[#111204] relative"
      whileHover={{ y: -2 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link 
        to={link} 
        onClick={() => window.scrollTo(0, 0)}
        className="relative inline-block"
      >
        {title}
        <motion.span 
          className="absolute left-0 bottom-0 h-[1px] bg-[#FF6600]"
          initial={{ width: 0 }}
          animate={{ width: isHovered ? '100%' : 0 }}
          transition={{ duration: 0.2 }}
        />
      </Link>
    </motion.div>
  );
};

const SocialIcon = ({ Icon, href, label }) => (
  <motion.a 
    href={href}
    aria-label={label}
    target="_blank"
    rel="noopener noreferrer"
    className="social-icon-wrapper"
    whileHover={{ scale: 1.2, color: "#FF6600" }}
    whileTap={{ scale: 0.9 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
  >
    <Icon size={25} className="transition-colors duration-300" />
  </motion.a>
);

const Footer = () => {
  const path = useLocation().pathname;
  const [remindMeModal, setRemindMeModal] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const footerRef = useRef(null);
  const isInView = useInView(footerRef, { once: true, amount: 0.1 });
  const controls = useAnimation();
  const isHome = path === "/";
  
  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  // Start animations when footer comes into view
  useEffect(() => {
    if (isInView && !prefersReducedMotion) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls, prefersReducedMotion]);

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };
  
  const socialContainerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.4
      }
    }
  };
  
  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.6
      }
    }
  };

  // Social media links data
  const socialLinks = [
    { Icon: AiOutlineInstagram, href: "https://www.instagram.com/custoryofficial/", label: "Follow us on Instagram" },
    { Icon: FaTiktok, href: "https://www.tiktok.com/@custoryofficial", label: "Follow us on TikTok" },
    { Icon: AiOutlineFacebook, href: "https://www.facebook.com/people/Custory/61556835771548/", label: "Follow us on Facebook" },
    { Icon: FaTelegram, href: "https://t.me/custory", label: "Join us on Telegram" },
    { Icon: AiOutlineLinkedin, href: "https://www.linkedin.com/company/custory.co", label: "Follow us on LinkedIn" }
  ];

  return (
    <>
      <RemindMeModal
        open={remindMeModal}
        handleClose={() => setRemindMeModal(false)}
      />
      
      {/* Regular Page Footer */}
      {!isHome ? (
        <motion.footer
          ref={footerRef}
          className="px-20 max-xl:px-10 max-lg:px-7 max-xs:px-4 max-content-width mt-20 border-t-[1px] py-5"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          aria-labelledby="footer-heading"
        >
          <h2 id="footer-heading" className="sr-only">Footer</h2>
          
          <div className="grid grid-cols-4 max-sm:grid-cols-1 max-md:grid-cols-2 max-md:gap-y-12 w-full items-start">
            {/* About Section */}
            <motion.section 
              className="text-center"
              variants={itemVariants}
            >
              <div className="text-lg font-semibold max-xs:text-center">
                {FOOTER_LINKS.ABOUT.title}
              </div>
              <div className="mt-3 space-y-2">
                {FOOTER_LINKS.ABOUT.subLinks.map((link, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    custom={index}
                  >
                    <FooterLink title={link.title} link={link.link} />
                  </motion.div>
                ))}
              </div>
            </motion.section>
            
            {/* Help Section */}
            <motion.section 
              className="text-center"
              variants={itemVariants}
            >
              <div className="text-lg font-semibold max-xs:text-center">
                {FOOTER_LINKS.HELP.title}
              </div>
              <div className="mt-3 space-y-2">
                {FOOTER_LINKS.HELP.subLinks.map((link, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    custom={index}
                  >
                    <FooterLink title={link.title} link={link.link} />
                  </motion.div>
                ))}
              </div>
            </motion.section>
            
            {/* Contact Section */}
            <motion.section 
              className="text-center"
              variants={itemVariants}
            >
              <div className="text-lg font-semibold max-xs:text-center">
                Contact us for support
              </div>
              <motion.div 
                className="mt-2 max-xs:mt-1 max-xs:text-center underline"
                whileHover={{ y: -2, color: "#FF6600" }}
              >
                <Link to="/contact">Contact Us</Link>
              </motion.div>
              <motion.div 
                className="mt-2 max-xs:mt-1 max-xs:text-center flex justify-center items-center gap-1"
                whileHover={{ y: -2, color: "#FF6600" }}
              >
                <HiOutlineMail size={16} />
                <a href="mailto:admin@custory.sg">admin@custory.sg</a>
              </motion.div>
            </motion.section>
            
            {/* Social Section */}
            <motion.section 
              className="text-center"
              variants={itemVariants}
            >
              <div className="font-semibold text-lg max-xs:text-center mb-3">
                Join Our Family
              </div>
              <motion.div 
                className="flex items-center gap-5 justify-center"
                variants={socialContainerVariants}
              >
                {socialLinks.map((social, index) => (
                  <SocialIcon 
                    key={index} 
                    Icon={social.Icon} 
                    href={social.href} 
                    label={social.label} 
                  />
                ))}
              </motion.div>
              <motion.div 
                className="mt-4 text-sm opacity-70 max-xs:text-center"
                variants={itemVariants}
              >
                © copyright {new Date().getFullYear()}. Custory
              </motion.div>
            </motion.section>
          </div>
          
          {/* Logo Section */}
          <motion.div 
            className="flex items-center justify-center mt-12"
            variants={logoVariants}
            whileHover={{ scale: 1.05 }}
          >
            <a href="/">
              <img
                src={Logo}
                alt="Custory Logo"
                style={{ width: "229px", height: "80px" }}
                onContextMenu={(e) => e.preventDefault()}
                loading="lazy"
              />
            </a>
          </motion.div>
        </motion.footer>
      ) : (
        // Home Page Footer
        <motion.footer 
          ref={footerRef}
          className="bg-white text-black px-4 md:px-16 py-8"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          aria-labelledby="home-footer-heading"
        >
          <h2 id="home-footer-heading" className="sr-only">Footer</h2>
          
          <motion.div 
            className="flex flex-col sm:flex-row justify-between max-sm:items-center gap-8"
            variants={itemVariants}
          >
            {/* Logo and Description */}
            <motion.div 
              className="flex-1 max-sm:wfull"
              variants={itemVariants}
            >
              <motion.div 
                className="flex items-center gap-2 mb-4 max-sm:justify-center"
                variants={logoVariants}
                whileHover={{ scale: 1.02 }}
              >
                <a href="/">
                  <img
                    src={Logo}
                    alt="Custory Logo"
                    className="sm:w-[250px] w-[180px]"
                    onContextMenu={(e) => e.preventDefault()}
                    loading="lazy"
                  />
                </a>
              </motion.div>
              <motion.p 
                className="sm:text-base text-sm text-[#111204] max-w-xs max-sm:max-w-full max-sm:text-center"
                variants={itemVariants}
              >
                Custory – a leading creative studio specializing in transforming brand stories into memorable, high-impact experiences for businesses of all sizes.
              </motion.p>
            </motion.div>
            
            {/* Contact and Social */}
            <motion.div 
              className="flex-1 flex flex-col gap-4 items-end"
              variants={itemVariants}
            >
              <motion.div 
                className="flex flex-col gap-5 mr-4"
                variants={itemVariants}
              >
                <motion.a 
                  className="sm:text-base text-sm text-[#111204] flex items-center"
                  href="mailto:admin@custory.co"
                  whileHover={{ color: "#FF6600", x: 5 }}
                >
                  <HiOutlineMail className="inline mr-2" size={25} />
                  <span>admin@custory.co</span>
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="ml-1"
                  >
                    <FiArrowUpRight size={16} />
                  </motion.span>
                </motion.a>
                <motion.a 
                  className="sm:text-base text-sm text-[#111204] flex items-center"
                  href="tel:+6580925936"
                  whileHover={{ color: "#FF6600", x: 5 }}
                >
                  <FaWhatsapp className="inline mr-2" size={25} />
                  <span>+6580925936</span>
                  <motion.span
                    initial={{ opacity: 0, x: -10 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="ml-1"
                  >
                    <FiArrowUpRight size={16} />
                  </motion.span>
                </motion.a>
              </motion.div>
              
              {/* Social Icons */}
              <motion.div 
                className="flex items-center gap-4 mt-2 text-xl text-gray-700 justify-center sm:justify-end"
                variants={socialContainerVariants}
              >
                {socialLinks.map((social, index) => (
                  <SocialIcon 
                    key={index} 
                    Icon={social.Icon} 
                    href={social.href} 
                    label={social.label} 
                  />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
          
          {/* Divider */}
          <motion.hr 
            className="my-6 border-gray-400" 
            variants={itemVariants}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          />
          
          {/* Footer Nav and Copyright */}
          <motion.div 
            className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-700 gap-4"
            variants={itemVariants}
          >
            {/* Footer Links */}
            <motion.div 
              className="flex gap-6 flex-wrap justify-center"
              variants={itemVariants}
            >
              <motion.section 
                className="text-center"
                variants={itemVariants}
              >
                <div className="flex gap-4 items-center">
                  {FOOTER_LINKS.ABOUT.subLinks.map((link, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      custom={index}
                    >
                      <FooterLink title={link.title} link={link.link} />
                    </motion.div>
                  ))}
                </div>
              </motion.section>
              <motion.section 
                className="text-center"
                variants={itemVariants}
              >
                <div className="flex gap-4 items-center">
                  {FOOTER_LINKS.HELP.subLinks.map((link, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      custom={index}
                    >
                      <FooterLink title={link.title} link={link.link} />
                    </motion.div>
                  ))}
                </div>
              </motion.section>
            </motion.div>
            
            {/* Copyright */}
            <motion.p 
              className="sm:text-base text-sm text-[#111204]"
              variants={itemVariants}
            >
              © 2020–{new Date().getFullYear()} Custory – All Rights Reserved
            </motion.p>
          </motion.div>
          
          {/* Back to Top Button (visible when scrolled) */}
          <motion.button
            className="fixed bottom-6 right-6 bg-[#FF6600] text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg z-50"
            initial={{ opacity: 0, y: 100 }}
            animate={{ 
              opacity: typeof window !== 'undefined' && window.scrollY > 300 ? 1 : 0,
              y: typeof window !== 'undefined' && window.scrollY > 300 ? 0 : 100
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5L5 12H19L12 5Z" fill="currentColor" />
              <path d="M12 19V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </motion.button>
        </motion.footer>
      )}
    </>
  );
};

const FOOTER_LINKS = {
  ABOUT: {
    title: "About",
    subLinks: [
      { title: "Home", link: "/" },
      // { title: "Shop", link: "/products" },
      // { title: "My Account", link: "/account" },
      // { title: "My Orders", link: "/account/mygifts" },
      { title: "Shop", link: "/upgrade" },
      { title: "My Account", link: "/upgrade" },
      { title: "My Orders", link: "/upgrade" },
    ],
  },
  HELP: {
    title: "Help",
    subLinks: [
      { title: "Terms & Conditions", link: "/terms" },
    ],
  },
};

export default Footer;
// onClick={()=>navigate('/upgrade')}