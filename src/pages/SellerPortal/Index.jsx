import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import SellerPortalSidebar from "../../components/SellerPortal/SellerPortalSidebar";

const SellerPortal = () => {
  const [screenWidth, setScreenWidth] = useState(100);
  const router = useNavigate();
  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, []);
  useEffect(() => {
    if (screenWidth >= 1024) {
      router("/sellerPortal/myOrders");
    }
  }, [screenWidth]);

  return (
    <Layout>
      <SellerPortalSidebar />
    </Layout>
  );
};

export default SellerPortal;
