import React, { useCallback, useEffect, useState } from "react";
import { FaPencilAlt, FaRegFilePdf  } from "react-icons/fa";
import { MdOutlineFactory, MdOutlineWarehouse, MdOutlineFileDownload } from "react-icons/md";
import { RiTruckLine } from "react-icons/ri";
import { RxCross1, RxTrash } from "react-icons/rx";
import Layout from "../Layout/Layout";
import { useNavigate, useParams } from "react-router-dom";
import useAppStore from "../../hooks/useAppStore";
import { usePrices } from "../../hooks/usePrices";
import { formatNumbers } from "../../utils/functions/formatNumbers";
import { useFetchAdminOrders, useFetchGifts } from "../../hooks/useGifts";
import { buttonsColor, phases, phasesArr, phasesDisabledArr, userSidePhases } from "../../utils/Enums";
import useItem from "../../hooks/useItem";
import { deleteImageFromS3, downloadImageFromS3 } from "../../utils/functions/S3Functions";
import downloadImage from "../../utils/functions/downloadImage";
import { TextField, IconButton } from "@mui/material";
import { useDropzone } from "react-dropzone";
import uploadImageToS3 from "../../utils/functions/uploadImageToS3";
import useOrder from "../../hooks/useOrder";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { CircularProgress } from "@mui/material";
import { downloadImagesPDF } from "../Checkout/GeneratePDF";
import { ExampleModal } from "../Shop/ShirtProductDetailDesign";

const DesignUpload = ({ index, onUpload,disabled }) => {
  const dropzoneStyle = {
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#000",
    borderStyle: "rounded",
    padding: "0.5rem",
    textAlign: "center",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    width: "100%",
  };
  const { getRootProps, getInputProps } = useDropzone({
    accept: {'image/*': ['.jpeg', '.jpg', '.png'],},
    onDrop: (acceptedFiles) => onUpload(acceptedFiles, index),
  });

  return (
    <div className="ml-6 max-sm:mx-auto">
      <input {...getInputProps()} disabled={disabled}/>
      <button disabled={disabled} {...getRootProps({ style: dropzoneStyle })} className="text-gray-500 w-[165px] h-[32px] flex items-center justify-between outline-none disabled:cursor-not-allowed">
        Upload new design
        <IoIosInformationCircleOutline
          data-tooltip-html="
          <div class='text-start max-sm:text-xs text-sm p-2 max-sm:max-w-[320px]'>
              <ol class='list-decimal'>
                <li>Ensure your designs follow our product template guidelines.</li>
                <li>Upload your finalized design files.</li>
              </ol>
          </div>"
          data-tooltip-id="my-tooltip-front"
          className="ml-2 cursor-pointer"
        ></IoIosInformationCircleOutline>
      </button>
      <ReactTooltip id="my-tooltip-front" place="bottom" />
    </div>
  );
};

const ReviewProduct = () => {
  const navigate = useNavigate();
  const {orderId,itemId} = useParams();
  const {orders} = useAppStore();
  const [reviewOrder ,setReviewOrder] = useState({});
  const [reviewItem ,setReviewItem] = useState({});
  const [selectedPhase, setSelectedPhase] = useState({});
  const [statusComment, setStatusComment] = useState('');
  const [editComment, setEditComment] = useState(false);
  const [newDesignArr, setNewDesignArr] = useState([]);
  const [frontWithoutTemplate, setFrontWithoutTemplate] = useState(false);
  const [backWithoutTemplate, setBackWithoutTemplate] = useState(false);
  const [designGuideModal, setDesignGuideModal] = useState(false);
  const [isAddImage, setIsAddImage] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState('');
  const [newDesignLength, setNewDesignLength] = useState(reviewItem?.newDesigns?.length);
  const [frontPresignedUrl, setFrontPresignedUrl] = useState(null);
  const [frontLogoPresignedUrl, setFrontLogoPresignedUrl] = useState(null);
  const [backPresignedUrl, setBackPresignedUrl] = useState(null);
  const [backLogoPresignedUrl, setBackLogoPresignedUrl] = useState(null);
  const [deleteImage, setDeleteImage] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const [productFrontDesign, setProductFrontDesign] = useState('');
  const [productFrontLogo, setProductFrontLogo] = useState('');
  const [productBackDesign, setProductBackDesign] = useState('');
  const [productBackLogo, setProductBackLogo] = useState('');

  const {f,p} = usePrices()
  const { role } = JSON.parse(localStorage.getItem('CUSTORY_AUTH') || '{}')?.user || {};
  const fetchGifts = role === "admin" ? useFetchAdminOrders()?.fetchGifts : useFetchGifts()?.fetchGifts;
  const { updateItem } = useItem();
  const { presignedUrlProduction, presignedUrlProductionData } = useOrder({
    placeOrderSuccessCallback: (data) => {
      if(data?.presignedUrl?.includes('newFrontDesign')){
        setFrontPresignedUrl(data?.presignedUrl)
      } else if(data?.presignedUrl?.includes('newBackDesign')){
        setBackPresignedUrl(data?.presignedUrl)
      } else if(data?.presignedUrl?.includes('newFrontLogo')){
        setFrontLogoPresignedUrl(data?.presignedUrl)
      } else if(data?.presignedUrl?.includes('newBackLogo')){
        setBackLogoPresignedUrl(data?.presignedUrl)
      }
    }
  });

  useEffect(() => {
    const findOrder = orders?.find((order) => order.id === orderId);
    const findItem = findOrder?.items?.find((item) => item.id === itemId);
    if (findOrder) setReviewOrder({ ...findOrder });
    if (findItem) {
      setReviewItem({ ...findItem });
      setProductFrontDesign(!window.location.href.includes('http://localhost:5173')
      ? `https://custory-order.s3.ap-southeast-1.amazonaws.com/${findItem?.frontDesign}`.replace('/custory-cart', '')
      : `https://custory-cart.s3.ap-southeast-1.amazonaws.com/${findItem?.frontDesign}`);

      setProductFrontLogo(!window.location.href.includes('http://localhost:5173')
      ? `https://custory-order.s3.ap-southeast-1.amazonaws.com/${findItem?.frontWithoutTemplate}`.replace('/custory-cart', '')
      : `https://custory-cart.s3.ap-southeast-1.amazonaws.com/${findItem?.frontWithoutTemplate}`);

      setProductBackDesign(!window.location.href.includes('http://localhost:5173')
      ? `https://custory-order.s3.ap-southeast-1.amazonaws.com/${findItem?.backDesign}`.replace('/custory-cart', '')
      : `https://custory-cart.s3.ap-southeast-1.amazonaws.com/${findItem?.backDesign}`);

      setProductBackLogo(!window.location.href.includes('http://localhost:5173')
      ? `https://custory-order.s3.ap-southeast-1.amazonaws.com/${findItem?.backWithoutTemplate}`.replace('/custory-cart', '')
      : `https://custory-cart.s3.ap-southeast-1.amazonaws.com/${findItem?.backWithoutTemplate}`);

      setStatusComment(findItem?.comment);
      setEditComment(findItem?.comment ? true : false);
      setNewDesignArr([...findItem?.newDesigns]);
      setNewDesignLength(findItem?.newDesigns?.length);
    };
  }, [orders, orderId, itemId]);

  useEffect(() => {
    const statusToPhaseMap = {
      'design approved': 'production',
      'production started': 'warehouse',
      'Warehouse has dispatched the order': 'shipping',
    };
    const status = reviewItem?.status?.split(" ")[0]?.replace(/['’]s/g, "");
    const targetPhase = statusToPhaseMap[reviewItem?.status] || (status === 'delivery' ? 'shipping' : status === 'supplier' ? 'warehouse' :  status);
    const phase = phases.find((item) => item?.heading?.split(" ")[0]?.toLowerCase() === targetPhase?.toLowerCase());
    setSelectedPhase(phase || {});
    if (productFrontLogo) {
      fetch(productFrontLogo, { mode: 'cors' })
        .then((response) => response.ok && setFrontWithoutTemplate(true))
        .catch((err) => console.error('CORS error for Front Logo:', err));
    }
    if (productBackLogo) {
      fetch(productBackLogo, { mode: 'cors' })
        .then((response) => response.ok && setBackWithoutTemplate(true))
        .catch((err) => console.error('CORS error for Back Logo:', err));
    }
  }, [reviewItem]);

  const handleDateFormat = (date) => {
    const newDate = new Date(date);
    return `${String(newDate.getUTCDate()).padStart(2, '0')}/${
      String(newDate.getUTCMonth() + 1).padStart(2, '0')}/${
      newDate.getUTCFullYear()} ${String(newDate.getUTCHours()).padStart(2, '0')}:${
      String(newDate.getUTCMinutes()).padStart(2, '0')}HRS`;
  };

  const handleFrontImageUpload = useCallback(
    async (acceptedFiles, index) => {
      const file = acceptedFiles[0];
      const imageUrl = URL.createObjectURL(file);
      setNewDesignArr((prevArr) => {
        const updatedArr = [...prevArr];
        if (updatedArr[index]) {
          updatedArr[index] = {
            ...updatedArr[index],
            frontDesign: imageUrl,
          };
        }
        return updatedArr;
      });
      const ImageNumber = reviewItem?.newDesigns?.[reviewItem?.newDesigns?.length - 1]?.frontDesign?.includes("/newFrontDesign-")
      ? reviewItem.newDesigns[reviewItem?.newDesigns?.length - 1].frontDesign.split("/newFrontDesign-")[1]?.split('.jpeg?')[0] ?? ''
      : null;
      const bucketUrlId= reviewItem?.frontDesign?.replace(/^custory-cart\//, '')?.replace(/\/[^/]+\.jpeg$/, '')
      presignedUrlProduction({
        data: {
          url: `${!window.location.href.includes('http://localhost:5173') ? '' : 'custory-cart/'}${bucketUrlId}/newFrontDesign-${
            ImageNumber && ImageNumber >= 3 ? parseInt(ImageNumber, 10) + 1 : index
          }.jpeg`,
          bucket: `${!window.location.href.includes('http://localhost:5173') ? 'custory-order' : 'custory-cart'}`
        },
      });
    }, [setNewDesignArr, reviewItem]);

  const handleBackImageUpload = useCallback(
    async (acceptedFiles, index) => {
      const file = acceptedFiles[0];
      const imageUrl = URL.createObjectURL(file);
      setNewDesignArr((prevArr) => {
        const updatedArr = [...prevArr];
        if (updatedArr[index]) {
          updatedArr[index] = {
            ...updatedArr[index],
            backDesign: imageUrl,
          };
        }
        return updatedArr;
      });
      const ImageNumber = reviewItem?.newDesigns?.[reviewItem?.newDesigns?.length - 1]?.backDesign?.includes("/newBackDesign-")
        ? reviewItem.newDesigns[reviewItem?.newDesigns?.length - 1].backDesign.split("/newBackDesign-")[1]?.split('.jpeg?')[0] ?? ''
        : null;
      const bucketUrlId= reviewItem?.frontDesign?.replace(/^custory-cart\//, '')?.replace(/\/[^/]+\.jpeg$/, '')
      presignedUrlProduction({
        data: {
          url: `${!window.location.href.includes('http://localhost:5173') ? '' : 'custory-cart/'}${bucketUrlId}/newBackDesign-${
            ImageNumber && ImageNumber >= 3 ? parseInt(ImageNumber, 10) + 1 : index
          }.jpeg`,
          bucket: `${!window.location.href.includes('http://localhost:5173') ? 'custory-order' : 'custory-cart'}`
        },
      });
  }, [setNewDesignArr, reviewItem]);

  const handleFrontUploadLogo = useCallback(
      (acceptedFiles, index) => {
        const file = acceptedFiles[0];
        const imageUrl = URL.createObjectURL(file);
        setNewDesignArr((prevArr) => {
          const updatedArr = [...prevArr];
          if (updatedArr[index]) {
            updatedArr[index] = {
              ...updatedArr[index],
              frontDesignLogo: imageUrl,
            };
          }
          return updatedArr;
        });
        const ImageNumber = reviewItem?.newDesigns?.[reviewItem?.newDesigns?.length - 1]?.frontDesignLogo?.includes("/newFrontLogo-")
        ? reviewItem.newDesigns[reviewItem?.newDesigns?.length - 1].frontDesignLogo.split("/newFrontLogo-")[1]?.split('.jpeg?')[0] ?? ''
        : null;
        const bucketUrlId= reviewItem?.frontDesign?.replace(/^custory-cart\//, '')?.replace(/\/[^/]+\.jpeg$/, '')
        presignedUrlProduction({
          data: {
            url: `${!window.location.href.includes('http://localhost:5173') ? '' : 'custory-cart/'}${bucketUrlId}/newFrontLogo-${
              ImageNumber && ImageNumber >= 3 ? parseInt(ImageNumber, 10) + 1 : index
            }.jpeg`,
            bucket: `${!window.location.href.includes('http://localhost:5173') ? 'custory-order' : 'custory-cart'}`
          },
        });
      },[setNewDesignArr, reviewItem]
  );

  const handleBackUploadLogo = useCallback(
      (acceptedFiles, index) => {
        const file = acceptedFiles[0];
        const imageUrl = URL.createObjectURL(file);
        setNewDesignArr((prevArr) => {
          const updatedArr = [...prevArr];
          if (updatedArr[index]) {
            updatedArr[index] = {
              ...updatedArr[index],
              backDesignLogo: imageUrl,
            };
          }
          return updatedArr;
        });
        const ImageNumber = reviewItem?.newDesigns?.[reviewItem?.newDesigns?.length - 1]?.backDesignLogo?.includes("/newBackLogo-")
        ? reviewItem.newDesigns[reviewItem?.newDesigns?.length - 1].backDesignLogo.split("/newBackLogo-")[1]?.split('.jpeg?')[0] ?? ''
        : null;
        const bucketUrlId= reviewItem?.frontDesign?.replace(/^custory-cart\//, '')?.replace(/\/[^/]+\.jpeg$/, '')
        presignedUrlProduction({
          data: {
            url: `${!window.location.href.includes('http://localhost:5173') ? '' : 'custory-cart/'}${bucketUrlId}/newBackLogo-${
              ImageNumber && ImageNumber >= 3 ? parseInt(ImageNumber, 10) + 1 : index
            }.jpeg`,
            bucket: `${!window.location.href.includes('http://localhost:5173') ? 'custory-order' : 'custory-cart'}`
          },
        });
      },
      [setNewDesignArr, reviewItem]
  );

  const handleImageAvailability = async (url) => {
    if(url){
      try {
        const response = await fetch(url, { mode: 'cors' });
        return response.ok;
      } catch (err) {
        console.error('CORS error for Front Logo:', err);
        return false;
      }
    }
  };

  return (
    <Layout>
      <div className="flex max-md:flex-col mt-10 pb-6">
        <section className="w-[40%] max-md:w-[100%]">
          <div className="flex justify-center">
            <img
              src={`https://custorybucket.s3.ap-southeast-1.amazonaws.com/Products/${reviewItem?.productId}/${reviewItem?.color}/front.jpg`}
              alt="" width="406" height="406"
            />
          </div>
        </section>

        <section className="px-8 w-[60%] max-md:w-[100%]">
          <div className="max-md:text-3xl text-2xl font-bold max-md:pb-1">
            {reviewItem?.product?.title}
          </div>
          <div className="mt-6">
            <div className="flex gap-2 mt-[10px]">
              <span className="font-bold text-[12px]">Order ID</span>
              <span className="text-[12px]">{orderId}</span>
            </div>
            <div className="flex gap-2 mt-[10px]">
              <span className="font-bold text-[12px]">Date</span>
              <span className="text-[12px]">
                {new Date(reviewOrder?.createdAt).toLocaleDateString("en-GB", {day: "numeric", month: "short", year: "numeric"}).replace(",", "")}
              </span>
            </div>
            <div className="flex gap-2 mt-[10px]">
              <span className="font-bold text-[12px]">User</span>
              <span className="text-[12px]">{`${reviewOrder?.customerFirstName} ${reviewOrder?.customerLastName}`}</span>
            </div>
            <div className="flex items-center gap-3 mt-[30px]">
              <span className="font-bold text-[16px]">Product Colour</span>
              <span style={{backgroundColor: "#" + reviewItem?.color, border: "1px solid #" + reviewItem?.color}} className={`text-[12px] w-5 h-5 border-[1px] border-black rounded-full`}></span>
            </div>
            <div className="flex items-start gap-12 mt-[40px]">
              <span className="font-bold text-[16px]">Sizes</span>
              <div className="text-[12px] ml-[37px]">
                {reviewItem?.itemProductSizes?.map((order, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <span className="text-[14px] w-[28px] block"> {order.productSize?.sizeName.toUpperCase()} </span>
                    <span className="text-[14px]">x{order.quantityPurchased}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4 mt-[40px]">
              <span className="font-bold text-[16px]">Printing Sides</span>
              <span className="text-[14px]">
                {reviewItem?.noOfSidesPrinted == 1 ? 'Single Side Print' : reviewItem?.noOfSidesPrinted == 2 ? 'Double Side Prints' : 'No Prints'}
                &nbsp;{(frontWithoutTemplate || backWithoutTemplate) ?
                  <>
                    (<button type="button" className="outline-none hover:underline text-blue-500" onClick={()=> setDesignGuideModal(true)}>
                      Design Guide
                    </button>)
                  </> : null
                }
              </span>
            </div>
            <div className="font-bold text-[16px] mt-[50px] flex items-center justify-between">
              <span>Printing</span>
              {role !== 'customer' && !newDesignLength ? 
                <button
                  className="text-[16px] font-semibold outline-none hover:underline"
                  onClick={() =>{
                    const bucket = window.location.href.includes("http://localhost:5173") ? "custory-cart" : "custory-order"; 
                    downloadImagesPDF(productFrontDesign, frontWithoutTemplate ? productFrontLogo : '', productBackDesign, backWithoutTemplate ? productBackLogo : '', reviewItem?.productId, reviewItem?.color, bucket, orderId)
                  }}
                >
                  Download<FaRegFilePdf className='inline mb-1 outline-none border-none' size={20}/>
                </button> : null
              }
            </div>
            {newDesignLength ? <p className="mt-[10px] text-[#EC1C24] font-semibold"> Old Design </p> : null}
            <div className="flex max-md:flex-col gap-2 mt-[10px]">
              <div className="bg-[#FFF9F2] max-md:w-[100%] w-[50%] rounded-[12px] p-[10px] h-[710px]">
                <div className="font-bold text-[14px]">Front Print</div>
                <div className="text-[14px] mt-[10px] flex items-center justify-between">
                  <span>{reviewItem?.printingType?.front || 'No Print'}</span>
                  {frontWithoutTemplate ? <button className="text-sm font-semibold" 
                    onClick={() => downloadImageFromS3(`${frontWithoutTemplate ?  `${window.location.href.includes("http://localhost:5173") ? "custory-cart" : "custory-order"}` : "custorybucket"}`, frontWithoutTemplate ? productFrontLogo : 'Products/image-not-found.png', 'front without template')}
                  >
                    Without Template <MdOutlineFileDownload className='inline mb-1 outline-none border-none' size={20}/>
                  </button> : null}
                </div>
                {/* <div className="text-[14px] mt-[10px]">2 Colors</div> */}
                <div className="rounded-[6px] my-[10px] h-[210px] p-[5px]">
                  <div className="w-[200px] h-[200px]">
                    <img className="w-full h-full object-contain" src={frontWithoutTemplate ? productFrontLogo : "https://custorybucket.s3.ap-southeast-1.amazonaws.com/Products/image-not-found.png"} alt="Logo" />
                  </div>
                </div>
                <div className="flex relative justify-center items-center bg-[#FDFDFD] rounded-[6px] mt-[40px] p-[5px]">
                  <button className="text-sm font-semibold absolute right-1 -top-8 p-1 outline-none" onClick={() => downloadImageFromS3(`${window.location.href.includes("http://localhost:5173") ? "custory-cart" : "custory-order"}`, productFrontDesign, 'front with template')}>
                    With Template <MdOutlineFileDownload className='inline mb-1 outline-none border-none' size={20}/>
                  </button>
                  <div className="w-[340px] h-[360px]">
                    <img className="w-full h-full object-contain" src={productFrontDesign} alt="Product"/>
                  </div>
                </div>
              </div>
              <div className="bg-[#FFF9F2] max-md:w-[100%] w-[50%] rounded-[12px] p-[10px] h-[710px]">
                <div className="font-bold text-[14px]">Back Print</div>
                <div className="text-[14px] mt-[10px] flex items-center justify-between">
                  <span>{reviewItem?.printingType?.back || 'No Print'}</span>
                  {backWithoutTemplate ? <button className="text-sm font-semibold " 
                    onClick={() => downloadImageFromS3(`${backWithoutTemplate ?  `${window.location.href.includes("http://localhost:5173") ? "custory-cart" : "custory-order"}` : "custorybucket"}`, backWithoutTemplate ? productBackLogo : 'Products/image-not-found.png', 'back without template')}>
                    Without Template <MdOutlineFileDownload className='inline mb-1 outline-none border-none' size={20}/>
                  </button> : null}
                </div>
                {/* <div className="text-[14px] mt-[10px]">2 Colors</div> */}
                <div className="rounded-[6px] my-[10px] h-[210px] p-[5px]">
                  <div className="w-[200px] h-[200px]">
                    <img className="w-full h-full object-contain" src={backWithoutTemplate ? productBackLogo : "https://custorybucket.s3.ap-southeast-1.amazonaws.com/Products/image-not-found.png"} alt="Logo" />
                  </div>
                </div>
                <div className="flex relative justify-center items-center bg-[#FDFDFD] rounded-[6px] mt-[40px] p-[5px]">
                  <button className="text-sm font-semibold absolute right-1 -top-8 outline-none" onClick={() => downloadImageFromS3(`${window.location.href.includes("http://localhost:5173") ? "custory-cart" : "custory-order"}`, productBackDesign, 'back with template')}>
                    With Template <MdOutlineFileDownload className='inline mb-1 outline-none border-none' size={20}/>
                  </button>
                  <div className="w-[340px] h-[360px]">
                    <img className="w-full h-full object-contain" src={productBackDesign} alt="Product"/>
                  </div>
                </div>
              </div>
            </div>
            {newDesignArr?.map((item, index) => {
              const frontDesign = item?.frontDesign?.split('?')[0] ?? '';
              const backDesign = item?.backDesign?.split('?')[0] ?? '';
              const frontDesignLogo = item?.frontDesignLogo?.split('?')[0] ?? '';
              const backDesignLogo = item?.backDesignLogo?.split('?')[0] ?? '';

              const isNewDesign = newDesignLength - index === 1;
              const designType = isNewDesign ? "New Design" : "Old Design";
              const uploadedByRole = reviewItem?.newDesigns?.length - index === 1 ? `(${reviewItem?.uploadedBy})` : "";
              return(
                <React.Fragment key={index}>
                  <div className="w-full flex items-center justify-between mt-[10px]">
                    <p className={`font-semibold ${newDesignLength - index !== 1 ? "text-[#EC1C24]" : "text-[#09AA00]"} capitalize`}>
                      {`${designType} ${uploadedByRole}`}
                    </p>
                    {index === reviewItem?.newDesigns?.length && newDesignLength !== reviewItem?.newDesigns?.length && (
                      <IconButton
                        onClick={() => {
                          setNewDesignLength(newDesignLength - 1);
                          setFrontPresignedUrl(null)
                          setFrontLogoPresignedUrl(null)
                          setBackPresignedUrl(null)
                          setBackLogoPresignedUrl(null)
                          const updatedArray = [...newDesignArr];
                          updatedArray.pop();
                          setNewDesignArr(updatedArray);
                        }}
                        className="cursor-pointer"
                      >
                        <RxCross1 size={15} color="black" />
                      </IconButton>
                    )}
                    {(role !== 'customer' && (reviewItem?.newDesigns?.length - index !== 0)) && (
                      <div className="flex gap-3 items-center flex-row-reverse">
                        {reviewItem?.newDesigns?.length === 4 && newDesignArr?.length <= reviewItem?.newDesigns?.length && (
                          <IconButton
                            sx={{backgroundColor: "#EC1C24", "&:hover": {backgroundColor: "#C71A1F"}}}
                            onClick={async () => {
                              setDeleteImage([...deleteImage,{frontDesign, backDesign, frontDesignLogo ,backDesignLogo}])
                              const filteredArray = newDesignArr.filter((_, indx) => index !== indx);
                              setNewDesignArr(filteredArray);
                              setNewDesignLength(newDesignLength - 1);
                            }} className="cursor-pointer"
                          >
                            <RxTrash size={20} color="white" />
                          </IconButton>
                        )}
                        {(reviewItem?.newDesigns?.length !== null && reviewItem?.newDesigns?.length !== index) && (newDesignLength -1 == index) && (
                          <button
                            className="text-[16px] font-semibold outline-none hover:underline"
                            onClick={() =>{
                              const bucket = window.location.href.includes("http://localhost:5173") ? "custory-cart" : "custory-order"; 
                              downloadImagesPDF(frontDesign,frontDesignLogo, backDesign, backDesignLogo, reviewItem?.productId, reviewItem?.color, bucket)
                            }}
                          >
                            Download<FaRegFilePdf className='inline mb-1 outline-none border-none' size={20}/>
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                  <div className="flex max-md:flex-col gap-2 mt-[10px]">
                    {['front', 'back'].map((side) => (
                      <div key={side} className={`${!Object.keys(reviewItem?.printingType).includes(side)? 'bg-gray-300' : 'bg-[#FFF9F2]'} max-md:w-[100%] w-[50%] rounded-[12px] p-[10px] h-[700px]`}>
                        <div className="font-bold text-[14px]">{`${side.charAt(0).toUpperCase() + side.slice(1)} Print`}</div>
                        <div className="text-[14px] mt-[10px] flex justify-between items-center">
                          <span>{reviewItem?.printingType?.[side] || 'No Print'}</span>
                          <button className="text-sm font-semibold" onClick={() => downloadImageFromS3(`${window.location.href.includes("http://localhost:5173") ? "custory-cart" : "custory-order"}`, side === 'front' ? frontDesignLogo : backDesignLogo, `${side} without template`)}>
                            Without Template <MdOutlineFileDownload className='inline mb-1 outline-none border-none' size={20}/>
                          </button>
                        </div>
                        <div className="rounded-[6px] flex items-center justify-between h-[210px]">
                          {(side === 'front' ? item?.[`${side}DesignLogo`] : item?.[`${side}DesignLogo`]) ? (
                            <React.Fragment>
                              <div className="bg-[#FDFDFD] rounded-[6px] flex items-center gap-2 mt-[10px] w-[200px] h-[200px] p-[5px]">
                                <img
                                  src={handleImageAvailability(side === 'front' ? frontDesignLogo : backDesignLogo)
                                    ? (side === 'front' ? frontDesignLogo : backDesignLogo) : null}
                                  alt="Logo"
                                  className="w-full h-full object-contain"
                                />
                              </div>
                            </React.Fragment>
                          ) : (
                            <DesignUpload disabled={!Object.keys(reviewItem?.printingType).includes(side)} index={index} onUpload={side === 'front' ? handleFrontUploadLogo : handleBackUploadLogo} />
                          )}
                        </div>
                        {(side === 'front' ? item?.[`${side}Design`] : item?.[`${side}Design`]) ? (
                          <div className="flex relative justify-center items-center bg-[#FDFDFD] rounded-[6px] mt-[45px] p-[5px]">
                            <button className="text-sm font-semibold absolute right-1.5 -top-8 outline-none" onClick={() => downloadImageFromS3(`${window.location.href.includes("http://localhost:5173") ? "custory-cart" : "custory-order"}`, side === 'front' ? frontDesign : backDesign, `${side} with template`)}>
                              With Template <MdOutlineFileDownload className='inline mb-1 outline-none border-none' size={20}/>
                            </button>
                            <div className="w-[3400px] h-[350px]">
                              <img
                                className="w-full h-full object-contain"
                                src={handleImageAvailability(side === 'front' ? frontDesign : backDesign)
                                  ? (side === 'front' ? frontDesign : backDesign) : null}
                                alt="Product"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="rounded-[6px] flex items-center gap-2 h-[100px]">
                            <DesignUpload disabled={!Object.keys(reviewItem?.printingType).includes(side)} index={index} onUpload={side === 'front' ? handleFrontImageUpload : handleBackImageUpload} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </React.Fragment>
              )
            })}

            <div>
              <div className="font-bold text-[16px] mt-[20px]">Summary</div>
              <div className="text-[16px] mt-[25px]">Quantity: {reviewItem?.quantity}</div>
              <div className="font-bold text-[20px] mt-[10px]">
                Total Price: {f(p(formatNumbers(reviewItem?.price / 100)))}
              </div>
              <div className="font-bold text-[16px] mt-[40px]">Status</div>
            </div>

            <div className="bg-[#FFF9F2] w-[100%] rounded-[12px] p-[10px]">
              <div className="flex gap-3">
                <FaPencilAlt size={15} color={`${reviewItem?.status == "design pending approval" ? "#FF6600" : phasesArr.designPhase.includes(reviewItem?.status) ? "#09AA00" : "#EC1C24"}`}/>
                <MdOutlineFactory size={15} color={`${reviewItem?.status == "design approved" || reviewItem?.status == "production pending" ? "#FF6600" : phasesArr.productionPhase.includes(reviewItem?.status) ? "#09AA00" : phasesDisabledArr.productionPhase.includes(reviewItem?.status) && "#D8D8D8"}`}/>
                <MdOutlineWarehouse size={15} color={`${[
                    "production started",
                    "supplier has delivered order to warehouse",
                    "supplier’s order has arrived at warehouse",
                    "Warehouse has completed quality check",
                  ].includes(reviewItem?.status) ? "#FF6600" : phasesArr.warehousePhase.includes(reviewItem?.status) ? "#09AA00" : reviewItem?.status == "Warehouse has completed quality check" ? "#EC1C24" : phasesDisabledArr.warehousePhase.includes(reviewItem?.status) && "#D8D8D8"}`}/>
                <RiTruckLine size={17} color={`${ reviewItem?.status == "Warehouse has dispatched the order" || reviewItem?.status == "delivery in progress" ? "#FF6600" : phasesArr.shippingPhase.includes(reviewItem?.status) ? "#09AA00" : reviewItem?.status == "delivery not started" ? "#EC1C24" : phasesDisabledArr.shippingPhase.includes(reviewItem?.status) && "#D8D8D8" }`}/>
              </div>
              <div className="font-bold text-[14px] my-[10px] capitalize">
                {role !== 'customer' ? reviewItem?.status : userSidePhases.includes(reviewItem?.status) ? 'In Production' : reviewItem?.status === "delivery is completed" ? 'Completed' : reviewItem?.status}
              </div>
              <div className={`${!editComment && "bg-[#ffffff]"} rounded-[6px]`}>
                <TextField
                  fullWidth
                  size="small"
                  disabled = {role == 'customer'}
                  className="text-[12px] w-[100%] resize-none outline-none"
                  rows={4}
                  multiline
                  variant="outlined"
                  required
                  name="comment"
                  value={statusComment}
                  type="text"
                  onChange={({target:{value}})=> setStatusComment(value)}
                  placeholder="Additional Comments"
                  id="code-field"
                  focused = {(role !== 'customer' && !statusComment) || !editComment}
                  InputProps={{
                    readOnly: editComment || role == 'customer',
                  }}
                />
              </div>

              {((['design pending approval', 'design rejected'].includes(reviewItem?.status) && (role !== 'customer' && isAddImage)) || (role === 'customer' && reviewItem?.status == 'design rejected')) &&   
                <>
                  {(reviewItem?.newDesigns?.length < newDesignLength) ?
                    <button 
                      disabled={(reviewItem?.newDesigns?.length < newDesignLength) && ((!newDesignArr[newDesignArr?.length -1 ]?.frontDesign || !newDesignArr[newDesignArr?.length -1 ]?.frontDesignLogo) && (!newDesignArr[newDesignArr?.length -1 ]?.backDesign || !newDesignArr[newDesignArr?.length -1 ]?.backDesignLogo))}
                      onClick={async() => {
                        const bucket = window.location.href.includes("http://localhost:5173") ? "custory-cart" : "custory-order";
                        const designKeys = ['frontDesign', 'frontDesignLogo', 'backDesign', 'backDesignLogo'];
                        setIsLoading(true);
                        await Promise.all(
                          deleteImage?.map((item) => {
                            if (Object.keys(item).length && Object.values(item).some(value => value !== null)) {
                              return Promise.all(
                                designKeys.map((key) => {
                                  if(item?.[key] !== "") {
                                    deleteImageFromS3(bucket, item?.[key])
                                  }
                                })
                              );
                            }
                          }) || []
                        );
                        if (presignedUrlProductionData?.status) {
                          const latestDesign = newDesignArr?.[newDesignArr.length - 1];
                          if (latestDesign) {
                            const designMappings = [
                              { type: 'frontDesign', url: frontPresignedUrl },
                              { type: 'frontDesignLogo', url: frontLogoPresignedUrl },
                              { type: 'backDesign', url: backPresignedUrl },
                              { type: 'backDesignLogo', url: backLogoPresignedUrl },
                            ];
  
                            for (const { type, url } of designMappings) {
                              if (latestDesign[type] && latestDesign[type] !== '') {
                                try {
                                  const imageData = await downloadImage(latestDesign[type]);
                                  await uploadImageToS3(url, imageData);
                                } catch (error) {
                                  console.error(`Failed to process ${type}:`, error);
                                }
                              }
                            }
                          } else {
                            console.error('No latest design found in newDesignArr.');
                          }
                        }
  
                        const { status, id, history, updatedAt, uploadedBy} = reviewItem;
                        const newHistory = {
                          dateTime : updatedAt,
                          lastStatus : status
                        }
                        const newUploadedDesigns = {
                          frontDesign: frontPresignedUrl,
                          backDesign: backPresignedUrl,
                          frontDesignLogo: frontLogoPresignedUrl,
                          backDesignLogo: backLogoPresignedUrl
                        }
                        const updatedArr = [...newDesignArr];
                        if (updatedArr[updatedArr.length - 1] && Object.values(newUploadedDesigns).some(value => value !== null)) {
                          updatedArr[updatedArr.length - 1] = newUploadedDesigns
                        }
                        updateItem({
                          data: {
                            id,
                            status: updatedStatus || status,
                            comment: statusComment,
                            uploadedBy: Object.values(newUploadedDesigns).some(value => value !== null) ? role : uploadedBy,
                            history : history ? [...history, newHistory] : [newHistory],
                            newDesigns: (Object.values(newUploadedDesigns).some(value => value !== null) && updatedArr.length <= 4) ? [...updatedArr] : newDesignArr,
                          },
                        });
                        setStatusComment('')
                        setDeleteImage({})
                        if(role == 'admin'){
                          navigate('/adminPortal/myorders')
                          setIsLoading(false);
                        }else if(role == 'supplier'){
                          navigate('/sellerPortal/myorders')
                          setIsLoading(false);
                        }else{
                          navigate(`/account/mygifts/${orderId}`)
                        }
                      }}
                      className="bg-[#000] rounded-[5px] py-4 px-3 mt-[10px] w-[100%] text-[12px] font-bold text-center text-[#fff] outline-none capitalize disabled:cursor-not-allowed disabled:bg-gray-400"
                      data-tooltip-html={newDesignArr?.length === 4 && role !== 'customer' ?`
                        <div class='text-start max-sm:text-xs text-sm p-2 max-sm:max-w-[320px]'>
                          Please delete a previously rejected design to add a new one
                        </div>` : ''}
                      data-tooltip-id="add-newDesign"
                    >
                      {isLoading ? <CircularProgress size={16} color='primary' className='inline ml-[4px] mt-1'/> : <p className="px-4">Upload</p>}
                    </button> : 
                    <div className={`bg-[#ffffff] rounded-[6px] mt-[10px] p-[8px] border-[1px] border-black ${((reviewItem?.newDesigns?.length < newDesignLength) || newDesignArr?.length === 4) || Object.entries(reviewItem?.printingType).length === 0 ? "max-sm:hidden" : ""}`}>
                      <button
                        disabled={
                          role == 'customer' && !['design rejected','design pending approval'].includes(reviewItem?.status) ||
                          ((reviewItem?.newDesigns?.length < newDesignLength) || newDesignArr?.length === 4) || Object.entries(reviewItem?.printingType).length === 0
                        } 
                        onClick={()=> {
                          setNewDesignLength(newDesignLength + 1);
                          setNewDesignArr([...newDesignArr, {
                            frontDesign: '',
                            backDesign: '',
                            frontDesignLogo: '',
                            backDesignLogo: ''
                          }])
                          if(role === 'customer'){
                            setIsAddImage(true);
                          }
                        }}
                        className="w-full text-gray-500 disabled:cursor-not-allowed max-sm:disabled:hidden border-none p-2 text-center text-[14px] leading-5 bg-[#FFF] outline-none rounded"
                        data-tooltip-html={newDesignArr?.length === 4 && role !== 'customer' ?`
                          <div class='text-start max-sm:text-xs text-sm p-2 max-sm:max-w-[320px]'>
                            Please delete a previously rejected design to add a new one
                          </div>` : ''}
                        data-tooltip-id="add-newDesign"
                      >
                        {isLoading ? <CircularProgress size={16} color='primary' className='inline ml-[4px] mt-1'/> : <p className="px-4"><span className="text-[16px] font-bold">+</span> Add Image</p>}
                      </button>
                    <ReactTooltip id="add-newDesign" place="top" />
                    </div>
                  }
                </>
              }

              {role !== 'customer' && !isAddImage ? <div className="flex max-lg:flex-col items-start justify-between gap-5 mt-[10px]">
                {editComment &&
                  <button onClick={()=> setEditComment(false)} className="bg-[#000] rounded-[5px] py-4 px-3 w-[100%] text-[12px] font-bold text-center text-[#fff] outline-none capitalize">
                    Edit Comment
                  </button>
                }
                {selectedPhase?.radio
                  ?.filter((item) => !['design pending approval', 'delivery in progress'].includes(item?.value))
                  .map((item, index) => (
                  <button key={index} disabled={(reviewItem?.newDesigns?.length < newDesignLength) && ((!newDesignArr[newDesignArr?.length -1 ]?.frontDesign || !newDesignArr[newDesignArr?.length -1 ]?.frontDesignLogo) && (!newDesignArr[newDesignArr?.length -1 ]?.backDesign || !newDesignArr[newDesignArr?.length -1 ]?.backDesignLogo))}
                    className={`${buttonsColor.green.includes(item.value) ? "bg-[#09AA00]" : buttonsColor.orange.includes(item.value) ? "bg-[#FF6600]" : buttonsColor.red.includes(item.value) && "bg-[#FF0000]"}
                    rounded-[5px] py-4 px-3 w-[100%] text-[12px] font-bold text-center text-[#fff] outline-none capitalize disabled:cursor-not-allowed disabled:bg-gray-400`}
                  onClick={()=>{
                    if(role !== 'customer' && item?.value == 'design rejected'){
                      setUpdatedStatus(item?.value)
                      setIsAddImage(true);
                    }else{
                      const { id, status } = reviewItem;
                      updateItem({
                        data: {
                          id,
                          status: item.value,
                        },
                      });
                      if(role == 'admin' && item?.value !== 'design rejected'){
                        navigate('/adminPortal/myorders')
                        setIsLoading(false);
                      }else if(role == 'supplier' && item?.value !== 'design rejected'){
                        navigate('/sellerPortal/myorders')
                        setIsLoading(false);
                      }
                    }
                  }}
                  >
                    {item.key}
                  </button>
                ))}
              </div>: null}
              {(role == 'customer' && !(reviewItem?.newDesigns?.length < newDesignLength)) && reviewItem?.uploadedBy !== null && reviewItem?.uploadedBy !== 'customer' && ['design rejected','design pending approval'].includes(reviewItem?.status) ? 
                <div className="flex max-lg:flex-col items-start justify-between gap-5 mt-[10px]">
                  {selectedPhase?.radio ?.filter((item) => !['design rejected', 'design pending approval'].includes(item?.value)).map((item, index) => (
                    <button key={index} disabled={(reviewItem?.newDesigns?.length < newDesignLength) && ((!newDesignArr[newDesignArr?.length -1 ]?.frontDesign || !newDesignArr[newDesignArr?.length -1 ]?.frontDesignLogo) && (!newDesignArr[newDesignArr?.length -1 ]?.backDesign || !newDesignArr[newDesignArr?.length -1 ]?.backDesignLogo))}
                      className={`${buttonsColor.green.includes(item.value) ? "bg-[#09AA00]" : buttonsColor.orange.includes(item.value) ? "bg-[#FF6600]" : buttonsColor.red.includes(item.value) && "bg-[#FF0000]"}
                      rounded-[5px] py-4 px-3 w-[100%] text-[12px] font-bold text-center text-[#fff] outline-none capitalize disabled:cursor-not-allowed disabled:bg-gray-400`}
                      onClick={async() => {
                        const { id, status } = reviewItem;
                        updateItem({
                          data: {
                            id,
                            status: item.value,
                          },
                        });
                        setDeleteImage({})
                        if(role == 'customer' && item?.value == 'design approved'){
                          navigate(`/account/mygifts/${orderId}`)
                        }
                    }}
                    >
                      {item?.key}
                    </button>
                  ))}
                </div>: null
              }
              <div>
                <button disabled={isAddImage} onClick={()=> {
                  if(role == 'admin'){
                    navigate('/adminPortal/myorders')
                  }else if(role == 'customer'){
                    navigate(`/account/mygifts/${orderId}`)
                  }else{
                    navigate('/sellerPortal/myorders')
                  }}}
                  className="bg-[#000] mt-[10px] rounded-[5px] py-4 px-3 w-[100%] text-[12px] font-bold text-center text-[#fff] outline-none disabled:cursor-not-allowed disabled:bg-gray-400">
                  {role!== 'customer' ? 'Cancel' : 'Back to Order Deatils'}
                </button>
              </div>
            </div>

            <div>
              <div className="text-[16px] font-bold mt-[20px]">
                Status History
              </div>
              {[...(reviewItem?.history || [])].sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime))?.map((item,index)=>(
                <div key={index} className="flex gap-2 items-center mt-[20px]">
                  {item?.lastStatus?.toLowerCase()?.includes('design') && <FaPencilAlt size={15} color={`${item?.lastStatus == "design pending approval" ? "#FF6600" : phasesArr.designPhase.includes(item?.lastStatus) ? "#09AA00" : "#EC1C24"}`}/>}
                  {item?.lastStatus?.toLowerCase()?.includes('production') && <MdOutlineFactory size={15} color={`${item?.lastStatus == "production pending" ? "#FF6600" : phasesArr.productionPhase.includes(item?.lastStatus) ? "#09AA00" : phasesDisabledArr.productionPhase.includes(item?.lastStatus) && "#D8D8D8"}`}/>}
                  {item?.lastStatus?.toLowerCase()?.includes('warehouse' || 'supplier') && <MdOutlineWarehouse size={15} color={`${ [
                        "production started",
                        "supplier has delivered order to warehouse",
                        "supplier’s order has arrived at warehouse",
                        "Warehouse has completed quality check",
                        ].includes(item?.lastStatus) ? "#FF6600" : phasesArr.warehousePhase.includes(item?.lastStatus) ? "#09AA00" : phasesDisabledArr.warehousePhase.includes(item?.lastStatus) && "#D8D8D8"}`}/>}
                  {item?.lastStatus?.toLowerCase()?.includes('delivery') && <RiTruckLine size={15} color={`${ item?.lastStatus == "Warehouse has dispatched the order" || item?.lastStatus == "delivery in progress" ? "#FF6600" : phasesArr.shippingPhase.includes(item?.lastStatus) ? "#09AA00" : item?.lastStatus == "delivery not started" ? "#EC1C24" : phasesDisabledArr.shippingPhase.includes(item?.lastStatus) && "#D8D8D8" }`}/>}
                  <span className="text-[14px] text-[#6F6F6F]">
                    {handleDateFormat(item?.dateTime)}
                  </span>
                  <span className="text-[14px] capitalize">{item?.lastStatus}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <ExampleModal open={designGuideModal} title={'Design Submission Guide'} handleClose={()=> setDesignGuideModal(false)}/>
    </Layout>
  );
};

export default ReviewProduct;