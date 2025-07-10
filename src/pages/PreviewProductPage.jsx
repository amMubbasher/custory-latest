import React, { useState,useEffect } from 'react'
import Layout from '../components/Layout/Layout'
import ImageCarousel from '../components/Shop/ImageCarousel'
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { Radio, RadioGroup, Checkbox, Box, FormControlLabel, FormControl, Select, MenuItem} from "@mui/material";
import PrintingOption, { Feature } from '../components/Shop/PrintingOption'
// import { Box, Checkbox, FormControlLabel, Radio, RadioGroup } from '@mui/material'
import { Tooltip as ReactTooltip } from "react-tooltip";
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { MdOutlineFileDownload,MdClose } from "react-icons/md";
import { downloadImageFromS3 } from '../utils/functions/S3Functions'
import { ExampleModal } from '../components/Shop/ShirtProductDetailDesign'
import useAppStore from '../hooks/useAppStore'
import { printingDescriptions } from '../utils/Enums';

const PrintingTypeOption = ({addProductPayload, printingDescriptions, setExampleModal, side})=>{
  const [dropMenu, setDropMenu] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState({});


  const groupedPrintingTypes = addProductPayload.printingType.reduce((acc, option) => {
    if (!acc[option.printingType]) {
      acc[option.printingType] = [];
    }
    acc[option.printingType].push(option);
    return acc;
  }, {});

  useEffect(() => {
    Object.keys(groupedPrintingTypes).forEach((type) => {
      if (!selectedPrices[type]) {
        setSelectedPrices((prev) => ({
          ...prev,
          [type]: `+${(Number(groupedPrintingTypes[type][0]?.price) / 100).toFixed(2)} ${groupedPrintingTypes[type][0]?.unit} ${groupedPrintingTypes[type][0]?.description ? `(${groupedPrintingTypes[type][0]?.description} )`: ''}`,
        }));
      }
    });
  }, [addProductPayload.printingType]); 

  return (
    <Box>
      <span className="text-sm font-bold my-3 block">{side}</span>
      <RadioGroup
        className={`gap-[10px] max-md:justify-center`}
        row
        aria-labelledby="printingType"
        defaultValue="false"
      >
      {Object.entries(groupedPrintingTypes).map(([printingType, options], i) => (
        <Box key={i} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Box
                key={i}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Box
                  className={`text-base cursor-pointer border border-orange-500 rounded-lg py-2 px-[5px] bg-orange-50 w-[240px] h-[250px] flex items-start relative`}
                >
                  <FormControlLabel
                    value={printingType}
                    control={
                      <Radio
                        sx={{ padding: 0, paddingTop: 0, paddingLeft: 1.25 }}
                        color="warning"
                      />
                    }
                    label=""
                  />
                  <Box className="flex flex-col justify-between h-full w-full">
                    <Box className="ml-[-12px] mt-[-3px]">
                      <span className="font-bold text-sm whitespace-nowrap">
                        {printingType}
                        {[
                          "Heat Transfer",
                          "Screen Printing",
                          "Embroidery",
                        ].includes(printingType) && (
                          <IoIosInformationCircleOutline
                            data-tooltip-html={`<div>${
                              printingType === "Heat Transfer"
                                ? "Experience vibrant, multi-color designs with our full-color printing option."
                                : printingType === "Screen Printing"
                                ? "Each color in your design incurs a charge of $0.80, with the option to include up to 10 different single colors."
                                : "Perfect for designs that utilize 1 to 3 colors, priced at $1.30 per print."
                            }</div>`}
                            data-tooltip-id={`info-message-${i + 1}`}
                            className="cursor-pointer inline mt-[-3px]"
                          />
                        )}
                        <ReactTooltip
                          id={`info-message-${i + 1}`}
                          place="top"
                        />
                      </span>

                      {/* Price Dropdown */}
                      <div className="relative bg-white rounded-lg my-2">
                        <div className="flex justify-between items-center text-xs font-normal relative py-1 rounded-lg px-[10px] text-[#918790] border-2 w-full">
                          <div className="flex-1 before:content-['✔'] before:absolute before:left-1 font-normal">
                            <span className="block pl-2">
                              {selectedPrices[printingType] || 'select price'}
                            </span>
                            <span className="block">
                            {printingDescriptions[printingType?.toLowerCase()]?.minPrompt !== 0
                              ? `Minimum ${printingDescriptions[printingType.toLowerCase()]?.minPrompt} units`
                              : "No Minimum Order Quantity"}
                            </span>
                          </div>
                          <span
                            className="absolute top-[15px] right-[13px] cursor-pointer"
                            onClick={() => {
                              if (!dropMenu.includes(i)) {
                                setDropMenu([...dropMenu, i]);
                              } else {
                                setDropMenu(dropMenu.filter((item) => item !== i));
                              }
                            }}
                          >
                            {!dropMenu.includes(i) ? <FaChevronDown size={10} /> : <FaChevronUp size={10} />}
                          </span>
                        </div>

                        {/* Dropdown Items */}
                        <div className={`${dropMenu.includes(i) ? 'bg-[#e5e5e4] rounded-lg absolute top-[40px] w-full flex flex-col max-h-20 overflow-y-auto' : 'hidden'}`}>
                          {options.filter((_, index) => index !== 0).map((option, index) => (
                            <div
                              key={index}
                              className="text-xs w-full py-1 px-[10px] rounded-lg font-semibold hover:bg-custoryPrimary cursor-pointer"
                              onClick={() => {
                                // setSelectedPrices(prev => ({
                                //   ...prev,
                                //   [printingType]: `+${(Number(option?.price) / 100).toFixed(2)} ${option?.unit} ${option?.description ? `(${option?.description} )`: ''}`
                                // }));
                                setDropMenu(dropMenu.filter(item => item !== i)); // Close dropdown after selection
                              }}
                            >
                              <span className="block pl-2">
                                +${(Number(option?.price) / 100).toFixed(2)} {option?.unit} {option?.description ? `(${option?.description} )`: ''}
                              </span>
                              <span className="block">
                                {printingDescriptions[printingType?.toLowerCase()]?.minPrompt !== 0
                                  ? `Min. ${printingDescriptions[printingType?.toLowerCase()]?.minPrompt} units`
                                  : "No Minimum Order Quantity"}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <p className="text-sm font-bold my-1">
                        Suitable for all designs
                      </p>

                      {/* Features Based on Printing Type */}
                          {printingType === "Heat Transfer" && (
                            <>
                              <Feature label="Unlimited colors in your design" />
                              <Feature label="Short lifespan" icon="cross" />
                            </>
                          )}
                          {printingType === "Screen Printing" && (
                            <>
                              <Feature label="High Print Definition" />
                              <Feature label="Long lifespan" />
                              <div className="ml-[-10px] mt-1 absolute left-[13px] bottom-[18px] text-center px-3">
                                <p className="text-[10px] font-normal leading-none">
                                  Select the number of colors in your design.
                                  Incorrect numbers will be rejected.
                                </p>
                                <select
                                  className="text-sm pl-[10px] pr-[5px] text-white bg-custoryPrimary rounded-xl"
                                  onChange={(event) => {}}
                                  value={1}
                                  defaultValue={1}
                                >
                                  {[...Array(7).keys()].map((num) => (
                                    <option key={num + 1} value={num + 1}>
                                      {num + 1}
                                    </option>
                                  ))}
                                </select>
                                <span className="text-xs font-normal ml-1">
                                  +${(Number(options[0]?.price) * 1) / 100}
                                </span>
                              </div>
                            </>
                          )}
                          {printingType === "Embroidery" && (
                            <>
                              <Feature label="Up to 3 Colors in your design" />
                              <Feature label="High Print Definition" />
                              <Feature label="Long lifespan" />
                            </>
                          )}
                        </Box>

                        {/* Example Link */}
                        <div className="flex justify-end">
                          <span
                            className="text-[12px] font-normal block underline text-custoryPrimary text-end leading-none w-fit relative z-10"
                            onClick={() =>
                              setExampleModal({
                                open: true,
                                typeName: printingType,
                              })
                            }
                          >
                            Example
                          </span>
                        </div>
                      </Box>

                      {/* Best Seller Tag */}
                      {printingType === "Heat Transfer" && (
                        <span className="absolute top-[-10px] right-0 bg-custoryPrimary rounded text-xs px-1 text-white">
                          Best Seller
                        </span>
                      )}
                    </Box>
                  </Box>
            </Box>
                )
              )}
      </RadioGroup>
    </Box>
  );
}


const PreviewProductPage = () => {
  const addProductPayload = useAppStore((state)=> state.addProductPayload)
  const [exampleModal, setExampleModal] = useState({open:false, typeName:''});
  const [selectedColor, setSelectedColor] = useState(addProductPayload?.colours[0].color);
  const [isFrontSide, setIsFrontSide] = useState(false);
  const [isBackSide, setIsBackSide] = useState(false);

  const handleCheckboxChange = (event) => {
      const { checked, name } = event.target;
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
  };
  
  return (
    <Layout>
      <div className="grid grid-flow-col gap-4 relative items-start max-2xl:gap-24 max-xl:gap-10 max-md:block mt-10 pb-6">
        <section className="row-span-3 h-[500px] max-md:min-w-[auto] min-w-[400px]">
          <div id="customDesign" className="w-full max-lg:order-1 max-lg:h-[500px] max-xs:h-[250px] h-[520px] max-w-lg px-10 m-auto relative">
            <ImageCarousel products={{}} selectedColor={selectedColor} colours = {addProductPayload?.colours}/>
          </div>
        </section>
        <section className="row-span-2 max-md:mt-12 max-lg:mx-10 max-sm:mx-10 max-sm:margin-auto mr-6 w-[82%] max-md:w-auto">
          <div className="max-md:pt-3 border-b-[1px] pb-3 border-gray-400">
            <div className="max-md:text-2xl text-2xl font-bold max-md:pb-1">
                {addProductPayload?.title}
            </div>
          </div>

          <div className="text-lg font-bold items-center py-3  ">
            {/* Shirt Information */}
            <div className='border-b-[2px]'>
              <div className="text-lg font-normal items-center mt-2 mb-2">
                <span className="rounded-lg">{addProductPayload?.materialType} {addProductPayload?.weight ? <>({addProductPayload?.weight * 1000}g)</> : null}</span>
              </div>
              <div className='text-sm font-semibold mt-2'>
                <span className="text-sm font-normal rounded-lg">{addProductPayload?.extraDescription}</span>
              </div>
              <div className='font-bold my-2'>
                <h1 className='font-bold text-[20px]'>Need a Quotation?</h1>
                <span className="text-sm font-normal">Complete the order and access a PDF copy of the quotation on the checkout page</span>
              </div>
            </div>
            <div className='font-bold text-lg pt-2'>
              Configure your {addProductPayload?.title}
            </div>
            <div className='font-bold text-[16px] pt-2 flex gap-2 items-center mb-4 mt-1'>
              <span className='w-[20px] h-[20px] flex items-center justify-center rounded text-white text-[12px] bg-custoryPrimary'>1</span> Product Colour
            </div>
            <div className='flex mt-2 flex-wrap'>
              {addProductPayload?.colours?.map((color, index) => (
                <div key={index} style={{ width: '14px', margin: '5px' }}>
                  <button
                    className="w-full h-full rounded-full outline-none"
                    style={{ backgroundColor: color.color, width: '20px', height: '20px', border: '1px solid black' }}
                    onClick={() => setSelectedColor(color.color)}
                  ></button>
                </div>
              ))}
            </div>
            <div className='font-bold text-xs mb-2 flex flex-1 items-center'>
                <span className='mr-2'>Selected Colour:</span>
                <button className="w-full h-full rounded-full"
                  style={{ backgroundColor: selectedColor, width: '20px', height: '20px', border: '1px solid black' }}>
                </button>
            </div>
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
                        checked={!isFrontSide && !isBackSide}
                        onChange={()=>{
                            setIsFrontSide(false);
                            setIsBackSide(false);
                        }}
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
                {isFrontSide && <PrintingTypeOption addProductPayload ={addProductPayload} printingDescriptions = {printingDescriptions} setExampleModal = {setExampleModal} side={'Front Side'} /> }
                {isBackSide && <PrintingTypeOption addProductPayload ={addProductPayload} printingDescriptions = {printingDescriptions} setExampleModal = {setExampleModal} side={'Back Side'}/> }

                <ExampleModal open={exampleModal.open} title={exampleModal?.typeName} handleClose={()=>setExampleModal({open:false})}/>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center my-4">
            <div className='font-bold text-[16px] pt-2 flex gap-2 items-center'>
                <span className='w-[20px] h-[20px] flex items-center justify-center rounded text-white text-[12px] bg-custoryPrimary'>4</span> Select Sizes   <IoIosInformationCircleOutline
                    data-tooltip-html="<div> Embroidery requires a minimum quantity of 30 Units. </div>"
                    data-tooltip-id="info-message"
                    className="cursor-pointer text-custoryPrimary"
                >
                </IoIosInformationCircleOutline>
                <ReactTooltip id="info-message" place="top" />
                </div>
                <div className="font-normal text-xs underline cursor-pointer" onClick={()=>{}}>Sizing Chart</div>
            </div>

            <div className="flex items-center gap-3 max-md:flex-wrap">
                {addProductPayload?.sizes?.map((sizeOption, index) => (
                  <div key={index} className="flex items-center">
                      <div className="relative">
                      <span className='absolute top-[10px] left-[13px]'>{sizeOption.toUpperCase()}</span>
                      <select
                          id={`size-${index}`}
                          className={`text-sm rounded-md py-[10px] pr-[5px] dark:bg-orange-50 min-w-[97px]  ${sizeOption > 3 ? 'pl-[60px] text-end' : 'pl-[40px] text-center'}`}
                          value={''}
                          onChange={(event) => {}}
                      >
                          <option value="">0</option>
                          {[...Array(999).keys()].map((num) => (
                          <option key={num + 1} value={(num + 1).toString()}>
                              {num + 1}
                          </option>
                          ))}
                      </select>
                      </div>
                  </div>
                ))}
            </div>
                {/* Modal */}
              {false && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                    </div>
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all my-8 sm:align-middle sm:max-w-[850px] sm:h-[560px] sm:w-full p-4 mt-20">
                    <div className='flex items-center justify-end gap-2 px-3'>
                        <button className='outline-none' onClick={() => downloadImageFromS3("custorybucket", "Products/sizing.png",'Size Chart')}><MdOutlineFileDownload className='inline ml-[4px] outline-none border-none' size={25}/></button>
                        <button className='outline-none' onClick={toggleModal}><MdClose className='inline ml-[4px]' size={25}/></button>
                    </div>
                    <img src={`https://custorybucket.s3.ap-southeast-1.amazonaws.com/Products/2ff257ea-a2b3-4686-a3a3-58d12b05abb6/sizing.png`} alt="" className='sm:w-1/2 mx-auto sm:mt-[-15px] mt-[5px]' onContextMenu={(e) => e.preventDefault()} />
                    </div>
                </div>
                </div>
              )}
            </div>
        </section>
      </div>
    </Layout>
  )
}

export default PreviewProductPage
