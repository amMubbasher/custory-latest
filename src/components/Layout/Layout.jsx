import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import {shallow} from "zustand/shallow";
import useAppStore from "../../hooks/useAppStore";
import AuthModal from "../Auth/AuthModal";
import HoverTotal from "../common/HoverTotal";
import SideCart from "../common/SideCart";
import Footer from "./Footer";
import Header from "./Header";
import { useQueryParams } from "../../hooks/useQueryParams";

const Layout = ({ children }) => {
  const {getParam} = useQueryParams();
  const { setShowAuthModal, setShowCart } = useAppStore(
    (state) => ({
      setShowAuthModal: state.setShowAuthModal,
      setShowCart: state.setShowCart,
    }),
    shallow
  );
  const setView = useAppStore((state)=> state.setView);
  const setAddProductPayload = useAppStore((state)=> state.setAddProductPayload);
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    setShowAuthModal(false);
    setShowCart(false);
  }, [location.pathname]);

  useEffect(() => {
    const isEmail = getParam('email') === 'true';
    const authData = localStorage.getItem('CUSTORY_AUTH');
    if (isEmail && (authData == null)) {
      setShowAuthModal(true);
      setView('LOGIN');
    }
    if(!['/adminPortal/addproducts','/previewProduct/product'].includes(location.pathname)){
      setAddProductPayload(null);
    }
}, [location.pathname]);
  

  return (
    <>
      <Header />
      <AuthModal />
      <SideCart />
      {location.pathname.includes("/shop") && <HoverTotal />}
      {children}
      <Footer />
      <Toaster position="top-center" />
    </>
  );
};

export default Layout;
