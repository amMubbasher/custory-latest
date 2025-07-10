import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRoute from "./components/common/ProtectedRoute";
import EditorExport from "./components/Editor";
import { usePrices } from "./hooks/usePrices";
import Account from "./pages/Account";
import DraftEditor from "./pages/Account/draftEditor";
import Drafts from "./pages/Account/drafts";
import Orders from "./pages/Account/myorders";
import Order from "./pages/Account/myorders/OrderDetail";
import UserPage from "./pages/Account/user";
import AdminEditor from "./pages/AdminEditor";
import AdminOrder from "./pages/AdminOrder";
import Checkout from "./pages/Checkout";
import GoogleRedirect from "./pages/GoogleRedirect";
import Home from "./pages/Home";
import Products from "./pages/Shop/Products";
import ResetPassword from "./pages/ResetPassword";
import TermsAndConditions from "./pages/TermsAndConditions";
import UnderConstructionV2 from "./pages/UnderConstructionV2";
import ProductRequest from "./pages/ProductRequest";
import ShirtProductDetail from "./pages/Shop/ShirtProductDetail";
import Contact from "./pages/Contact";
import Discounts from "./pages/Account/Discounts";
import AdminPortal from "./pages/AdminPortal/Index";
import MyOrders from "./pages/AdminPortal/Order Management/MyOrders";
import MyProducts from "./pages/AdminPortal/Product Management/MyProducts";
import AddProduct from "./pages/AdminPortal/Product Management/AddProduct";
import Inventory from "./pages/AdminPortal/Product Management/Inventory";
import SellerPortal from "./pages/SellerPortal/Index";
import SellerOrders from "./pages/SellerPortal/Order Management/SellerOrders";
import SellerProducts from "./pages/SellerPortal/Product Management/SellerProducts";
import AddSellerProduct from "./pages/SellerPortal/Product Management/AddSellerProduct";
import ReviewProduct from "./components/SellerPortal/ReviewProduct";
import AdminQuotation from "./pages/AdminPortal/Admin Quotation/AdminQuotation";
import PreviewProductPage from "./pages/PreviewProductPage";
import UpgradePage from "./pages/UpgradePage";

const router = createBrowserRouter([
  {
    path: "*",
    element: <UnderConstructionV2 />,
  },
  {
    path: "/",
    element: <Home />,
    index: true,
  },
  {
    path: "/upgrade",
    element: <UpgradePage />,
    index: true,
  },
  {
    path: "/products",
    element: <Products />,
    index: true,
  },
  {
    path: "/request",
    element: <ProductRequest />,
    index: true,
  },
  {
    path: "/contact",
    element: <Contact />,
    index: true,
  },
  {
    path: "/terms",
    element: <TermsAndConditions />,
    index: true,
  },
  // {
  //   path: "/shop",
  //   element: <Shop />,
  // },
  {
    path: "/editor",
    element: <EditorExport />,
  },
  {
    path: "/admin-editor",
    element: <AdminEditor />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/checkout/:id",
    element: <Checkout />,
  },
  {
    path: "/google-redirect",
    element: <GoogleRedirect />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/admin-order",
    element: <AdminOrder />,
  },
  {
    path: "/shirtdetail/:id",
    element: <ShirtProductDetail />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/account",
        element: <Account />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/account/user",
        element: <UserPage />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/account/user/:id",
        element: <UserPage />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/account/drafts",
        element: <Drafts />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/account/mygifts",
        element: <Orders />,
      },
    ],
  },
  {
    // element: <ProtectedRoute />,
    children: [
      {
        path: "/account/mygifts/:id",
        element: <Order />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/account/drafts/:id",
        element: <DraftEditor />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/account/discounts",
        element: <Discounts />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/adminPortal",
        element: <AdminPortal />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/adminPortal/myorders",
        element: <MyOrders />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/adminPortal/myproducts",
        element: <MyProducts />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/adminPortal/addproducts/:id",
        element: <AddProduct />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/adminPortal/addproducts",
        element: <AddProduct />,
      },
    ],
  },
  {
    element : <ProtectedRoute/>,
    children : [
      {
        path : '/adminPortal/inventory',
        element : <Inventory/>
      }
    ]
  },
  {
    element : <ProtectedRoute/>,
    children : [
      {
        path : '/adminPortal/quotation',
        element : <AdminQuotation/>
      }
    ]
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/sellerPortal",
        element: <SellerPortal />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/sellerPortal/myorders",
        element: <SellerOrders />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/sellerPortal/myproducts",
        element: <SellerProducts />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/sellerPortal/addproducts/:id",
        element: <AddSellerProduct />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/sellerPortal/addproducts",
        element: <AddSellerProduct />,
      },
    ],
  },
  {
    element : <ProtectedRoute/>,
    children : [
      {
        path : '/reviewOrder/:orderId/:itemId',
        element : <ReviewProduct/>
      }
    ]
  },
  {
    element : <ProtectedRoute/>,
    children : [
      {
        path : '/previewProduct/product',
        element : <PreviewProductPage/>
      }
    ]
  }
]);

const App = () => {
  const { p } = usePrices();
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
