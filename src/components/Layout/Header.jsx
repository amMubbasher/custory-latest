// import { Person, ShoppingCart } from "@mui/icons-material";
// import { Badge, IconButton } from "@mui/material";
// import React, { useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import ColoredLogo from "../../assets/CustoryOrangeTransparent.png";
// import TransParentLogo from "../../assets/custorynavbarlogotransparent.png";
// import { Menu } from "@mui/icons-material";
// import MenuSidebar from "../common/MenuSidebar";
// import useAppStore from "../../hooks/useAppStore";
// import useCart from "../../hooks/useCart";
// import AuthModal from "../Auth/AuthModal";
// import SideCart from "../common/SideCart";
// const Header = () => {
//   const [scrolling, setScrolling] = useState(false);
//   const [headerBgColor, setHeaderBgColor] = useState(false);
//   const path = useLocation().pathname;
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const setShowCart = useAppStore((state) => state.setShowCart);
//   const {totalItems : totalCartItems} = useCart();
//   const setShowAuthModal = useAppStore(state=>state.setShowAuthModal);
//   const navigate = useNavigate();
//   const isLoggedin = useAppStore(state=>state.isLoggedin);
//   const setView = useAppStore((state)=> state.setView);
//   const user = useAppStore(state=>state.user);

//   const style =
//     path !== "/"
//       ? "sticky bg-gradient-to-b from-[#FF6600] via-[39%] via-[#FF711B] to-[#FFB669] text-white lg:rounded-b-md"
//       : scrolling
//       ? `fixed ${headerBgColor && 'bg-white'} bg-transparent backdrop-blur-none lg:rounded-b-md transition-all`
//       : "bg-transparent backdrop-blur-none sm:backdrop-blur-lg max-sm:bg-transparent max-sm:text-black transition-all fixed";


//   useEffect(() => {
//     if (path === '/') {
//       setScrolling(true);
//     }else {
//       setScrolling(false);
//     }

//     const handleScroll = () => {
//       if (window.scrollY > 100 && path === '/') {
//         setHeaderBgColor(true);
//       } else {
//         setHeaderBgColor(false);
//       }
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.addEventListener("scroll", handleScroll);
//     };
//   }, []);

//   return (
//     <>
//       <AuthModal />
//       <SideCart />
//       <MenuSidebar isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
//       {/* Navbar image and two icons */}
//       <div className={`w-full py-2 px-10 max-lg:py-4 max-xl:px-10 max-lg:px-7 max-xs:px-4 max-content-width flex items-center justify-between top-0 z-50 ${style}`}>
//         <div className="flex items-center">
//           <img src={scrolling ? ColoredLogo : TransParentLogo} onContextMenu={(e) => e.preventDefault()} onClick={()=>navigate('/')} className="sm:w-[250px] w-[180px] cursor-pointer" />
//         </div>
//         <div className="flex items-start gap-8 text-base font-semibold min-w-[250px] max-lg:hidden">
//           {[{ title: "Home", link: "/" },{ title: "Shop", link: "/products" }].map((item,index)=> <Link key={index} to={item?.link} onClick={()=>window.scrollTo(0, 0)}>{item?.title}</Link>)}
//           {(isLoggedin && (user?.role === 'customer')) && <Link to='/account/mygifts'>My Orders</Link>}
//           {(user?.role === 'admin') && <Link to='/adminPortal'>Custory Admin</Link>}
//           {(user?.role === 'supplier') && <Link to='/sellerPortal'>Seller Portal</Link>}
//         </div>
//         <div className="flex items-center gap-5 max-xs:gap-2 hidden max-lg:flex">
//           <IconButton onClick={() => { setShowCart(true) }}
//             type="text"
//             size="small"
//             className={`${scrolling ? 'text-black' : 'text-white'}`}
//           >
//             <Badge badgeContent={isLoggedin ? totalCartItems : null} color="warning" sx={{ color: "#black" }}>
//               <ShoppingCart sx={{ fontSize: 28 }} className={`${scrolling ? " text-[#FF6600]":"max-sm:text-gray-300 text-white"}`}/>
//             </Badge>
//           </IconButton>
//           <IconButton onClick={() => setIsMenuOpen(true)}>
//             <Menu sx={{ fontSize: 36}} className={`${scrolling ? " text-[#FF6600]":"max-sm:text-gray-300 text-white"}`} />
//           </IconButton>
//         </div>
//         <div className="flex items-center gap-6 max-lg:hidden">
//           <IconButton
//             type="text"
//             onClick={()=>{
//               if(isLoggedin){
//                 navigate('/account');
//               } else {
//                 setShowAuthModal(true);
//                 setView('LOGIN');
//               }
//             }}
//             size="medium"
//             sx={{ color: `${scrolling ? "#FF6600":"white"}` }}
//           >
//             <Person className="lg:hidden" />
//           </IconButton>
//           <IconButton
//             onClick={() => {
//               setShowCart(true);
//             }}
//             type="text"
//             size="medium"
//             sx={{ color: `${scrolling ? "#FF6600":"white"}` }}
//           >
//             <Badge badgeContent={isLoggedin ? totalCartItems : null} color="warning">
//               <ShoppingCart />
//             </Badge>
//           </IconButton>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Header;






























































import { Person, ShoppingCart, Menu, Close, KeyboardArrowDown } from "@mui/icons-material";
import { Badge, IconButton, Tooltip } from "@mui/material";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import ColoredLogo from "../../assets/CustoryOrangeTransparent.png";
import TransParentLogo from "../../assets/custorynavbarlogotransparent.png";
import useAppStore from "../../hooks/useAppStore";
import useCart from "../../hooks/useCart";
import AuthModal from "../Auth/AuthModal";
import SideCart from "../common/SideCart";
import MenuSidebar from "../common/MenuSidebar";

const Header = () => {
  // State management

  const [scrolling, setScrolling] = useState(false);
  const [headerBgColor, setHeaderBgColor] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Hooks
  const path = useLocation().pathname;
  const prevScrollY = useRef(0);
  const headerRef = useRef(null);
  const navigate = useNavigate();

  // App store values
  const setShowCart = useAppStore((state) => state.setShowCart);
  const { totalItems: totalCartItems } = useCart();
  const setShowAuthModal = useAppStore(state => state.setShowAuthModal);
  const isLoggedin = useAppStore(state => state.isLoggedin);
  const setView = useAppStore((state) => state.setView);
  const user = useAppStore(state => state.user);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Dynamic header styling based on path and scroll position
  const headerStyle = path !== "/"
    ? "sticky bg-gradient-to-b from-[#FF6600] via-[39%] via-[#FF711B] to-[#FFB669] text-white lg:rounded-b-md shadow-lg"
    : scrolling
      ? `fixed ${headerBgColor ? 'bg-white shadow-lg' : 'bg-transparent'} backdrop-blur-none lg:rounded-b-md transition-all duration-300`
      : "bg-transparent backdrop-blur-none sm:backdrop-blur-lg max-sm:bg-transparent max-sm:text-black transition-all fixed";

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    const isScrollingDown = currentScrollY > prevScrollY.current;

    // Set has scrolled state for animations
    if (currentScrollY > 10 && !hasScrolled) {
      setHasScrolled(true);
    } else if (currentScrollY <= 10 && hasScrolled) {
      setHasScrolled(false);
    }

    // Set header background based on scroll position
    if (currentScrollY > 100 && path === '/') {
      if (!headerBgColor) setHeaderBgColor(true);
    } else if (headerBgColor) {
      setHeaderBgColor(false);
    }

    prevScrollY.current = currentScrollY;
  }, [headerBgColor, path, hasScrolled]);

  // Setup scroll event handling with throttling
  useEffect(() => {
    if (path === '/') {
      setScrolling(true);
    } else {
      setScrolling(false);
    }

    setActiveLink(path);

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [path, handleScroll]);

  // Navigation links with dynamic generation based on user role
  const navLinks = [
    { title: "Home", link: "/" },
    { title: "Shop", link: "/upgrade" }
  ];

  if (isLoggedin && user?.role === 'customer') {
    navLinks.push({ title: "My Orders", link: '/account/mygifts' });
  }
  if (user?.role === 'admin') {
    navLinks.push({ title: "Custory Admin", link: '/adminPortal' });
  }
  if (user?.role === 'supplier') {
    navLinks.push({ title: "Seller Portal", link: '/sellerPortal' });
  }

  // Animation variants for header elements
  const headerVariants = {
    hidden: { y: -100 },
    visible: {
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        mass: 1
      }
    }
  };

  const logoVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.5 }
    },
    hover: {
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.95
    }
  };

  const navItemVariants = {
    initial: { opacity: 0, y: -20 },
    animate: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        delay: 0.1 * i
      }
    }),
    hover: {
      y: -3,
      color: headerBgColor || path !== "/" ? "#FFF5E0" : "#FF6600",
      transition: { duration: 0.2 }
    }
  };

  const iconVariants = {
    initial: { scale: 0.5, opacity: 0 },
    animate: (i) => ({
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 0.5,
        delay: 0.3 + (i * 0.1)
      }
    }),
    hover: {
      scale: 1.15,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.9 }
  };

  const underlineVariants = {
    initial: { width: "0%" },
    hover: {
      width: "100%",
      transition: { duration: 0.3 }
    },
    active: {
      width: "100%",
      backgroundColor: headerBgColor || path !== "/" ? "#FFF5E0" : "#FF6600"
    }
  };

  const cartBadgeVariants = {
    initial: { scale: 0 },
    animate: {
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15
      }
    },
    update: {
      scale: [1, 1.5, 1],
      transition: { duration: 0.3 }
    }
  };

  // Handler functions
  const handleNavClick = (navPath) => {
    window.scrollTo(0, 0);
    setActiveLink(navPath);
  };

  const handleCartClick = () => {
    setShowCart(true);
  };

  const handleProfileClick = () => {
    if (isLoggedin) {
      navigate('/account');
    } else {
      setShowAuthModal(true);
      setView('LOGIN');
    }
  };
  
  return (
    <>
      <AuthModal />
      <SideCart />
      <MenuSidebar isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />

      {/* Header container with animations */}
      <motion.header
        ref={headerRef}
        className={`w-full py-2 px-10 max-lg:py-4 max-xl:px-10 max-lg:px-7 max-xs:px-4 max-content-width flex items-center justify-between top-0 z-50 ${headerStyle}`}
        variants={headerVariants}
        initial={prefersReducedMotion ? "visible" : "hidden"}
        animate="visible"
        role="banner"
      >
        {/* Logo */}
        <div className="flex items-center">
          <motion.img
            src={scrolling ? ColoredLogo : TransParentLogo}
            alt="Custory Logo"
            onContextMenu={(e) => e.preventDefault()}
            onClick={() => navigate('/')}
            className="sm:w-[250px] w-[180px] cursor-pointer"
            variants={prefersReducedMotion ? {} : logoVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
            whileTap="tap"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="flex items-start gap-8 text-base font-semibold min-w-[250px] max-lg:hidden">
          {navLinks.map((item, index) => (
            <motion.div
              key={index}
              className="relative py-2"
              variants={navItemVariants}
              custom={index}
              initial={prefersReducedMotion ? "animate" : "initial"}
              animate="animate"
              whileHover="hover"
              onHoverStart={() => setHoveredItem(index)}
              onHoverEnd={() => setHoveredItem(null)}
            >
              <Link
                to={item.link}
                onClick={() => handleNavClick(item.link)}
                className="block relative"
                aria-current={activeLink === item.link ? "page" : undefined}
              >
                {item.title}

                {/* Animated underline */}
                <motion.div
                  className="absolute bottom-[-2px] left-0 h-[2px] bg-current"
                  initial="initial"
                  animate={activeLink === item.link ? "active" : "initial"}
                  variants={underlineVariants}
                  whileHover="hover"
                />
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Mobile Menu Controls */}
        <div className="flex items-center gap-5 max-xs:gap-2 hidden max-lg:flex">
          <motion.div
            variants={iconVariants}
            custom={0}
            initial={prefersReducedMotion ? "animate" : "initial"}
            animate="animate"
            whileHover="hover"
            whileTap="tap"
          >
            <Tooltip title="Shopping Cart">
              <IconButton
                onClick={handleCartClick}
                type="text"
                size="small"
                className={`${scrolling ? 'text-black' : 'text-white'}`}
                aria-label={`Shopping cart with ${isLoggedin ? totalCartItems || 0 : 0} items`}
              >
                <motion.div variants={cartBadgeVariants} initial="initial" animate="animate">
                  <Badge
                    badgeContent={isLoggedin ? totalCartItems : null}
                    color="warning"
                    sx={{ color: "#black" }}
                  >
                    <ShoppingCart
                      sx={{ fontSize: 28 }}
                      className={`${scrolling ? "text-[#FF6600]" : "max-sm:text-gray-300 text-white"}`}
                    />
                  </Badge>
                </motion.div>
              </IconButton>
            </Tooltip>
          </motion.div>

          <motion.div
            variants={iconVariants}
            custom={1}
            initial={prefersReducedMotion ? "animate" : "initial"}
            animate="animate"
            whileHover="hover"
            whileTap="tap"
          >
            <Tooltip title={isMenuOpen ? "Close menu" : "Open menu"}>
              <IconButton
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMenuOpen}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isMenuOpen ? "close" : "menu"}
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isMenuOpen ? (
                      <Close
                        sx={{ fontSize: 36 }}
                        className={`${scrolling ? "text-[#FF6600]" : "max-sm:text-gray-300 text-white"}`}
                      />
                    ) : (
                      <Menu
                        sx={{ fontSize: 36 }}
                        className={`${scrolling ? "text-[#FF6600]" : "max-sm:text-gray-300 text-white"}`}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </IconButton>
            </Tooltip>
          </motion.div>
        </div>

        {/* Desktop Action Icons */}
        <div className="flex items-center gap-6 max-lg:hidden">
          <motion.div
            variants={iconVariants}
            custom={0}
            initial={prefersReducedMotion ? "animate" : "initial"}
            animate="animate"
            whileHover="hover"
            whileTap="tap"
          >
            <Tooltip title={isLoggedin ? "Your Account" : "Login"}>
              <IconButton
                // onClick={handleProfileClick}
                onClick={()=>navigate('/upgrade')}
                type="text"
                size="medium"
                sx={{ color: `${scrolling ? "#FF6600" : "white"}` }}
                aria-label={isLoggedin ? "My account" : "Login"}
              >
                <Person className="lg:block" />
              </IconButton>
            </Tooltip>
          </motion.div>

          <motion.div
            variants={iconVariants}
            custom={1}
            initial={prefersReducedMotion ? "animate" : "initial"}
            animate="animate"
            whileHover="hover"
            whileTap="tap"
          >
            <Tooltip title="Shopping Cart">
              <IconButton
                // onClick={handleCartClick}
                onClick={()=>navigate('/upgrade')}
                type="text"
                size="medium"
                sx={{ color: `${scrolling ? "#FF6600" : "white"}` }}
                aria-label={`Shopping cart with ${isLoggedin ? totalCartItems || 0 : 0} items`}
              >
                <motion.div variants={cartBadgeVariants} initial="initial" animate="animate">
                  <Badge
                    badgeContent={isLoggedin ? totalCartItems : null}
                    color="warning"
                    sx={{
                      "& .MuiBadge-badge": {
                        transition: "transform 0.2s ease-in-out"
                      }
                    }}
                  >
                    <ShoppingCart />
                  </Badge>
                </motion.div>
              </IconButton>
            </Tooltip>
          </motion.div>
        </div>

        {/* Optional scroll indicator */}
        <motion.div
          className={`absolute bottom-0 left-0 h-1 bg-orange-400`}
          initial={{ width: "0%" }}
          animate={{ width: hasScrolled ? "100%" : "0%" }}
          transition={{ duration: 0.3 }}
          style={{ display: path === "/" && scrolling ? "block" : "none" }}
        />
      </motion.header>
    </>
  );
};

export default Header;
