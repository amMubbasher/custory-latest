// import React from 'react'
// import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

// const processList = [
//   {
//     number:1,
//     name:"SELECT",
//     description:<span>Products that <br/> aren't Boring</span>
//   },
//   {
//     number:2,
//     name:"DESIGN",
//     description:<span>Create your <br/> Custom design</span>
//   },
//   {
//     number:3,
//     name:"SHIP",
//     description:<span>Get it shipped  <br/> Internationally</span>
//   },

// ]

// const FAQComponent = () => {
//   const [dropMenu, setDropMenu] = React.useState([]);

//   const FAQ_array = [
//     {heading: "Do you work with both businesses and individuals?", answer: "Yes. We support brands, agencies, and creators alike — whether you’re launching a campaign or customizing merch for fun, Custory has you covered."},
//     {heading: "What makes Custory different from other merchandisers?", answer: "We offer end-to-end creative services with no minimum order quantity, instant quotations, and a seamless process from branding to delivery — all tailored to your goals."},
//     {heading: "How fast can I receive my custom products?", answer: "For orders placed through our Shop page without custom design requests, we offer two delivery options: Express Shipping (7–14 business days) and Standard Shipping (up to 4 weeks)."},
//     {heading: "How do I get started?", answer: "Whether you're a business or an individual, getting started is easy — book a call with our team for tailored B2B support, or start designing directly on our Shop page for fast, self-service ordering."},
//   ]
//   return (
//     // <div className='mx-5 sm:mx-10 lg:mx-20 h-fit'>
//     //   <div className='w-full flex flex-col items-center'>
//     //     <h3 className='text-3xl text-center max-sm:text-2xl'>
//     //       Corporate Gifting Made <span className='font-bold'>Easy</span>.
//     //     </h3>

//     //     <div className='grid grid-cols-1 grid-rows-3 md:grid-cols-3 md:grid-rows-1 gap-4 md:gap-2 w-full mt-12'>
//     //       {
//     //         processList.map((stage, i)=>(
//     //           <div key={i} className='relative -z-10 bg-gradient-to-b from-custoryPrimary via-custoryPrimary to-custorySecondary rounded-lg aspect-square transition-all transform hover:-translate-y-2'>
//     //             <p className='-z-10 bg-gradient-to-b from-custorySecondary to-custoryPrimary bg-clip-text text-transparent font-bold text-[300px] md:text-[200px] lg:text-[300px] xl:text-[400px] 2xl:text-[600px] md:-mt-4 xl:-mt-8 font-sans absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
//     //               {stage.number}
//     //             </p>
//     //             <div className='flex flex-col items-center justify-evenly h-full'>
//     //               <h4 className=' font-bold text-white text-[60px] sm:text-[80px] md:text-[50px] lg:text-[60px] xl:text-[80px] 2xl:text-[110px]'>
//     //                 {stage.name}
//     //               </h4>
//     //               <p className='text-center font text-white text-[30px] sm:text-[30px] md:text-[15px] lg:text-[20px] xl:text-[30px] 2xl:text-[50px] font-sans font-bold'>
//     //                 {stage.description}
//     //               </p>
//     //             </div>
//     //           </div>
//     //         ))
//     //       }
//     //     </div>
//     //   </div>
//     // </div>
//     <div className="md:w-[550px] w-full mx-auto max-md:px-8">
//       <div className="mb-12 text-center">
//         <h1 className="sm:text-5xl text-3xl font-bold text-[#FF6600] mb-2 text-center">
//           FAQ's
//         </h1>
//         <p className="sm:text-lg text-base text-[#FF6600]">
//           Providing answers to your questions
//         </p>
//       </div>

//       <div className="space-y-8 mx-auto">
//         {FAQ_array.map((item, index) => (
//           <div
//             key={index}
//             className="rounded-2xl bg-white shadow-lg px-6 py-2 min-h-[86px] flex flex-col justify-center sm:w-[543px] w-auto"
//           >
//             <div className="flex items-center justify-between mb-2">
//               <h3 className="sm:text-[18px] text-base font-semibold text-black">
//                 {item?.heading}
//               </h3>
//               <span
//                 className="cursor-pointer bg-[#FF6600] flex-shrink-0 rounded-full sm:w-12 w-9 sm:h-12 h-9 flex items-center justify-center"
//                 onClick={() => {
//                   if (!dropMenu.includes(index)) {
//                     setDropMenu([...dropMenu, index]);
//                   } else {
//                     const filterDropMenu = dropMenu.filter(
//                       (item) => item !== index
//                     );
//                     setDropMenu([...filterDropMenu]);
//                   }
//                 }}
//               >
//                 {!dropMenu.includes(index) ? (
//                   <FaChevronDown size={18} color="#FFF" />
//                 ) : (
//                   <FaChevronUp size={18} color="#FFF" />
//                 )}
//               </span>
//             </div>
//             <p
//               className={`${
//                 !dropMenu.includes(index) &&
//                 "max-h-[0] overflow-hidden hidden my-2"
//               }text-black text-base py-4`}
//             >
//               {item?.answer}
//             </p>
//           </div>
//         ))}
//       </div>

//       <div className="flex flex-col gap-4 mt-8">
//         <textarea
//           className="sm:w-[543px] w-auto border-2 p-2 rounded-xl border-[#FF6600] resize-none outline-0 focus:border-blue-600"
//           placeholder="Ask us what you want to know...."
//           rows={5}
//         ></textarea>
//         <div className="flex items-center justify-between">
//           <p className="text-[14px] max-w-[242px] text-black max-sm:max-w-[200px]">
//             We will answer your questions via email within 48 hours.
//           </p>
//           <button className="bg-[#FF6600] text-white px-12 text-base py-3 rounded-[8px] font-semibold">
//             Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default FAQComponent































































































// import React, { useState, useEffect } from 'react';
// import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
// import { motion, AnimatePresence } from 'framer-motion';

// const processList = [
//   {
//     number: 1,
//     name: "SELECT",
//     description: <span>Products that <br/> aren't Boring</span>
//   },
//   {
//     number: 2,
//     name: "DESIGN",
//     description: <span>Create your <br/> Custom design</span>
//   },
//   {
//     number: 3,
//     name: "SHIP",
//     description: <span>Get it shipped <br/> Internationally</span>
//   },
// ];

// const FAQComponent = () => {
//   const [dropMenu, setDropMenu] = useState([]);
//   const [focusedQuestion, setFocusedQuestion] = useState(null);
//   const [isFormFocused, setIsFormFocused] = useState(false);

//   // Handle hover and focus states
//   const handleMouseEnter = (index) => {
//     setFocusedQuestion(index);
//   };

//   const handleMouseLeave = () => {
//     setFocusedQuestion(null);
//   };

//   // Decorative elements
//   const renderDecorations = () => {
//     return Array(5).fill().map((_, i) => (
//       <motion.div
//         key={i}
//         className="absolute rounded-full bg-orange-500/10"
//         style={{
//           width: 20 + Math.random() * 80,
//           height: 20 + Math.random() * 80,
//           left: `${Math.random() * 100}%`,
//           top: `${Math.random() * 100}%`,
//           zIndex: 0,
//           originX: 0.5,
//           originY: 0.5,
//         }}
//         initial={{ scale: 0, opacity: 0 }}
//         animate={{ 
//           scale: [0.8, 1.2, 0.8], 
//           opacity: [0.3, 0.6, 0.3],
//           rotate: [0, 360],
//         }}
//         transition={{
//           duration: 8 + i * 4,
//           repeat: Infinity,
//           ease: "easeInOut",
//           delay: i * 2
//         }}
//       />
//     ));
//   };

//   const FAQ_array = [
//     {heading: "Do you work with both businesses and individuals?", answer: "Yes. We support brands, agencies, and creators alike — whether you're launching a campaign or customizing merch for fun, Custory has you covered."},
//     {heading: "What makes Custory different from other merchandisers?", answer: "We offer end-to-end creative services with no minimum order quantity, instant quotations, and a seamless process from branding to delivery — all tailored to your goals."},
//     {heading: "How fast can I receive my custom products?", answer: "For orders placed through our Shop page without custom design requests, we offer two delivery options: Express Shipping (7–14 business days) and Standard Shipping (up to 4 weeks)."},
//     {heading: "How do I get started?", answer: "Whether you're a business or an individual, getting started is easy — book a call with our team for tailored B2B support, or start designing directly on our Shop page for fast, self-service ordering."},
//   ];

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     show: { 
//       opacity: 1,
//       transition: { 
//         staggerChildren: 0.2,
//         delayChildren: 0.3,
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     show: { 
//       y: 0,
//       opacity: 1,
//       transition: { 
//         type: "spring",
//         stiffness: 70,
//         damping: 12
//       }
//     }
//   };

//   const titleVariants = {
//     hidden: { y: -30, opacity: 0 },
//     show: { 
//       y: 0, 
//       opacity: 1,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//         damping: 12,
//       }
//     }
//   };

//   const highlightVariants = {
//     initial: { width: "0%" },
//     animate: { 
//       width: "100%",
//       transition: { duration: 1, ease: "easeOut" }
//     }
//   };

//   const buttonVariants = {
//     rest: { scale: 1 },
//     hover: { 
//       scale: 1.1,
//       backgroundColor: "#e84c16",
//       boxShadow: "0 4px 12px rgba(255, 102, 0, 0.3)",
//       transition: { duration: 0.2, ease: "easeOut" }
//     },
//     tap: { 
//       scale: 0.95,
//       boxShadow: "0 2px 5px rgba(255, 102, 0, 0.3)",
//     }
//   };

//   const formVariants = {
//     rest: { 
//       backgroundColor: "white",
//       boxShadow: "0 4px 15px rgba(0, 0, 0, 0.05)",
//     },
//     focus: { 
//       backgroundColor: "white", 
//       boxShadow: "0 8px 25px rgba(255, 102, 0, 0.15)",
//       y: -5,
//       transition: { type: "spring", stiffness: 300, damping: 20 }
//     }
//   };

//   return (
//     <motion.div 
//       className="md:w-[550px] w-full mx-auto max-md:px-8 relative"
//       initial="hidden"
//       whileInView="show"
//       viewport={{ once: true, amount: 0.1 }}
//       variants={containerVariants}
//     >
//       {/* Decorative animated elements */}
//       {renderDecorations()}
      
//       <motion.div className="mb-12 text-center relative" variants={titleVariants}>
//         <motion.h1 
//           className="sm:text-5xl text-3xl font-bold text-[#FF6600] mb-2 text-center"
//           whileHover={{ scale: 1.03 }}
//           transition={{ type: "spring", stiffness: 400, damping: 10 }}
//         >
//           FAQ's
//         </motion.h1>
//         <motion.div 
//           className="h-1 bg-orange-300 rounded-full w-12 mx-auto"
//           variants={highlightVariants}
//           initial="initial"
//           animate="animate"
//         />
//         <motion.p 
//           className="sm:text-lg text-base text-[#FF6600] mt-4"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1, duration: 1 }}
//         >
//           Providing answers to your questions
//         </motion.p>
//       </motion.div>

//       <motion.div 
//         className="space-y-8 mx-auto relative"
//         variants={containerVariants}
//       >
//         {FAQ_array.map((item, index) => (
//           <motion.div
//             key={index}
//             variants={itemVariants}
//             className="rounded-2xl bg-white shadow-lg px-6 py-2 min-h-[86px] flex flex-col justify-center sm:w-[543px] w-auto overflow-hidden"
//             whileHover={{ 
//               y: -5, 
//               boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
//               borderColor: "#FF6600", 
//             }}
//             onMouseEnter={() => handleMouseEnter(index)}
//             onMouseLeave={handleMouseLeave}
//             style={{ position: "relative" }}
//           >
//             {/* Animated background highlight effect */}
//             <AnimatePresence>
//               {focusedQuestion === index && (
//                 <motion.div
//                   className="absolute inset-0 bg-gradient-to-r from-orange-50 to-transparent"
//                   initial={{ opacity: 0, x: -100 }}
//                   animate={{ opacity: 0.6, x: 0 }}
//                   exit={{ opacity: 0, x: 100 }}
//                   transition={{ duration: 0.5 }}
//                   style={{ zIndex: 0 }}
//                 />
//               )}
//             </AnimatePresence>

//             <div className="flex items-center justify-between mb-2 relative z-10">
//               <h3 className="sm:text-[18px] text-base font-semibold text-black">
//                 {item?.heading}
//               </h3>
//               <motion.span
//                 className="cursor-pointer bg-[#FF6600] flex-shrink-0 rounded-full sm:w-12 w-9 sm:h-12 h-9 flex items-center justify-center"
//                 onClick={() => {
//                   if (!dropMenu.includes(index)) {
//                     setDropMenu([...dropMenu, index]);
//                   } else {
//                     const filterDropMenu = dropMenu.filter(
//                       (item) => item !== index
//                     );
//                     setDropMenu([...filterDropMenu]);
//                   }
//                 }}
//                 whileHover={{ 
//                   scale: 1.1,
//                   boxShadow: "0 3px 10px rgba(255,102,0,0.3)",
//                 }}
//                 whileTap={{ scale: 0.9 }}
//                 transition={{ type: "spring", stiffness: 400, damping: 10 }}
//               >
//                 {!dropMenu.includes(index) ? (
//                   <FaChevronDown size={18} color="#FFF" />
//                 ) : (
//                   <FaChevronUp size={18} color="#FFF" />
//                 )}
//               </motion.span>
//             </div>

//             <AnimatePresence>
//               {dropMenu.includes(index) && (
//                 <motion.div
//                   initial={{ height: 0, opacity: 0 }}
//                   animate={{ 
//                     height: "auto", 
//                     opacity: 1,
//                     transition: { 
//                       height: { 
//                         duration: 0.4, 
//                         ease: "easeOut"
//                       }, 
//                       opacity: { duration: 0.6 }
//                     }
//                   }}
//                   exit={{ 
//                     height: 0, 
//                     opacity: 0,
//                     transition: { 
//                       height: { 
//                         duration: 0.2, 
//                         ease: "easeIn"
//                       }, 
//                       opacity: { duration: 0.1 } 
//                     }
//                   }}
//                   className="overflow-hidden relative z-10"
//                 >
//                   <motion.p
//                     className="text-black text-base py-4"
//                     initial={{ y: 10, opacity: 0 }}
//                     animate={{ y: 0, opacity: 1 }}
//                     exit={{ y: -10, opacity: 0 }}
//                     transition={{ duration: 0.3, delay: 0.1 }}
//                   >
//                     {item?.answer}
//                   </motion.p>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </motion.div>
//         ))}
//       </motion.div>

//       <motion.div 
//         className="flex flex-col gap-4 mt-8 relative z-10"
//         variants={itemVariants}
//         initial="hidden"
//         whileInView="show"
//         viewport={{ once: true, amount: 0.2 }}
//       >
//         <motion.div
//           variants={formVariants}
//           initial="rest"
//           animate={isFormFocused ? "focus" : "rest"}
//           className="relative rounded-xl overflow-hidden"
//         >
//           {/* Animated border effect */}
//           {isFormFocused && (
//             <motion.div 
//               className="absolute inset-0 rounded-xl border-2 border-[#FF6600] pointer-events-none"
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.3 }}
//             />
//           )}
          
//           <motion.textarea
//             className="sm:w-[543px] w-auto border-2 p-4 rounded-xl border-[#FF6600] resize-none outline-0 focus:border-blue-600 z-10 relative bg-white"
//             placeholder="Ask us what you want to know...."
//             rows={5}
//             onFocus={() => setIsFormFocused(true)}
//             onBlur={() => setIsFormFocused(false)}
//             whileFocus={{ boxShadow: "0 0 0 2px rgba(255,102,0,0.3)" }}
//             animate={{ boxShadow: isFormFocused ? "0 0 0 3px rgba(255,102,0,0.2)" : "none" }}
//           ></motion.textarea>
//         </motion.div>
        
//         <div className="flex items-center justify-between">
//           <motion.p 
//             className="text-[14px] max-w-[242px] text-black max-sm:max-w-[200px]"
//             initial={{ opacity: 0, x: -10 }}
//             whileInView={{ opacity: 1, x: 0 }}
//             transition={{ delay: 0.4, duration: 0.5 }}
//             viewport={{ once: true }}
//           >
//             We will answer your questions via email within 48 hours.
//           </motion.p>
          
//           <motion.button
//             className="bg-[#FF6600] text-white px-12 text-base py-3 rounded-[8px] font-semibold relative overflow-hidden"
//             variants={buttonVariants}
//             initial="rest"
//             whileHover="hover"
//             whileTap="tap"
//           >
//             {/* Animated overlay for button */}
//             <motion.div
//               className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-400/30 to-orange-500/0"
//               initial={{ x: "-100%" }}
//               whileHover={{ x: "100%" }}
//               transition={{ duration: 0.8 }}
//             />
//             <span className="relative z-10">Send</span>
//           </motion.button>
//         </div>
//       </motion.div>
//     </motion.div>
//   );
// }

// export default FAQComponent;
































































































import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { motion } from 'framer-motion';

const processList = [
  {
    number: 1,
    name: "SELECT",
    description: <span>Products that <br/> aren't Boring</span>
  },
  {
    number: 2,
    name: "DESIGN",
    description: <span>Create your <br/> Custom design</span>
  },
  {
    number: 3,
    name: "SHIP",
    description: <span>Get it shipped <br/> Internationally</span>
  },
];

const FAQComponent = () => {
  const [dropMenu, setDropMenu] = useState([]);
  const [isFormFocused, setIsFormFocused] = useState(false);

  const FAQ_array = [
    // {heading: "Do you work with both businesses and individuals?", answer: "Yes. We support brands, agencies, and creators alike — whether you're launching a campaign or customizing merch for fun, Custory has you covered."},
    // {heading: "What makes Custory different from other merchandisers?", answer: "We offer end-to-end creative services with no minimum order quantity, instant quotations, and a seamless process from branding to delivery — all tailored to your goals."},
    // {heading: "How fast can I receive my custom products?", answer: "For orders placed through our Shop page without custom design requests, we offer two delivery options: Express Shipping (7–14 business days) and Standard Shipping (up to 4 weeks)."},
    // {heading: "How do I get started?", answer: "Whether you're a business or an individual, getting started is easy — book a call with our team for tailored B2B support, or start designing directly on our Shop page for fast, self-service ordering."},

    {heading: "What is Custory and what does it do?", answer: "Custory is a creative studio that helps businesses design and deliver better brand experiences through strategy, storytelling, and merchandise. Our name stands for “custom story” - design-led solutions that drive real results."},
    {heading: "Do you work with both businesses and individuals?", answer: "Yes. We support brands, agencies, and creators alike — whether you’re launching a campaign or customizing merch for fun, Custory has you covered."},

    {heading: "What makes Custory different from other merchandisers?", answer: "We offer end-to-end creative services with no minimum order quantity, instant quotations, and a seamless process from branding to delivery — all tailored to your goals."},

    {heading: "How fast can I receive my custom products?", answer: "For orders placed through our Shop page without custom design requests, we offer two delivery options: Express Shipping (7–14 business days) and Standard Shipping (up to 4 weeks). "},

    {heading: "How do I get started?", answer: "Whether you're a business or an individual, getting started is easy — book a call with our team for tailored B2B support, or start designing directly on our Shop page for fast, self-service ordering."},
  ];

  // Floating animation variants
  const floatingTitle = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };
  
  const floatingItem = index => ({
    animate: {
      y: [0, -8, 0],
      x: index % 2 === 0 ? [0, 5, 0] : [0, -5, 0],
      transition: {
        duration: 6 + index,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: index * 0.5
      }
    }
  });
  
  const floatingButton = {
    animate: {
      y: [0, -5, 0],
      boxShadow: [
        '0px 4px 8px rgba(255, 102, 0, 0.2)',
        '0px 8px 16px rgba(255, 102, 0, 0.3)',
        '0px 4px 8px rgba(255, 102, 0, 0.2)',
      ],
      transition: {
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    },
    hover: {
      scale: 1.05,
      y: -10,
      boxShadow: '0px 10px 20px rgba(255, 102, 0, 0.4)'
    },
    tap: { scale: 0.98 }
  };
  
  const floatingDecoration = index => ({
    animate: {
      y: [0, -(10 + index * 5), 0],
      x: index % 2 === 0 ? [0, 10, 0] : [0, -10, 0],
      rotate: [0, index % 2 === 0 ? 10 : -10, 0],
      scale: [1, 1.1, 1],
      opacity: [0.4, 0.7, 0.4],
      transition: {
        duration: 8 + index * 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: index * 1.2
      }
    }
  });
  
  const floatingChevron = {
    animate: {
      y: [0, -2, 0],
      scale: [1, 1.1, 1],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };
  
  const floatingForm = {
    rest: { y: 0 },
    hover: { y: -5 },
    focus: { 
      y: -10, 
      boxShadow: '0px 15px 25px rgba(255, 102, 0, 0.15)',
      transition: { type: "spring", stiffness: 400, damping: 20 }
    },
    floating: {
      y: [0, -7, 0],
      boxShadow: [
        '0px 5px 15px rgba(0, 0, 0, 0.05)',
        '0px 15px 25px rgba(255, 102, 0, 0.1)',
        '0px 5px 15px rgba(0, 0, 0, 0.05)',
      ],
      transition: {
        duration: 7,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: 2
      }
    }
  };

  return (
    <div className="md:w-[550px] w-full mx-auto max-md:px-8 relative">
      {/* Floating background decorations */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-r from-orange-200 to-orange-100 opacity-40 pointer-events-none"
          style={{
            width: 20 + Math.random() * 80,
            height: 20 + Math.random() * 80,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            zIndex: 0
          }}
          variants={floatingDecoration(i)}
          animate="animate"
        />
      ))}
      
      <motion.div 
        className="mb-12 text-center relative z-10"
        variants={floatingTitle}
        animate="animate"
      >
        <motion.h1 
          className="sm:text-5xl text-3xl font-bold text-[#FF6600] mb-2 text-center"
          variants={floatingTitle}
          animate="animate"
        >
          FAQ's
          <motion.div 
            className="h-1 bg-orange-300 rounded-full w-16 mx-auto mt-2"
            animate={{ width: ["30%", "100%", "30%"] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        </motion.h1>
        <motion.p 
          className="sm:text-lg text-base text-[#FF6600] mt-4"
          animate={{ 
            opacity: [0.8, 1, 0.8],
            transition: {
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse"
            }
          }}
        >
          Providing answers to your questions
        </motion.p>
      </motion.div>

      <div className="space-y-8 mx-auto relative z-10">
        {FAQ_array.map((item, index) => (
          <motion.div
            key={index}
            className="rounded-2xl bg-white shadow-lg px-6 py-2 min-h-[86px] flex flex-col justify-center sm:w-[543px] w-auto"
            variants={floatingItem(index)}
            animate="animate"
            whileHover={{ 
              y: -15, 
              boxShadow: "0px 15px 30px rgba(255, 102, 0, 0.15)",
              transition: { type: "spring", stiffness: 300, damping: 15 }
            }}
          >
            <div className="flex items-center justify-between mb-2">
              <h3 className="sm:text-[18px] text-base font-semibold text-black">
                {item?.heading}
              </h3>
              <motion.span
                className="cursor-pointer bg-[#FF6600] flex-shrink-0 rounded-full sm:w-12 w-9 sm:h-12 h-9 flex items-center justify-center"
                onClick={() => {
                  if (!dropMenu.includes(index)) {
                    setDropMenu([...dropMenu, index]);
                  } else {
                    const filterDropMenu = dropMenu.filter(
                      (item) => item !== index
                    );
                    setDropMenu([...filterDropMenu]);
                  }
                }}
                variants={floatingChevron}
                animate="animate"
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0px 5px 15px rgba(255, 102, 0, 0.3)",
                  backgroundColor: "#e84c16",
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }}
              >
                {!dropMenu.includes(index) ? (
                  <FaChevronDown size={18} color="#FFF" />
                ) : (
                  <FaChevronUp size={18} color="#FFF" />
                )}
              </motion.span>
            </div>
            {dropMenu.includes(index) && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ 
                  opacity: 1, 
                  height: "auto",
                  transition: { duration: 0.5, ease: "easeOut" }
                }}
                exit={{ opacity: 0, height: 0 }}
              >
                <p className="text-black text-base py-4">
                  {item?.answer}
                </p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="flex flex-col gap-4 mt-8 relative z-10">
        <motion.div
          variants={floatingForm}
          initial="rest"
          animate={["floating"]}
          whileHover="hover"
          whileFocus="focus"
          className="relative rounded-xl"
        >
          <textarea
            className="sm:w-[543px] w-auto border-2 p-2 rounded-xl border-[#FF6600] resize-none outline-0 focus:border-blue-600 bg-white"
            placeholder="Ask us what you want to know...."
            rows={5}
            onFocus={() => setIsFormFocused(true)}
            onBlur={() => setIsFormFocused(false)}
          ></textarea>
        </motion.div>
        
        <div className="flex items-center justify-between">
          <motion.p 
            className="text-[14px] max-w-[242px] text-black max-sm:max-w-[200px]"
            animate={{ 
              opacity: [0.7, 1, 0.7],
              y: [0, -3, 0],
              transition: {
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 1
              }
            }}
          >
            We will answer your questions via email within 48 hours.
          </motion.p>
          
          <motion.button
            className="bg-[#FF6600] text-white px-12 text-base py-3 rounded-[8px] font-semibold relative overflow-hidden"
            variants={floatingButton}
            animate="animate"
            whileHover="hover"
            whileTap="tap"
          >
            {/* Animated gradient overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-orange-400/0 via-orange-300/30 to-orange-400/0"
              animate={{
                x: ["-100%", "100%", "-100%"],
                transition: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                  repeatDelay: 3
                }
              }}
            />
            <span className="relative z-10">Send</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default FAQComponent;



