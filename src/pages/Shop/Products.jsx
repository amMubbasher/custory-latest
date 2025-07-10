import React, { useEffect, useState } from "react";
import Header from "../../components/Layout/Header";
import useAppStore from "../../hooks/useAppStore";
import ProductGroup from "../../components/Shop/ProductGroup";
import { scrollSmoothly } from "../../utils/functions/scrollSmoothly";
import { useFetchAllProducts } from "../../hooks/useProducts";
import Footer from "../../components/Layout/Footer";
import { useLocation } from 'react-router-dom';
import Banner from "../../components/Shop/Banner";
import toast, { Toaster } from "react-hot-toast";
import { APP_AUTH_KEY } from "../../hooks/useAuth";


const Products = () => {
  const clearCartDetails = useAppStore(state=>state.clearCartDetails);
  const setCurrentProduct = useAppStore(state=>state.setProduct);
  const currentProduct = useAppStore(state=>state.product);
  const {fetchProducts: {data: productsData, isLoading: isFetchProductsLoading, isError: isFetchProductsError, error: fetchProductsError, refetch}} = useFetchAllProducts();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    const parsedAuth = JSON.parse(localStorage.getItem(APP_AUTH_KEY)) || {};
    const role = parsedAuth?.user?.role;
    if (['admin', 'supplier'].includes(role)) {
      refetch();
    }
  }, []);

  useEffect(() => {
    if (isFetchProductsError) {
      toast.error('Error fetching products: ' + fetchProductsError.message);
    }
  }, [isFetchProductsError]);

  useEffect(() => {
    if (currentProduct) {
      scrollSmoothly('.start-content');
    }
  }, [currentProduct]);

  const [selectedQuantity, setSelectedQuantity] = useState('0-50');
  const [selectedBudget, setSelectedBudget] = useState('Default');
  const [selectedLeadTime, setSelectLeadTime] = useState('Default');
  const [selectedCategory, setSelectCategory] = useState('Default');

  useEffect(() => {
    clearCartDetails('.start-content');
    setSelectCategory(queryParams.get('filter'));
  }, []);

  const selectQuantity = (event) => {
    const { value } = event.target;
    setSelectedQuantity(value);
  };

  const selectBudget = (budget) => {
    setSelectedBudget(budget);
  };

  const selectCategory = (category) => {
    setSelectCategory(category);
  };

  const selectLeadTime = (leadTime) => {
    setSelectLeadTime(leadTime);
  };

  const [showProductDetail, setShowProductDetail] = useState(false);
  const handleProductDetailClose = () => {
    setCurrentProduct(null);
    setShowProductDetail(false);
  };

  const handleProductSelection = (product) => {
    setShowProductDetail(true);
    setCurrentProduct(product);
  };

  return (
    <div>
      <Header />
      <Banner />
      <Toaster position="top-center"/>
      <div className="grid grid-cols-1 lg:grid-cols-7 md:p-5 max-sm:px-[15px]">
        {!showProductDetail && (
          <aside className="col-span-full lg:col-span-1 h-fit sticky lg:block grid  grid-cols-1 py-2 my-2 gap-2">
            <div className="col-span-1">
              <div className="">
                <div id="chooseBudget" className="">
                  <h1 className="font-bold bg-zinc-100 rounded-t-md py-2 flex px-6">
                    Choose Category
                  </h1>
                  <div className="col-span-full bg-white gap-4 grid md:grid-cols-3 sm:grid-cols-3 lg:grid-cols-1 xs:grid-cols-1 grid-cols-3 rounded-b-md place-items-center py-3">
                    <div onClick={() => selectCategory('TShirt')} className={`border h-full rounded w-full text-center flex justify-center items-center cursor-pointer hover:bg-gray-200 ${selectedCategory === 'TShirt' ? 'bg-gray-200' : ''}`}>T-Shirts</div>
                    <div onClick={() => selectCategory('Shirt')} className={`border h-full rounded w-full text-center flex justify-center items-center cursor-pointer hover:bg-gray-200 ${selectedCategory === 'Shirt' ? 'bg-gray-200' : ''}`}>Shirts</div>
                    <div onClick={() => selectCategory('Jacket')} className={`border h-full rounded w-full text-center flex justify-center items-center cursor-pointer hover:bg-gray-200 ${selectedCategory === 'Jacket' ? 'bg-gray-200' : ''}`}>Jackets</div>
                    <div onClick={() => selectCategory('Hoodie')} className={`border h-full rounded w-full text-center flex justify-center items-center cursor-pointer hover:bg-gray-200 ${selectedCategory === 'Hoodie' ? 'bg-gray-200' : ''}`}>Hoodies</div>
                    <div onClick={() => selectCategory('Bottle')} className={`border h-full rounded w-full text-center flex justify-center items-center cursor-pointer hover:bg-gray-200 ${selectedCategory === 'Bottle' ? 'bg-gray-200' : ''}`}>Bottles</div>
                    <div onClick={() => selectCategory('Totebag')} className={`border h-full rounded w-full text-center flex justify-center items-center cursor-pointer hover:bg-gray-200 ${selectedCategory === 'Totebag' ? 'bg-gray-200' : ''}`}>Accessories (Bags, Hats, lanyards)</div>
                    <div onClick={() => selectCategory('NameTent')} className={`border h-full rounded w-full text-center flex justify-center items-center cursor-pointer hover:bg-gray-200 ${selectedCategory === 'NameTent' ? 'bg-gray-200' : ''}`}>Paper Products</div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        )}
        <article className="lg:col-span-6 lg:pl-8 col-span-full grid justify-start text-black">
          <span className='block text-[14px] font-medium'>Get your quotation in PDF format at the checkout page. Just place your order as usual and click "Generate Quotation" when you're ready.</span>
          {isFetchProductsLoading ? (
            <div>Loading...</div>
          ) : isFetchProductsError ? (
            <div>Error fetching products: {fetchProductsError.message}</div>
          ) : productsData && productsData.length > 0 ? (
            <div>
              <ProductGroup
                products={productsData}
                setCurrentProduct={handleProductSelection}
                selectedBudget={selectedBudget}
                selectedQuantity={selectedQuantity}
                selectedLeadTime={selectedLeadTime}
                selectedCategory={selectedCategory}
              />
            </div>
          ) : (
            <div>No products available.</div>
          )}
        </article>
      </div>
      <Footer />
    </div>
  );
};

export default Products;