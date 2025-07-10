import React, { useEffect, useState } from 'react'
import { Radio, RadioGroup, Box, FormControlLabel, FormControl, Select, MenuItem} from "@mui/material";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { FaChevronUp, FaChevronDown } from "react-icons/fa";


export const Feature = ({ label, icon = "check" }) => (
  <div className="flex gap-2 items-center my-[10px]">
    <span>
      <svg
        width={icon === "check" ? "15" : "15"}
        height={icon === "check" ? "11" : "11"}
        viewBox="0 0 15 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={icon === "check" 
              ? "M5.12129 8.70149L1.78038 5.25373L0.666748 6.40299L5.12129 11L14.6667 1.14925L13.5531 0L5.12129 8.70149Z"
              : "M11.0002 1.10786L9.89239 0L5.50024 4.39214L1.1081 0L0.000244141 1.10786L4.39239 5.5L0.000244141 9.89214L1.1081 11L5.50024 6.60786L9.89239 11L11.0002 9.89214L6.6081 5.5L11.0002 1.10786Z"
            }
          fill="#FF6600"
        />
      </svg>
    </span>
    <span className="text-xs font-normal">{label}</span>
  </div>
);

const PrintingOption = ({ side, printingType, productData, handlePrintingChange, quantity, printingDescriptions, colorNumber,handleColorNumberChange,setExampleModal }) => {
  const [dropMenu, setDropMenu] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState({});  
  const [selectedUnit, setSelectedUnit] = useState(0);
  
  const groupedPrintingTypes = productData.printingType.reduce((acc, option) => {
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
      if(type?.toLowerCase() == 'screen printing'){
        setSelectedUnit(groupedPrintingTypes[type][0]?.price)
      }else{
        setSelectedUnit(80)
      }
    });
  }, [productData.printingType]);

  return (
      <Box>
        <span className="text-sm font-bold my-3 block">{side === 'front' ? 'Front Print' : 'Back Print'}</span>
        <RadioGroup
          className={`gap-[10px] max-md:justify-center`}
          row
          aria-labelledby="printingType"
          defaultValue="false"
          name={side}
          value={printingType[side]}
          onChange={handlePrintingChange}
        >
          {Object.entries(groupedPrintingTypes).map(([printingType, option], i) => (
            <Box key={i} sx={{ display: "flex", flexDirection: "row", alignItems: "center"}}>
              <Box
                className={`text-base cursor-pointer border border-orange-500 rounded-lg py-2 px-[5px] bg-orange-50 w-[240px] h-[250px] flex items-start relative ${
                 !window.location.href.includes('/previewProduct/product') && quantity < printingDescriptions[printingType]?.minPrompt ? " text-neutral-400" : ""
                }`}
              >
                <FormControlLabel
                  value={printingType}
                  control={<Radio sx={{ padding: 0, paddingTop: 0,paddingLeft: 1.25 }} color="warning" />}
                  disabled={quantity < printingDescriptions[printingType?.toLowerCase()]?.minPrompt && !window.location.href.includes('/previewProduct/product')}
                  label=""
                />
                <Box className="flex flex-col justify-between h-full w-full">
                  <Box className="ml-[-12px] mt-[-3px]">
                    <span className="font-bold text-sm whitespace-nowrap capitalize">{printingType} {['heat Transfer', 'screen Printing', 'embroidery'].includes(printingType?.toLowerCase()) && <IoIosInformationCircleOutline
                        data-tooltip-html={`<div>${printingType?.toLowerCase() == 'heat transfer' ? 'Experience vibrant, multi-color designs with our full-color printing option.':
                          printingType?.toLowerCase() == 'screen printing' ? 'Each color in your design incurs a charge of $0.80, with the option to include up to 10 different single colors.':
                          printingType?.toLowerCase() == 'embroidery' && 'Perfect for designs that utilize 1 to 3 colors, priced at $1.30 per print.'
                        }</div>`}
                        data-tooltip-id={`info-message-${i+1}`}
                        className="cursor-pointer inline mt-[-3px]"
                        ></IoIosInformationCircleOutline>
                      }
                      <ReactTooltip id={`info-message-${i+1}`} place="top" />
                    </span>
                    <div className='relative bg-white rounded-lg my-2'>
                      <div className=' flex justify-between items-center text-xs font-normal relative py-1 rounded-lg px-[10px] border-2 text-[#918790] w-full'>
                        <div className='flex-1 before:content-["✔"] before:absolute before:left-1'>
                          <span className="block pl-2">
                            {selectedPrices[printingType]}
                          </span>
                          <span className="block">
                            {printingDescriptions[printingType?.toLowerCase()]?.minPrompt !== 0
                              ? `Minimum ${printingDescriptions[printingType.toLowerCase()]?.minPrompt} units`
                              : "No Minimum Order Quantity"}
                          </span>
                        </div>
                        <span className='absolute top-[15px] right-[13px]' onClick={()=> {
                          if (!dropMenu.includes(i)) {
                            setDropMenu([...dropMenu, i]);
                          } else {
                            const filterDropMenu = dropMenu.filter(
                              (item) => item !== i
                            );
                            setDropMenu([...filterDropMenu]);
                          }
                        }}>
                          {!dropMenu.includes(i) ? (<FaChevronDown size={10}/>) : (<FaChevronUp size={10}/>)}
                        </span>
                      </div>
                      <div className={`${dropMenu.includes(i) ? 'bg-[#e5e5e4] rounded-lg absolute top-[40px] w-full flex flex-col max-h-20 overflow-y-auto' : 'hidden'}`}>
                        {option.filter((_, index) => index !== 0).map((opt, index) => (
                          <div key={index} className="w-full p-[5px] rounded-lg hover:bg-custoryPrimary "
                            onClick={() => {
                              // setSelectedPrices((prev) => ({
                              //   ...prev,
                              //   [printingType]: `+${(Number(opt?.price) / 100).toFixed(2)} ${opt?.unit} ${
                              //     opt?.description ? `(${opt?.description})` : ""
                              //   }`,
                              // }));
                              // setSelectedUnit(opt?.price);
                              setDropMenu(dropMenu.filter((item) => item !== i));
                            }}
                          >
                            <div className="text-xs font-semibold py-1 pl-[8px] pr-[10px]">
                              <span className="block pl-2">
                                +${(Number(opt?.price) / 100).toFixed(2)} {opt?.unit}{" "} {opt?.description ? `(${opt?.description})` : ""}
                              </span>
                              <span className="block">
                                {printingDescriptions[printingType?.toLowerCase()]?.minPrompt !== 0
                                  ? `Min. ${printingDescriptions[printingType?.toLowerCase()]?.minPrompt} units`
                                  : "No Minimum Order Quantity"}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  
                    <p className="text-sm font-bold my-1">Suitable for all designs</p>
                    {printingType?.toLowerCase() === 'heat transfer' && (
                      <>
                        <Feature label="Unlimited colors in your design" />
                        <Feature label="Short lifespan" icon="cross" />
                      </>
                    )}
                    {printingType?.toLowerCase() === 'screen printing' ? (
                      <>
                        <Feature label="High Print Definition" />
                        <Feature label="Long lifespan" />
                        <div className="ml-[-10px] mt-1 absolute left-[13px] bottom-[18px] text-center px-3">
                          <p className="text-[10px] font-normal leading-none">
                            Select the number of colors in your design. Incorrect numbers will be rejected.
                          </p>
                          <select
                            // disabled={quantity < printingDescriptions[printingType?.toLowerCase()]?.minPrompt}
                            disabled
                            className="text-sm pl-[10px] pr-[5px] text-white bg-custoryPrimary rounded-xl"
                            onChange={(event)=>handleColorNumberChange(event)}
                            value={colorNumber}
                            defaultValue={1}
                          >
                            {[...Array(7).keys()].map((num) => (
                              <option key={num + 1} value={num + 1}>
                                {num + 1}
                              </option>
                            ))}
                          </select>
                          <span className="text-xs font-normal ml-1">+${(Number(selectedUnit) * colorNumber) / 100}</span>
                        </div>
                      </>
                    ) : printingType?.toLowerCase() === 'embroidery' && (
                      <>
                        <Feature label="Up to 3 Colors in your design" />
                        <Feature label="High Print Definition" />
                        <Feature label="Long lifespan" />
                      </>
                    ) }
                  </Box>
                  <div className='flex justify-end'>
                  <span className="text-[12px] font-normal block underline text-custoryPrimary text-end leading-none w-fit relative z-10" onClick={()=>setExampleModal({open:true, typeName:printingType})}>Example</span>
                  </div>
                </Box>
                {printingType?.toLowerCase() === 'heat transfer' && (
                  <span className="absolute top-[-10px] right-0 bg-custoryPrimary rounded text-xs px-1 text-white">
                    Best Seller
                  </span>
                )}
              </Box>
            </Box>
          ))}
        </RadioGroup>
      </Box>
  )
}

export default PrintingOption;