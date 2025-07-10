// import React from "react";
// import { motion } from "framer-motion";
// import Header from "../components/Layout/Header";

// const UpgradePage = () => {
//     // Star animation variants
//     const starVariants = {
//         initial: { opacity: 0, scale: 0 },
//         animate: index => ({
//             opacity: 1,
//             scale: 1,
//             transition: {
//                 duration: 1.2,
//                 ease: "easeOut",
//                 delay: index * 0.3
//             }
//         }),
//         float: index => ({
//             y: [0, index % 2 === 0 ? -10 : -15, 0],
//             x: [0, index % 2 === 0 ? 8 : -8, 0],
//             transition: {
//                 duration: index % 2 === 0 ? 6 : 7,
//                 ease: "easeInOut",
//                 repeat: Infinity,
//                 repeatType: "mirror"
//             }
//         })
//     };

//     return (
//         <>
//             <Header />
//             <div className="min-h-screen w-full overflow-hidden flex flex-col justify-between bg-gradient-to-br from-white to-[#FFE8DD] font-sans px-4 md:px-8 py-6">
//                 {/* Logo */}
//                 <div className="flex justify-center py-6">
//                     <div className="flex items-center">
//                         <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#FF6600]">
//                             <path d="M3 5V19H9V13H15V19H21V5H3Z" stroke="currentColor" strokeWidth="2" />
//                         </svg>
//                         <span className="font-normal text-xl tracking-wide text-[#FF6600] ml-2">CUSTORY</span>
//                     </div>
//                 </div>

//                 {/* Main Content */}
//                 <div className="flex-grow flex flex-col justify-center items-center text-center relative py-10">
//                     {/* Left Star */}
//                     <motion.div
//                         className="absolute left-[27%] top-[30%] w-16 h-16"
//                         initial="initial"
//                         animate={["animate", "float"]}
//                         variants={starVariants}
//                         custom={0}
//                     >
//                         <svg width="100%" height="100%" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path d="M32 0L38.4 25.6L64 32L38.4 38.4L32 64L25.6 38.4L0 32L25.6 25.6L32 0Z" fill="#FF6600" fillOpacity="0.15" />
//                         </svg>
//                     </motion.div>

//                     {/* Right Star */}
//                     <motion.div
//                         className="absolute right-[23%] top-[15%] w-16 h-16"
//                         initial="initial"
//                         animate={["animate", "float"]}
//                         variants={starVariants}
//                         custom={1}
//                     >
//                         <svg width="100%" height="100%" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
//                             <path d="M32 0L38.4 25.6L64 32L38.4 38.4L32 64L25.6 38.4L0 32L25.6 25.6L32 0Z" fill="#FF6600" fillOpacity="0.15" />
//                         </svg>
//                     </motion.div>

//                     {/* Heading - Exact match to the image */}
//                     <h1 className="font-bold text-6xl md:text-8xl tracking-tight mb-8 leading-tight max-w-4xl">
//                         Our Platform
//                         <span className="md:inline"> is getting </span>
//                         <span className="text-[#FF6600]">an upgrade!</span>
//                     </h1>

//                     {/* Message - Exact text with proper styling */}
//                     <p className="max-w-2xl text-gray-800 text-base md:text-xl leading-relaxed px-4">
//                         We're currently fine-tuning things behind the scenes to bring you a better experience. We'll be back online shortly! In the meantime, feel free to reach out to us at{" "}
//                         <span className="font-bold">admin@custory.co</span>{" "}
//                         for any orders or inquiries. <span className="font-bold">We're here to help!</span>
//                     </p>
//                 </div>

//                 {/* Footer */}
//                 <div className="w-full pt-6 pb-4">
//                     <div className="flex flex-col md:flex-row justify-between items-center text-gray-600 text-sm">
//                         <div className="mb-4 md:mb-0">
//                             © 2020–2025 Custory - All Rights Reserved
//                         </div>
//                         <div className="flex space-x-4">
//                             <a href="#" className="text-gray-600 hover:text-[#FF6600] transition-colors">
//                                 <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
//                             </a>
//                             <a href="#" className="text-gray-600 hover:text-[#FF6600] transition-colors">
//                                 <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
//                             </a>
//                             <a href="#" className="text-gray-600 hover:text-[#FF6600] transition-colors">
//                                 <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" /></svg>
//                             </a>
//                             <a href="#" className="text-gray-600 hover:text-[#FF6600] transition-colors">
//                                 <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
//                             </a>
//                             <a href="#" className="text-gray-600 hover:text-[#FF6600] transition-colors">
//                                 <svg width="22" height="22" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
//                             </a>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//         </>


//     );
// };

// export default UpgradePage;







































import React from "react";
import { motion } from "framer-motion";
import logo from '../assets/CustoryOrangeTransparent.png'
import Header from "../components/Layout/Header";

const UpgradePage = () => {
    // Star animation variants
    const starVariants = {
        initial: { opacity: 0, scale: 0 },
        animate: index => ({
            opacity: 1,
            scale: 1,
            transition: {
                duration: 1.2,
                ease: "easeOut",
                delay: index * 0.3
            }
        }),
        float: index => ({
            y: [0, index % 2 === 0 ? -10 : -15, 0],
            x: [0, index % 2 === 0 ? 8 : -8, 0],
            transition: {
                duration: index % 2 === 0 ? 6 : 7,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "mirror"
            }
        })
    };

    return (
        <>
            <Header />
            <div className="min-h-screen w-full overflow-hidden flex flex-col justify-between bg-gradient-to-b from-[#fff9f5] to-[#FFE8DD] font-sans">
                {/* Logo */}
                <div className="flex justify-center pt-12 mt-24 pb-10">
                    <div className="flex items-center w-40 ">
                        <img src={logo} alt="custory_logo" b />
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-grow flex flex-col justify-center items-center text-center relative px-4">
                    {/* Left Star with enhanced glow */}
                    <motion.div
                        className="absolute left-[20%] top-[20%] w-24 h-24 md:w-32 md:h-32"
                        initial="initial"
                        animate={["animate", "float"]}
                        variants={starVariants}
                        custom={0}
                    >
                        {/* Glow effect */}
                        <div className="absolute inset-0 blur-3xl bg-[#FF6600] opacity-5 scale-150"></div>
                        <div className="absolute inset-0 blur-xl bg-[#FF6600] opacity-10 scale-125"></div>
                        <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M50 5L58 35H90L64 55L73 85L50 65L27 85L36 55L10 35H42L50 5Z" fill="#FF6600" fillOpacity="0.15" />
                        </svg>
                    </motion.div>

                    {/* Right Star with enhanced glow */}
                    <motion.div
                        className="absolute right-[15%] top-[1%] w-24 h-24 md:w-32 md:h-32"
                        initial="initial"
                        animate={["animate", "float"]}
                        variants={starVariants}
                        custom={1}
                    >
                        {/* Glow effect */}
                        <div className="absolute inset-0 blur-2xl bg-[#FF6600] opacity-5 scale-150"></div>
                        <div className="absolute inset-0 blur-xl bg-[#FF6600] opacity-10 scale-125"></div>
                        <svg width="100%" height="100%" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M50 5L58 35H90L64 55L73 85L50 65L27 85L36 55L10 35H42L50 5Z" fill="#FF6600" fillOpacity="0.15" />
                        </svg>
                    </motion.div>

                    {/* Headings */}
                    <div className="mb-12">
                        <h1 className="text-black font-black text-5xl sm:text-6xl md:text-8xl tracking-tight font-bold leading-tight">
                            Our Platform
                        </h1>
                        <h1 className="text-black font-black text-5xl sm:text-6xl md:text-8xl tracking-tight font-bold leading-tight">
                            is getting <span className="text-[#FF6600]">an upgrade!</span>
                        </h1>

                        <p className="max-w-5xl mx-auto text-gray-800 text-base md:text-xl leading-relaxed mt-10 mb-4 px-4">
                            We're currently fine-tuning things behind the scenes to bring you a better experience. We'll be back online shortly! In the meantime, feel free to reach out to us at <span className="font-bold">admin@custory.co</span> for any orders or inquiries. <span className="font-bold">We're here to help!</span>
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="w-full px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-6 md:mb-0 text-gray-600 text-sm">
                            © 2020–2025 Custory - All Rights Reserved
                        </div>
                        <div className="flex space-x-6">
                            <a href="#" aria-label="Facebook" className="text-[#FF6600]">
                                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg>
                            </a>
                            <a href="#" aria-label="Twitter/X" className="text-[#FF6600]">
                                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                            </a>
                            <a href="#" aria-label="LinkedIn" className="text-[#FF6600]">
                                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" /></svg>
                            </a>
                            <a href="#" aria-label="Instagram" className="text-[#FF6600]">
                                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                            </a>
                            <a href="#" aria-label="YouTube" className="text-[#FF6600]">
                                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default UpgradePage;
