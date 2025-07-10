import { useState, useMemo, useCallback, useEffect } from "react";
import useAppStore from '../../hooks/useAppStore';
import UploadDesign from "./UploadDesign";
import { useDropzone } from 'react-dropzone';
import { Tooltip as ReactTooltip } from "react-tooltip";
import { IoIosInformationCircleOutline } from "react-icons/io";
import calculatePrice from "../../utils/functions/calculatePrice";
import { toast } from "react-hot-toast";
import { Radio, RadioGroup, Box, IconButton, FormControlLabel, Checkbox} from "@mui/material";
import { Description } from "@mui/icons-material";
import PrintingOption, { Feature } from "./PrintingOption";
import BasicModal from "../common/BasicModal";
import { Close } from '@mui/icons-material';
import { imageMap, printingDescriptions } from "../../utils/Enums";

export const ExampleModal = ({open, title, handleClose}) =>{
  return (
    <BasicModal open={open} handleClose={() => handleClose()}>
      <div className="w-[430px] max-sm:w-[350px] bg-white rounded-xl border-[2px]">
        <div className='flex items-center justify-between w-full px-[10px] mt-2'>
          <p className="text-[20px] font-bold">
            {title}
          </p>
          <IconButton onClick={() => handleClose()} sx={{padding:0}}><Close/></IconButton>
        </div>
        <div className="w-full max-h-[600px] overflow-auto p-[10px]">
          <div className="my-[13px] w-[395px] max-sm:w-[315px] h-[218] flex items-center justify-center">
            <img className="w-full h-full object-contain" src={imageMap[title]?.image || ''} alt="Example Image" />
          </div>
          <div>
            <p className="text-[10px] my-3">
              {imageMap[title]?.description}
            </p>
            {title !== 'Design Submission Guide' ? 
            <>
              <p className="text-[15px] font-bold"> Pros and Cons: </p>
              <ul className="text-base mb-3">
                {imageMap[title]?.prosAndCons.map((text,index)=>
                  <li key={index} className="my-1 text-[10px]">
                      {['Not as durable as screen printing.','Limited to fewer colors per design.', 'Not ideal for intricate details or gradients.','More expensive than printing methods.'].includes(text) ? 
                        <Feature label = {text} icon="cross"/> : <Feature label={text}/>}
                  </li>
                )}
              </ul>
            </>:null
            }
            <p className="text-[20px] font-bold">
              Sizing Options:
            </p>
            <div className="flex items-center justify-between my-[13px] pr-5">
            {title !== 'Embroidery' ? <p className="text-[15px] font-bold">A3 (29.7 x 42 cm) <span className="block text-[10px] font-bold">For large, bold designs.</span></p> : null}
              <p className="text-[15px] font-bold">Logo Size (5 x 10 cm) <span className="block text-[10px] font-bold">Small logos or branding.</span></p>
            </div>
            <div className="mx-[-7px] w-[202px] h-[222px] flex items-center max-sm:flex-col gap-2 max-sm:justify-between max-sm:mx-auto">
              {title !== 'Embroidery' ? <img className="w-full h-full object-contain mt-[-40px] max-sm:mt-0" src='https://custorybucket.s3.ap-southeast-1.amazonaws.com/Products/printingSize-2.png' alt="Example Image" /> : null}
              <img className="w-full h-full object-contain" src='https://custorybucket.s3.ap-southeast-1.amazonaws.com/Products/printingSize-1.png' alt="Example Image" />
            </div>
          </div>
        </div>
      </div>
    </BasicModal>
  )
}

const ShirtProductDetailDesign = (props) => {
  const { setCurrentFront, setCurrentBack, productData, selectedColor, printingSides, setPrintingSides, setCurrentEditorProduct, printingType, setPrintingType, quantity, setTotalPrice, totalPrice, setDialogModalOpen,colorNumber, setColorNumber, setIsCustomUpload, setIsFrontSide, isFrontSide, setIsBackSide, isBackSide} = props;
  const [selectedOption, setSelectedOption] = useState('0');
  const [exampleModal, setExampleModal] = useState({open:false, typeName:''});
  const isLoggedin = useAppStore(state => state.isLoggedin);
  const { handleDialogModal, setHandleDialogModal, openCustomEditor, setOpenCustomEditor} = useAppStore();
  const frontUploadedImage = useAppStore(state => state.frontUploadedImage);
  const backUploadedImage = useAppStore(state => state.backUploadedImage);
  const setFrontUploadedLogo = useAppStore(state => state.setFrontUploadedLogo)
  const setBackUploadedLogo = useAppStore(state => state.setBackUploadedLogo)
  const { setHasUnsavedChanges } = useAppStore();

  const handlePrintingChange = ({ target: { name, value } }) => {
    setPrintingType((prev) => ({...prev,[name]: value}));
    const {calculatedPrice} = calculatePrice(productData.price, quantity, printingType, printingSides, colorNumber, productData?.printingType);
    setTotalPrice(calculatedPrice);
  };

  const handleUploadDesign = () => {
    const editorProductId = localStorage.getItem("editorProduct");
    if (editorProductId || (frontUploadedImage || backUploadedImage)) {
      setDialogModalOpen({open: true, text: "Upload Design"});
    } else {
      setHandleDialogModal({ openUploadDesign: true });
    }
  };
  const handleRadioChange = (event) => {
    const value = event.target.value;
    setSelectedOption('0');
    if (value === '0') {
      setPrintingSides('0');
      setIsFrontSide(false);
      setIsBackSide(false);
      setFrontUploadedLogo(null);
      setBackUploadedLogo(null);
      setFrontUploadedImage(null);
      setBackUploadedImage(null);
      setPrintingType({});
      setColorNumber(1);
    }
    const {calculatedPrice} = calculatePrice(productData.price, quantity, {front:'',back:''}, '0', colorNumber, productData?.printingType);
    setTotalPrice(calculatedPrice);
  };

  const handleCheckboxChange = (event) => {
    const { checked, name, value } = event.target;
    let nextIsFrontSide = isFrontSide;
    let nextIsBackSide = isBackSide;
    if (name === 'front') {
      nextIsFrontSide = checked;
      setIsFrontSide(checked);
    }
    if (name === 'back') {
      nextIsBackSide = checked;
      setIsBackSide(checked);
    }

    if(name == 'front' && !checked){
      setFrontUploadedLogo(null);
      setFrontUploadedImage(null);
    }

    if(name == 'back' && !checked){
      setBackUploadedImage(null);
      setBackUploadedLogo(null);
    }

    let priceResult = { calculatedPrice: 0, basePrice: 0 };

    if (nextIsFrontSide && nextIsBackSide) {
      setPrintingSides('2');
      setSelectedOption('1');
      setPrintingType((prev) => ({...prev,[name]: ''}));
      priceResult = calculatePrice(productData.price, quantity, { ...printingType, [name]: name }, '2',colorNumber, productData?.printingType);
    } else if (nextIsFrontSide || nextIsBackSide) {
      setPrintingSides('1');
      setSelectedOption('1');
      setPrintingType((prev) => ({...prev,[name]: ''}));
      priceResult = calculatePrice(productData.price, quantity, printingType, '1',colorNumber, productData?.printingType);
    } else {
      setPrintingSides('0');
      setSelectedOption('0');
      priceResult = calculatePrice(productData.price, quantity, printingType, '0',0,productData?.printingType);
    }
    setTotalPrice(priceResult.calculatedPrice);
  };

  const handleColorNumberChange =({target})=>{
    setColorNumber(target.value);
    const {calculatedPrice} = calculatePrice(productData.price, quantity, printingType, printingSides,target.value, productData?.printingType);
    setTotalPrice(calculatedPrice);
  }

  const acceptedFiles = useAppStore(state => state.uploadedFiles);
  const setAcceptedFiles = useAppStore(state => state.setUploadedFiles);
  const setFrontUploadedImage = useAppStore(state => state.setFrontUploadedImage);
  const setBackUploadedImage = useAppStore(state => state.setBackUploadedImage);

  /**
   * open custom editor
   */
  // const customEditor = async () => {
  //   const updateFrontPromise = new Promise(resolve => {
  //     setCurrentFront(`https://custorybucket.s3.ap-southeast-1.amazonaws.com/Products/${productData.id}/${selectedColor}/front.jpg`);
  //     resolve();
  //   });
  //   const updateBackPromise = new Promise(resolve => {
  //     setCurrentBack(`https://custorybucket.s3.ap-southeast-1.amazonaws.com/Products/${productData.id}/${selectedColor}/back.jpg`);
  //     resolve();
  //   });
  //   const updateEditorProduct = new Promise(resolve => {
  //     setCurrentEditorProduct(productData.id);
  //     resolve();
  //   });
  //   await Promise.all([updateFrontPromise, updateBackPromise, updateEditorProduct]);
  //   window.location.href = '/editor';
  // }

  // const handleEditor = () => {
  //   if (!isLoggedin) {
  //     toast.error('Please login to use our custom editor');
  //     return;
  //   }
  //   if (frontUploadedImage || backUploadedImage) {
  //     setDialogModalOpen({open: true, text: 'Custom Editor'});
  //   }else{
  //     customEditor();
  //     setHasUnsavedChanges(true);
  //   }
  // };

  useEffect(()=>{
    const editorProductId = localStorage.getItem("editorProduct");
    const editedFrontImage = localStorage.getItem("frontImage");
    if(editorProductId && editedFrontImage?.includes('/Products/')){
      resetImages();
    }

    if(editorProductId || (frontUploadedImage || backUploadedImage)){
      setHasUnsavedChanges(true)
    }

    // if(openCustomEditor) {
    //   customEditor();
    // }
   }, [openCustomEditor, setOpenCustomEditor])

  const resetImages = () => {
    localStorage.removeItem('editorProduct');
    localStorage.removeItem('frontImage');
    localStorage.removeItem('backImage');
    setFrontUploadedImage(null);
    setBackUploadedImage(null);
    setAcceptedFiles([]);
  };

  const onDrop = useCallback((acceptedFiles) => {
    setAcceptedFiles(acceptedFiles);
  }, []);

  const StyledDropzone = () => {
    const {
      getRootProps,
      getInputProps,
      isFocused,
      isDragAccept,
      isDragReject,
    } = useDropzone({ accept: { 'image/*': [] }, onDrop });

    const style = useMemo(() => ({
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '20px',
      borderWidth: 2,
      borderRadius: 2,
      borderColor: '#eeeeee',
      borderStyle: 'dashed',
      backgroundColor: '#fafafa',
      color: '#bdbdbd',
      outline: 'none',
      transition: 'border .24s ease-in-out',
      ...(isFocused ? { borderColor: '#2196f3' } : {}),
      ...(isDragAccept ? { borderColor: '#00e676' } : {}),
      ...(isDragReject ? { borderColor: '#ff1744' } : {})
    }), [isFocused, isDragAccept, isDragReject]);

    const files = Array.isArray(acceptedFiles) ? acceptedFiles.map(file => (
      <li key={file.path || file.name}>
        {file.path || file.name}
      </li>
    )) : [];

    return (
      <div>
        <div className="font-bold text-[16px] pt-2 flex gap-2 items-center my-4">
          <span className="w-[20px] h-[20px] flex items-center justify-center rounded text-white text-[12px] bg-custoryPrimary">
            2
          </span>
          Printing Sides
        </div>
        <span className="text-xs font-normal my-3 block">
          Select all areas which you would like to design
        </span>
        <Box className="flex gap-[10px] max-sm:flex-wrap max-sm:w-full">
          {/* No Print Option */}
          <Box className="border border-orange-500 rounded-lg p-[10px] bg-orange-50 w-[240px] max-sm:w-full flex items-start">
            <FormControlLabel
              value="0"
              name="selectedOption"
              control={
                <Radio
                  sx={{ padding: 0, paddingTop: 0,paddingLeft: 1.25 }}
                  color="warning"
                  checked={selectedOption === '0' && printingSides == '0'}
                  onChange={handleRadioChange}
                />
              }
            />
            <Box className="ml-[-10px] mt-[-5px]">
              <span className="font-bold text-sm">No Print</span>
              <p className="text-xs font-normal">
                There will be no print on the product.
              </p>
            </Box>
          </Box>

          {/* Front Print Option */}
          <Box className="border border-orange-500 rounded-lg p-[10px] bg-orange-50 w-[240px] max-sm:w-full flex items-start">
            <FormControlLabel
              value="1"
              name="front"
              control={
                <Checkbox
                  sx={{ padding: 0, paddingTop: 0,paddingLeft: 1.25 }}
                  color="warning"
                  checked={isFrontSide}
                  onChange={(event) => handleCheckboxChange(event)}
                />
              }
            />
            <Box className="ml-[-10px] mt-[-5px]">
              <span className="font-bold text-sm">Front Print</span>
              <p className="text-xs font-normal">
                The front side of the product will be printed with your design.
              </p>
            </Box>
          </Box>

          {/* Back Print Option */}
          <Box className="border border-orange-500 rounded-lg p-[10px] bg-orange-50 w-[240px] max-sm:w-full flex items-start">
            <FormControlLabel
              value = '1'
              name="back"
              control={
                <Checkbox
                  sx={{ padding: 0, paddingTop: 0,paddingLeft: 1.25}}
                  color="warning"
                  checked={isBackSide}
                  onChange={(event) => handleCheckboxChange(event)}
                />
              }
            />
            <Box className="ml-[-10px] mt-[-5px]">
              <span className="font-bold text-sm">Back Print</span>
              <p className="text-xs font-normal">
                The back side of the product will be printed with your design.
              </p>
            </Box>
          </Box>
        </Box>

        <div className="font-bold text-[16px] pt-2 flex gap-2 items-center my-4">
          <span className="w-[20px] h-[20px] flex items-center justify-center rounded text-white text-[12px] bg-custoryPrimary">
            3
          </span>
          Printing Type
        </div>
        {isFrontSide && <PrintingOption side="front" printingDescriptions={printingDescriptions} printingType={printingType} printingSides={printingSides} productData={productData} handlePrintingChange={handlePrintingChange} quantity={quantity} colorNumber={colorNumber} handleColorNumberChange={handleColorNumberChange} setExampleModal={setExampleModal}/>}
        {isBackSide && <PrintingOption side="back" printingDescriptions={printingDescriptions} printingType={printingType} printingSides={printingSides} productData={productData} handlePrintingChange={handlePrintingChange} quantity={quantity} colorNumber={colorNumber} handleColorNumberChange={handleColorNumberChange} setExampleModal={setExampleModal}/>}

        <ExampleModal open={exampleModal.open} title={exampleModal?.typeName} handleClose={()=>setExampleModal({open:false})}/>

        <div className="font-bold text-[16px] pt-2 flex gap-2 items-center my-4">
          <span className="w-[20px] h-[20px] flex items-center justify-center rounded text-white text-[12px] bg-custoryPrimary">
            4
          </span>
          Upload your Design
        </div>
        <p className="text-xs font-normal my-3 block">
        <span className="mb-3 block">Download the appropriate templates below and place your design onto the downloaded template.</span>
          Accepted File Types: <b>.AI</b> or <b>.PDF</b> format<br></br>
          <p>Recommended Image Quality: Use high-resolution images for optimal print quality.</p>
          <p>File Dimensions: Ensure your design matches the specified dimensions of the template for best results.</p>
          <p className="mt-3">For the best print results, please adhere to these quality standards. Any uploaded files that do not conform to our product template will be rejected. If you need assistance, refer to our design <span className="text-[#FF6600]">guidelines</span> for helpful tips or contact our <span className="text-[#FF6600]">support</span> team for further help.
            &nbsp;<span className="text-[12px] font-normal underline text-custoryPrimary text-end leading-none w-fit cursor-pointer" onClick={()=>setExampleModal({open:true, typeName:'Design Submission Guide'})}>Example</span>
          </p>
        </p>
        {/* <div className="mr-1 flex items-center">
          <button
            onClick={handleUploadDesign}
            className="ml-2 text-gray-500 border rounded border-black px-2 py-1 text-sm text-center"
          >
            Upload your own design
          </button>
          <IoIosInformationCircleOutline
            data-tooltip-html="
          <div>
              <h4>Instructions:</h4>
              <ol>
                <li>Download our product template from the provided link.</li>
                <li>Ensure your design follows our product template guidelines.</li>
                <li>Upload your finalized design files using the options below.</li>
              </ol>
            </div>"
            data-tooltip-id="my-tooltip-2"
            className="ml-2 cursor-pointer"
          ></IoIosInformationCircleOutline>
          <ReactTooltip id="my-tooltip-2" place="top" />
          <div className="font-bold text-sm px-4">OR</div>
          <span className="ml-2 text-white bg-custoryPrimary border rounded border-black px-2 py-1 text-sm text-center">
            <button onClick={handleEditor}>Use our custom editor</button>
          </span>
          <button
            onClick={resetImages}
            className="ml-2 text-blue-400 px-2 py-1 text-sm text-center"
          >
            Reset
          </button>
        </div> */}

        <UploadDesign selectedColor={selectedColor} productData={productData} setIsCustomUpload={setIsCustomUpload}
          isFrontSide = {isFrontSide}
          isBackSide = {isBackSide}
          printingType = {printingType}
        />
    </div>
    );
  };

  return <StyledDropzone />;
};

export default ShirtProductDetailDesign;