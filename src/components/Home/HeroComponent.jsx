// import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { easing } from "maath";
// import {
//   useGLTF,
//   AccumulativeShadows,
//   RandomizedLight,
//   Decal,
//   useTexture,
// } from "@react-three/drei";
// import { useFrame } from "@react-three/fiber";

// const HeroComponent = ({ position = [0, 0, 2.5], fov = 25 }) => {
//   const transition = { ease: "linear", duration: 1.5 };
//   const textVariants = {
//     initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } },
//     animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
//     exit: { x: 100, opacity: 0, transition: { ...transition, delay: 0 } },
//   };

//   const vidRef = useRef(null);
//   const [isVideoPlaying, setIsVideoPlaying] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const prefersReduced = window.matchMedia(
//       "(prefers-reduced-motion: reduce)"
//     ).matches;
//     if (prefersReduced && vidRef.current) {
//       setIsVideoPlaying(false);
//       vidRef.current.pause();
//     }
//   }, []);

//   return (
//     <>
//       {/* <div className="relative">
//         <iframe
//           className="aspect-video"
//           allowscriptaccess="always"
//           width="100%"
//           height="100%"
//           src="https://www.youtube.com/embed/GPBtLHGGCCE?si=HnwkErciCZSJniOv&amp;controls=0&autoplay=1&mute=1&loop=1&showinfo=0&modestbranding=1&enablejsapi=1&playlist=GPBtLHGGCCE&rel=0&start=15"
//           title="YouTube video player"
//           frameBorder="0"
//           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//           referrerPolicy="strict-origin-when-cross-origin"
//           allowFullScreen
//         ></iframe> */}

//         {/* <video ref={vidRef} id="heroVideo" autoPlay muted loop className='min-w-full min-h-full'>
//           <source src="https://custorybucket.s3.ap-southeast-1.amazonaws.com/Lifestyle+Website+Header+2.0.mp4" type='video/mp4' className='w-full h-full'/>
//         </video> */}

//         {/* <div className='absolute top-0 left-0 bg-gradient-to-r from-neutral-900/70 to-neutral-900/0 w-full h-full'></div>

//         <div className='top-1/2 sm:top-[60%] absolute transform -translate-y-1/2 left-1/2 -translate-x-1/2 lg:top-1/2 lg:left-0 lg:translate-x-0 text-white lg:mx-32'>
//           <div className='flex flex-col items-center lg:items-start'>
//             <h1 className='text-6xl sm:text-8xl'>CUSTORY</h1>
//             <p className='text-xl sm:text-3xl'> Your Story, Customized Better.</p>
//             <button onClick={() => navigate('/products')} className='mt-8 py-3 px-8 bg-custoryPrimary font-bold rounded-full ease-out transition-all hover:-translate-y-1 hover:bg-custoryMiddle'>
//               Shop Now
//             </button>
//           </div>
//         </div>
//       </div> */}
//       <span
//         className="
//           absolute left-1/2 top-[40%]
//           w-[400px] h-[400px]
//           rounded-full
//           bg-gradient-to-b from-white via-[#FF7C36] to-white
//           blur-[100px]
//           shadow-[0_0_100px_rgba(255,124,54,0.8)]
//           filter drop-shadow-[0_0_60px_rgba(255,124,54,1)]
//           transform -translate-x-1/2 -translate-y-1/2 
//           pointer-events-none
//           lg:opacity-[0.3] opacity-[0.3] 
//           z-0"
//       ></span>
//       <section className="text-center sm:py-10 sm:pb-0 py-0 px-4 relative overflow-hidden sm:mt-24 mt-0 pb-0">
//         {/* Headline */}
//         <div className="relative px-4 pt-10 overflow-hidden lg:min-h-[500px] h-auto">
//           <h1 className="relative z-10 text-center text-3xl sm:text-5xl md:text-6xl md:leading-[65px] lg:text-[90px] lg:leading-[103px] font-bold max-w-5xl mx-auto px-4 font-[Karla]">
//             <span className="text-black block pb-2">Your Custom Story,</span>
//             <span className="text-[#FF6600] block pb-2">Designed And</span>
//             <span className="text-[#FF6600] block">Delivered Better.</span>
//             <div className="absolute right-[10px] top-[17.5%] w-20 h-20 rounded-full opacity-70 lg:block hidden">
//               <img src={'https://custorybucket.s3.ap-southeast-1.amazonaws.com/Landing/star-icon.png'} alt="Star Icon" />
//             </div>
//             {/* Subheadline */}
//             <p
//               className="text-black sm:text-xl text-base font-normal mt-3 max-w-[627px] mx-auto"
//               style={{ fontFamily: "'SUIT Variable', 'Poppins', sans-serif" }}
//             >
//               At Custory, we shape brand stories that live beyond the screen — in
//               the hands, homes, and hearts of the people who matter to you.
//             </p>
//             <div className="absolute left-[17%] bottom-[-13%] w-3 h-3 rounded-full lg:block hidden">
//               <img src={'https://custorybucket.s3.ap-southeast-1.amazonaws.com/Landing/star-icon.png'} alt="Star Icon" />
//             </div>
//           </h1>
//         </div>
//         {/* CTA Buttons */}
//         <div className="flex justify-center gap-4 flex-wrap relative max-lg:mt-16">
//           <div className="relative gap-8 flex flex-wrap justify-center">
//             <button className="bg-[#FF6600] text-white cursor-pointer font-medium py-[18px] px-6 rounded-md text-base hover:bg-orange-600 transition max-sm:flex-grow">
//               Book a Call with Our Team
//             </button>
//             <button
//               onClick={() => navigate("/products")}
//               className="bg-[#FF6600] text-white cursor-pointer font-medium py-[18px] px-16 rounded-md text-base hover:bg-orange-600 transition max-sm:flex-grow"
//             >
//               Shop Now
//             </button>
//             <div className="absolute right-[-2.5%] bottom-[84%] w-5 h-5 rounded-full lg:block hidden">
//               <img src={'https://custorybucket.s3.ap-southeast-1.amazonaws.com/Landing/star-icon.png'} alt="Star Icon" />
//             </div>
//           </div>
//         </div>
//         {/* Footer Line */}
//         <div className="mt-20 flex items-center justify-center gap-8 max-sm:gap-2">
//           <div className="w-12 h-0.5 bg-[#FF6600] rounded-full" />
//           <p className="uppercase sm:text-[15px] text-[10px] font-bold tracking-[1.425px] text-black">
//             Trusted by brands that get it
//           </p>
//           <div className="w-12 h-0.5 bg-[#FF6600] rounded-full" />
//         </div>
//       </section>
//     </>
//   );
// };

// function Shirt(props) {
//   const texture = useTexture(`/custorytransparent.png`);
//   const { nodes, materials } = useGLTF("/shirt_baked_collapsed.glb");
//   useFrame((state, delta) =>
//     easing.dampC(materials.lambert1.color, "#ff7f30", 0.25, delta)
//   );

//   return (
//     <mesh
//       castShadow
//       geometry={nodes.T_Shirt_male.geometry}
//       material={materials.lambert1}
//       material-roughness={1}
//       {...props}
//       dispose={null}
//     >
//       <Decal
//         position={[0, 0.08, 0.15]}
//         rotation={[0, 0, 0]}
//         scale={0.28}
//         opacity={0.6}
//         map={texture}
//       />
//     </mesh>
//   );
// }

// function Backdrop() {
//   const shadows = useRef();

//   return (
//     <AccumulativeShadows
//       ref={shadows}
//       temporal
//       frames={60}
//       alphaTest={0.35}
//       scale={1}
//       rotation={[Math.PI / 2, 0, 0]}
//       position={[0, 0, -0.14]}
//     >
//       <RandomizedLight
//         amount={9}
//         radius={9}
//         intensity={5.5}
//         ambient={0.25}
//         position={[5, 5, -10]}
//       />
//       <RandomizedLight
//         amount={0.9}
//         radius={5}
//         intensity={0.25}
//         ambient={0.55}
//         position={[-5, 5, -9]}
//       />
//     </AccumulativeShadows>
//   );
// }

// function CameraRig({ children }) {
//   const group = useRef();
//   useFrame((state, delta) => {
//     easing.damp3(state.camera.position, [0, 0, 2], 0.25, delta);
//     easing.dampE(
//       group.current.rotation,
//       [state.pointer.y / 10, -state.pointer.x / 5, 0],
//       0.25,
//       delta
//     );
//   });
//   return <group ref={group}>{children}</group>;
// }

// useGLTF.preload("/shirt_baked_collapsed.glb");

// export default HeroComponent;



















































































// ................... SIMPLE ANIMATION ............................




// import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { easing } from "maath";
// import { motion } from "framer-motion";
// import {
//   useGLTF,
//   AccumulativeShadows,
//   RandomizedLight,
//   Decal,
//   useTexture,
// } from "@react-three/drei";
// import { useFrame } from "@react-three/fiber";

// const HeroComponent = ({ position = [0, 0, 2.5], fov = 25 }) => {
//   const transition = { ease: "linear", duration: 1.5 };
//   const textVariants = {
//     initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } },
//     animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
//     exit: { x: 100, opacity: 0, transition: { ...transition, delay: 0 } },
//   };

//   const vidRef = useRef(null);
//   const [isVideoPlaying, setIsVideoPlaying] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const prefersReduced = window.matchMedia(
//       "(prefers-reduced-motion: reduce)"
//     ).matches;
//     if (prefersReduced && vidRef.current) {
//       setIsVideoPlaying(false);
//       vidRef.current.pause();
//     }
//   }, []);

//   // Animation variants for various elements
//   const gradientVariants = {
//     initial: { opacity: 0, scale: 0.8 },
//     animate: { 
//       opacity: [0.2, 0.3, 0.2], 
//       scale: [0.9, 1, 0.9],
//       transition: { 
//         duration: 4,
//         repeat: Infinity,
//         repeatType: "reverse"
//       }
//     }
//   };

//   const headlineVariants = {
//     initial: { opacity: 0, y: 20 },
//     animate: (i) => ({
//       opacity: 1,
//       y: 0,
//       transition: { duration: 0.6, delay: i * 0.2 }
//     })
//   };

//   const starIconVariants = {
//     initial: { rotate: 0, scale: 0.8, opacity: 0 },
//     animate: { 
//       rotate: 360, 
//       scale: 1, 
//       opacity: 1,
//       transition: { 
//         rotate: { duration: 20, repeat: Infinity, ease: "linear" },
//         scale: { duration: 0.8, delay: 1.2 },
//         opacity: { duration: 0.8, delay: 1.2 }
//       }
//     }
//   };

//   const buttonVariants = {
//     initial: { opacity: 0, y: 20 },
//     animate: (i) => ({ 
//       opacity: 1, 
//       y: 0,
//       transition: { duration: 0.5, delay: 1.2 + (i * 0.1) }
//     }),
//     hover: { 
//       scale: 1.05, 
//       transition: { duration: 0.2 }
//     },
//     tap: { 
//       scale: 0.98, 
//       transition: { duration: 0.1 }
//     }
//   };

//   const lineVariants = {
//     initial: { width: 0 },
//     animate: { 
//       width: '100%',
//       transition: { duration: 1, delay: 1.5 }
//     }
//   };

//   return (
//     <>
//       {/* Background gradient animation - preserving all original positioning */}
//       <motion.span
//         variants={gradientVariants}
//         initial="initial"
//         animate="animate"
//         className="
//           absolute left-1/2 top-[40%]
//           w-[400px] h-[400px]
//           rounded-full
//           bg-gradient-to-b from-white via-[#FF7C36] to-white
//           blur-[100px]
//           shadow-[0_0_100px_rgba(255,124,54,0.8)]
//           filter drop-shadow-[0_0_60px_rgba(255,124,54,1)]
//           transform -translate-x-1/2 -translate-y-1/2 
//           pointer-events-none
//           lg:opacity-[0.3] opacity-[0.3] 
//           z-0"
//       ></motion.span>
      
//       <section className="text-center sm:py-10 sm:pb-0 py-0 px-4 relative overflow-hidden sm:mt-24 mt-0 pb-0">
//         {/* Headline */}
//         <div className="relative px-4 pt-10 overflow-hidden lg:min-h-[500px] h-auto">
//           <h1 className="relative z-10 text-center text-3xl sm:text-5xl md:text-6xl md:leading-[65px] lg:text-[90px] lg:leading-[103px] font-bold max-w-5xl mx-auto px-4 font-[Karla]">
//             <motion.span 
//               className="text-black block pb-2"
//               variants={headlineVariants}
//               initial="initial"
//               animate="animate"
//               custom={0}
//             >
//               Your Custom Story,
//             </motion.span>
//             <motion.span 
//               className="text-[#FF6600] block pb-2"
//               variants={headlineVariants}
//               initial="initial"
//               animate="animate"
//               custom={1}
//             >
//               Designed And
//             </motion.span>
//             <motion.span 
//               className="text-[#FF6600] block"
//               variants={headlineVariants}
//               initial="initial"
//               animate="animate"
//               custom={2}
//             >
//               Delivered Better.
//             </motion.span>
            
//             <div className="absolute right-[10px] top-[17.5%] w-20 h-20 rounded-full opacity-70 lg:block hidden">
//               <motion.img 
//                 variants={starIconVariants}
//                 initial="initial"
//                 animate="animate"
//                 src={'https://custorybucket.s3.ap-southeast-1.amazonaws.com/Landing/star-icon.png'} 
//                 alt="Star Icon" 
//               />
//             </div>
            
//             {/* Subheadline */}
//             <motion.p
//               variants={headlineVariants}
//               initial="initial"
//               animate="animate"
//               custom={3}
//               className="text-black sm:text-xl text-base font-normal mt-3 max-w-[627px] mx-auto"
//               style={{ fontFamily: "'SUIT Variable', 'Poppins', sans-serif" }}
//             >
//               At Custory, we shape brand stories that live beyond the screen — in
//               the hands, homes, and hearts of the people who matter to you.
//             </motion.p>
            
//             <div className="absolute left-[17%] bottom-[-13%] w-3 h-3 rounded-full lg:block hidden">
//               <motion.img 
//                 variants={starIconVariants}
//                 initial="initial"
//                 animate="animate"
//                 src={'https://custorybucket.s3.ap-southeast-1.amazonaws.com/Landing/star-icon.png'} 
//                 alt="Star Icon" 
//               />
//             </div>
//           </h1>
//         </div>
        
//         {/* CTA Buttons */}
//         <div className="flex justify-center gap-4 flex-wrap relative max-lg:mt-16">
//           <div className="relative gap-8 flex flex-wrap justify-center">
//             <motion.button 
//               variants={buttonVariants}
//               initial="initial"
//               animate="animate"
//               whileHover="hover"
//               whileTap="tap"
//               custom={0}
//               className="bg-[#FF6600] text-white cursor-pointer font-medium py-[18px] px-6 rounded-md text-base hover:bg-orange-600 transition max-sm:flex-grow"
//             >
//               Book a Call with Our Team
//             </motion.button>
            
//             <motion.button
//               variants={buttonVariants}
//               initial="initial"
//               animate="animate"
//               whileHover="hover"
//               whileTap="tap"
//               custom={1}
//               onClick={() => navigate("/products")}
//               className="bg-[#FF6600] text-white cursor-pointer font-medium py-[18px] px-16 rounded-md text-base hover:bg-orange-600 transition max-sm:flex-grow"
//             >
//               Shop Now
//             </motion.button>
            
//             <div className="absolute right-[-2.5%] bottom-[84%] w-5 h-5 rounded-full lg:block hidden">
//               <motion.img 
//                 variants={starIconVariants}
//                 initial="initial"
//                 animate="animate" 
//                 src={'https://custorybucket.s3.ap-southeast-1.amazonaws.com/Landing/star-icon.png'} 
//                 alt="Star Icon" 
//               />
//             </div>
//           </div>
//         </div>
        
//         {/* Footer Line */}
//         <div className="mt-20 flex items-center justify-center gap-8 max-sm:gap-2">
//           <motion.div 
//             variants={lineVariants}
//             initial="initial"
//             animate="animate"
//             className="w-12 h-0.5 bg-[#FF6600] rounded-full" 
//           />
//           <motion.p 
//             variants={buttonVariants}
//             initial="initial"
//             animate="animate"
//             custom={2}
//             className="uppercase sm:text-[15px] text-[10px] font-bold tracking-[1.425px] text-black"
//           >
//             Trusted by brands that get it
//           </motion.p>
//           <motion.div 
//             variants={lineVariants}
//             initial="initial"
//             animate="animate"
//             className="w-12 h-0.5 bg-[#FF6600] rounded-full" 
//           />
//         </div>
//       </section>
//     </>
//   );
// };

// // Three.js components remain unchanged
// function Shirt(props) {
//   const texture = useTexture(`/custorytransparent.png`);
//   const { nodes, materials } = useGLTF("/shirt_baked_collapsed.glb");
//   useFrame((state, delta) =>
//     easing.dampC(materials.lambert1.color, "#ff7f30", 0.25, delta)
//   );

//   return (
//     <mesh
//       castShadow
//       geometry={nodes.T_Shirt_male.geometry}
//       material={materials.lambert1}
//       material-roughness={1}
//       {...props}
//       dispose={null}
//     >
//       <Decal
//         position={[0, 0.08, 0.15]}
//         rotation={[0, 0, 0]}
//         scale={0.28}
//         opacity={0.6}
//         map={texture}
//       />
//     </mesh>
//   );
// }

// function Backdrop() {
//   const shadows = useRef();

//   return (
//     <AccumulativeShadows
//       ref={shadows}
//       temporal
//       frames={60}
//       alphaTest={0.35}
//       scale={1}
//       rotation={[Math.PI / 2, 0, 0]}
//       position={[0, 0, -0.14]}
//     >
//       <RandomizedLight
//         amount={9}
//         radius={9}
//         intensity={5.5}
//         ambient={0.25}
//         position={[5, 5, -10]}
//       />
//       <RandomizedLight
//         amount={0.9}
//         radius={5}
//         intensity={0.25}
//         ambient={0.55}
//         position={[-5, 5, -9]}
//       />
//     </AccumulativeShadows>
//   );
// }

// function CameraRig({ children }) {
//   const group = useRef();
//   useFrame((state, delta) => {
//     easing.damp3(state.camera.position, [0, 0, 2], 0.25, delta);
//     easing.dampE(
//       group.current.rotation,
//       [state.pointer.y / 10, -state.pointer.x / 5, 0],
//       0.25,
//       delta
//     );
//   });
//   return <group ref={group}>{children}</group>;
// }

// useGLTF.preload("/shirt_baked_collapsed.glb");

// export default HeroComponent;




















//  ...........................     FLOATING ANIMATIONB ..........................................



// import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { easing } from "maath";
// import { motion } from "framer-motion";
// import {
//   useGLTF,
//   AccumulativeShadows,
//   RandomizedLight,
//   Decal,
//   useTexture,
// } from "@react-three/drei";
// import { useFrame } from "@react-three/fiber";

// const HeroComponent = ({ position = [0, 0, 2.5], fov = 25 }) => {
//   const transition = { ease: "linear", duration: 1.5 };
//   const textVariants = {
//     initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } },
//     animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
//     exit: { x: 100, opacity: 0, transition: { ...transition, delay: 0 } },
//   };

//   const vidRef = useRef(null);
//   const [isVideoPlaying, setIsVideoPlaying] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const prefersReduced = window.matchMedia(
//       "(prefers-reduced-motion: reduce)"
//     ).matches;
//     if (prefersReduced && vidRef.current) {
//       setIsVideoPlaying(false);
//       vidRef.current.pause();
//     }
//   }, []);

//   // Floating animation variants
//   const floatingGradient = {
//     initial: { opacity: 0.3 },
//     animate: {
//       opacity: [0.2, 0.3, 0.2],
//       y: [0, -15, 0],
//       x: [0, 5, 0],
//       transition: {
//         y: {
//           repeat: Infinity,
//           duration: 8,
//           ease: "easeInOut",
//         },
//         x: {
//           repeat: Infinity,
//           duration: 9,
//           ease: "easeInOut",
//         },
//         opacity: {
//           repeat: Infinity,
//           duration: 7,
//           ease: "easeInOut",
//         },
//       },
//     },
//   };

//   const floatingHeadline = (i) => ({
//     initial: { opacity: 0, y: 20 },
//     animate: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 1.2, delay: i * 0.4 },
//     },
//     floating: {
//       y: [0, -(3 + i), 0],
//       transition: {
//         delay: 1.5,
//         repeat: Infinity,
//         duration: 5 + i * 0.8, // Slightly different duration for each text element
//         ease: "easeInOut",
//       },
//     },
//   });

//   const floatingStars = (i) => ({
//     initial: { opacity: 0, scale: 0.8, rotate: 0 },
//     animate: {
//       opacity: 1,
//       scale: 1,
//       rotate: 360,
//       transition: {
//         rotate: {
//           repeat: Infinity,
//           duration: 20 + i * 5,
//           ease: "linear",
//         },
//         opacity: { duration: 1, delay: 1.2 },
//         scale: { duration: 0.8, delay: 1.2 },
//       }
//     },
//     floating: {
//       y: [0, -(7 + i * 3), 0],
//       x: [0, (4 + i * 2), 0],
//       transition: {
//         repeat: Infinity,
//         duration: 7 + i * 1.5,
//         ease: "easeInOut",
//         delay: i * 0.3,
//       },
//     },
//   });

//   const buttonFloat = (i) => ({
//     initial: { opacity: 0, y: 20 },
//     animate: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 1, delay: 2 + i * 0.3 }
//     },
//     hover: { 
//       scale: 1.05,
//       y: -5,
//       transition: { duration: 0.4 }
//     },
//     tap: { scale: 0.98, transition: { duration: 0.2 } },
//     floating: {
//       y: [0, -4, 0],
//       transition: {
//         repeat: Infinity,
//         duration: 4 + i,
//         ease: "easeInOut",
//         delay: i * 0.5,
//       }
//     }
//   });

//   const footerTextFloat = {
//     initial: { opacity: 0 },
//     animate: { opacity: 1, transition: { duration: 1, delay: 3 } },
//     floating: {
//       y: [0, -3, 0],
//       transition: {
//         repeat: Infinity,
//         duration: 6,
//         ease: "easeInOut",
//         delay: 3.5,
//       }
//     }
//   };

//   const lineFloat = (i) => ({
//     initial: { width: 0 },
//     animate: { width: "100%", transition: { duration: 1.5, delay: 3 } },
//     floating: {
//       y: [0, -2, 0],
//       transition: {
//         repeat: Infinity,
//         duration: 5,
//         ease: "easeInOut",
//         delay: 3 + i * 0.2,
//       }
//     }
//   });

//   return (
//     <>
//       {/* Background gradient animation with floating effect */}
//       <motion.span
//         variants={floatingGradient}
//         initial="initial"
//         animate="animate"
//         className="
//           absolute left-1/2 top-[40%]
//           w-[400px] h-[400px]
//           rounded-full
//           bg-gradient-to-b from-white via-[#FF7C36] to-white
//           blur-[100px]
//           shadow-[0_0_100px_rgba(255,124,54,0.8)]
//           filter drop-shadow-[0_0_60px_rgba(255,124,54,1)]
//           transform -translate-x-1/2 -translate-y-1/2 
//           pointer-events-none
//           lg:opacity-[0.3] opacity-[0.3] 
//           z-0"
//       ></motion.span>
      
//       <section className="text-center sm:py-10 sm:pb-0 py-0 px-4 relative overflow-hidden sm:mt-24 mt-0 pb-0">
//         {/* Headline with floating */}
//         <div className="relative px-4 pt-10 overflow-hidden lg:min-h-[500px] h-auto">
//           <h1 className="relative z-10 text-center text-3xl sm:text-5xl md:text-6xl md:leading-[65px] lg:text-[90px] lg:leading-[103px] font-bold max-w-5xl mx-auto px-4 font-[Karla]">
//             <motion.span 
//               className="text-black block pb-2"
//               variants={floatingHeadline(0)}
//               initial="initial"
//               animate={["animate", "floating"]}
//             >
//               Your Custom Story,
//             </motion.span>
//             <motion.span 
//               className="text-[#FF6600] block pb-2"
//               variants={floatingHeadline(1)}
//               initial="initial"
//               animate={["animate", "floating"]}
//             >
//               Designed And
//             </motion.span>
//             <motion.span 
//               className="text-[#FF6600] block"
//               variants={floatingHeadline(2)}
//               initial="initial"
//               animate={["animate", "floating"]}
//             >
//               Delivered Better.
//             </motion.span>
            
//             <div className="absolute right-[10px] top-[17.5%] w-20 h-20 rounded-full opacity-70 lg:block hidden">
//               <motion.img 
//                 variants={floatingStars(0)}
//                 initial="initial"
//                 animate={["animate", "floating"]}
//                 src={'https://custorybucket.s3.ap-southeast-1.amazonaws.com/Landing/star-icon.png'} 
//                 alt="Star Icon" 
//               />
//             </div>
            
//             {/* Subheadline with floating */}
//             <motion.p
//               variants={floatingHeadline(3)}
//               initial="initial"
//               animate={["animate", "floating"]}
//               className="text-black sm:text-xl text-base font-normal mt-3 max-w-[627px] mx-auto"
//               style={{ fontFamily: "'SUIT Variable', 'Poppins', sans-serif" }}
//             >
//               At Custory, we shape brand stories that live beyond the screen — in
//               the hands, homes, and hearts of the people who matter to you.
//             </motion.p>
            
//             <div className="absolute left-[17%] bottom-[-13%] w-3 h-3 rounded-full lg:block hidden">
//               <motion.img 
//                 variants={floatingStars(1)}
//                 initial="initial"
//                 animate={["animate", "floating"]}
//                 src={'https://custorybucket.s3.ap-southeast-1.amazonaws.com/Landing/star-icon.png'} 
//                 alt="Star Icon" 
//               />
//             </div>
//           </h1>
//         </div>
        
//         {/* CTA Buttons with floating */}
//         <div className="flex justify-center gap-4 flex-wrap relative max-lg:mt-16">
//           <div className="relative gap-8 flex flex-wrap justify-center">
//             <motion.button 
//               variants={buttonFloat(0)}
//               initial="initial"
//               animate={["animate", "floating"]}
//               whileHover="hover"
//               whileTap="tap"
//               className="bg-[#FF6600] text-white cursor-pointer font-medium py-[18px] px-6 rounded-md text-base hover:bg-orange-600 transition max-sm:flex-grow"
//             >
//               Book a Call with Our Team
//             </motion.button>
            
//             <motion.button
//               variants={buttonFloat(1)}
//               initial="initial"
//               animate={["animate", "floating"]}
//               whileHover="hover"
//               whileTap="tap"
//               onClick={() => navigate("/products")}
//               className="bg-[#FF6600] text-white cursor-pointer font-medium py-[18px] px-16 rounded-md text-base hover:bg-orange-600 transition max-sm:flex-grow"
//             >
//               Shop Now
//             </motion.button>
            
//             <div className="absolute right-[-2.5%] bottom-[84%] w-5 h-5 rounded-full lg:block hidden">
//               <motion.img 
//                 variants={floatingStars(2)}
//                 initial="initial"
//                 animate={["animate", "floating"]}
//                 src={'https://custorybucket.s3.ap-southeast-1.amazonaws.com/Landing/star-icon.png'} 
//                 alt="Star Icon" 
//               />
//             </div>
//           </div>
//         </div>
        
//         {/* Footer Line with floating */}
//         <div className="mt-20 flex items-center justify-center gap-8 max-sm:gap-2">
//           <motion.div 
//             variants={lineFloat(0)}
//             initial="initial"
//             animate={["animate", "floating"]}
//             className="w-12 h-0.5 bg-[#FF6600] rounded-full" 
//           />
//           <motion.p 
//             variants={footerTextFloat}
//             initial="initial"
//             animate={["animate", "floating"]}
//             className="uppercase sm:text-[15px] text-[10px] font-bold tracking-[1.425px] text-black"
//           >
//             Trusted by brands that get it
//           </motion.p>
//           <motion.div 
//             variants={lineFloat(1)}
//             initial="initial"
//             animate={["animate", "floating"]}
//             className="w-12 h-0.5 bg-[#FF6600] rounded-full" 
//           />
//         </div>
//       </section>
//     </>
//   );
// };

// // Three.js components remain unchanged
// function Shirt(props) {
//   const texture = useTexture(`/custorytransparent.png`);
//   const { nodes, materials } = useGLTF("/shirt_baked_collapsed.glb");
//   useFrame((state, delta) =>
//     easing.dampC(materials.lambert1.color, "#ff7f30", 0.25, delta)
//   );

//   return (
//     <mesh
//       castShadow
//       geometry={nodes.T_Shirt_male.geometry}
//       material={materials.lambert1}
//       material-roughness={1}
//       {...props}
//       dispose={null}
//     >
//       <Decal
//         position={[0, 0.08, 0.15]}
//         rotation={[0, 0, 0]}
//         scale={0.28}
//         opacity={0.6}
//         map={texture}
//       />
//     </mesh>
//   );
// }

// function Backdrop() {
//   const shadows = useRef();

//   return (
//     <AccumulativeShadows
//       ref={shadows}
//       temporal
//       frames={60}
//       alphaTest={0.35}
//       scale={1}
//       rotation={[Math.PI / 2, 0, 0]}
//       position={[0, 0, -0.14]}
//     >
//       <RandomizedLight
//         amount={9}
//         radius={9}
//         intensity={5.5}
//         ambient={0.25}
//         position={[5, 5, -10]}
//       />
//       <RandomizedLight
//         amount={0.9}
//         radius={5}
//         intensity={0.25}
//         ambient={0.55}
//         position={[-5, 5, -9]}
//       />
//     </AccumulativeShadows>
//   );
// }

// function CameraRig({ children }) {
//   const group = useRef();
//   useFrame((state, delta) => {
//     easing.damp3(state.camera.position, [0, 0, 2], 0.25, delta);
//     easing.dampE(
//       group.current.rotation,
//       [state.pointer.y / 10, -state.pointer.x / 5, 0],
//       0.25,
//       delta
//     );
//   });
//   return <group ref={group}>{children}</group>;
// }

// useGLTF.preload("/shirt_baked_collapsed.glb");

// export default HeroComponent;




























































// .................................   RESPONSIVENESS ISUUES .....................................

// import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { easing } from "maath";
// import { motion } from "framer-motion";
// import * as THREE from 'three';
// import {
//   useGLTF,
//   AccumulativeShadows,
//   RandomizedLight,
//   Decal,
//   useTexture,
// } from "@react-three/drei";
// import { useFrame } from "@react-three/fiber";

// const HeroComponent = ({ position = [0, 0, 2.5], fov = 25 }) => {
//   const canvasRef = useRef(null);
//   const transition = { ease: "linear", duration: 1.5 };
//   const textVariants = {
//     initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } },
//     animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
//     exit: { x: 100, opacity: 0, transition: { ...transition, delay: 0 } },
//   };

//   const vidRef = useRef(null);
//   const [isVideoPlaying, setIsVideoPlaying] = useState(false);
//   const navigate = useNavigate();

//   // Set up the Three.js particles effect
//   useEffect(() => {
//     if (!canvasRef.current) return;
    
//     // Initialize Three.js scene
//     const canvas = canvasRef.current;
//     const renderer = new THREE.WebGLRenderer({
//       canvas,
//       alpha: true,
//       antialias: true
//     });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       1000
//     );
//     camera.position.z = 5;

//     // Create particles
//     const particlesGeometry = new THREE.BufferGeometry();
//     const particleCount = 1500;
//     const posArray = new Float32Array(particleCount * 3);
    
//     for (let i = 0; i < particleCount * 3; i++) {
//       posArray[i] = (Math.random() - 0.5) * 10;
//     }
    
//     particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
//     // Create particle material with custom shader for gradient color
//     const particleMaterial = new THREE.PointsMaterial({
//       size: 0.02,
//       color: '#ff6900',
//       transparent: true,
//       opacity: 0.5,
//       blending: THREE.AdditiveBlending
//     });
    
//     // Create points mesh
//     const particlesMesh = new THREE.Points(particlesGeometry, particleMaterial);
//     scene.add(particlesMesh);

//     // Create glowing center sphere
//     const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
//     const sphereMaterial = new THREE.MeshBasicMaterial({
//       color: '#ff6900',
//       transparent: true,
//       opacity: 0.2
//     });
//     const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
//     scene.add(sphere);

//     // Handle mouse movement
//     let mouseX = 0;
//     let mouseY = 0;
    
//     const handleMouseMove = (event) => {
//       mouseX = (event.clientX / window.innerWidth) * 2 - 1;
//       mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
//     };
    
//     window.addEventListener('mousemove', handleMouseMove);

//     // Animation loop
//     const animate = () => {
//       requestAnimationFrame(animate);
      
//       // Rotate particles slowly
//       particlesMesh.rotation.x += 0.0005;
//       particlesMesh.rotation.y += 0.0008;
      
//       // Make particles respond to mouse movement
//       particlesMesh.rotation.x += mouseY * 0.0005;
//       particlesMesh.rotation.y += mouseX * 0.0005;
      
//       // Pulsate the sphere
//       const time = Date.now() * 0.001;
//       sphere.scale.set(
//         1 + Math.sin(time) * 0.1,
//         1 + Math.sin(time) * 0.1,
//         1 + Math.sin(time) * 0.1
//       );
      
//       renderer.render(scene, camera);
//     };
    
//     // Handle window resize
//     const handleResize = () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//       renderer.setSize(window.innerWidth, window.innerHeight);
//     };
    
//     window.addEventListener('resize', handleResize);
    
//     animate();
    
//     // Clean up
//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//       window.removeEventListener('resize', handleResize);
//       renderer.dispose();
//       particlesGeometry.dispose();
//       particleMaterial.dispose();
//       sphereGeometry.dispose();
//       sphereMaterial.dispose();
//       scene.remove(particlesMesh);
//       scene.remove(sphere);
//     };
//   }, []);

//   useEffect(() => {
//     const prefersReduced = window.matchMedia(
//       "(prefers-reduced-motion: reduce)"
//     ).matches;
//     if (prefersReduced && vidRef.current) {
//       setIsVideoPlaying(false);
//       vidRef.current.pause();
//     }
//   }, []);

//   // Floating animation variants
//   const floatingGradient = {
//     initial: { opacity: 0.3 },
//     animate: {
//       opacity: [0.2, 0.3, 0.2],
//       y: [0, -15, 0],
//       x: [0, 5, 0],
//       transition: {
//         y: {
//           repeat: Infinity,
//           duration: 8,
//           ease: "easeInOut",
//         },
//         x: {
//           repeat: Infinity,
//           duration: 9,
//           ease: "easeInOut",
//         },
//         opacity: {
//           repeat: Infinity,
//           duration: 7,
//           ease: "easeInOut",
//         },
//       },
//     },
//   };

//   const floatingHeadline = (i) => ({
//     initial: { opacity: 0, y: 20 },
//     animate: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 1.2, delay: i * 0.4 },
//     },
//     floating: {
//       y: [0, -(3 + i), 0],
//       transition: {
//         delay: 1.5,
//         repeat: Infinity,
//         duration: 5 + i * 0.8,
//         ease: "easeInOut",
//       },
//     },
//   });

//   const floatingStars = (i) => ({
//     initial: { opacity: 0, scale: 0.8, rotate: 0 },
//     animate: {
//       opacity: 1,
//       scale: 1,
//       rotate: 360,
//       transition: {
//         rotate: {
//           repeat: Infinity,
//           duration: 20 + i * 5,
//           ease: "linear",
//         },
//         opacity: { duration: 1, delay: 1.2 },
//         scale: { duration: 0.8, delay: 1.2 },
//       }
//     },
//     floating: {
//       y: [0, -(7 + i * 3), 0],
//       x: [0, (4 + i * 2), 0],
//       transition: {
//         repeat: Infinity,
//         duration: 7 + i * 1.5,
//         ease: "easeInOut",
//         delay: i * 0.3,
//       },
//     },
//   });

//   const buttonFloat = (i) => ({
//     initial: { opacity: 0, y: 20 },
//     animate: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 1, delay: 2 + i * 0.3 }
//     },
//     hover: { 
//       scale: 1.05,
//       y: -5,
//       transition: { duration: 0.4 }
//     },
//     tap: { scale: 0.98, transition: { duration: 0.2 } },
//     floating: {
//       y: [0, -4, 0],
//       transition: {
//         repeat: Infinity,
//         duration: 4 + i,
//         ease: "easeInOut",
//         delay: i * 0.5,
//       }
//     }
//   });

//   const footerTextFloat = {
//     initial: { opacity: 0 },
//     animate: { opacity: 1, transition: { duration: 1, delay: 3 } },
//     floating: {
//       y: [0, -3, 0],
//       transition: {
//         repeat: Infinity,
//         duration: 6,
//         ease: "easeInOut",
//         delay: 3.5,
//       }
//     }
//   };

//   const lineFloat = (i) => ({
//     initial: { width: 0 },
//     animate: { width: "100%", transition: { duration: 1.5, delay: 3 } },
//     floating: {
//       y: [0, -2, 0],
//       transition: {
//         repeat: Infinity,
//         duration: 5,
//         ease: "easeInOut",
//         delay: 3 + i * 0.2,
//       }
//     }
//   });

//   return (
//     <>
//       {/* Three.js Canvas for particles */}
//       <canvas 
//         ref={canvasRef} 
//         className="absolute top-0 left-0 w-full h-full -z-10"
//       />
      
//       {/* Background gradient animation with floating effect */}
//       <motion.span
//         variants={floatingGradient}
//         initial="initial"
//         animate="animate"
//         className="
//           absolute left-1/2 top-[40%]
//           w-[400px] h-[400px]
//           rounded-full
//           bg-gradient-to-b from-white via-[#FF7C36] to-white
//           blur-[100px]
//           shadow-[0_0_100px_rgba(255,124,54,0.8)]
//           filter drop-shadow-[0_0_60px_rgba(255,124,54,1)]
//           transform -translate-x-1/2 -translate-y-1/2 
//           pointer-events-none
//           lg:opacity-[0.3] opacity-[0.3] 
//           z-0"
//       ></motion.span>
      
//       <section className="text-center sm:py-10 sm:pb-0 py-0 px-4 relative overflow-hidden sm:mt-24 mt-0 pb-0">
//         {/* Headline with floating */}
//         <div className="relative px-4 pt-10 overflow-hidden lg:min-h-[500px] h-auto">
//           <h1 className="relative z-10 text-center text-3xl sm:text-5xl md:text-6xl md:leading-[65px] lg:text-[90px] lg:leading-[103px] font-bold max-w-5xl mx-auto px-4 font-[Karla]">
//             <motion.span 
//               className="text-black block pb-2"
//               variants={floatingHeadline(0)}
//               initial="initial"
//               animate={["animate", "floating"]}
//             >
//               Your Custom Story,
//             </motion.span>
//             <motion.span 
//               className="text-[#FF6600] block pb-2"
//               variants={floatingHeadline(1)}
//               initial="initial"
//               animate={["animate", "floating"]}
//             >
//               Designed And
//             </motion.span>
//             <motion.span 
//               className="text-[#FF6600] block"
//               variants={floatingHeadline(2)}
//               initial="initial"
//               animate={["animate", "floating"]}
//             >
//               Delivered Better.
//             </motion.span>
            
//             <div className="absolute right-[10px] top-[17.5%] w-20 h-20 rounded-full opacity-70 lg:block hidden">
//               <motion.img 
//                 variants={floatingStars(0)}
//                 initial="initial"
//                 animate={["animate", "floating"]}
//                 src={'https://custorybucket.s3.ap-southeast-1.amazonaws.com/Landing/star-icon.png'} 
//                 alt="Star Icon" 
//               />
//             </div>
            
//             {/* Subheadline with floating */}
//             <motion.p
//               variants={floatingHeadline(3)}
//               initial="initial"
//               animate={["animate", "floating"]}
//               className="text-black sm:text-xl text-base font-normal mt-3 max-w-[627px] mx-auto"
//               style={{ fontFamily: "'SUIT Variable', 'Poppins', sans-serif" }}
//             >
//               At Custory, we shape brand stories that live beyond the screen — in
//               the hands, homes, and hearts of the people who matter to you.
//             </motion.p>
            
//             <div className="absolute left-[17%] bottom-[-13%] w-3 h-3 rounded-full lg:block hidden">
//               <motion.img 
//                 variants={floatingStars(1)}
//                 initial="initial"
//                 animate={["animate", "floating"]}
//                 src={'https://custorybucket.s3.ap-southeast-1.amazonaws.com/Landing/star-icon.png'} 
//                 alt="Star Icon" 
//               />
//             </div>
//           </h1>
//         </div>
        
//         {/* CTA Buttons with floating */}
//         <div className="flex justify-center gap-4 flex-wrap relative max-lg:mt-16">
//           <div className="relative gap-8 flex flex-wrap justify-center">
//             <motion.button 
//               variants={buttonFloat(0)}
//               initial="initial"
//               animate={["animate", "floating"]}
//               whileHover="hover"
//               whileTap="tap"
//               className="bg-[#FF6600] text-white cursor-pointer font-medium py-[18px] px-6 rounded-md text-base hover:bg-orange-600 transition max-sm:flex-grow"
//             >
//               Book a Call with Our Team
//             </motion.button>
            
//             <motion.button
//               variants={buttonFloat(1)}
//               initial="initial"
//               animate={["animate", "floating"]}
//               whileHover="hover"
//               whileTap="tap"
//               onClick={() => navigate("/products")}
//               className="bg-[#FF6600] text-white cursor-pointer font-medium py-[18px] px-16 rounded-md text-base hover:bg-orange-600 transition max-sm:flex-grow"
//             >
//               Shop Now
//             </motion.button>
            
//             <div className="absolute right-[-2.5%] bottom-[84%] w-5 h-5 rounded-full lg:block hidden">
//               <motion.img 
//                 variants={floatingStars(2)}
//                 initial="initial"
//                 animate={["animate", "floating"]}
//                 src={'https://custorybucket.s3.ap-southeast-1.amazonaws.com/Landing/star-icon.png'} 
//                 alt="Star Icon" 
//               />
//             </div>
//           </div>
//         </div>
        
//         {/* Footer Line with floating */}
//         <div className="mt-20 flex items-center justify-center gap-8 max-sm:gap-2">
//           <motion.div 
//             variants={lineFloat(0)}
//             initial="initial"
//             animate={["animate", "floating"]}
//             className="w-12 h-0.5 bg-[#FF6600] rounded-full" 
//           />
//           <motion.p 
//             variants={footerTextFloat}
//             initial="initial"
//             animate={["animate", "floating"]}
//             className="uppercase sm:text-[15px] text-[10px] font-bold tracking-[1.425px] text-black"
//           >
//             Trusted by brands that get it
//           </motion.p>
//           <motion.div 
//             variants={lineFloat(1)}
//             initial="initial"
//             animate={["animate", "floating"]}
//             className="w-12 h-0.5 bg-[#FF6600] rounded-full" 
//           />
//         </div>
//       </section>
//     </>
//   );
// };

// // Three.js components remain unchanged
// function Shirt(props) {
//   const texture = useTexture(`/custorytransparent.png`);
//   const { nodes, materials } = useGLTF("/shirt_baked_collapsed.glb");
//   useFrame((state, delta) =>
//     easing.dampC(materials.lambert1.color, "#ff7f30", 0.25, delta)
//   );

//   return (
//     <mesh
//       castShadow
//       geometry={nodes.T_Shirt_male.geometry}
//       material={materials.lambert1}
//       material-roughness={1}
//       {...props}
//       dispose={null}
//     >
//       <Decal
//         position={[0, 0.08, 0.15]}
//         rotation={[0, 0, 0]}
//         scale={0.28}
//         opacity={0.6}
//         map={texture}
//       />
//     </mesh>
//   );
// }

// function Backdrop() {
//   const shadows = useRef();

//   return (
//     <AccumulativeShadows
//       ref={shadows}
//       temporal
//       frames={60}
//       alphaTest={0.35}
//       scale={1}
//       rotation={[Math.PI / 2, 0, 0]}
//       position={[0, 0, -0.14]}
//     >
//       <RandomizedLight
//         amount={9}
//         radius={9}
//         intensity={5.5}
//         ambient={0.25}
//         position={[5, 5, -10]}
//       />
//       <RandomizedLight
//         amount={0.9}
//         radius={5}
//         intensity={0.25}
//         ambient={0.55}
//         position={[-5, 5, -9]}
//       />
//     </AccumulativeShadows>
//   );
// }

// function CameraRig({ children }) {
//   const group = useRef();
//   useFrame((state, delta) => {
//     easing.damp3(state.camera.position, [0, 0, 2], 0.25, delta);
//     easing.dampE(
//       group.current.rotation,
//       [state.pointer.y / 10, -state.pointer.x / 5, 0],
//       0.25,
//       delta
//     );
//   });
//   return <group ref={group}>{children}</group>;
// }

// useGLTF.preload("/shirt_baked_collapsed.glb");

// export default HeroComponent;

































































































































































// import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { easing } from "maath";
// import { motion } from "framer-motion";
// import {
//   useGLTF,
//   AccumulativeShadows,
//   RandomizedLight,
//   Decal,
//   useTexture,
// } from "@react-three/drei";
// import { useFrame } from "@react-three/fiber";

// const HeroComponent = ({ position = [0, 0, 2.5], fov = 25 }) => {
//   const transition = { ease: "linear", duration: 1.5 };
//   const textVariants = {
//     initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } },
//     animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
//     exit: { x: 100, opacity: 0, transition: { ...transition, delay: 0 } },
//   };

//   const vidRef = useRef(null);
//   const [isVideoPlaying, setIsVideoPlaying] = useState(false);
//   const navigate = useNavigate();
//   const [windowSize, setWindowSize] = useState({
//     width: typeof window !== 'undefined' ? window.innerWidth : 0,
//     height: typeof window !== 'undefined' ? window.innerHeight : 0
//   });

//   // Handle responsive breakpoints
//   useEffect(() => {
//     const handleResize = () => {
//       setWindowSize({
//         width: window.innerWidth,
//         height: window.innerHeight
//       });
//     };
    
//     window.addEventListener('resize', handleResize);
//     handleResize(); // Initialize on mount
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const isMobile = windowSize.width < 768;
//   const isTablet = windowSize.width >= 768 && windowSize.width < 1024;

//   useEffect(() => {
//     const prefersReduced = window.matchMedia(
//       "(prefers-reduced-motion: reduce)"
//     ).matches;
//     if (prefersReduced && vidRef.current) {
//       setIsVideoPlaying(false);
//       vidRef.current.pause();
//     }
//   }, []);

//   // Generate particles for sprinkle effect
//   const generateParticles = () => {
//     const particleCount = isMobile ? 15 : isTablet ? 25 : 40;
//     const newParticles = [];
    
//     for (let i = 0; i < particleCount; i++) {
//       newParticles.push({
//         id: i,
//         size: Math.random() * (isMobile ? 2 : 3) + 1,
//         initialX: Math.random() * 100, // Starting X position as percentage of viewport
//         initialY: -10 - Math.random() * 10, // Start above viewport
//         xMove: (Math.random() - 0.5) * (isMobile ? 30 : 70),
//         duration: 7 + Math.random() * (isMobile ? 5 : 15),
//         delay: Math.random() * 3,
//         opacity: Math.random() * 0.3 + 0.2,
//       });
//     }
    
//     return newParticles;
//   };
  
//   const [particles] = useState(generateParticles);

//   // Floating animation variants optimized for different screen sizes
//   const floatingGradient = {
//     initial: { opacity: 0.3 },
//     animate: {
//       opacity: [0.2, 0.3, 0.2],
//       y: [0, isMobile ? -8 : isTablet ? -12 : -15],
//       x: [0, isMobile ? 2 : isTablet ? 3 : 5],
//       transition: {
//         y: {
//           repeat: Infinity,
//           repeatType: "reverse",
//           duration: isMobile ? 6 : 8,
//           ease: "easeInOut",
//         },
//         x: {
//           repeat: Infinity,
//           repeatType: "reverse",
//           duration: isMobile ? 7 : 9,
//           ease: "easeInOut",
//         },
//         opacity: {
//           repeat: Infinity,
//           repeatType: "reverse",
//           duration: isMobile ? 5 : 7,
//           ease: "easeInOut",
//         },
//       },
//     },
//   };

//   const floatingHeadline = (i) => ({
//     initial: { opacity: 0, y: 20 },
//     animate: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 1.2, delay: i * 0.4 },
//     },
//     floating: {
//       y: [0, isMobile ? -(1 + i * 0.3) : isTablet ? -(2 + i * 0.5) : -(3 + i)],
//       transition: {
//         repeat: Infinity,
//         repeatType: "reverse",
//         duration: 5 + i * 0.8,
//         ease: "easeInOut",
//       },
//     },
//   });

//   const floatingStars = (i) => ({
//     initial: { opacity: 0, scale: 0.8, rotate: 0 },
//     animate: {
//       opacity: 1,
//       scale: 1,
//       rotate: 360,
//       transition: {
//         rotate: {
//           repeat: Infinity,
//           duration: 20 + i * 5,
//           ease: "linear",
//         },
//         opacity: { duration: 1, delay: 1.2 },
//         scale: { duration: 0.8, delay: 1.2 },
//       }
//     },
//     floating: {
//       y: [0, isMobile ? -(2 + i) : isTablet ? -(4 + i) : -(7 + i * 2)],
//       x: [0, isMobile ? (1 + i) : isTablet ? (2 + i) : (4 + i * 2)],
//       transition: {
//         repeat: Infinity,
//         repeatType: "reverse",
//         duration: 7 + i * 1.5,
//         ease: "easeInOut",
//       },
//     },
//   });

//   const buttonFloat = (i) => ({
//     initial: { opacity: 0, y: 20 },
//     animate: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 1, delay: 2 + i * 0.3 }
//     },
//     hover: { 
//       scale: 1.05,
//       y: isMobile ? -2 : isTablet ? -3 : -5,
//       transition: { duration: 0.4 }
//     },
//     tap: { scale: 0.98, transition: { duration: 0.2 } },
//     floating: {
//       y: [0, isMobile ? -2 : isTablet ? -3 : -4],
//       transition: {
//         repeat: Infinity,
//         repeatType: "reverse",
//         duration: 4 + i,
//         ease: "easeInOut",
//       }
//     }
//   });

//   const footerTextFloat = {
//     initial: { opacity: 0 },
//     animate: { opacity: 1, transition: { duration: 1, delay: 3 } },
//     floating: {
//       y: [0, isMobile ? -1 : isTablet ? -2 : -3],
//       transition: {
//         repeat: Infinity,
//         repeatType: "reverse",
//         duration: 6,
//         ease: "easeInOut",
//       }
//     }
//   };

//   const lineFloat = (i) => ({
//     initial: { width: 0 },
//     animate: { width: "100%", transition: { duration: 1.5, delay: 3 } },
//     floating: {
//       y: [0, isMobile ? -1 : -2],
//       transition: {
//         repeat: Infinity,
//         repeatType: "reverse",
//         duration: 5,
//         ease: "easeInOut",
//       }
//     }
//   });

//   // Adjust gradient size for mobile
//   const gradientSize = isMobile ? "w-[250px] h-[250px]" : isTablet ? "w-[300px] h-[300px]" : "w-[400px] h-[400px]";

//   return (
//     <>
//       {/* Particle animation with improved mobile responsiveness */}
//       <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
//         {particles.map((particle) => (
//           <motion.div
//             key={particle.id}
//             className="absolute rounded-full bg-[#ff6900]"
//             style={{
//               width: particle.size,
//               height: particle.size,
//               left: `${particle.initialX}%`,
//               top: `${particle.initialY}%`,
//               opacity: particle.opacity,
//             }}
//             animate={{
//               y: ["0vh", "100vh"], // Using vh units for responsive height
//               x: [0, particle.xMove],
//               opacity: [particle.opacity, particle.opacity, 0],
//             }}
//             transition={{
//               duration: particle.duration,
//               repeat: Infinity,
//               delay: particle.delay,
//               ease: "linear",
//             }}
//           />
//         ))}
//       </div>
      
//       {/* Background gradient animation with floating effect */}
//       {/* <motion.span
//         variants={floatingGradient}
//         initial="initial"
//         animate="animate"
//         className={`
//           absolute left-1/2 top-[40%]
//           ${gradientSize}
//           rounded-full
//           bg-gradient-to-b from-white via-[#FF7C36] to-white
//           blur-[100px]
//           shadow-[0_0_100px_rgba(255,124,54,0.8)]
//           filter drop-shadow-[0_0_60px_rgba(255,124,54,1)]
//           transform -translate-x-1/2 -translate-y-1/2 
//           pointer-events-none
//           lg:opacity-[0.3] opacity-[0.3] 
//           z-0`}
//       ></motion.span> */}
      
//       <section className="text-center sm:py-10 sm:pb-0 py-0 px-4 relative overflow-hidden sm:mt-24 mt-0 pb-0">
//         {/* Headline with floating */}
//         <div className="relative px-2 sm:px-4 pt-10 overflow-hidden lg:min-h-[500px] h-auto">
//           <h1 className="relative z-10 text-center text-3xl sm:text-5xl md:text-6xl md:leading-[65px] lg:text-[90px] lg:leading-[103px] font-bold max-w-5xl mx-auto sm:px-4 px-1 font-[Karla]">
//             <motion.span 
//               className="text-black block pb-2"
//               variants={floatingHeadline(0)}
//               initial="initial"
//               animate={["animate", "floating"]}
//             >
//               Your Custom Story,
//             </motion.span>
//             <motion.span 
//               className="text-[#FF6600] block pb-2"
//               variants={floatingHeadline(1)}
//               initial="initial"
//               animate={["animate", "floating"]}
//             >
//               Designed And
//             </motion.span>
//             <motion.span 
//               className="text-[#FF6600] block"
//               variants={floatingHeadline(2)}
//               initial="initial"
//               animate={["animate", "floating"]}
//             >
//               Delivered Better.
//             </motion.span>
            
//             <div className="absolute right-[10px] top-[17.5%] w-20 h-20 rounded-full opacity-70 lg:block hidden">
//               <motion.img 
//                 variants={floatingStars(0)}
//                 initial="initial"
//                 animate={["animate", "floating"]}
//                 src={'https://custorybucket.s3.ap-southeast-1.amazonaws.com/Landing/star-icon.png'} 
//                 alt="Star Icon" 
//               />
//             </div>
            
//             {/* Subheadline with floating */}
//             <motion.p
//               variants={floatingHeadline(3)}
//               initial="initial"
//               animate={["animate", "floating"]}
//               className="text-black sm:text-xl text-base font-normal mt-3 max-w-[627px] mx-auto"
//               style={{ fontFamily: "'SUIT Variable', 'Poppins', sans-serif" }}
//             >
//               At Custory, we shape brand stories that live beyond the screen — in
//               the hands, homes, and hearts of the people who matter to you.
//             </motion.p>
            
//             <div className="absolute left-[17%] bottom-[-13%] w-3 h-3 rounded-full lg:block hidden">
//               <motion.img 
//                 variants={floatingStars(1)}
//                 initial="initial"
//                 animate={["animate", "floating"]}
//                 src={'https://custorybucket.s3.ap-southeast-1.amazonaws.com/Landing/star-icon.png'} 
//                 alt="Star Icon" 
//               />
//             </div>
//           </h1>
//         </div>
        
//         {/* CTA Buttons with floating */}
//         <div className="flex justify-center gap-4 flex-wrap relative max-lg:mt-16">
//           <div className="relative gap-8 flex flex-wrap justify-center">
//             <motion.button 
//               variants={buttonFloat(0)}
//               initial="initial"
//               animate={["animate", "floating"]}
//               whileHover="hover"
//               whileTap="tap"
//               className="bg-[#FF6600] text-white cursor-pointer font-medium py-[18px] px-6 rounded-md text-base hover:bg-orange-600 transition max-sm:flex-grow z-10"
//             >
//               Book a Call with Our Team
//             </motion.button>
            
//             <motion.button
//               variants={buttonFloat(1)}
//               initial="initial"
//               animate={["animate", "floating"]}
//               whileHover="hover"
//               whileTap="tap"
//               onClick={() => navigate("/products")}
//               className="bg-[#FF6600] text-white cursor-pointer font-medium py-[18px] px-16 rounded-md text-base hover:bg-orange-600 transition max-sm:flex-grow z-10"
//             >
//               Shop Now
//             </motion.button>
            
//             <div className="absolute right-[-2.5%] bottom-[84%] w-5 h-5 rounded-full lg:block hidden">
//               <motion.img 
//                 variants={floatingStars(2)}
//                 initial="initial"
//                 animate={["animate", "floating"]}
//                 src={'https://custorybucket.s3.ap-southeast-1.amazonaws.com/Landing/star-icon.png'} 
//                 alt="Star Icon" 
//               />
//             </div>
//           </div>
//         </div>
        
//         {/* Footer Line with floating */}
//         <div className="mt-20 flex items-center justify-center gap-8 max-sm:gap-2">
//           <motion.div 
//             variants={lineFloat(0)}
//             initial="initial"
//             animate={["animate", "floating"]}
//             className="w-12 h-0.5 bg-[#FF6600] rounded-full" 
//           />
//           <motion.p 
//             variants={footerTextFloat}
//             initial="initial"
//             animate={["animate", "floating"]}
//             className="uppercase sm:text-[15px] text-[10px] font-bold tracking-[1.425px] text-black"
//           >
//             Trusted by brands that get it
//           </motion.p>
//           <motion.div 
//             variants={lineFloat(1)}
//             initial="initial"
//             animate={["animate", "floating"]}
//             className="w-12 h-0.5 bg-[#FF6600] rounded-full" 
//           />
//         </div>
//       </section>
//     </>
//   );
// };

// // Three.js components remain unchanged
// function Shirt(props) {
//   const texture = useTexture(`/custorytransparent.png`);
//   const { nodes, materials } = useGLTF("/shirt_baked_collapsed.glb");
//   useFrame((state, delta) =>
//     easing.dampC(materials.lambert1.color, "#ff7f30", 0.25, delta)
//   );

//   return (
//     <mesh
//       castShadow
//       geometry={nodes.T_Shirt_male.geometry}
//       material={materials.lambert1}
//       material-roughness={1}
//       {...props}
//       dispose={null}
//     >
//       <Decal
//         position={[0, 0.08, 0.15]}
//         rotation={[0, 0, 0]}
//         scale={0.28}
//         opacity={0.6}
//         map={texture}
//       />
//     </mesh>
//   );
// }

// function Backdrop() {
//   const shadows = useRef();

//   return (
//     <AccumulativeShadows
//       ref={shadows}
//       temporal
//       frames={60}
//       alphaTest={0.35}
//       scale={1}
//       rotation={[Math.PI / 2, 0, 0]}
//       position={[0, 0, -0.14]}
//     >
//       <RandomizedLight
//         amount={9}
//         radius={9}
//         intensity={5.5}
//         ambient={0.25}
//         position={[5, 5, -10]}
//       />
//       <RandomizedLight
//         amount={0.9}
//         radius={5}
//         intensity={0.25}
//         ambient={0.55}
//         position={[-5, 5, -9]}
//       />
//     </AccumulativeShadows>
//   );
// }

// function CameraRig({ children }) {
//   const group = useRef();
//   useFrame((state, delta) => {
//     easing.damp3(state.camera.position, [0, 0, 2], 0.25, delta);
//     easing.dampE(
//       group.current.rotation,
//       [state.pointer.y / 10, -state.pointer.x / 5, 0],
//       0.25,
//       delta
//     );
//   });
//   return <group ref={group}>{children}</group>;
// }

// useGLTF.preload("/shirt_baked_collapsed.glb");

// export default HeroComponent;


















































































// import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { easing } from "maath";
// import { motion } from "framer-motion";
// import {
//   useGLTF,
//   AccumulativeShadows,
//   RandomizedLight,
//   Decal,
//   useTexture,
// } from "@react-three/drei";
// import { useFrame } from "@react-three/fiber";

// const HeroComponent = ({ position = [0, 0, 2.5], fov = 25 }) => {
//   const transition = { ease: "linear", duration: 1.5 };
//   const textVariants = {
//     initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } },
//     animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
//     exit: { x: 100, opacity: 0, transition: { ...transition, delay: 0 } },
//   };

//   const vidRef = useRef(null);
//   const [isVideoPlaying, setIsVideoPlaying] = useState(false);
//   const navigate = useNavigate();
//   const [windowSize, setWindowSize] = useState({
//     width: typeof window !== 'undefined' ? window.innerWidth : 0,
//     height: typeof window !== 'undefined' ? window.innerHeight : 0
//   });

//   useEffect(() => {
//     const handleResize = () => {
//       setWindowSize({
//         width: window.innerWidth,
//         height: window.innerHeight
//       });
//     };
    
//     window.addEventListener('resize', handleResize);
//     handleResize();
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   const isMobile = windowSize.width < 768;
//   const isTablet = windowSize.width >= 768 && windowSize.width < 1024;

//   useEffect(() => {
//     const prefersReduced = window.matchMedia(
//       "(prefers-reduced-motion: reduce)"
//     ).matches;
//     if (prefersReduced && vidRef.current) {
//       setIsVideoPlaying(false);
//       vidRef.current.pause();
//     }
//   }, []);

//   const generateParticles = () => {
//     const particleCount = isMobile ? 15 : isTablet ? 25 : 40;
//     const newParticles = [];
    
//     for (let i = 0; i < particleCount; i++) {
//       newParticles.push({
//         id: i,
//         size: Math.random() * (isMobile ? 2 : 3) + 1,
//         initialX: Math.random() * 100,
//         initialY: -10 - Math.random() * 10,
//         xMove: (Math.random() - 0.5) * (isMobile ? 30 : 70),
//         duration: 7 + Math.random() * (isMobile ? 5 : 15),
//         delay: Math.random() * 3,
//         opacity: Math.random() * 0.3 + 0.2,
//       });
//     }
    
//     return newParticles;
//   };
  
//   const [particles] = useState(generateParticles);

//   const floatingGradient = {
//     initial: { opacity: 0.3 },
//     animate: {
//       opacity: [0.2, 0.3, 0.2],
//       y: [0, isMobile ? -8 : isTablet ? -12 : -15],
//       x: [0, isMobile ? 2 : isTablet ? 3 : 5],
//       transition: {
//         y: {
//           repeat: Infinity,
//           repeatType: "reverse",
//           duration: isMobile ? 6 : 8,
//           ease: "easeInOut",
//         },
//         x: {
//           repeat: Infinity,
//           repeatType: "reverse",
//           duration: isMobile ? 7 : 9,
//           ease: "easeInOut",
//         },
//         opacity: {
//           repeat: Infinity,
//           repeatType: "reverse",
//           duration: isMobile ? 5 : 7,
//           ease: "easeInOut",
//         },
//       },
//     },
//   };

//   const floatingHeadline = (i) => ({
//     initial: { opacity: 0, y: 20 },
//     animate: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 1.2, delay: i * 0.4 },
//     },
//     floating: {
//       y: [0, isMobile ? -(1 + i * 0.3) : isTablet ? -(2 + i * 0.5) : -(3 + i)],
//       transition: {
//         repeat: Infinity,
//         repeatType: "reverse",
//         duration: 5 + i * 0.8,
//         ease: "easeInOut",
//       },
//     },
//   });

//   const floatingStars = (i) => ({
//     initial: { opacity: 0, scale: 0.5, rotate: 0 }, // Start with smaller scale
//     animate: {
//       opacity: 1,
//       scale: [0.5, 1.2, 1], // Increase size then settle
//       rotate: 360,
//       transition: {
//         scale: { duration: 1.5, ease: "easeOut" }, // Smooth size increase
//         rotate: {
//           repeat: Infinity,
//           duration: 20 + i * 5,
//           ease: "linear",
//         },
//         opacity: { duration: 1, delay: 1.2 },
//       },
//     },
//     floating: {
//       y: [0, isMobile ? -(2 + i) : isTablet ? -(4 + i) : -(7 + i * 2)],
//       x: [0, isMobile ? (1 + i) : isTablet ? (2 + i) : (4 + i * 2)],
//       transition: {
//         repeat: Infinity,
//         repeatType: "reverse",
//         duration: 7 + i * 1.5,
//         ease: "easeInOut",
//       },
//     },
//   });

//   const buttonFloat = (i) => ({
//     initial: { opacity: 0, y: 20 },
//     animate: {
//       opacity: 1,
//       y: 0,
//       transition: { duration: 1, delay: 2 + i * 0.3 }
//     },
//     hover: { 
//       scale: 1.05,
//       y: isMobile ? -2 : isTablet ? -3 : -5,
//       transition: { duration: 0.4 }
//     },
//     tap: { scale: 0.98, transition: { duration: 0.2 } },
//     floating: {
//       y: [0, isMobile ? -2 : isTablet ? -3 : -4],
//       transition: {
//         repeat: Infinity,
//         repeatType: "reverse",
//         duration: 4 + i,
//         ease: "easeInOut",
//       }
//     }
//   });

//   const footerTextFloat = {
//     initial: { opacity: 0 },
//     animate: { opacity: 1, transition: { duration: 1, delay: 3 } },
//     floating: {
//       y: [0, isMobile ? -1 : isTablet ? -2 : -3],
//       transition: {
//         repeat: Infinity,
//         repeatType: "reverse",
//         duration: 6,
//         ease: "easeInOut",
//       }
//     }
//   };

//   const lineFloat = (i) => ({
//     initial: { width: 0 },
//     animate: { width: "100px", transition: { duration: 1.5, delay: 3 } }, // Changed to 100px
//     floating: {
//       y: [0, isMobile ? -1 : -2],
//       transition: {
//         repeat: Infinity,
//         repeatType: "reverse",
//         duration: 5,
//         ease: "easeInOut",
//       }
//     }
//   });

//   const gradientSize = isMobile ? "w-[250px] h-[250px]" : isTablet ? "w-[300px] h-[300px]" : "w-[400px] h-[400px]";

//   return (
//     <>
//       <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
//         {particles.map((particle) => (
//           <motion.div
//             key={particle.id}
//             className="absolute rounded-full bg-[#ff6900]"
//             style={{
//               width: particle.size,
//               height: particle.size,
//               left: `${particle.initialX}%`,
//               top: `${particle.initialY}%`,
//               opacity: particle.opacity,
//             }}
//             animate={{
//               y: ["0vh", "100vh"],
//               x: [0, particle.xMove],
//               opacity: [particle.opacity, particle.opacity, 0],
//             }}
//             transition={{
//               duration: particle.duration,
//               repeat: Infinity,
//               delay: particle.delay,
//               ease: "linear",
//             }}
//           />
//         ))}
//       </div>
      
//       <section className="text-center sm:py-10 sm:pb-0 py-0 px-4 relative overflow-hidden sm:mt-24 mt-0 pb-0">
//         <div className="relative px-2 sm:px-4 pt-10 overflow-hidden lg:min-h-[500px] h-auto">
//           <h1 className="relative z-10 text-center text-3xl sm:text-5xl md:text-6xl md:leading-[65px] lg:text-[90px] lg:leading-[103px] font-bold max-w-5xl mx-auto sm:px-4 px-1 font-[Karla]">
//             <motion.span 
//               className="text-black block pb-2"
//               variants={floatingHeadline(0)}
//               initial="initial"
//               animate={["animate", "floating"]}
//             >
//               Your Custom Story,
//             </motion.span>
//             <motion.span 
//               className="text-[#FF6600] block pb-2"
//               variants={floatingHeadline(1)}
//               initial="initial"
//               animate={["animate", "floating"]}
//             >
//               Designed And
//             </motion.span>
//             <motion.span 
//               className="text-[#FF6600] block"
//               variants={floatingHeadline(2)}
//               initial="initial"
//               animate={["animate", "floating"]}
//             >
//               Delivered Better.
//             </motion.span>
            
//             <div className="absolute right-[10px] top-[17.5%] w-20 h-20 rounded-full opacity-70 lg:block hidden">
//               <motion.img 
//                 variants={floatingStars(0)}
//                 initial="initial"
//                 animate={["animate", "floating"]}
//                 src={'https://custorybucket.s3.ap-southeast-1.amazonaws.com/Landing/star-icon.png'} 
//                 alt="Star Icon" 
//               />
//             </div>
            
//             <motion.p
//               variants={floatingHeadline(3)}
//               initial="initial"
//               animate={["animate", "floating"]}
//               className="text-black sm:text-xl text-base font-normal mt-3 max-w-[627px] mx-auto"
//               style={{ fontFamily: "'SUIT Variable', 'Poppins', sans-serif" }}
//             >
//               At Custory, we shape brand stories that live beyond the screen — in
//               the hands, homes, and hearts of the people who matter to you.
//             </motion.p>
            
//             <div className="absolute left-[17%] bottom-[-13%] w-3 h-3 rounded-full lg:block hidden">
//               <motion.img 
//                 variants={floatingStars(1)}
//                 initial="initial"
//                 animate={["animate", "floating"]}
//                 src={'https://custorybucket.s3.ap-southeast-1.amazonaws.com/Landing/star-icon.png'} 
//                 alt="Star Icon" 
//               />
//             </div>
//           </h1>
//         </div>
        
//         <div className="flex justify-center gap-4 flex-wrap relative max-lg:mt-16">
//           <div className="relative gap-8 flex flex-wrap justify-center">
//             <motion.button 
//               variants={buttonFloat(0)}
//               initial="initial"
//               animate={["animate", "floating"]}
//               whileHover="hover"
//               whileTap="tap"
//               className="bg-[#FF6600] text-white cursor-pointer font-medium py-[18px] px-6 rounded-md text-base hover:bg-orange-600 transition max-sm:flex-grow z-10"
//             >
//               Book a Call with Our Team
//             </motion.button>
            
//             <motion.button
//               variants={buttonFloat(1)}
//               initial="initial"
//               animate={["animate", "floating"]}
//               whileHover="hover"
//               whileTap="tap"
//               onClick={() => navigate("/products")}
//               className="bg-[#FF6600] text-white cursor-pointer font-medium py-[18px] px-16 rounded-md text-base hover:bg-orange-600 transition max-sm:flex-grow z-10"
//             >
//               Shop Now
//             </motion.button>
            
//             <div className="absolute right-[-2.5%] bottom-[84%] w-5 h-5 rounded-full lg:block hidden">
//               <motion.img 
//                 variants={floatingStars(2)}
//                 initial="initial"
//                 animate={["animate", "floating"]}
//                 src={'https://custorybucket.s3.ap-southeast-1.amazonaws.com/Landing/star-icon.png'} 
//                 alt="Star Icon" 
//               />
//             </div>
//           </div>
//         </div>
        
//         <div className="mt-20 flex items-center justify-center gap-8 max-sm:gap-2">
//           <motion.div 
//             variants={lineFloat(0)}
//             initial="initial"
//             animate={["animate", "floating"]}
//             className="w-100px h-0.5 bg-[#FF6600] rounded-full" 
//           />
//           <motion.p 
//             variants={footerTextFloat}
//             initial="initial"
//             animate={["animate", "floating"]}
//             className="uppercase sm:text-[15px] text-[10px] font-bold tracking-[1.425px] text-black"
//           >
//             Trusted by brands that get it
//           </motion.p>
//           <motion.div 
//             variants={lineFloat(1)}
//             initial="initial"
//             animate={["animate", "floating"]}
//             className="w-100px h-0.5 bg-[#FF6600] rounded-full" 
//           />
//         </div>
//       </section>
//     </>
//   );
// };

// function Shirt(props) {
//   const texture = useTexture(`/custorytransparent.png`);
//   const { nodes, materials } = useGLTF("/shirt_baked_collapsed.glb");
//   useFrame((state, delta) =>
//     easing.dampC(materials.lambert1.color, "#ff7f30", 0.25, delta)
//   );

//   return (
//     <mesh
//       castShadow
//       geometry={nodes.T_Shirt_male.geometry}
//       material={materials.lambert1}
//       material-roughness={1}
//       {...props}
//       dispose={null}
//     >
//       <Decal
//         position={[0, 0.08, 0.15]}
//         rotation={[0, 0, 0]}
//         scale={0.28}
//         opacity={0.6}
//         map={texture}
//       />
//     </mesh>
//   );
// }

// function Backdrop() {
//   const shadows = useRef();

//   return (
//     <AccumulativeShadows
//       ref={shadows}
//       temporal
//       frames={60}
//       alphaTest={0.35}
//       scale={1}
//       rotation={[Math.PI / 2, 0, 0]}
//       position={[0, 0, -0.14]}
//     >
//       <RandomizedLight
//         amount={9}
//         radius={9}
//         intensity={5.5}
//         ambient={0.25}
//         position={[5, 5, -10]}
//       />
//       <RandomizedLight
//         amount={0.9}
//         radius={5}
//         intensity={0.25}
//         ambient={0.55}
//         position={[-5, 5, -9]}
//       />
//     </AccumulativeShadows>
//   );
// }

// function CameraRig({ children }) {
//   const group = useRef();
//   useFrame((state, delta) => {
//     easing.damp3(state.camera.position, [0, 0, 2], 0.25, delta);
//     easing.dampE(
//       group.current.rotation,
//       [state.pointer.y / 10, -state.pointer.x / 5, 0],
//       0.25,
//       delta
//     );
//   });
//   return <group ref={group}>{children}</group>;
// }

// useGLTF.preload("/shirt_baked_collapsed.glb");

// export default HeroComponent;











































import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { easing } from "maath";
import { motion } from "framer-motion";
import {
  useGLTF,
  AccumulativeShadows,
  RandomizedLight,
  Decal,
  useTexture,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

const HeroComponent = ({ position = [0, 0, 2.5], fov = 25 }) => {
  const transition = { ease: "linear", duration: 1.5 };
  const textVariants = {
    initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } },
    animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
    exit: { x: 100, opacity: 0, transition: { ...transition, delay: 0 } },
  };

  const vidRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const navigate = useNavigate();
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const isMobile = windowSize.width < 768;
  const isTablet = windowSize.width >= 768 && windowSize.width < 1024;

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced && vidRef.current) {
      setIsVideoPlaying(false);
      vidRef.current.pause();
    }
  }, []);

  const generateParticles = () => {
    const particleCount = isMobile ? 15 : isTablet ? 25 : 40;
    const newParticles = [];
    
    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        size: Math.random() * (isMobile ? 2 : 3) + 1,
        initialX: Math.random() * 100,
        initialY: -10 - Math.random() * 10,
        xMove: (Math.random() - 0.5) * (isMobile ? 30 : 70),
        duration: 7 + Math.random() * (isMobile ? 5 : 15),
        delay: Math.random() * 3,
        opacity: Math.random() * 0.3 + 0.2,
      });
    }
    
    return newParticles;
  };
  
  const [particles] = useState(generateParticles);

  const floatingGradient = {
    initial: { opacity: 0.3 },
    animate: {
      opacity: [0.2, 0.3, 0.2],
      y: [0, isMobile ? -8 : isTablet ? -12 : -15],
      x: [0, isMobile ? 2 : isTablet ? 3 : 5],
      transition: {
        y: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: isMobile ? 6 : 8,
          ease: "easeInOut",
        },
        x: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: isMobile ? 7 : 9,
          ease: "easeInOut",
        },
        opacity: {
          repeat: Infinity,
          repeatType: "reverse",
          duration: isMobile ? 5 : 7,
          ease: "easeInOut",
        },
      },
    },
  };

  const floatingHeadline = (i) => ({
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 1.2, delay: i * 0.4 },
    },
    floating: {
      y: [0, isMobile ? -(1 + i * 0.3) : isTablet ? -(2 + i * 0.5) : -(3 + i)],
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 5 + i * 0.8,
        ease: "easeInOut",
      },
    },
  });

  const floatingStars = (i) => ({
    initial: { opacity: 0, scale: 0.5, rotate: 0 }, // Start smaller
    animate: {
      opacity: 1,
      scale: [2.5, 2.5, 2.5], // Increase to 1.5 then settle at 1
      rotate: 360,
      transition: {
        scale: { duration: 1.5, ease: "easeOut" }, // Smoother size increase
        rotate: {
          repeat: Infinity,
          duration: 20 + i * 5,
          ease: "linear",
        },
        opacity: { duration: 1, delay: 1.2 },
      },
    },
    floating: {
      y: [0, isMobile ? -(2 + i) : isTablet ? -(4 + i) : -(7 + i * 2)],
      x: [0, isMobile ? (1 + i) : isTablet ? (2 + i) : (4 + i * 2)],
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 7 + i * 1.5,
        ease: "easeInOut",
      },
    },
  });

  const buttonFloat = (i) => ({
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, delay: 2 + i * 0.3 }
    },
    hover: { 
      scale: 1.05,
      y: isMobile ? -2 : isTablet ? -3 : -5,
      transition: { duration: 0.4 }
    },
    tap: { scale: 0.98, transition: { duration: 0.2 } },
    floating: {
      y: [0, isMobile ? -2 : isTablet ? -3 : -4],
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 4 + i,
        ease: "easeInOut",
      }
    }
  });

  const footerTextFloat = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 1, delay: 3 } },
    floating: {
      y: [0, isMobile ? -1 : isTablet ? -2 : -3],
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 6,
        ease: "easeInOut",
      }
    }
  };

  const lineFloat = (i) => ({
    initial: { width: 0 },
    animate: { width: "100px", transition: { duration: 1.5, delay: 3 } },
    floating: {
      y: [0, isMobile ? -1 : -2],
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 5,
        ease: "easeInOut",
      }
    }
  });

  const gradientSize = isMobile ? "w-[250px] h-[250px]" : isTablet ? "w-[300px] h-[300px]" : "w-[400px] h-[400px]";

  return (
    <>
      <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-[#ff6900]"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.initialX}%`,
              top: `${particle.initialY}%`,
              opacity: particle.opacity,
            }}
            animate={{
              y: ["0vh", "100vh"],
              x: [0, particle.xMove],
              opacity: [particle.opacity, particle.opacity, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
              ease: "linear",
            }}
          />
        ))}
      </div>
      
      <section className="text-center sm:py-10 sm:pb-0 py-0 px-4 relative overflow-hidden sm:mt-24 mt-0 pb-0">
        <div className="relative px-2 sm:px-4 pt-10 overflow-hidden lg:min-h-[500px] h-auto">
          <h1 className="relative z-10 text-center text-3xl sm:text-5xl md:text-6xl md:leading-[65px] lg:text-[90px] lg:leading-[103px] font-bold max-w-5xl mx-auto sm:px-4 px-1 font-[Karla]">
            <motion.span 
              className="text-black block pb-2"
              variants={floatingHeadline(0)}
              initial="initial"
              animate={["animate", "floating"]}
            >
              Your Custom Story,
            </motion.span>
            <motion.span 
              className="text-[#FF6600] block pb-2"
              variants={floatingHeadline(1)}
              initial="initial"
              animate={["animate", "floating"]}
            >
              Designed And
            </motion.span>
            <motion.span 
              className="text-[#FF6600] block"
              variants={floatingHeadline(2)}
              initial="initial"
              animate={["animate", "floating"]}
            >
              Delivered Better.
            </motion.span>
            
            <div className="absolute right-[10px] top-[17.5%] w-20 h-20 rounded-full opacity-70 lg:block hidden">
              <motion.img 
                variants={floatingStars(0)}
                initial="initial"
                animate={["animate", "floating"]}
                src={'https://custorybucket.s3.ap-southeast-1.amazonaws.com/Landing/star-icon.png'} 
                alt="Star Icon" 
              />
            </div>
            
            <motion.p
              variants={floatingHeadline(3)}
              initial="initial"
              animate={["animate", "floating"]}
              className="text-black sm:text-xl text-base font-normal mt-3 max-w-[627px] mx-auto"
              style={{ fontFamily: "'SUIT Variable', 'Poppins', sans-serif" }}
            >
              At Custory, we shape brand stories that live beyond the screen — in
              the hands, homes, and hearts of the people who matter to you.
            </motion.p>
            
            <div className="absolute left-[17%] bottom-[-13%] w-6 h-6 rounded-full lg:block hidden">
              <motion.img 
                variants={floatingStars(1)}
                initial="initial"
                animate={["animate", "floating"]}
                src={'https://custorybucket.s3.ap-southeast-1.amazonaws.com/Landing/star-icon.png'} 
                alt="Star Icon" 
              />
            </div>
          </h1>
        </div>
        
        <div className="flex justify-center gap-4 flex-wrap relative max-lg:mt-16">
          <div className="relative gap-8 flex flex-wrap justify-center">
            <motion.button 
              variants={buttonFloat(0)}
              initial="initial"
              animate={["animate", "floating"]}
              onClick={() => navigate("https:calendly.com/admincustory/30min")}
              whileHover="hover"
              whileTap="tap"
              className="bg-[#FF6600] text-white cursor-pointer font-medium py-[18px] px-6 rounded-md text-base hover:bg-orange-600 transition max-sm:flex-grow z-10"
            >
              Book a Call with Our Team
            </motion.button>
            
            <motion.button
              variants={buttonFloat(1)}
              initial="initial"
              animate={["animate", "floating"]}
              whileHover="hover"
              whileTap="tap"
              onClick={() => navigate("/upgrade")}
              className="bg-[#FF6600] text-white cursor-pointer font-medium py-[18px] px-16 rounded-md text-base hover:bg-orange-600 transition max-sm:flex-grow z-10"
            >
              Shop Now
            </motion.button>
            
            <div className="absolute right-[-2.5%] bottom-[84%] w-10 h-10 rounded-full lg:block hidden">
              <motion.img 
                variants={floatingStars(2)}
                initial="initial"
                animate={["animate", "floating"]}
                src={'https://custorybucket.s3.ap-southeast-1.amazonaws.com/Landing/star-icon.png'} 
                alt="Star Icon" 
              />
            </div>
          </div>
        </div>
        
        <div className="mt-20 flex items-center justify-center gap-8 max-sm:gap-2">
          <motion.div 
            variants={lineFloat(0)}
            initial="initial"
            animate={["animate", "floating"]}
            className="w-[100px] h-0.5 bg-[#FF6600]  rounded-full" 
          />
          <motion.p 
            variants={footerTextFloat}
            initial="initial"
            animate={["animate", "floating"]}
            className="uppercase sm:text-[15px] text-[10px] font-bold tracking-[1.425px] text-black"
          >
            Trusted by brands that get it
          </motion.p>
          <motion.div 
            variants={lineFloat(1)}
            initial="initial"
            animate={["animate", "floating"]}
            className="w-[130px] h-0.5 bg-[#FF6600] rounded-full" 
          />
        </div>
      </section>
    </>
  );
};

function Shirt(props) {
  const texture = useTexture(`/custorytransparent.png`);
  const { nodes, materials } = useGLTF("/shirt_baked_collapsed.glb");
  useFrame((state, delta) =>
    easing.dampC(materials.lambert1.color, "#ff7f30", 0.25, delta)
  );

  return (
    <mesh
      castShadow
      geometry={nodes.T_Shirt_male.geometry}
      material={materials.lambert1}
      material-roughness={1}
      {...props}
      dispose={null}
    >
      <Decal
        position={[0, 0.08, 0.15]}
        rotation={[0, 0, 0]}
        scale={0.28}
        opacity={0.6}
        map={texture}
      />
    </mesh>
  );
}

function Backdrop() {
  const shadows = useRef();

  return (
    <AccumulativeShadows
      ref={shadows}
      temporal
      frames={60}
      alphaTest={0.35}
      scale={1}
      rotation={[Math.PI / 2, 0, 0]}
      position={[0, 0, -0.14]}
    >
      <RandomizedLight
        amount={9}
        radius={9}
        intensity={5.5}
        ambient={0.25}
        position={[5, 5, -10]}
      />
      <RandomizedLight
        amount={0.9}
        radius={5}
        intensity={0.25}
        ambient={0.55}
        position={[-5, 5, -9]}
      />
    </AccumulativeShadows>
  );
}

function CameraRig({ children }) {
  const group = useRef();
  useFrame((state, delta) => {
    easing.damp3(state.camera.position, [0, 0, 2], 0.25, delta);
    easing.dampE(
      group.current.rotation,
      [state.pointer.y / 10, -state.pointer.x / 5, 0],
      0.25,
      delta
    );
  });
  return <group ref={group}>{children}</group>;
}

useGLTF.preload("/shirt_baked_collapsed.glb");

export default HeroComponent;
