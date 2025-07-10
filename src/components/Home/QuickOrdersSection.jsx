// import React, { useEffect, useState, useRef } from "react";
// import { motion, useAnimation, useInView } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// const B2CSection = () => {
//   const navigate = useNavigate();
//   const controls = useAnimation();
//   const containerRef = useRef(null);
//   const isInView = useInView(containerRef, { once: false, amount: 0.2 });
//   const [animationKey, setAnimationKey] = useState(0);
  
//   // Trigger animations when section comes into view
//   useEffect(() => {
//     if (isInView) {
//       controls.start("visible");
      
//       // Set up repeating animations
//       const interval = setInterval(() => {
//         setAnimationKey(prev => prev + 1);
//       }, 15000); // Repeat animations every 15 seconds
      
//       return () => clearInterval(interval);
//     }
//   }, [isInView, controls]);
  
//   // Liquid animation for background
//   const liquidBackground = {
//     initial: {},
//     visible: {
//       transition: {
//         staggerChildren: 0.1
//       }
//     }
//   };
  
//   const liquidBubble = {
//     initial: { 
//       scale: 0,
//       opacity: 0
//     },
//     visible: (i) => ({
//       scale: [0, 1, 1.1, 1],
//       opacity: [0, 0.2, 0.1],
//       x: [0, i % 2 === 0 ? 20 : -20, 0],
//       transition: {
//         duration: 8,
//         repeat: Infinity,
//         repeatType: "reverse",
//         ease: "easeInOut",
//         delay: i * 0.7
//       }
//     })
//   };

//   // Text animations
//   const headingVariants = {
//     initial: { y: 60, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         damping: 15,
//         stiffness: 80,
//         duration: 1.2
//       }
//     }
//   };
  
//   const paragraphVariants = {
//     initial: { y: 40, opacity: 0 },
//     visible: {
//       y: 0, 
//       opacity: 1,
//       transition: {
//         type: "spring", 
//         damping: 12,
//         duration: 1.2,
//         delay: 0.3
//       }
//     }
//   };

//   // Step card animations
//   const cardVariants = {
//     initial: (i) => ({
//       opacity: 0,
//       y: 50,
//       rotateY: i % 2 === 0 ? -15 : 15,
//       rotateX: 10
//     }),
//     visible: (i) => ({
//       opacity: 1,
//       y: 0,
//       rotateY: 0,
//       rotateX: 0,
//       transition: {
//         type: "spring",
//         damping: 20,
//         stiffness: 80,
//         delay: 0.7 + (i * 0.2),
//         duration: 1.5
//       }
//     }),
//     hover: {
//       y: -10,
//       boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.11)",
//       transition: { duration: 0.3 }
//     }
//   };

//   // Image reveal animation with liquid masking
//   const imageRevealVariants = {
//     initial: { scale: 1.1 },
//     visible: (i) => ({
//       scale: 1,
//       transition: {
//         duration: 1.5,
//         delay: 0.8 + (i * 0.2),
//         ease: "easeOut"
//       }
//     }),
//     hover: {
//       scale: 1.05,
//       transition: { duration: 0.5 }
//     }
//   };
  
//   // Number reveal with 3D effect
//   const numberVariants = {
//     initial: { 
//       scale: 0,
//       rotateY: 180,
//       opacity: 0
//     },
//     visible: (i) => ({
//       scale: 1,
//       rotateY: 0,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         damping: 10,
//         stiffness: 80,
//         delay: 1 + (i * 0.2),
//         duration: 0.8
//       }
//     }),
//     pulse: (i) => ({
//       scale: [1, 1.1, 1],
//       boxShadow: [
//         "0px 0px 0px rgba(255, 140, 0, 0.3)",
//         "0px 0px 20px rgba(255, 140, 0, 0.5)",
//         "0px 0px 0px rgba(255, 140, 0, 0.3)"
//       ],
//       transition: {
//         duration: 3,
//         times: [0, 0.5, 1],
//         repeat: Infinity,
//         repeatDelay: i * 1 + 2
//       }
//     })
//   };

//   // Line drawing animation
//   const lineVariants = {
//     initial: { width: 0 },
//     visible: (i) => ({
//       width: "100%",
//       transition: {
//         duration: 1.5,
//         delay: 1.2 + (i * 0.2),
//         ease: "easeInOut"
//       }
//     })
//   };
  
//   // Animated content reveals with staggering
//   const textRevealVariants = {
//     initial: { opacity: 0, y: 30 },
//     visible: (i) => ({
//       opacity: 1,
//       y: 0,
//       transition: {
//         type: "spring",
//         damping: 15,
//         delay: 1.2 + (i * 0.15),
//         duration: 1
//       }
//     })
//   };
  
//   // Ripple effect for step cards
//   const rippleVariants = {
//     initial: { opacity: 0, scale: 0 },
//     animate: (i) => ({
//       opacity: [0, 0.3, 0],
//       scale: [0.5, 1.2, 1.5],
//       transition: {
//         duration: 2,
//         delay: i * 1.5,
//         repeat: Infinity,
//         repeatDelay: 10
//       }
//     })
//   };

//   return (
//     <motion.div 
//       className="bg-white px-4 md:px-20 text-center relative overflow-hidden"
//       ref={containerRef}
//       key={animationKey}
//       variants={liquidBackground}
//       initial="initial"
//       animate={controls}
//       style={{ perspective: "1200px" }}
//     >
//       {/* Liquid background bubbles */}
//       {[...Array(6)].map((_, i) => (
//         <motion.div
//           key={`bubble-${i}`}
//           variants={liquidBubble}
//           custom={i}
//           className="absolute rounded-full bg-gradient-to-r from-orange-100 to-orange-50 opacity-10 pointer-events-none"
//           style={{
//             width: 100 + Math.random() * 300,
//             height: 100 + Math.random() * 300,
//             left: `${Math.random() * 100}%`,
//             top: `${Math.random() * 100}%`,
//             zIndex: 0
//           }}
//         />
//       ))}
      
//       <motion.h2 
//         className="text-2xl md:text-5xl font-bold text-gray-900 sm:my-20 my-12 relative z-10"
//         variants={headingVariants}
//       >
//         For Quick Orders & Customization (B2C)
//       </motion.h2>
      
//       <motion.p 
//         className="text-base md:text-xl text-black max-w-xl mx-auto relative z-10"
//         variants={paragraphVariants}
//       >
//         Explore our collections, personalize them with your logo, and order in
//         minutes — no back-and-forth required.
//       </motion.p>
      
//       {/* Enhanced Shop Button */}
//       <motion.div className="sm:my-16 my-12 relative z-10">
//         <motion.button
//           onClick={() => navigate("/products")}
//           className="relative bg-orange-500 text-white py-4 px-12 rounded-md font-semibold text-sm overflow-hidden group"
//           whileHover={{ 
//             scale: 1.05,
//             boxShadow: "0 10px 25px -5px rgba(249, 115, 22, 0.4)"
//           }}
//           whileTap={{ scale: 0.98 }}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ type: "spring", stiffness: 400, damping: 15 }}
//         >
//           {/* Animated gradient overlay */}
//           <motion.span 
//             className="absolute inset-0 bg-gradient-to-r from-orange-400/60 to-orange-600/60"
//             initial={{ x: "-100%" }}
//             whileHover={{ x: "100%" }}
//             transition={{ duration: 0.8 }}
//           />
          
//           {/* Subtle particles on hover */}
//           <span className="absolute inset-0 w-full h-full">
//             {[...Array(5)].map((_, i) => (
//               <motion.span
//                 key={i}
//                 className="absolute w-1 h-1 rounded-full bg-white"
//                 initial={{ opacity: 0, scale: 0 }}
//                 style={{
//                   left: `${30 + i * 10}%`,
//                   top: `${50 + (i % 2) * 10}%`
//                 }}
//                 whileHover={{
//                   opacity: [0, 0.8, 0],
//                   scale: [0, 1, 0],
//                   y: -20,
//                   transition: {
//                     duration: 1 + i * 0.2,
//                     repeat: Infinity,
//                     delay: i * 0.1
//                   }
//                 }}
//                 transition={{ duration: 0.2 }}
//               />
//             ))}
//           </span>
          
//           <span className="relative z-10 flex items-center justify-center gap-2 group-hover:gap-3 transition-all duration-300">
//             Shop Now
//             <svg 
//               xmlns="http://www.w3.org/2000/svg" 
//               className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" 
//               fill="none" 
//               viewBox="0 0 24 24" 
//               stroke="currentColor"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//             </svg>
//           </span>
//         </motion.button>
//       </motion.div>

//       <div className="flex items-start flex-wrap justify-center gap-6 relative z-10">
//         {[1, 2, 3].map((step, index) => (
//           <motion.div
//             key={index}
//             className="flex flex-col items-center text-center w-[300px] min-w-[300px] flex-grow relative"
//             variants={cardVariants}
//             custom={index}
//             initial="initial"
//             animate="visible"
//             whileHover="hover"
//             style={{ transformStyle: "preserve-3d" }}
//           >
//             {/* Ripple effect background */}
//             <motion.div
//               className="absolute -inset-4 rounded-lg pointer-events-none"
//               variants={rippleVariants}
//               custom={index}
//               animate="animate"
//               style={{
//                 background: "radial-gradient(circle, rgba(251,146,60,0.2) 0%, rgba(251,146,60,0) 70%)",
//                 zIndex: 0
//               }}
//             />
            
//             {/* Image with mask reveal */}
//             <div className="relative w-[340.5px] h-[340.5px] mb-6 shrink-0 overflow-hidden rounded-lg">
//               <motion.div
//                 className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-300 opacity-10"
//                 initial={{ y: "100%" }}
//                 animate={{ y: 0 }}
//                 transition={{ duration: 1.5, delay: 0.8 + (index * 0.2) }}
//               />
//               <motion.img
//                 src={step === 1 ? 'https://custorybucket.s3.ap-southeast-1.amazonaws.com/Landing/shirt.png' : step === 2 ? 'https://custorybucket.s3.ap-southeast-1.amazonaws.com/Landing/form.png' : 'https://custorybucket.s3.ap-southeast-1.amazonaws.com/Landing/image-3.png'}
//                 alt="Step"
//                 className="rounded-lg object-cover w-full h-full"
//                 variants={imageRevealVariants}
//                 custom={index}
//                 whileHover="hover"
//               />
//             </div>
            
//             <div className="w-[340px] mx-auto">
//               <div className="relative max-sm:flex justify-center">
//                 <motion.span 
//                   className="flex items-center justify-center sm:w-20 w-16 sm:h-20 h-16 bg-orange-500 text-white text-[30px] font-semibold rounded-full mb-4 relative"
//                   variants={numberVariants}
//                   custom={index}
//                   animate={["visible", "pulse"]}
//                   style={{ transformStyle: "preserve-3d" }}
//                 >
//                   {step}
//                   <span className="max-sm:hidden absolute sm:left-[80px] left-[65px] top-1/2 w-[200px] h-px bg-red-500">
//                     <motion.span 
//                       className="absolute right-0 -top-[3px] rotate-[-45deg] border-orange-500 border-r border-b p-[3px]"
//                       variants={lineVariants}
//                       custom={index}
//                     />
//                   </span>
//                 </motion.span>
//               </div>
//             </div>
            
//             <motion.h2 
//               className="text-2xl md:text-5xl font-bold text-gray-900 w-[340px] lg:leading-[60px] sm:text-start text-center my-5"
//               variants={textRevealVariants}
//               custom={index}
//             >
//               {step === 1
//                 ? "Choose Your Product"
//                 : step === 2
//                 ? "Get an Instant Quote in PDF"
//                 : "Place Your Order"}
//               <motion.p 
//                 className="sm:text-lg text-base font-light text-black mt-5"
//                 variants={textRevealVariants}
//                 custom={index + 3}
//               >
//                 {step === 1
//                   ? "Curated, high-quality merch — apparel, packaging, gifts & more."
//                   : step === 2
//                   ? "No waiting. No delays. Transparent, competitive pricing in seconds."
//                   : "No minimum order quantities. Order 1 or 10,000 — we scale with you."}
//               </motion.p>
//             </motion.h2>
//           </motion.div>
//         ))}
//       </div>
//     </motion.div>
//   );
// };

// export default B2CSection;









































































































// import React, { useEffect, useState, useRef } from "react";
// import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// const B2CSection = () => {
//   const navigate = useNavigate();
//   const controls = useAnimation();
//   const containerRef = useRef(null);
//   const isInView = useInView(containerRef, { once: false, amount: 0.2 });
//   const [pauseFlip, setPauseFlip] = useState(false);
//   const [currentFlip, setCurrentFlip] = useState(null);
  
//   // Trigger animations when section comes into view
//   useEffect(() => {
//     if (isInView) {
//       controls.start("visible");
//       startFlipSequence();
//     }
    
//     return () => cleanupFlipSequence();
//   }, [isInView, controls]);
  
//   let flipTimers = [];
  
//   // Continuous flip sequence with controlled timing
//   const startFlipSequence = () => {
//     // Clear any existing timers
//     cleanupFlipSequence();
    
//     // Initial delay before starting flip sequence
//     flipTimers.push(setTimeout(() => {
//       if (!pauseFlip) runFlipCycle(0);
//     }, 3000));
//   };
  
//   // Run a complete flip cycle through all cards
//   const runFlipCycle = (startIndex) => {
//     // Reset sequence if we've completed a cycle
//     if (startIndex >= 3) {
//       flipTimers.push(setTimeout(() => {
//         if (!pauseFlip) runFlipCycle(0);
//       }, 2000));
//       return;
//     }
    
//     // Start flip for current index
//     setCurrentFlip(startIndex);
    
//     // Schedule end of current flip and start of next one
//     flipTimers.push(setTimeout(() => {
//       setCurrentFlip(null);
      
//       // Wait and then flip next card
//       flipTimers.push(setTimeout(() => {
//         if (!pauseFlip) runFlipCycle(startIndex + 1);
//       }, 1000));
//     }, 1800));
//   };
  
//   // Clean up all timers
//   const cleanupFlipSequence = () => {
//     flipTimers.forEach(timer => clearTimeout(timer));
//     flipTimers = [];
//   };
  
//   // Card data with both front and back content
//   const cards = [
//     {
//       step: 1,
//       frontImage: 'https://custorybucket.s3.ap-southeast-1.amazonaws.com/Landing/shirt.png',
//       backImage: 'https://custorybucket.s3.ap-southeast-1.amazonaws.com/Landing/shirt.png',
//       title: "Choose Your Product",
//       description: "Curated, high-quality merch — apparel, packaging, gifts & more.",
//       backTitle: "Premium Selection",
//       backDescription: "Browse our extensive catalog of premium customizable products"
//     },
//     {
//       step: 2,
//       frontImage: 'https://custorybucket.s3.ap-southeast-1.amazonaws.com/Landing/form.png',
//       backImage: 'https://custorybucket.s3.ap-southeast-1.amazonaws.com/Landing/form.png',
//       title: "Get an Instant Quote in PDF",
//       description: "No waiting. No delays. Transparent, competitive pricing in seconds.",
//       backTitle: "Transparent Pricing",
//       backDescription: "See exactly what you'll pay with our instant quote generator"
//     },
//     {
//       step: 3,
//       frontImage: 'https://custorybucket.s3.ap-southeast-1.amazonaws.com/Landing/image-3.png',
//       backImage: 'https://custorybucket.s3.ap-southeast-1.amazonaws.com/Landing/image-3.png',
//       title: "Place Your Order",
//       description: "No minimum order quantities. Order 1 or 10,000 — we scale with you.",
//       backTitle: "Easy Ordering",
//       backDescription: "From single items to bulk orders, we've made the process seamless"
//     }
//   ];
  
//   // True 3D card variants with front/back sides
//   const cardVariants = {
//     initial: (i) => ({
//       opacity: 0,
//       y: 50,
//       rotateY: i % 2 === 0 ? -15 : 15,
//       rotateX: 10
//     }),
//     visible: (i) => ({
//       opacity: 1,
//       y: 0,
//       rotateY: 0,
//       rotateX: 0,
//       transition: {
//         type: "spring",
//         damping: 20,
//         stiffness: 80,
//         delay: 0.7 + (i * 0.2),
//         duration: 1.5
//       }
//     }),
//     flipStart: {
//       rotateY: 0,
//       z: 0,
//       transition: { 
//         duration: 0.1,
//         ease: [0.645, 0.045, 0.355, 1.000]
//       }
//     },
//     flipMiddle: {
//       rotateY: 90,
//       z: 100,
//       boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.2)",
//       transition: { 
//         duration: 0.6,
//         ease: [0.645, 0.045, 0.355, 1.000]
//       }
//     },
//     flipEnd: {
//       rotateY: 180,
//       z: 0,
//       transition: { 
//         duration: 0.6,
//         ease: [0.645, 0.045, 0.355, 1.000],
//         delay: 0.5
//       }
//     },
//     flipBack: {
//       rotateY: 0,
//       z: 0,
//       transition: { 
//         duration: 0.6,
//         ease: [0.645, 0.045, 0.355, 1.000],
//         delay: 0.6
//       }
//     },
//     hover: {
//       y: -10,
//       boxShadow: "0px 15px 30px rgba(0, 0, 0, 0.15)",
//       transition: { duration: 0.3 }
//     }
//   };
  
//   // Background elements
//   const liquidBackground = {
//     initial: {},
//     visible: { transition: { staggerChildren: 0.1 } }
//   };
  
//   const liquidBubble = {
//     initial: { scale: 0, opacity: 0 },
//     visible: (i) => ({
//       scale: [0, 1, 1.1, 1],
//       opacity: [0, 0.2, 0.1],
//       x: [0, i % 2 === 0 ? 20 : -20, 0],
//       transition: {
//         duration: 8,
//         repeat: Infinity,
//         repeatType: "reverse",
//         ease: "easeInOut",
//         delay: i * 0.7
//       }
//     })
//   };

//   // Text animations
//   const headingVariants = {
//     initial: { y: 60, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         damping: 15,
//         stiffness: 80,
//         duration: 1.2
//       }
//     }
//   };
  
//   const paragraphVariants = {
//     initial: { y: 40, opacity: 0 },
//     visible: {
//       y: 0, 
//       opacity: 1,
//       transition: {
//         type: "spring", 
//         damping: 12,
//         duration: 1.2,
//         delay: 0.3
//       }
//     }
//   };
  
//   // Get current animation state for a card
//   const getFlipState = (index) => {
//     if (currentFlip !== index) return "visible";
    
//     const flipStates = ["flipStart", "flipMiddle", "flipEnd", "flipBack"];
//     const currentTime = Date.now();
    
//     // Progress through flip states based on time
//     const progress = Math.min(1, (currentTime % 1800) / 1800);
//     if (progress < 0.3) return "flipStart";
//     if (progress < 0.6) return "flipMiddle";
//     if (progress < 0.9) return "flipEnd";
//     return "flipBack";
//   };

//   return (
//     <motion.div 
//       className="bg-white px-4 md:px-20 text-center relative overflow-hidden min-h-[800px]"
//       ref={containerRef}
//       variants={liquidBackground}
//       initial="initial"
//       animate={controls}
//       style={{ perspective: "2000px" }}
//     >
//       {/* Background bubbles */}
//       {[...Array(6)].map((_, i) => (
//         <motion.div
//           key={`bubble-${i}`}
//           variants={liquidBubble}
//           custom={i}
//           className="absolute rounded-full bg-gradient-to-r from-orange-100 to-orange-50 opacity-10 pointer-events-none"
//           style={{
//             width: 100 + Math.random() * 300,
//             height: 100 + Math.random() * 300,
//             left: `${Math.random() * 100}%`,
//             top: `${Math.random() * 100}%`,
//             zIndex: 0
//           }}
//         />
//       ))}
      
//       <motion.h2 
//         className="text-2xl md:text-5xl font-bold text-gray-900 sm:my-20 my-12 relative z-10"
//         variants={headingVariants}
//       >
//         For Quick Orders & Customization (B2C)
//       </motion.h2>
      
//       <motion.p 
//         className="text-base md:text-xl text-black max-w-xl mx-auto relative z-10"
//         variants={paragraphVariants}
//       >
//         Explore our collections, personalize them with your logo, and order in
//         minutes — no back-and-forth required.
//       </motion.p>
      
//       {/* Shop Button */}
//       <motion.div className="sm:my-16 my-12 relative z-10">
//         <motion.button
//           onClick={() => navigate("/products")}
//           className="relative bg-orange-500 text-white py-4 px-12 rounded-md font-semibold text-sm overflow-hidden group"
//           whileHover={{ 
//             scale: 1.05,
//             boxShadow: "0 10px 25px -5px rgba(249, 115, 22, 0.4)"
//           }}
//           whileTap={{ scale: 0.98 }}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ type: "spring", stiffness: 400, damping: 15 }}
//         >
//           <motion.span 
//             className="absolute inset-0 bg-gradient-to-r from-orange-400/60 to-orange-600/60"
//             initial={{ x: "-100%" }}
//             whileHover={{ x: "100%" }}
//             transition={{ duration: 0.8 }}
//           />
//           <span className="relative z-10 flex items-center justify-center gap-2 group-hover:gap-3 transition-all duration-300">
//             Shop Now
//             <svg 
//               xmlns="http://www.w3.org/2000/svg" 
//               className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" 
//               fill="none" 
//               viewBox="0 0 24 24" 
//               stroke="currentColor"
//             >
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
//             </svg>
//           </span>
//         </motion.button>
//       </motion.div>

//       <div 
//         className="flex items-start flex-wrap justify-center gap-6 relative z-10"
//         onMouseEnter={() => setPauseFlip(true)}
//         onMouseLeave={() => {
//           setPauseFlip(false);
//           startFlipSequence();
//         }}
//       >
//         {cards.map((card, index) => (
//           <div 
//             key={index} 
//             className="perspective-1000 w-[300px] min-w-[300px] flex-grow relative"
//             style={{ perspective: "1000px", height: "600px" }}
//           >
//             <motion.div
//               className="w-full h-full relative flip-card-inner"
//               variants={cardVariants}
//               custom={index}
//               initial="initial"
//               animate={getFlipState(index)}
//               whileHover="hover"
//               style={{ 
//                 transformStyle: "preserve-3d",
//                 position: "relative",
//                 width: "100%",
//                 height: "100%",
//                 transformOrigin: "center center"
//               }}
//               onHoverStart={() => setPauseFlip(true)}
//               onHoverEnd={() => {
//                 setPauseFlip(false);
//                 startFlipSequence();
//               }}
//             >
//               {/* FRONT SIDE */}
//               <div 
//                 className="absolute w-full h-full flex flex-col items-center backface-hidden rounded-xl shadow-lg bg-white"
//                 style={{ 
//                   backfaceVisibility: "hidden",
//                   WebkitBackfaceVisibility: "hidden"
//                 }}
//               >
//                 {/* Front content */}
//                 <div className="relative w-[340.5px] h-[340.5px] mb-6 shrink-0 overflow-hidden rounded-lg bg-white">
//                   <motion.div 
//                     className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-300 opacity-10"
//                     initial={{ y: "100%" }}
//                     animate={{ y: 0 }}
//                     transition={{ duration: 1.5, delay: 0.8 + (index * 0.2) }}
//                   />
//                   <img
//                     src={card.frontImage}
//                     alt={`Step ${index + 1}`}
//                     className="rounded-lg object-cover w-full h-full"
//                   />
                  
//                   {/* Step number indicator */}
//                   <div className="w-[340px] mx-auto absolute bottom-[-20px] left-0 right-0">
//                     <div className="relative max-sm:flex justify-center">
//                       <motion.span 
//                         className="flex items-center justify-center sm:w-20 w-16 sm:h-20 h-16 bg-orange-500 text-white text-[30px] font-semibold rounded-full mb-4 relative mx-auto"
//                         animate={{
//                           boxShadow: [
//                             "0px 0px 0px rgba(255, 140, 0, 0.3)",
//                             "0px 0px 20px rgba(255, 140, 0, 0.5)",
//                             "0px 0px 0px rgba(255, 140, 0, 0.3)"
//                           ],
//                           transition: {
//                             duration: 3,
//                             repeat: Infinity,
//                             repeatType: "reverse"
//                           }
//                         }}
//                       >
//                         {card.step}
//                       </motion.span>
//                     </div>
//                   </div>
//                 </div>
                
//                 <motion.h2 
//                   className="text-2xl md:text-4xl font-bold text-gray-900 w-[340px] leading-tight text-center my-5 px-4"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                   transition={{ delay: 1.2 + (index * 0.15) }}
//                 >
//                   {card.title}
//                   <motion.p 
//                     className="sm:text-lg text-base font-light text-black mt-5"
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: 1 }}
//                     transition={{ delay: 1.2 + (index * 0.15) + 0.2 }}
//                   >
//                     {card.description}
//                   </motion.p>
//                 </motion.h2>
//               </div>
              
//               {/* BACK SIDE */}
//               <div 
//                 className="absolute w-full h-full flex flex-col items-center justify-center backface-hidden rounded-xl shadow-lg bg-gradient-to-br from-orange-50 to-white p-6"
//                 style={{ 
//                   backfaceVisibility: "hidden",
//                   WebkitBackfaceVisibility: "hidden",
//                   transform: "rotateY(180deg)"
//                 }}
//               >
//                 {/* Back content */}
//                 <motion.div 
//                   className="w-20 h-20 rounded-full bg-orange-500 flex items-center justify-center text-white text-3xl font-bold mb-6"
//                   animate={{
//                     boxShadow: [
//                       "0px 0px 0px rgba(255, 140, 0, 0.3)",
//                       "0px 0px 30px rgba(255, 140, 0, 0.6)",
//                       "0px 0px 0px rgba(255, 140, 0, 0.3)"
//                     ],
//                     scale: [1, 1.05, 1],
//                     transition: {
//                       duration: 3,
//                       repeat: Infinity,
//                       repeatType: "reverse"
//                     }
//                   }}
//                 >
//                   {card.step}
//                 </motion.div>
                
//                 <h2 className="text-3xl font-bold text-orange-500 mb-4">
//                   {card.backTitle}
//                 </h2>
                
//                 <p className="text-lg text-gray-700 text-center mb-6">
//                   {card.backDescription}
//                 </p>
                
//                 <div className="w-16 h-1 bg-orange-300 rounded-full mb-6"></div>
                
//                 <motion.button
//                   className="bg-orange-500 text-white py-3 px-6 rounded-md hover:bg-orange-600 transition-colors"
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   Learn More
//                 </motion.button>
//               </div>
              
//               {/* 3D lighting effect */}
//               <motion.div 
//                 className="absolute inset-0 pointer-events-none rounded-xl"
//                 style={{
//                   background: "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 50%, rgba(0,0,0,0.1) 100%)",
//                   zIndex: 5
//                 }}
//                 animate={{
//                   opacity: [0.6, 0.3, 0.6],
//                   transition: {
//                     duration: 8,
//                     repeat: Infinity,
//                     repeatType: "reverse"
//                   }
//                 }}
//               />
//             </motion.div>
//           </div>
//         ))}
//       </div>
//     </motion.div>
//   );
// };

// export default B2CSection;





















































































import React, { useEffect, useState, useRef } from "react";
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const B2CSection = () => {
  const navigate = useNavigate();
  const controls = useAnimation();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const [flippedCard, setFlippedCard] = useState(null);
  
  // Start animations when section comes into view
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Card data with both front and back content
  const cards = [
    {
      step: 1,
      frontImage: 'https://custorybucket.s3.ap-southeast-1.amazonaws.com/Landing/shirt.png',
      backImage: 'https://custorybucket.s3.ap-southeast-1.amazonaws.com/Landing/shirt.png',
      title: "Choose Your Product",
      description: "Curated, high-quality merch — apparel, packaging, gifts & more.",
      backTitle: "Premium Selection",
      backDescription: "Browse our extensive catalog of premium customizable products"
    },
    {
      step: 2,
      frontImage: 'https://custorybucket.s3.ap-southeast-1.amazonaws.com/Landing/form.png',
      backImage: 'https://custorybucket.s3.ap-southeast-1.amazonaws.com/Landing/form.png',
      title: "Get an Instant Quote in PDF",
      description: "No waiting. No delays. Transparent, competitive pricing in seconds.",
      backTitle: "Transparent Pricing",
      backDescription: "See exactly what you'll pay with our instant quote generator"
    },
    {
      step: 3,
      frontImage: 'https://custorybucket.s3.ap-southeast-1.amazonaws.com/Landing/image-3.png',
      backImage: 'https://custorybucket.s3.ap-southeast-1.amazonaws.com/Landing/image-3.png',
      title: "Place Your Order",
      description: "No minimum order quantities. Order 1 or 10,000 — we scale with you.",
      backTitle: "Easy Ordering",
      backDescription: "From single items to bulk orders, we've made the process seamless"
    }
  ];
  
  // Card entry animations
  const cardVariants = {
    initial: {
      opacity: 0,
      y: 50,
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 100,
        delay: 0.3 + (i * 0.15),
        duration: 0.8
      }
    }),
    hover: {
      y: -10,
      boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3 }
    }
  };
  
  // Card flip animations
  const cardInnerVariants = {
    front: {
      rotateY: 0,
      transition: {
        type: "tween",
        ease: "easeOut",
        duration: 0.6
      }
    },
    back: {
      rotateY: 180,
      transition: {
        type: "tween",
        ease: "easeOut",
        duration: 0.6
      }
    }
  };

  // Background elements
  const liquidBackground = {
    initial: {},
    visible: { transition: { staggerChildren: 0.1 } }
  };
  
  const liquidBubble = {
    initial: { scale: 0, opacity: 0 },
    visible: (i) => ({
      scale: 1,
      opacity: 0.1,
      transition: {
        duration: 1.5,
        delay: i * 0.2
      }
    })
  };

  // Text animations
  const headingVariants = {
    initial: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        duration: 0.8
      }
    }
  };

  // NEW: "Click to learn more" animation variants
  const learnMoreVariants = {
    initial: { scale: 1, opacity: 0.8 },
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.8, 1, 0.8],
      transition: {
        duration: 2,
        ease: "easeInOut",
        repeat: Infinity,
      }
    },
    hover: {
      scale: 1.1,
      opacity: 1,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  };

  // NEW: Arrow animation variants
  const arrowVariants = {
    initial: { x: 0 },
    animate: {
      x: [0, 5, 0],
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      }
    }
  };
  
  // Toggle card flip function
  const toggleCardFlip = (index) => {
    if (flippedCard === index) {
      setFlippedCard(null);
    } else {
      setFlippedCard(index);
    }
  };

  return (
    <motion.div 
      className="bg-white px-4 md:px-20 text-center relative overflow-hidden min-h-[800px] py-10"
      ref={containerRef}
      variants={liquidBackground}
      initial="initial"
      animate={controls}
    >
      {/* Background bubbles */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`bubble-${i}`}
          variants={liquidBubble}
          custom={i}
          className="absolute rounded-full bg-gradient-to-r from-orange-100 to-orange-50 opacity-10 pointer-events-none"
          style={{
            width: 100 + Math.random() * 200,
            height: 100 + Math.random() * 200,
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
            zIndex: 0
          }}
        />
      ))}
      
      <motion.h2 
        className="text-2xl md:text-5xl font-bold text-gray-900 sm:my-16 my-12 relative z-10"
        variants={headingVariants}
      >
        For Quick Orders & Customization (B2C)
      </motion.h2>
      
      <motion.p 
        className="text-base md:text-xl text-black max-w-xl mx-auto relative z-10 mb-8"
        variants={headingVariants}
        custom={1}
      >
        Explore our collections, personalize them with your logo, and order in
        minutes — no back-and-forth required.
      </motion.p>
      
      {/* Shop Button */}
      <motion.div className="sm:mb-16 mb-12 relative z-10">
        <motion.button
          onClick={() => navigate("/products")}
          className="relative bg-orange-500 text-white py-4 px-12 rounded-md font-semibold text-sm overflow-hidden group"
          whileHover={{ 
            scale: 1.03,
            boxShadow: "0 10px 20px -5px rgba(249, 115, 22, 0.3)"
          }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          <span className="relative z-10 flex items-center justify-center gap-2 group-hover:gap-3 transition-all duration-300">
            Shop Now
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </span>
        </motion.button>
      </motion.div>

      <div className="flex items-start flex-wrap justify-center gap-8 relative z-10">
        {cards.map((card, index) => (
          <motion.div 
            key={index} 
            className="perspective-1000 w-[300px] min-w-[300px] flex-grow relative cursor-pointer"
            style={{ perspective: "1000px", height: "520px" }}
            variants={cardVariants}
            custom={index}
            whileHover="hover"
            onClick={() => toggleCardFlip(index)}
          >
            <motion.div
              className="w-full h-full relative flip-card-inner"
              variants={cardInnerVariants}
              initial="front"
              animate={flippedCard === index ? "back" : "front"}
              style={{ 
                transformStyle: "preserve-3d",
                position: "relative",
                width: "100%",
                height: "100%"
              }}
            >
              {/* FRONT SIDE */}
              <div 
                className="absolute w-full h-full flex flex-col items-center backface-hidden rounded-xl shadow-md bg-white"
                style={{ 
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden"
                }}
              >
                {/* Front content */}
                <div className="relative w-full h-[240px] mb-6 shrink-0 overflow-hidden rounded-t-xl bg-white">
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-300 opacity-10"
                  />
                  <img
                    src={card.frontImage}
                    alt={`Step ${index + 1}`}
                    className="rounded-t-xl object-cover w-full h-full"
                  />
                  
                  {/* Step number indicator */}
                  <div className="absolute bottom-[-20px] left-0 right-0">
                    <div className="relative flex justify-center">
                      <span 
                        className="flex items-center justify-center w-14 h-14 bg-orange-500 text-white text-2xl font-semibold rounded-full mb-4 mx-auto shadow-md"
                      >
                        {card.step}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="px-6 text-center mt-2">
                  <h2 className="text-xl font-bold text-gray-900 leading-tight">
                    {card.title}
                  </h2>
                  <p className="text-base font-normal text-gray-700 mt-3">
                    {card.description}
                  </p>
                  
                  {/* ENHANCED: Animated "Click to learn more" button */}
                  <motion.div 
                    className="mt-6 flex items-center justify-center text-orange-500 text-sm font-medium bg-orange-50 py-2 px-4 rounded-md mx-auto w-fit"
                    variants={learnMoreVariants}
                    initial="initial"
                    animate="animate"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    Click to learn more
                    <motion.div
                      className="ml-1"
                      variants={arrowVariants}
                      initial="initial"
                      animate="animate"
                    >
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </motion.div>
                  </motion.div>
                </div>
              </div>
              
              {/* BACK SIDE */}
              <div 
                className="absolute w-full h-full flex flex-col items-center justify-center backface-hidden rounded-xl shadow-md bg-gradient-to-br from-orange-50 to-white p-6"
                style={{ 
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                  transform: "rotateY(180deg)"
                }}
              >
                {/* Back content */}
                <div className="w-14 h-14 rounded-full bg-orange-500 flex items-center justify-center text-white text-xl font-bold mb-6">
                  {card.step}
                </div>
                
                <h2 className="text-2xl font-bold text-orange-500 mb-4">
                  {card.backTitle}
                </h2>
                
                <p className="text-base text-gray-700 text-center mb-6">
                  {card.backDescription}
                </p>
                
                <div className="w-12 h-1 bg-orange-300 rounded-full mb-6"></div>
                
                <motion.button
                  className="bg-orange-500 text-white py-3 px-6 rounded-md hover:bg-orange-600 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Learn More
                </motion.button>
                
                <button 
                  className="mt-4 text-sm text-gray-500 hover:text-orange-500 transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFlippedCard(null);
                  }}
                >
                  Back to front
                </button>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default B2CSection;
