import React from "react";
import AdminPortalLayout from "../../../components/AdminPortal/AdminPortalLayout";
import ProductsViewPage from "../../ProductsViewPage";

const Inventory = () => {
  return (
    <AdminPortalLayout>
      <ProductsViewPage/>
    </AdminPortalLayout>
  );
};

export default Inventory;
