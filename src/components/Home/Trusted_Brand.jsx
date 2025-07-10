// import React from 'react'

// const Trusted_Brand = () => {
//   return (
//     <div className="bg-gradient-to-b from-[#FF6600] via-[39%] via-[#FF711B] to-[#FFB669] sm:py-16 py-12 px-4 md:px-20 relative overflow-hidden h-auto max-lg:flex items-center flex-col justify-center">
//       <div className="text-center text-white max-w-3xl mx-auto">
//         <h2 className="text-2xl md:text-5xl font-bold">
//           We deliver and it shows.
//         </h2>
//         <p className="text-sm md:text-[20px] md:leading-[30px] sm:my-16 my-10 max-w-[460px] mx-auto">
//           Trusted by leading brands, we hold ourselves accountable to every
//           promise we make.
//         </p>
//       </div>

//       <div className="flex bg-white max-w-[1000px] min-h-[485px] mx-auto rounded-[40px] px-12 md:px-16 shadow-lg z-0 max-lg:py-4">
//         <div className="flex flex-col md:flex-row items-center gap-6">
//           <div className="flex-1 text-center md:text-left">
//             <img
//               src={'https://custorybucket.s3.ap-southeast-1.amazonaws.com/Landing/logoImage.png'}
//               alt="Logo"
//               className="md:mx-0 mx-auto mb-4 w-[169px] h-[117px] object-contain"
//             />
//             <h3 className="text-[#2f2828] font-bold text-lg md:text-[26px] mb-2">
//               Kornix Is The Best Digital Agency I Have Ever Seen! Highly
//               Recommended!
//             </h3>
//             <p className="md:text-lg text-base text-[#111204] my-5">
//               I recently hired <b>Ideapeel</b> for a custom web-development project and
//               couldn't be happier with the results. The team was able to bring
//               my unique ideas to life and create a website that truly stands
//               out.
//             </p>
//             <p className="text-[#ff6600] font-bold text-xl mb-6">Diana Lorenza</p>
//             <p className="text-base text-[#111204]">Director of <b>GYMSTORY</b></p>
//           </div>

//           <div className="md:w-[325px] w-32 md:h-[325px] h-32 rounded-full overflow-hidden border-4 border-white shadow-md">
//             <img
//               src={'https://custorybucket.s3.ap-southeast-1.amazonaws.com/Landing/person.png'}
//               alt="Person"
//               className="w-full h-full object-fill rounded-full"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Trusted_Brand





































// import React, { useRef, useEffect } from 'react';
// import { motion, useAnimation, useInView } from 'framer-motion';

// const Trusted_Brand = () => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: false, amount: 0.3 });
//   const controls = useAnimation();
  
//   useEffect(() => {
//     if (isInView) {
//       controls.start('visible');
//     }
//   }, [isInView, controls]);

//   // Background bubbles animation
//   const bubbleVariants = {
//     initial: { opacity: 0, scale: 0.5 },
//     visible: (i) => ({
//       opacity: [0.1, 0.15, 0.1],
//       scale: [0.5, 1, 0.8],
//       x: [0, i % 2 === 0 ? 20 : -20, 0],
//       transition: {
//         duration: i % 2 === 0 ? 18 : 15,
//         repeat: Infinity,
//         repeatType: "reverse",
//         ease: "easeInOut",
//         delay: i * 0.5
//       }
//     })
//   };

//   // Heading animations
//   const headingVariants = {
//     initial: { y: -50, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         stiffness: 50,
//         damping: 12,
//         duration: 0.8
//       }
//     }
//   };
  
//   const paragraphVariants = {
//     initial: { y: 30, opacity: 0 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       transition: {
//         type: "spring",
//         stiffness: 50,
//         damping: 12,
//         delay: 0.2,
//         duration: 0.8
//       }
//     }
//   };

//   // Card animation with 3D effect
//   const cardVariants = {
//     initial: { y: 100, opacity: 0, rotateX: 10 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       rotateX: 0,
//       transition: {
//         type: "spring",
//         stiffness: 50,
//         damping: 15,
//         delay: 0.4,
//         duration: 1,
//         when: "beforeChildren",
//         staggerChildren: 0.2
//       }
//     }
//   };
  
//   // Card content animations
//   const logoVariants = {
//     initial: { y: 20, opacity: 0, scale: 0.9 },
//     visible: {
//       y: 0,
//       opacity: 1,
//       scale: 1,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//         damping: 10,
//         duration: 0.6
//       }
//     }
//   };
  
//   const quoteVariants = {
//     initial: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.8,
//         delay: 0.3
//       }
//     }
//   };
  
//   const authorVariants = {
//     initial: { opacity: 0, scale: 0.9 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       transition: {
//         duration: 0.6,
//         delay: 0.6
//       }
//     }
//   };
  
//   // Photo animation with floating effect
//   const photoVariants = {
//     initial: { opacity: 0, scale: 0.7, rotate: -10 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       rotate: 0,
//       transition: {
//         type: "spring",
//         stiffness: 60,
//         damping: 12,
//         duration: 1,
//         delay: 0.7
//       }
//     },
//     float: {
//       y: [0, -10, 0],
//       rotate: [0, 2, 0],
//       transition: {
//         duration: 6,
//         repeat: Infinity,
//         repeatType: "reverse",
//         ease: "easeInOut"
//       }
//     }
//   };

//   // Quote marks animation
//   const quoteMarkVariants = {
//     initial: { opacity: 0, scale: 0 },
//     visible: {
//       opacity: [0, 1, 0.7],
//       scale: [0, 1.2, 1],
//       transition: {
//         duration: 0.8,
//         delay: 0.4
//       }
//     }
//   };

//   return (
//     <motion.div 
//       ref={ref}
//       className="bg-gradient-to-b from-[#FF6600] via-[39%] via-[#FF711B] to-[#FFB669] sm:py-16 py-12 px-4 md:px-20 relative overflow-hidden h-auto max-lg:flex items-center flex-col justify-center"
//       initial="initial"
//       animate={controls}
//       style={{ perspective: "1200px" }}
//     >
//       {/* Animated background bubbles */}
//       {[...Array(8)].map((_, i) => (
//         <motion.div
//           key={i}
//           className="absolute rounded-full bg-white opacity-10 pointer-events-none"
//           style={{
//             width: 70 + Math.random() * 200,
//             height: 70 + Math.random() * 200,
//             left: `${Math.random() * 100}%`,
//             top: `${Math.random() * 100}%`,
//             zIndex: 0
//           }}
//           variants={bubbleVariants}
//           custom={i}
//         />
//       ))}
      
//       <div className="text-center text-white max-w-3xl mx-auto relative z-10">
//         <motion.h2 
//           className="text-2xl md:text-5xl font-bold"
//           variants={headingVariants}
//         >
//           We deliver and it shows.
//         </motion.h2>
//         <motion.p 
//           className="text-sm md:text-[20px] md:leading-[30px] sm:my-16 my-10 max-w-[460px] mx-auto"
//           variants={paragraphVariants}
//         >
//           Trusted by leading brands, we hold ourselves accountable to every
//           promise we make.
//         </motion.p>
//       </div>

//       <motion.div 
//         className="flex bg-white max-w-[1000px] min-h-[485px] mx-auto rounded-[40px] px-12 md:px-16 shadow-lg z-10 max-lg:py-4 relative overflow-hidden"
//         variants={cardVariants}
//         style={{ transformStyle: "preserve-3d" }}
//       >
//         {/* Quote mark decoration */}
//         <motion.div
//           variants={quoteMarkVariants}
//           className="absolute text-[150px] font-serif text-orange-100 -left-5 top-0 leading-none z-0"
//         >
//           "
//         </motion.div>
        
//         <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
//           <div className="flex-1 text-center md:text-left">
//             <motion.img
//               variants={logoVariants}
//               src={'https://custorybucket.s3.ap-southeast-1.amazonaws.com/Landing/logoImage.png'}
//               alt="Logo"
//               className="md:mx-0 mx-auto mb-4 w-[169px] h-[117px] object-contain"
//             />
//             <motion.h3 
//               variants={quoteVariants}
//               className="text-[#2f2828] font-bold text-lg md:text-[26px] mb-2"
//             >
//               Kornix Is The Best Digital Agency I Have Ever Seen! Highly
//               Recommended!
//             </motion.h3>
//             <motion.p 
//               variants={quoteVariants}
//               className="md:text-lg text-base text-[#111204] my-5"
//             >
//               I recently hired <b>Ideapeel</b> for a custom web-development project and
//               couldn't be happier with the results. The team was able to bring
//               my unique ideas to life and create a website that truly stands
//               out.
//             </motion.p>
//             <motion.div variants={authorVariants}>
//               <p className="text-[#ff6600] font-bold text-xl mb-6">Diana Lorenza</p>
//               <p className="text-base text-[#111204]">Director of <b>GYMSTORY</b></p>
//             </motion.div>
//           </div>

//           <motion.div 
//             className="md:w-[325px] w-32 md:h-[325px] h-32 rounded-full overflow-hidden border-4 border-white shadow-md"
//             variants={photoVariants}
//             animate={["visible", "float"]}
//             style={{ transformStyle: "preserve-3d" }}
//           >
//             <img
//               src={'https://custorybucket.s3.ap-southeast-1.amazonaws.com/Landing/person.png'}
//               alt="Person"
//               className="w-full h-full object-fill rounded-full"
//             />
//           </motion.div>
//         </div>
        
//         {/* Animated gradient overlay */}
//         <motion.div
//           className="absolute inset-0 bg-gradient-to-tr from-orange-100/10 to-transparent rounded-[40px] pointer-events-none"
//           animate={{ 
//             opacity: [0, 0.2, 0],
//             transition: { 
//               duration: 5, 
//               repeat: Infinity, 
//               repeatType: "reverse" 
//             } 
//           }}
//         />
//       </motion.div>
//     </motion.div>
//   );
// }

// export default Trusted_Brand;



























































































































































import React, { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import TopLeft from '../../assets/12.svg'; // Assuming this is your actual top-left asset
import TopRight from '../../assets/1.svg'; // Assuming this is your actual top-right asset
import BottomRight from '../../assets/31.svg'; // Assuming this is your actual bottom-right asset
import BottomLeft from '../../assets/3.svg'; // Assuming this is your actual bottom-left asset


const Trusted_Brand = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  // Background object (star/shape) animation - THIS REMAINS ANIMATED
  const objectVariants = {
    initial: { opacity: 0, scale: 0.5 },
    visible: (i) => ({
      opacity: [0.1, 0.2, 0.1], // Slightly more visible
      scale: [0.5, 1, 0.8],
      x: [0, i % 2 === 0 ? 30 : -30, 0], // Horizontal movement
      y: [0, i % 3 === 0 ? 20 : -20, 0], // Vertical movement
      transition: {
        duration: i % 2 === 0 ? 20 : 17,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay: i * 0.6
      }
    })
  };

  // Heading animations
  const headingVariants = {
    initial: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 12,
        duration: 0.8
      }
    }
  };

  const paragraphVariants = {
    initial: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 12,
        delay: 0.2,
        duration: 0.8
      }
    }
  };

  // Card animation with 3D effect
  const cardVariants = {
    initial: { y: 100, opacity: 0, rotateX: 10 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 50,
        damping: 15,
        delay: 0.4,
        duration: 1,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  // Card content animations
  const logoVariants = {
    initial: { y: 20, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.6
      }
    }
  };

  const quoteVariants = {
    initial: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.3
      }
    }
  };

  const authorVariants = {
    initial: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: 0.6
      }
    }
  };

  // Photo animation with floating effect
  const photoVariants = {
    initial: { opacity: 0, scale: 0.7, rotate: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 12,
        duration: 1,
        delay: 0.7
      }
    },
    float: { // Retained the float animation for the photo
      y: [0, -10, 0],
      rotate: [0, 2, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  };

  // Quote marks animation
  const quoteMarkVariants = {
    initial: { opacity: 0, scale: 0 },
    visible: {
      opacity: [0, 1, 0.7],
      scale: [0, 1.2, 1],
      transition: {
        duration: 0.8,
        delay: 0.4
      }
    }
  };

  // Array of shapes for the animated background elements
  const shapes = ['★', '●', '■', '▲', '◆', '✦']; // Star, Circle, Square, Up-triangle, Diamond, Eight-pointed star

  return (
    <motion.div
      ref={ref}
      className="bg-gradient-to-b from-[#FF6600] via-[39%] via-[#FF711B] to-[#FFB669] sm:py-16 py-12 px-4 md:px-20 relative overflow-hidden h-auto flex items-center flex-col justify-center"
      initial="initial"
      animate={controls}
      style={{ perspective: "1200px" }}
    >
      {/* STATIC Decorative images using the imported SVGs */}
      {/* Top-left image */}
      <img
        src={TopLeft} // Corrected: Using TopLeft for top-left
        alt="Decorative Element Top Left"
        className="absolute top-4 left-4 md:top-8 md:left-8 lg:left-16 w-[500px] md:w-[150px] lg:w-[250px] xl:w-[350px] h-auto object-contain z-10"
        // Removed the filter style
      />
      {/* Top-right image */}
      <img
        src={TopRight} // Corrected: Using TopRight for top-right
        alt="Decorative Element Top Right"
        className="absolute top-4 right-4 md:top-8 md:right-8 lg:right-16 w-[500px] md:w-[150px] lg:w-[250px] xl:w-[350px] h-auto object-contain z-10"
        // Removed the filter style
      />
      {/* Bottom-left image */}
      <img
        src={BottomLeft} // Corrected: Using BottomLeft for bottom-left
        alt="Decorative Element Bottom Left"
        className="absolute bottom-4 left-4 md:bottom-8 md:left-8 lg:left-16 w-[500px] md:w-[150px] lg:w-[250px] xl:w-[350px] h-auto object-contain z-10"
        // Removed the filter style
      />
      {/* Bottom-right image - Added this to complete all four corners based on imports */}
      <img
        src={BottomRight} // Using BottomRight for bottom-right
        alt="Decorative Element Bottom Right"
        className="absolute bottom-4 right-4 md:bottom-8 md:right-8 lg:right-16 w-[500px] md:w-[150px] lg:w-[250px] xl:w-[350px] h-auto object-contain z-10"
        // Removed the filter style
      />

      {/* ANIMATED Background objects (stars/shapes) - Increased quantity and diversified shapes */}
      {[...Array(25)].map((_, i) => { // Increased count to 25
        const randomShape = shapes[Math.floor(Math.random() * shapes.length)]; // Randomly pick a shape
        return (
          <motion.div
            key={i}
            className="absolute text-white opacity-10 pointer-events-none"
            style={{
              fontSize: `${30 + Math.random() * 60}px`, // Size of the shape
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              zIndex: 0 // Keep these behind the main content and new decorative images
            }}
            variants={objectVariants} // Apply the animation variants
            custom={i}
          >
            {randomShape}
          </motion.div>
        );
      })}

      <div className="text-center text-white max-w-3xl mx-auto relative z-20"> {/* Higher z-index for main text content */}
        <motion.h2
          className="text-2xl md:text-5xl font-bold"
          variants={headingVariants}
        >
          We deliver and it shows.
        </motion.h2>
        <motion.p
          className="text-sm md:text-[20px] md:leading-[30px] sm:my-16 my-10 max-w-[460px] mx-auto"
          variants={paragraphVariants}
        >
          Trusted by leading brands, we hold ourselves accountable to every promise we make.
        </motion.p>
      </div>

      <motion.div
        className="flex bg-white max-w-[1000px] min-h-[485px] mx-auto rounded-[40px] px-12 md:px-16 shadow-lg z-20 max-lg:py-4 relative overflow-hidden" // Higher z-index for the main card
        variants={cardVariants}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Quote mark decoration */}
        <motion.div
          variants={quoteMarkVariants}
          className="absolute text-[150px] font-serif text-orange-100 -left-5 top-0 leading-none z-0"
        >
          "
        </motion.div>

        <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
          <div className="flex-1 text-center md:text-left">
            {/* Logo image (previously commented out, now present) */}
             {/* <motion.img
              variants={logoVariants}
              src={'https://custorybucket.s3.ap-southeast-1.amazonaws.com/Landing/YSHEngineering_logo.png'} // Placeholder, replace with actual logo if different
              alt="Yew Seng Heng Engineering Logo"
              className="md:mx-0 mx-auto mb-4 w-[169px] h-[117px] object-contain"
            /> */}
            <motion.h3
              variants={quoteVariants}
              className="text-[#2f2828] font-bold text-lg md:text-[26px] mb-2"
            >
              "Custory didn't just elevate our brand. They redefined how we communicate value in our industry."
            </motion.h3>
            <motion.p
              variants={quoteVariants}
              className="md:text-lg text-base text-[#111204] my-5"
            >
              "Samantha and the team approached our brand strategy with business-first thinking. From a website that speaks clearly to clients, to premium gifting and merchandise that our clients and team love - everything Custory delivered was intentional. They helped us stand out in a traditionally conservative industry."
            </motion.p>
            <motion.div variants={authorVariants}>
              <p className="text-[#ff6600] font-bold text-xl mb-6">Tan Teck Poh Edmund</p>
              <p className="text-base text-[#111204]">Managing Director</p>
            </motion.div>
          </div>

          <motion.div
            className="md:w-[325px] w-32 md:h-[325px] h-32 rounded-full overflow-hidden border-4 border-white shadow-md flex-shrink-0"
            variants={photoVariants}
            animate={["visible", "float"]} // Ensure the photo also floats as per its variants
            style={{ transformStyle: "preserve-3d" }}
          >
            <img
             src={'https://custorybucket.s3.ap-southeast-1.amazonaws.com/Landing/person.png'} // Corrected image source from 'person.png' to 'tan_teck_poh_edmund.png' to match previous context
              alt="Tan Teck Poh Edmund"
              className="w-full h-full object-cover rounded-full"
            />
          </motion.div>
        </div>

        {/* Animated gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-orange-100/10 to-transparent rounded-[40px] pointer-events-none"
          animate={{
            opacity: [0, 0.2, 0],
            transition: {
              duration: 5,
              repeat: Infinity,
              repeatType: "reverse"
            }
          }}
        />
      </motion.div>
    </motion.div>
  );
}

export default Trusted_Brand;

