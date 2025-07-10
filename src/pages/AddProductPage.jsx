import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { IoMdAdd } from "react-icons/io";
import { RxTrash } from "react-icons/rx";
import { IconButton, Box, FormControlLabel, Checkbox, RadioGroup, Radio} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { addProductValidation } from "../utils/functions/checkoutValidation";
import { MdOutlineModeEdit } from "react-icons/md";
import useAppStore from "../hooks/useAppStore";
import { Tooltip as ReactTooltip } from "react-tooltip";
import useProducts, { useFetchProduct } from "../hooks/useProducts";
import { useFetchCategories } from "../hooks/useCategory";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { deleteFolderWithItemsFromS3 } from "../utils/functions/S3Functions";


const DesignUpload = ({ index, onUpload, dropzoneStyle, imageUrl }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {'image/*': ['.jpeg', '.jpg', '.png'],},
    onDrop: (acceptedFiles) => onUpload(acceptedFiles, index),
  });

  if(imageUrl){
    return (
      <div className="max-sm:mx-auto">
        <input {...getInputProps()} />
        <button {...getRootProps({ style: {...dropzoneStyle} })} className="mr-1.5 inline outline-none"><MdOutlineModeEdit color='#FF6600' size={20}/></button>
      </div>
    )
  } else {
    return (
      <div className="max-sm:mx-auto">
        <input {...getInputProps()}/>
        <button {...getRootProps({ style: {...dropzoneStyle} })}> <IoMdAdd size={25}/> </button>
      </div>
    );
  }
};

const AddProductPage = () => {
  const dropzoneStyle = {
    backgroundColor: "#FFF9F2",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#9F9F9F",
    borderStyle: "rounded",
    padding: "0.5rem",
    textAlign: "center",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    width: "100%",
    height: "185px",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none'
  };

  const [productInfo, setProductInfo] = useState({productName:'', category:'', material:'', weight:'', description:'', designLimitation:''})
  const [productColorImages, setProductColorImages] = useState([]);
  const [productColor, setProductColor] = useState('');
  const [productPrice, setProductPrice] = useState([{startRange: 1, endRange: 0, pricePerUnit: 0}]);
  const [productSizes, setProductSizes] = useState(['']);
  const [printingTypes, setPrintingTypes] = useState([]);
  const [isPrintingType, setIsPrintingType] = useState(false);
  const [isDropDown, setIsDropDown] = useState(false);
  const [sizingChartImage, setSizingChartImage] = useState('');
  const [error, setError] = useState({});
  const [deleteProductColorImages, setDeleteProductColorImages] = useState([])
  const setAddProductPayload = useAppStore((state)=> state.setAddProductPayload);
  const addProductPayload = useAppStore((state)=> state.addProductPayload)
  const user = useAppStore((state)=> state.user);

  const navigate = useNavigate();
  const {id} = useParams();
  const {fetchCategories: {data}} = useFetchCategories();
  const {addProduct, updateProduct} = useProducts();
  const {fetchProduct} = useFetchProduct(id);


  useEffect(()=>{
    const {title, category, extraDescription, materialType, weight, designLimitation, price, colours, printingType, sizes, sizingChartImage, isPrintingType} = addProductPayload || {};
    setProductInfo({productName: title || '', category: category || '', material: materialType || '', weight: weight * 1000 || '', description: extraDescription || '', designLimitation: designLimitation || ''});
    setSizingChartImage(sizingChartImage || '');
    setProductPrice(price || productPrice);
    setProductColorImages(colours || []);
    setProductSizes(sizes || productSizes);
    setPrintingTypes(printingType || []);
    setIsPrintingType(isPrintingType)
  },[window.location.pathname])

  useEffect(()=>{
    if(Boolean(id)){
      fetchProduct.refetch();
      const {title, category, extraDescription, materialType, weight, designLimitation, price, colours, printingType, sizes, sizingChart} = fetchProduct.data || {};
      setProductInfo({productName: title || '', category: category?.name || '', material: materialType || '', weight: weight * 1000 || '', description: extraDescription || '', designLimitation: designLimitation || ''});
      setSizingChartImage(sizingChart || '');
      setProductPrice(price || productPrice);
      if(colours?.length){
        const coloursArray = colours?.map((item)=>{
          return {
            color: `#${item}`,
            frontImage: `https://custorybucket.s3.ap-southeast-1.amazonaws.com/Products/${id}/${item}/front.jpg`,
            backImage:`https://custorybucket.s3.ap-southeast-1.amazonaws.com/Products/${id}/${item}/back.jpg`
          }
        })
        if(coloursArray?.length){
          setProductColorImages(coloursArray || []);
        }
      }
      if(sizes?.length){
        const sizesArray = sizes?.map((size)=> size.sizeName)
        if(sizesArray?.length){
          setProductSizes(sizesArray || productSizes);
        }
      }
      setPrintingTypes(printingType || []);
      setIsPrintingType(Boolean(printingType?.length))
    }
  },[id, fetchProduct.data])

  const handleFrontImageUpload = useCallback(async (acceptedFiles, index) => {
    const file = acceptedFiles[0];
    const imageUrl = URL.createObjectURL(file);
    setProductColorImages((prevArr) => {
      const updatedArr = [...prevArr];
      if (updatedArr[index]) {
        updatedArr[index] = {
          ...updatedArr[index],
          frontImage: imageUrl,
        };
      }
      return updatedArr;
    });
  }, [setProductColorImages]);
 
  const handleBackImageUpload = useCallback(async (acceptedFiles, index) => {
    const file = acceptedFiles[0];
    const imageUrl = URL.createObjectURL(file);
    setProductColorImages((prevArr) => {
      const updatedArr = [...prevArr];
      if (updatedArr[index]) {
        updatedArr[index] = {
          ...updatedArr[index],
          backImage: imageUrl,
        };
      }
      return updatedArr;
    });
  }, [setProductColorImages]);

  const handleSizingChartImageUpload = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    const imageUrl = URL.createObjectURL(file);
    setSizingChartImage(imageUrl);
  },[setSizingChartImage]);  
  
  const handleProductInfoChange = ({ target: { name, value } })=>{
    setProductInfo((prev) => ({...prev,[name]: value}));
  }

  const handlePriceChange = ({ target: { name, value } }, index) => {
    setProductPrice((prevState) => {
      const updatedPrices = [...prevState];
      updatedPrices[index] = { ...updatedPrices[index], [name]: value };
      return updatedPrices;
    });
  };
  
  const handlePrintingTypeChange = ({ target: { name, value } }, index) => {
    setPrintingTypes((prevState) => {
      const updatedPrices = [...prevState];
      updatedPrices[index] = { ...updatedPrices[index], [name]: value };
      return updatedPrices;
    });
  };

  const handleAddProduct =()=>{
    const payload = {
      title: productInfo?.productName,
      category: productInfo?.category,
      extraDescription: productInfo?.description, 
      materialType: productInfo?.material,
      weight: productInfo?.weight / 1000,
      designLimitation: productInfo?.designLimitation,
      price: productPrice,
      supplierId: user?.id,
      colours: productColorImages,
      printingType: printingTypes,
      sizes: productSizes,        
      sizingChartImage: sizingChartImage || null,
      isPrintingType         
    }       
    const isValidated = addProductValidation(payload, setError);
    if (!isValidated) return;
    setAddProductPayload(payload);
    navigate('/previewProduct/product');
  }

  return (
    <div className="p-3 font-poppins max-sm:p-1">
      <p className="text-[20px] mb-1">Add Product</p>
      <hr />
      <div className="w-full flex items-start gap-4 my-3 max-sm:flex-col-reverse">
        <div className="w-[50%] flex flex-col items-start gap-3 max-sm:w-full">
          <div className="flex flex-col items-start gap-1 w-full">
            <label className="text-[14px] font-bold" htmlFor="title">Product Name *</label>
            <input className='w-full border-2 p-[10px] rounded-lg outline-none' type="text" id="title" name="productName" value={productInfo?.productName} required placeholder="Cotton Shirt (Short Sleeve)" onChange={handleProductInfoChange}/>
            <span className="text-[#EC1C24] block">{error?.title}</span>
          </div>
          <div className="flex flex-col items-start gap-1 w-full">
            <label className="text-[14px] font-bold" htmlFor="category">Category *</label>
            {/* <select name="category" value={productInfo?.category} className='w-full border-2 p-[10px] rounded-lg outline-none' required onChange={handleProductInfoChange}>
              {data?.map((category, index)=>(
                <React.Fragment key={index}>
                  {index == 0 ? <option selected>Category</option> : null}
                  <option value={category?.name}>{category?.name}</option>
                </React.Fragment>
              ))}
            </select> */}
            <div className="w-full relative">
              <button onClick={()=> setIsDropDown(!isDropDown)} className='w-full border-2 p-[10px] rounded-lg outline-none  text-left text-gray-500 flex items-center justify-between'><span>{productInfo?.category || 'Category'}</span> {isDropDown ? <FaChevronUp className="inline" /> :<FaChevronDown className="inline" />}</button>
              <ul className={`${isDropDown ? "bg-[#e5e5e4] p-[5px] rounded-lg font-semibold absolute w-full max-h-[320px] overflow-auto z-10" : 'hidden'}`}>
                {data?.map((category, index)=>(
                  <React.Fragment key={index}>
                    <li 
                      className={`${productInfo?.category == category?.name ? "before:content-['✔'] before:absolute before:left-1" : ""} p-[5px] relative hover:bg-custoryPrimary hover:rounded-lg cursor-pointer pl-5`}
                      onClick={() => {
                        setProductInfo({ ...productInfo, category: category?.name });
                        setIsDropDown(false);
                      }}
                    >
                      {category?.name}
                    </li>
                  </React.Fragment>
                ))}
              </ul>
            </div>
            <span className="text-[#EC1C24] block">{error?.category}</span>
          </div>
          <div className="flex flex-col items-start gap-1 w-full">
            <label className="text-[14px] font-bold" htmlFor="material">Material</label>
            <input className='w-full border-2 p-[10px] rounded-lg outline-none' type="text" id="material" name="material" value={productInfo?.material} placeholder="100% Cotton" onChange={handleProductInfoChange}/>
          </div>
          <div className="flex flex-col items-start gap-1 w-full">
            <label className="text-[14px] font-bold" htmlFor="weight">Weight</label>
            <div className="relative w-full">
              <input className='w-full border-2 p-[10px] rounded-lg outline-none' type="number" id="weight" name="weight" value={productInfo?.weight} placeholder="100" onChange={handleProductInfoChange}/>
              <span className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-500 cursor-text">grams</span>
            </div>
          </div>
          <div className="w-full">
            <label className="block text-[14px] mb-1 font-bold" htmlFor="description">Product Description</label>
            <textarea className="block w-full border-2 p-[10px] rounded-lg outline-none" id="description" name="description" value={productInfo?.description} placeholder="T-shirt for casual wear" rows="4" cols="50" onChange={handleProductInfoChange}></textarea>
          </div>
          <div className="flex flex-col items-start gap-1 w-full">
            <label className="text-[14px] font-bold">Product Color *</label>
            <div type="button" className="w-full border-2 pl-2 rounded-lg hover:cursor-pointer flex items-center justify-between" >
              <div className="flex items-center gap-2 relative w-full">
                <span
                  id="colorSwatch"
                  className={`w-5 h-5 rounded-full border border-gray-300 absolute left-3 top-1/2 -translate-y-1/2 ${!productColor ? 'bg-black' : ''}`}
                  style={{ backgroundColor: productColor }}
                />
                <input className="w-full p-[10px] pr-10 pl-10 rounded-lg outline-none" placeholder="#000000" type="text" name="productColor" value={productColor} onChange={({target:{value}})=>setProductColor(value)}/>
                <button disabled={!productColor || productColorImages.some(({color}, index)=> color.toLocaleLowerCase() == productColor.toLocaleLowerCase())} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 outline-none disabled:cursor-not-allowed" onClick={()=>{
                  if(!productColorImages.some(({color}, index)=> color.toLocaleLowerCase() == productColor.toLocaleLowerCase())){
                    setProductColorImages([...productColorImages,{
                      color: productColor || '#000000',
                      frontImage: '',
                      backImage:''
                    }])
                    setProductColor('');
                  }                  
                }}><IoMdAdd size={25}/></button>
              </div>
            </div>
            <span className="text-[#EC1C24] block">{error?.productColorImages}</span>
          </div>
        </div>
        <div className="w-[50%] px-5 max-sm:w-full">
          <p className="text-[14px] font-bold mb-1 pl-8">Image *</p>
          <div className="flex items-center justify-around">
            {/* Uploaded Front Image Button */}
            <div className="w-[40%]">
              <div className="bg-[#FFF9F2] rounded-[6px] flex items-center gap-2 mt-[10px] w-full h-[200px] p-[10px]">
                <img
                  src={productColorImages[0]?.frontImage || "https://custorybucket.s3.ap-southeast-1.amazonaws.com/Products/image-not-found.png"}
                  alt="Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
            {/* Uploaded Back Image Button */}
            <div className="w-[40%]">
              <div className="bg-[#FFF9F2] rounded-[6px] flex items-center gap-2 mt-[10px] w-full h-[200px] p-[10px]">
                <img
                  src={productColorImages[0]?.backImage || "https://custorybucket.s3.ap-southeast-1.amazonaws.com/Products/image-not-found.png"}
                  alt="Logo"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center flex-wrap gap-2 max-sm:gap-3">
        {productColorImages.map((item, index) => (
          <div key={index} className="w-[220px] min-h-[160px] p-1 border-2 rounded-lg max-sm:w-full">
            <div className="flex items-center flex-col gap-2 relative mb-1">
              <span className="text-center block text-xs w-full">{item?.color}</span>
              <div className='border rounded-full py-2 w-full text-center' style={{ backgroundColor: item?.color }}></div>
              <button className="absolute top-0 right-0" onClick={()=>{
                setProductColorImages((prevColors) => prevColors.filter((_, i) => i !== index));
                if (
                  item?.frontImage?.includes('https://custorybucket.s3.ap-southeast-1.amazonaws.com/Products/') || 
                  item?.backImage?.includes('https://custorybucket.s3.ap-southeast-1.amazonaws.com/Products/')
                ) {
                  setDeleteProductColorImages((prev) => [
                    ...prev, 
                    { productId: id, color: `${item?.color?.replace('#', '')}` }
                  ]);
                }
                
              }}>
                <RxTrash color= 'black' size={20}/>
              </button>
            </div>
            <div className="flex items-center justify-around">
              {/* Uploaded Front Image Button */}
              <div className="w-[45%]">
                <p className="w-full text-center text-[12px]">Front Image</p>
                {item?.frontImage ? 
                  <div className="bg-[#FFF9F2] rounded-[6px] flex items-center gap-2 mt-[10px] w-full h-[80px] p-[5px]">
                    <img src={item?.frontImage} alt="Front Image" className="w-full h-full object-contain"/> 
                  </div> : 
                  <DesignUpload index={index} onUpload={handleFrontImageUpload} dropzoneStyle={{...dropzoneStyle, height:'85px'}}/>
                }
                {error?.[`frontColorImage_${index}`] ? (
                  <span className="text-[#EC1C24] text-[10px] block">{error[`frontColorImage_${index}`]}</span>
                ) : null}
              </div>
              {/* Uploaded Back Image Button */}
              <div className="w-[45%]">
                <p className="w-full text-center text-[12px]">Back Image</p>
                {item?.backImage ? 
                  <div className="bg-[#FFF9F2] rounded-[6px] flex items-center gap-2 mt-[10px] w-full h-[80px] p-[5px]">
                    <img src={item?.backImage} alt="Back Image" className="w-full h-full object-contain"/> 
                  </div>: 
                  <DesignUpload index={index} onUpload={handleBackImageUpload} dropzoneStyle={{...dropzoneStyle, height:'85px'}}/>
                }
                {error?.[`backColorImage_${index}`] ? (
                  <span className="text-[#EC1C24] text-[10px] block">{error[`backColorImage_${index}`]}</span>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="py-2 max-sm:w-full">
        <p className="text-[14px] font-bold">Printing Sides & Type <span className="text-xs text-gray-500 font-normal">(Select at least one printing type if 'Printing Types' is selected)</span></p>
        <div className="flex gap-[10px] max-sm:flex-wrap max-sm:w-full my-2">
          {/* No Print Option */}
          <Box className="border border-[#9F9F9F] rounded-lg px-[10px] bg-[#FFF9F2] w-[160px] max-sm:w-full min-h-[40px] max-h-max flex items-center">
            <FormControlLabel
              value="0"
              name="selectedOption"
              control={
                <Radio sx={{ padding: '10px' }} color="warning" checked={!isPrintingType && printingTypes?.length == 0}
                  onChange={()=>{
                    setIsPrintingType(false);
                    setPrintingTypes([]);
                  }}
                />
              }
              label="No Print" 
            />
          </Box>

          <Box className="border border-[#9F9F9F] rounded-lg px-[10px] bg-[#FFF9F2] w-[500px] max-sm:w-full min-h-[40px] max-h-max">
            <Box className='flex items-center justify-between'>
              <FormControlLabel
                value="1"
                name="front"
                control={
                  <Radio
                    sx={{ padding: '10px'}}
                    color="warning"
                    checked={isPrintingType || printingTypes?.length > 0}
                    onChange={({target:{checked}}) => setIsPrintingType(checked)}
                  />
                }
                label= {`Printing Types ${isPrintingType ? '*' : ''}`} 
              />
              <button disabled={!isPrintingType} className="text-[10px] disabled:cursor-not-allowed outline-none"
                onClick={()=>{
                  setPrintingTypes([...printingTypes,{
                    printingType:'Heat Transfer',
                    description:'A3',
                    unit:'per print',
                    price: 0
                  }])
                }}                
              >
                Add print type <IoMdAdd size={15} className="inline"/>
              </button>
            </Box>
            {printingTypes?.length ? <Box className = 'flex items-center gap-2 text-[#9F9F9F] px-1'>
              <span className="w-[28%]">Print type *</span>
              <span className="w-[28%]">Print Sizing *</span>
              <span className="w-[22%]">Unit *</span>
              <span className="w-[18%]">Price <span className="text-[10px]">(Cents)</span>*</span>
              <span className="w-[4%]"></span>
            </Box> : null}
            <Box className='max-h-[153px] overflow-y-auto px-1'>
              {printingTypes.map((item, index)=>(
                <Box key={index} className = 'flex items-start gap-2 my-1'>
                  <select name="printingType" value={item?.printingType || ''} className="w-[28%] outline-none p-[5px] border border-[#9F9F9F] rounded-lg text-[12px]"  onChange={(event)=>handlePrintingTypeChange(event, index)}>
                    {["Heat Transfer","Screen Printing","Embroidery","Hot Stamping","Sublimation","Sublimation One Sided","Sublimation Double Sided","General"].map((item,index)=>(
                      <option key={index} value={item}>{item}</option>
                    ))}
                  </select>
                  <div className="w-[28%]">
                    <select name="description" value={item?.description || ''} className="w-full outline-none p-[5px] border border-[#9F9F9F] rounded-lg text-[12px]" onChange={(event)=>handlePrintingTypeChange(event, index)}>
                      <option value="A3">A3</option>
                      <option value="A4">A4</option>
                      <option value="10CM X 10CM">10CM X 10CM</option>
                    </select>
                  </div>
                  <select name="unit" value={item?.unit || ''} className="w-[22%] outline-none p-[5px] border border-[#9F9F9F] rounded-lg text-[12px]" onChange={(event)=>handlePrintingTypeChange(event, index)}>
                    <option value="per print">Per Print</option>
                    <option value="per color">Per Color</option>
                  </select>
                  <div className="w-[18%]">
                    <input type="number" name="price" value={item?.price} className="w-full outline-none p-[5px] border border-[#9F9F9F] text-[12px] rounded-lg" onChange={(event)=>handlePrintingTypeChange(event, index)}/>
                    {error?.[`printingTypes_price_${index}`] ? (
                      <span className="text-[#EC1C24] text-[10px] block">{error[`printingTypes_price_${index}`]}</span>
                    ) : null}
                  </div>
                  <IconButton sx={{padding: 0, width:'4%', marginTop:'4px'}} onClick={()=>{
                    setPrintingTypes((prevFrontPrint) => prevFrontPrint.filter((_, i) => i !== index));
                  }}>
                    <RxTrash size={20}/>
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Box>
        </div>
        {error?.printingType ? (
          <span className="text-[#EC1C24] ml-[170px] max-sm:ml-0">{error.printingType}</span>
        ) : null}
      </div>

      <div className="py-2">
        <p className="text-[14px] font-bold">Pricing *</p>
        <span className="text-[12px] text-[#9F9F9F]">If end range is infinite, leave blank.</span>
        {error?.productPrice ? (
          <span className="text-[#EC1C24] text-[12px] block">{error.productPrice}</span>
        ) : null}
          
        <div className="w-[425px] max-sm:w-full max-h-[215px] overflow-y-auto pr-2">
          <div className="flex items-center gap-3 sticky top-0 z-10 bg-white">
            <p className="text-sm text-start w-[35%]">Start Range</p>
            <p className="text-sm text-start w-[25%]">End Range</p>
            <p className="text-sm text-start w-[25%]">Cents(¢)/Unit</p>
            <IconButton sx={{padding: 0}} onClick={()=>{
              setProductPrice([...productPrice, {
                startRange: Number(productPrice[productPrice?.length-1]?.endRange) + 1 || 1,
                endRange: 0,
                pricePerUnit: 0,
              }])
            }}
          >
            <IoMdAdd size={20}/>
          </IconButton>
          </div>

          {productPrice.map((item, index)=>(
            <div key={index} className="flex items-start gap-2 w-full mt-1">
              <div className="relative w-full">
                <input className="w-full border-2 p-2 pr-10 rounded-lg outline-none cursor-not-allowed" type="number" name="startRange" value={item?.startRange} readOnly onChange={(e)=> handlePriceChange(e, index)} />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">unit</span>
              </div>
              <span className="mt-3">TO</span>
              <div className="w-full">
                <div className="relative w-full">
                  <input className="w-full border-2 p-2 pr-10 rounded-lg outline-none" type="number" name="endRange" value={item?.endRange} onChange={(e)=> handlePriceChange(e, index)} />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">unit</span>
                </div>
                {error?.[`priceEndRange_${index}`] ? (
                  <span className="text-[#EC1C24] text-[10px] block">{error[`priceEndRange_${index}`]}</span>
                ) : null}
              </div>
              <div className="w-full">
                <div className="relative w-full">
                  <input className="w-full border-2 p-2 pr-10 rounded-lg outline-none" type="number" name="pricePerUnit" value={item?.pricePerUnit} onChange={(e)=> handlePriceChange(e, index)}/>
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">¢</span>
                </div>
                {error?.[`productPrice_${index}`] ? (
                  <span className="text-[#EC1C24] text-[10px] block">{error[`productPrice_${index}`]}</span>
                ) : null}
              </div>
              {(productPrice?.length ?? 0) -1 == index ? <IconButton sx={{padding: 0, marginTop:'10px'}} onClick={()=>{
                setProductPrice((prevPrice) => prevPrice.filter((_, i) => i !== index));
              }}>
                <RxTrash size={20}/>
              </IconButton> : <span className="w-[15%] inline-block pr-[10px]"></span>}
            </div>
          ))}
        </div>
      </div>

      <div className="w-[425px] py-2 max-sm:w-full">
        <label className="block text-[14px] font-bold" htmlFor="description">Design Limitations</label><br/>
        <textarea className="block mt-[-15px] w-full border-2 p-[10px] rounded-lg" id="description" name="designLimitation" value={productInfo?.designLimitation} placeholder="Embroidery must only have 2 colors." rows="4" cols="50" onChange={handleProductInfoChange}></textarea>
      </div>

      <div className="w-[425px] py-2 max-sm:w-full">
        <p className="text-[14px] font-bold" htmlFor="description">Sizes</p>
        <span className="text-sm text-[#9F9F9F]">Sizing Chart</span>
          {sizingChartImage ? 
            <div className="relative mb-2">
              <div className="bg-[#FFF9F2] rounded-[6px] flex items-center gap-2 mt-[10px] w-[150px] h-[150px] p-[10px]">
                <img src={sizingChartImage} alt="Logo" className="w-full h-full object-contain" />
              </div>
              <div className="absolute left-[150px] bottom-0">
                <DesignUpload index={null} onUpload={handleSizingChartImageUpload} dropzoneStyle={{}} imageUrl={sizingChartImage}/>
              </div>
            </div>:
            <>
              <DesignUpload index={null} onUpload={handleSizingChartImageUpload} dropzoneStyle={{...dropzoneStyle, height:'65px'}}/>
            </>
          }
        <div className="flex items-center justify-between">
          <span className="text-sm text-[#9F9F9F]">Size List *</span>
          <span className="text-sm text-[#9F9F9F] cursor-pointer"
            onClick={() => {
              setProductSizes(prevSizes => [...prevSizes, '']);
            }}              
          >
            Add Size <IoMdAdd size={15} className="inline"/>
          </span>
        </div>
      </div>

      <div className="w-full mt-2 flex items-center gap-2 flex-wrap">
        {productSizes.map((item, index)=>(
          <div key={index} className="w-[10%] h-[60px] max-sm:w-[30%] flex flex-col gap-1">
            <div className=" w-full flex items-center justify-between border-2 rounded-lg">
              <select name="productSizes" value={item || ''} className='w-full py-[10px] rounded-lg outline-none' onChange={({target:{value}})=>{
                setProductSizes((prevState) => {
                  const updatedSizes = [...prevState];
                  updatedSizes[index] = value;
                  return updatedSizes;
                });
              }} >
                {['xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl', 'xxxxl'].map((item, index)=>(
                  <React.Fragment key={index} >
                    {index == 0 ? <option selected>Sizes</option> : null}
                    <option disabled={productSizes.some((size)=> size == item)} value={item}>{item.toUpperCase()}</option>
                  </React.Fragment>
                ))}
              </select>
              <button onClick={() => setProductSizes((prevSize) => prevSize.filter((_, i) => i !== index))} className="text-gray-500 hover:text-red-500 outline-none">
                <RxTrash size={20} />
              </button>
            </div>
            {error?.[`productSizes_${index}`] ? (
              <span className="text-[#EC1C24] text-[11px] block w-full">{error[`productSizes_${index}`]}</span>
            ) : null}
          </div>
        ))}
      </div>

    <div className="mt-7 flex items-center gap-3">
      <button type="button" onClick={()=> {
          const payload = {
            title: productInfo?.productName,
            category: productInfo?.category,
            extraDescription: productInfo?.description, 
            materialType: productInfo?.material,
            weight: productInfo?.weight / 1000,
            designLimitation: productInfo?.designLimitation,
            price: productPrice.map(item => ({
              endRange: Number(item.endRange),
              pricePerUnit: Number(item.pricePerUnit),
              startRange: Number(item.startRange)
            })),
            supplierId: user?.id,
            colours: productColorImages,
            printingType: printingTypes.map(item => ({
              ...item,
              price: Number(item.price) || 0
            })),          
            sizes: productSizes,        
            sizingChartImage: sizingChartImage || null,
            isPrintingType         
          }       
          const isValidated = addProductValidation(payload, setError);
          if (!isValidated) return;
          setAddProductPayload(payload);

          if(!Boolean(id)){
            addProduct({data: {...payload, colours: productColorImages.map(item => item.color.replace('#', ''))}});
          } else {

            if(Boolean(deleteProductColorImages?.length>0)){
              deleteProductColorImages.map((item)=>{
                deleteFolderWithItemsFromS3('custorybucket',`Products/${item?.productId}/${item?.color}/`);
              })              
            }
            updateProduct({
              productId: id,
              data : {...payload, supplierId:fetchProduct?.data.supplierId, colours: productColorImages.map(item => item.color.replace('#', ''))}
            })
          }
      
          setProductInfo({productName:'', category:'', material:'', weight:'', description:'', designLimitation:''});
          setProductColorImages([]);
          setProductPrice([{startRange: 1, endRange: 0, pricePerUnit: 0}]);
          setProductSizes(['']);
          setPrintingTypes([]);
          setSizingChartImage('');
          setIsPrintingType(false);
        }}
        data-tooltip-html={ isPrintingType && printingTypes?.length == 0? "<div> Fill up the required fields to enable the 'Add Product'. </div>" : null }
        data-tooltip-id="my-tooltip-enable"
        className="text-white border disabled:cursor-not-allowed disabled:bg-gray-400 disabled:border-gray-400 border-custoryPrimary bg-custoryPrimary px-5 py-[10px] rounded-lg outline-none"
      >
        {!Boolean(id) ?'Add Product' : 'Update Product'}
      </button>

      <button disabled={Boolean(!productInfo)} type="button" className="text-custoryPrimary border border-custoryPrimary px-5 py-[10px] rounded-lg outline-none disabled:text-gray-500 disabled:border-gray-500" 
        onClick={()=>{
          handleAddProduct();
        }}
        data-tooltip-html={ Boolean(!productInfo) ? "<div> Fill up the required fields to enable the 'Preview' button. </div>" : null }
        data-tooltip-id="my-tooltip-enable"
      >
        Preview
      </button>
      <ReactTooltip id="my-tooltip-enable" place="bottom" />
    </div>
  </div>
  );
};

export default AddProductPage;