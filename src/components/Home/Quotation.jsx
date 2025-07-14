// import React from "react";
// import quotationImage from "../../assets/quotation.png";
// import { useNavigate } from "react-router-dom";

// const Quotation = () => {
//   const navigate = useNavigate();
//   return (
//     // <div>
//     //   <div
//     //     style={{ backgroundImage: `url(${quotationImage})` }}
//     //     className="bg-center bg-cover bg-no-repeat relative overflow-clip flex flex-col justify-center items-start w-full h-[639px] pl-[110px] max-md:pl-10 pr-10 py-12 text-white"
//     //   >
//     //     <div className="absolute w-fit h-full bg-gradient-to-r from-neutral-300/10 via-neutral-900/70 to-neutral-300/10 z-10"></div>

//     //     <div className=" text-3xl font-bold z-20">
//     //       <p className="text-[26px] font-semibold w-[53vw] max-sm:w-[80vw] my-1">Need a Quotation?</p>
//     //       <p  className="text-[16px] font-normal leading-normal w-[48vw] max-sm:w-[80vw]"> Simply shop as usual and get a quotation on checkout.</p>
//     //       {/* <p  className="text-[16px] font-normal leading-normal w-[48vw] max-sm:w-[80vw]"> Browse, customize, and download your PDF quote when you’re ready to check out.</p> */}
//     //     </div>
//     //     <button className="py-2 px-6 bg-white rounded-full text-black mt-6 z-20 font-bold" onClick={()=>navigate('/products')}>
//     //       Shop now to generate quote at check out
//     //     </button>
//     //   </div>
//     // </div>
//     <div className="bg-gradient-to-b from-[#FF6600] via-[39%] via-[#FF711B] to-[#FFB669] rounded-[2.3rem] mx-auto w-[90%] sm:h-[460px] h-auto text-center sm:py-16 py-10 px-6 my-5">
//       <h2 className="text-2xl md:text-[64px] font-bold text-white sm:leading-[85px] leading-[55px] mb-4">
//         <span className="block">Let’s Bring Your</span>
//         <span className="block mt-[-20px]">Custom Story to Life</span>
//       </h2>
//       <p className="text-white text-base md:text-lg my-9">
//         Custom branding. No minimums. Fast delivery. Made to stand out.
//       </p>
//       <div className="flex flex-col md:flex-row justify-center gap-8">
//         <button className="bg-[#FF6600] hover:bg-white hover:text-[#FF6600] text-white px-[14px] py-2 rounded-md text-base h-[56px] max-sm:flex-grow">
//           Book a Call with Our Team
//         </button>
//         <button onClick={() => navigate('/products')} className="bg-[#FF6600] hover:bg-white hover:text-[#FF6600] text-white px-[14px] py-2 rounded-md text-base h-[56px] sm:w-[195px] w-auto max-sm:flex-grow">
//           Shop Now
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Quotation;






































































import React, { useEffect, useState, useRef } from "react";
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
import { useNavigate,Link } from "react-router-dom";

const Quotation = () => {
  const navigate = useNavigate();
  const controls = useAnimation();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Start animations when component is in view
  useEffect(() => {
    if (isInView) {
      controls.start("animate");
    }
  }, [isInView, controls]);

  // Container animation
  const containerVariants = {
    initial: { 
      y: 50,
      opacity: 0,
      scale: 0.95
    },
    animate: { 
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 80,
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  // Heading animations with split text
  const headingVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        duration: 0.8
      }
    }
  };
  
  const wordVariants = {
    initial: { 
      y: 20, 
      opacity: 0 
    },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100
      }
    }
  };
  
  // Text animation
  const textVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 50,
        delay: 0.4
      }
    }
  };
  
  // Button animations
  const buttonVariants = {
    initial: (i) => ({ 
      opacity: 0, 
      y: 30,
      scale: 0.9
    }),
    animate: (i) => ({ 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 8,
        stiffness: 70,
        delay: 0.6 + (i * 0.15)
      }
    }),
    hover: { 
      scale: 1.05,
      y: -5,
      backgroundColor: "#fff",
      color: "#FF6600",
      boxShadow: "0px 10px 15px rgba(255, 102, 0, 0.2)",
      transition: { 
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { 
      scale: 0.95,
      boxShadow: "0px 5px 10px rgba(255, 102, 0, 0.15)"
    },
    float: (i) => ({
      y: [0, -8, 0],
      transition: {
        duration: 4 + i,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: i * 0.5
      }
    })
  };
  
  // Background bubbles animation
  const bubbleVariants = {
    initial: { 
      opacity: 0, 
      scale: 0
    },
    animate: (i) => ({ 
      opacity: [0.1, 0.15, 0.1],
      scale: [0.8, 1.2, 0.8],
      x: [0, i % 2 === 0 ? 20 : -20, 0],
      y: [0, i % 2 === 0 ? -15 : 15, 0],
      transition: {
        duration: 8 + (i * 2),
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: i * 0.7
      }
    })
  };

  // Split heading text into words for animation
  const headingText = "Let's Bring Your Custom Story to Life";
  const words = headingText.split(' ');

  return (
    <motion.div 
      ref={containerRef}
      className="bg-gradient-to-b from-[#FF6600] via-[39%] via-[#FF711B] to-[#FFB669] rounded-[2.3rem] mx-auto w-[90%] sm:h-[460px] h-auto text-center sm:py-16 py-10 px-6 my-5 relative overflow-hidden"
      variants={containerVariants}
      initial="initial"
      animate={controls}
      style={{ perspective: "1200px" }}
    >
      {/* Animated background bubbles */}
      {!prefersReducedMotion && (
        [...Array(8)].map((_, i) => (
          <motion.div
            key={`bubble-${i}`}
            className="absolute rounded-full bg-white opacity-10 pointer-events-none"
            style={{
              width: 30 + Math.random() * 100,
              height: 30 + Math.random() * 100,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              zIndex: 0
            }}
            variants={bubbleVariants}
            custom={i}
            initial="initial"
            animate="animate"
          />
        ))
      )}
      
      {/* Animated heading with word-by-word reveal */}
      <motion.h2 
        className="text-2xl md:text-[64px] font-bold text-white sm:leading-[85px] leading-[55px] mb-4 relative z-10"
        variants={headingVariants}
        initial="initial"
        animate={controls}
      >
        <motion.span className="block overflow-hidden">
          {words.slice(0, 3).map((word, i) => (
            <motion.span
              key={i}
              className="inline-block mr-[0.3em]"
              variants={wordVariants}
            >
              {word}
            </motion.span>
          ))}
        </motion.span>
        <motion.span className="block mt-[-20px] overflow-hidden">
          {words.slice(3).map((word, i) => (
            <motion.span
              key={i + 3}
              className="inline-block mr-[0.3em]"
              variants={wordVariants}
            >
              {word}
            </motion.span>
          ))}
        </motion.span>
      </motion.h2>
      
      <motion.p 
        className="text-white text-base md:text-lg my-9 relative z-10"
        variants={textVariants}
      >
        Custom branding. No minimums. Fast delivery. Made to stand out.
      </motion.p>
      
      <motion.div 
        className="flex flex-col md:flex-row justify-center gap-8 relative z-10"
        initial="initial"
        animate="animate"
        whileHover="hover"
      >
        <motion.button 
          className="bg-[#FF6600] text-white px-[14px] py-2 rounded-md text-base h-[56px] max-sm:flex-grow relative overflow-hidden group"
          variants={buttonVariants}
          custom={0}
          animate={prefersReducedMotion ? "animate" : ["animate", "float"]}
          whileHover="hover"
          whileTap="tap"
          onHoverStart={() => setHoveredButton(0)}
          onHoverEnd={() => setHoveredButton(null)}
        >
          {!prefersReducedMotion && (
            <motion.span 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-100%" }}
              animate={hoveredButton === 0 ? { x: "100%" } : { x: "-100%" }}
              transition={{ duration: 0.8 }}
              style={{ pointerEvents: "none" }}
            />
          )}
          <motion.span className="relative z-10 flex items-center justify-center gap-2">
             <Link to="/https:calendly.com/admincustory/30min">Book a Call with Our Team</Link>
            
            {hoveredButton === 0 && (
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </motion.svg>
            )}
          </motion.span>
        </motion.button>
        
        <motion.button 
          onClick={() => navigate('/upgrade')}
          className="bg-[#FF6600] text-white px-[14px] py-2 rounded-md text-base h-[56px] sm:w-[195px] w-auto max-sm:flex-grow relative overflow-hidden group"
          variants={buttonVariants}
          custom={1}
          animate={prefersReducedMotion ? "animate" : ["animate", "float"]}
          whileHover="hover"
          whileTap="tap"
          onHoverStart={() => setHoveredButton(1)}
          onHoverEnd={() => setHoveredButton(null)}
        >
          {!prefersReducedMotion && (
            <motion.span 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: "-100%" }}
              animate={hoveredButton === 1 ? { x: "100%" } : { x: "-100%" }}
              transition={{ duration: 0.8 }}
              style={{ pointerEvents: "none" }}
            />
          )}
          <motion.span className="relative z-10 flex items-center justify-center gap-2">
            Shop Now
            {hoveredButton === 1 && (
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </motion.svg>
            )}
          </motion.span>
        </motion.button>
      </motion.div>
      
      {/* Optional particle burst effect on button hover */}
      <AnimatePresence>
        {hoveredButton !== null && !prefersReducedMotion && (
          [...Array(10)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 rounded-full bg-white pointer-events-none"
              initial={{ 
                x: hoveredButton === 0 ? -100 : 100,
                y: 0,
                opacity: 0,
                scale: 0
              }}
              animate={{ 
                x: [hoveredButton === 0 ? -100 : 100, (Math.random() - 0.5) * 200],
                y: [0, -100 - Math.random() * 100],
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0]
              }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ 
                duration: 0.8 + Math.random() * 0.5,
                ease: "easeOut"
              }}
              style={{ top: "70%", left: "50%" }}
            />
          ))
        )}
      </AnimatePresence>
      
      {/* Animated border glow effect */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 rounded-[2.3rem] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.1, 0.3, 0.1],
            boxShadow: [
              "0 0 0px rgba(255,255,255,0)", 
              "0 0 20px rgba(255,255,255,0.3)", 
              "0 0 0px rgba(255,255,255,0)"
            ],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      )}
    </motion.div>
  );
}

export default Quotation;
