import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import AdminPortalSidebar from "../../components/AdminPortal/AdminPortalSidebar";

const AdminPortal = () => {
  const [screenWidth, setScreenWidth] = useState(100);
  const router = useNavigate();
  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, []);
  useEffect(() => {
    if (screenWidth >= 1024) {
      router("/adminPortal/myOrders");
    }
  }, [screenWidth]);

  return (
    <Layout>
      <AdminPortalSidebar />
    </Layout>
  );
};

export default AdminPortal;
