import React, { useState, useEffect } from 'react';
import { toast } from "react-hot-toast";
import { fetchProductAPI } from '../../api/products.api';
import useAppStore from "../../hooks/useAppStore";
import Button from "../../components/common/Button";
import useCart from "../../hooks/useCart";
import ImageCarousel from "../../components/Shop/ImageCarousel";
import { useParams } from "react-router-dom";
import { useBlocker } from "react-router-dom";
import Layout from "../../components/Layout/Layout";
import calculatePrice from '../../utils/functions/calculatePrice';
import ShirtProductDetailInfo from '../../components/Shop/ShirtProductDetailInfo';
import ShirtProductDetailDesign from '../../components/Shop/ShirtProductDetailDesign';
import ShirtProductDetailSizing from '../../components/Shop/ShirtProductDetailSizing';
import DialogModal from '../../components/common/DialogModal';
import { useFetchProduct } from '../../hooks/useProducts';
import { Tooltip as ReactTooltip } from "react-tooltip";

const ShirtProductDetail = () => {
  const isLoggedin = useAppStore(state => state.isLoggedin);
  const { id } = useParams();
  const [productData, setProductData] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [perItemPrice, setPerItemPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [colorNumber, setColorNumber] = useState(1);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [minQuantity, setMinQuantity] = useState(0);
  const [showMinQuantityWarning, setShowMinQuantityWarning] = useState(false);
  const [isFrontSide, setIsFrontSide] = useState(false);
  const [isBackSide, setIsBackSide] = useState(false);
  const frontUploadedLogo = useAppStore(state => state.frontUploadedLogo);
  const backUploadedLogo = useAppStore(state => state.backUploadedLogo)
  const [isCustomUpload, setIsCustomUpload] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [printingSides, setPrintingSides] = useState('0');
  const [printProofing, setPrintProofing] = useState('Print Now');
  const [printingType, setPrintingType] = useState({front:'',back:''});
  const { addItemToCart } = useCart();
  const setCurrentFront = useAppStore(state => state.setCurrentFront);
  const setCurrentBack = useAppStore(state => state.setCurrentBack);
  const setCurrentEditorProduct = useAppStore(state => state.setCurrentEditorProduct);
  const backUploadedImage = useAppStore(state => state.backUploadedImage);
  const setBackUploadedImage = useAppStore(state => state.setBackUploadedImage);
  const frontUploadedImage = useAppStore(state => state.frontUploadedImage);
  const setFrontUploadedImage = useAppStore(state => state.setFrontUploadedImage);
  const setFrontUploadedLogo = useAppStore(state => state.setFrontUploadedLogo);
  const setBackUploadedLogo = useAppStore(state => state.setBackUploadedLogo);
  const [selectedImage, setSelectedImage] = useState(productData?.images?.[0]);
  const uploadedFiles = useAppStore(state => state.uploadedFiles);
  const availableSizes = productData?.sizes;
  const productDataUpdated = useAppStore(state => state.productDataUpdated);
  const setProductDataUpdated = useAppStore(state => state.setProductDataUpdated);
  const selectedColorUpdated = useAppStore(state => state.selectedColorUpdated);
  const setSelectedColorUpdated = useAppStore(state => state.setSelectedColorUpdated);
  const [dialogModalOpen, setDialogModalOpen] = useState({ open: false, text: ''});
  const { hasUnsavedChanges, setHasUnsavedChanges } = useAppStore();
  const {fetchProduct:{data}} = useFetchProduct(id)

  const blocker = useBlocker(
    ({ currentLocation, nextLocation }) =>
      hasUnsavedChanges && currentLocation.pathname !== nextLocation.pathname
  );

  useEffect(() => {
    if (blocker.state == "blocked") {
      setDialogModalOpen({ open: true, text: "Block Route" });
    }
  }, [blocker]);

  useEffect(() => {
    return () => {
      setFrontUploadedImage(null);
      setBackUploadedImage(null);
      setFrontUploadedLogo(null);
      setBackUploadedLogo(null);
      setHasUnsavedChanges(false);
    };
  }, []);

  useEffect(() => {
    if (quantity < minQuantity) {
      useAppStore.setState((state) => ({ showMinQuantityWarning: true }));
    } else {
      useAppStore.setState((state) => ({ showMinQuantityWarning: false }));
    }
  }, [quantity, minQuantity]);

  useEffect(() => {
    setProductData(data);
    setProductDataUpdated(data);
    setSelectedColor(data?.colours[0]);
    setSelectedColorUpdated(data?.colours[0])
  }, [id,data]);

  useEffect(() => {
    if (productData) {
      const minQuantity = Math.min(...productData.price.map(item => item.startRange));
      setMinQuantity(minQuantity);
      // Find the price object with the minimum startRange
      const priceObj = productData.price.find(item => item.startRange === minQuantity);
      // Get the initial price
      const initialPrice = priceObj ? priceObj.pricePerUnit : 0;
      setTotalPrice(initialPrice);
      setPerItemPrice(initialPrice);
      setSelectedSizes(Array(availableSizes.length).fill(''));

      // Set the initial printing type after productData is fetched
      setPrintingType({} || null);
    }
  }, [productData, availableSizes]);

  useEffect(() => {
    let price = {calculatedPrice:0,basePrice:0}
    if (productData) {
      const totalQuantity = selectedSizes.reduce((acc, curr) => acc + parseInt(curr || 0), 0);
      setQuantity(totalQuantity);
      price = calculatePrice(productData.price, totalQuantity, printingType, printingSides,colorNumber, productData?.printingType);
      setTotalPrice(price.calculatedPrice);
    }
    if (selectedSizes.length && selectedSizes.some(size => size !== '')) {
      setPerItemPrice(price.basePrice)
    }
  }, [selectedSizes, productData, printingType]);

  const handleContinue = async () => {
    if (!isLoggedin) {
      toast.error('Please login to continue your purchase');
      return;
    }
    try {
      const totalPrice = calculatePrice(productData.price, quantity, printingType, printingSides,colorNumber, productData?.printingType).calculatedPrice  * quantity;
      let fronts3 = null;
      let backs3 = null;
      const sizes = selectedSizes
      .map((size, index) => ({
        productSizeId: availableSizes[index].id,
        quantityPurchased: parseInt(size) || 0
      }))
      .filter(sizeObj => sizeObj.quantityPurchased > 0);


      let frontDesign = `https://custorybucket.s3.ap-southeast-1.amazonaws.com/Products/${productData.id}/${selectedColor}/front.jpg`;
      let backDesign = `https://custorybucket.s3.ap-southeast-1.amazonaws.com/Products/${productData.id}/${selectedColor}/back.jpg`;
      if (localStorage.getItem('editorProduct') == productData.id) {
        frontDesign = 'custory-cart/' + productData.id + 'front.jpeg';
        backDesign = 'custory-cart/' + productData.id + 'back.jpeg';
        fronts3 = localStorage.getItem('frontImage');
        backs3 = localStorage.getItem('backImage');
      } else {
        fronts3 = frontDesign + '?cacheclearer=2';
        backs3 = backDesign + '?cacheclearer=2';
      }
      const productId = productData.id;

      toast.loading('Product currently adding to cart!');
      const additionalFiles = [];
      for (let i = 0; i < uploadedFiles.length; i++) {
      additionalFiles.push("item");
      }
      const filteredPrintingType = Object.fromEntries(
        Object.entries(printingType).filter(([key, value]) => value !== '')
      );
      addItemToCart({
        data: {
          productId,
          quantity,
          totalPrice,
          printingType : filteredPrintingType,
          sizes,
          frontDesign,
          backDesign,
          frontUploadedImage,
          backUploadedImage,
          additionalFiles,
          printingSides,
          printProofing,
          color: selectedColorUpdated,
          isCustomUpload,
          status : printingSides !== '0' ? 'design pending approval' : 'production pending'
        },
      });

      setHasUnsavedChanges(false);
    } catch (error) {
      console.error('Error adding product to the cart:', error);
      if (error?.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to add product to the cart. Please try again later.');
      }
    }
  };

  // Color selector
  const handleColorClick = (color) => {
    const editorProductId = localStorage.getItem("editorProduct");
    if (editorProductId || (frontUploadedImage || backUploadedImage)) {
      setDialogModalOpen({open: true, text: "Color Clicked", color});
    }else{
      setSelectedColor(color);
      setSelectedColorUpdated(color)
      setSelectedImage(color.imageUrl);
    }
  };

  if (!productData) {
    return null;
  }
  return (
    <Layout>
      <div className="grid grid-flow-col gap-4 relative items-start max-2xl:gap-24 max-xl:gap-10 max-md:block mt-10 border-b-[2px] pb-6">
        <section className="row-span-3 h-[500px] max-md:min-w-[auto] min-w-[400px]">
          <div id="customDesign" className="w-full max-lg:order-1 max-lg:h-[500px] max-xs:h-[250px] h-[520px] max-w-lg px-10 m-auto relative">
            <ImageCarousel products={productData} setCurrentProduct={setCurrentFront} selectedColor={selectedColor} colours={[]}/>
          </div>
        </section>
        <section className="row-span-2 max-md:mt-12 max-lg:mx-10 max-sm:mx-10 max-sm:margin-auto mr-6 w-[82%] max-md:w-auto">
          <div className="max-md:pt-3 border-b-[1px] pb-3 border-gray-400">
            <div className="max-md:text-2xl text-2xl font-bold max-md:pb-1">
              {productData?.title}
            </div>
          </div>

          <div className="text-lg font-bold items-center py-3  ">
            {/* Shirt Information */}
            <div className='border-b-[2px]'>
              <ShirtProductDetailInfo productData={productData} perItemPrice={perItemPrice} ></ShirtProductDetailInfo>
            </div>
            <div className='font-bold text-lg pt-2'>
              Configure your {productData?.title}
            </div>
            <div className='font-bold text-[16px] pt-2 flex gap-2 items-center mb-4 mt-1'>
              <span className='w-[20px] h-[20px] flex items-center justify-center rounded text-white text-[12px] bg-custoryPrimary'>1</span> Product Colour
            </div>
            <div className='flex mt-2 flex-wrap'>
              {productData.colours.map((color, index) => (
                <div key={index} style={{ width: '14px', margin: '5px' }}>
                  <button
                    className="w-full h-full rounded-full"
                    style={{ backgroundColor: "#" + color, width: '20px', height: '20px', border: '1px solid black' }}
                    onClick={() => handleColorClick(color)}
                  ></button>
                </div>
              ))}
            </div>
            <div className='font-bold text-xs mb-2 flex flex-1 items-center'>
                <span className='mr-2'>Selected Colour:</span>
                <button className="w-full h-full rounded-full"
                  style={{ backgroundColor: "#" + selectedColor, width: '20px', height: '20px', border: '1px solid black' }}>
                </button>
            </div>
            <ShirtProductDetailDesign
              productData={productData}
              setCurrentEditorProduct={setCurrentEditorProduct}
              quantity={quantity}
              selectedColor={selectedColor}
              totalPrice={totalPrice}
              setTotalPrice={setTotalPrice}
              setCurrentFront={setCurrentFront}
              setCurrentBack={setCurrentBack}
              printingType={printingType}
              setPrintingType={setPrintingType}
              printingSides={printingSides}
              setPrintingSides={setPrintingSides}
              setDialogModalOpen={setDialogModalOpen}
              colorNumber={colorNumber}
              setColorNumber={setColorNumber}
              setIsCustomUpload={setIsCustomUpload}
              setIsFrontSide = {setIsFrontSide}
              isFrontSide = {isFrontSide}
              setIsBackSide = {setIsBackSide}
              isBackSide = {isBackSide}
            ></ShirtProductDetailDesign>
          </div>

          <ShirtProductDetailSizing
            showMinQuantityWarning={showMinQuantityWarning}
            quantity={quantity}
            availableSizes={availableSizes}
            selectedSizes={selectedSizes}
            totalPrice={totalPrice}
            minQuantity={minQuantity}
            setSelectedSizes={setSelectedSizes}
            setTotalPrice={setTotalPrice}
            productData={productData}
            setQuantity={setQuantity}
            printProofing={printProofing}
            setPrintProofing={setPrintProofing}
            colorNumber={colorNumber}
          ></ShirtProductDetailSizing>

          <DialogModal dialogModalOpen={dialogModalOpen} setDialogModalOpen={setDialogModalOpen} blocker={blocker} setSelectedColor={setSelectedColor}/>
          <div className="max-md:mx-auto">
            <Button
              onClick={handleContinue}
              disabled={
                !quantity ||
                (isFrontSide && !(frontUploadedImage && frontUploadedLogo)) ||
                (isBackSide && !(backUploadedImage && backUploadedLogo))
              }
              className="w-full mt-5 text-md max-sm:text-lg max-xs:text-base bg-custoryPrimary hover:bg-opacity-80"
              data-tooltip-html={
                !quantity
                  ? `<div class='text-start'>Please select a size and quantity.</div>`
                  : (isFrontSide && !(frontUploadedImage && frontUploadedLogo))
                  ? `<div class='text-start'>Upload both the design without a template and the design with a template for the front print.</div>`
                  : (isBackSide && !(backUploadedImage && backUploadedLogo))
                  ? `<div class='text-start'>Upload both the design without a template and the design with a template for the back print.</div>`
                  : null
              }
              data-tooltip-id="add-to-cart"
            >
              Add to cart
            </Button>
            <ReactTooltip id="add-to-cart" place="bottom" />
            <span className="block text-center text-[14px] font-medium mt-3">
              Get your quotation in PDF format at the checkout page. Just place your order as usual and click "Generate Quotation" when you're ready.
            </span>
          </div>
        </section>
      </div>
    </Layout>
  );
};
export default ShirtProductDetail;