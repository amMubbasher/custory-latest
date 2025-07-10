import React, { useState } from "react";
import domtoimage from 'dom-to-image';
import { toast } from "react-hot-toast";
import { FileCopyOutlined, ShoppingBagOutlined } from "@mui/icons-material";
import useAppStore from '../../hooks/useAppStore';

const ImageCarousel = ({ products, selectedColor, colours }) => {
  let getColours = colours?.find((x) => x.color === selectedColor); 
  let images = [
    `https://custorybucket.s3.ap-southeast-1.amazonaws.com/Products/${products.id}/${selectedColor}/front.jpg`,
    `https://custorybucket.s3.ap-southeast-1.amazonaws.com/Products/${products.id}/${selectedColor}/back.jpg`
  ];
  const [currentSlideIndex, setCurrentSlideIndex] = useState(1);

  const finalImages = images.map((image, index) => {
    if (index === 0 && !image) {
      return `https://custorybucket.s3.ap-southeast-1.amazonaws.com/Products/${products.id}/${selectedColor}/front.jpg`;
    }
    if (index === 1 && !image) {
      return `https://custorybucket.s3.ap-southeast-1.amazonaws.com/Products/${products.id}/${selectedColor}/back.jpg`;
    }
    return image;
  });

  const handleCopyToClipboard = async () => {
    try {
      const customDesignDiv = document.getElementById('customDesign');
      if (!customDesignDiv) {
        console.error('Could not find the target div.');
        return;
      }
      const blob = await domtoimage.toBlob(customDesignDiv);
      if (blob) {
        navigator.clipboard.write([
          new ClipboardItem({
            'image/png': blob,
          }),
        ]);
        toast.success('Image copied to clipboard!');
      } else {
        console.error('Failed to create blob from dom-to-image.');
        toast.error('Failed to copy image to clipboard. Please try again.');
      }
    } catch (error) {
      console.error('Failed to copy image to clipboard', error);
      toast.error('Failed to copy image to clipboard. Please try again.');
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        {colours?.length > 0 ? 
          <img src={getColours?.frontImage} style={{ width: "386px", height: "386px" }} onContextMenu={(e) => e.preventDefault()}/>
          :
          <img src={finalImages[currentSlideIndex - 1]} style={{ width: "386px", height: "386px" }} onContextMenu={(e) => e.preventDefault()}/>
        }
      <span className="h-full w-full absolute top-0 break-words overflow-hidden flex justify-around flex-col">
        <div className="flex items-center justify-between w-full">
        <span className="text-sm mx-[9px] my-[15px] inline-block rotate-[-45deg] select-none text-[#a2a2a2]">www.custory.co</span>
        <span className="text-sm mx-[9px] my-[15px] inline-block rotate-[-45deg] select-none text-[#a2a2a2]">www.custory.co</span>
        <span className="text-sm mx-[9px] my-[15px] inline-block rotate-[-45deg] select-none text-[#a2a2a2]">www.custory.co</span>
        </div>
        <div className="flex items-center justify-center w-full gap-3">
        <span className="text-sm mx-[9px] my-[15px] inline-block rotate-[-45deg] select-none text-[#a2a2a2]">www.custory.co</span>
        <span className="text-sm mx-[9px] my-[15px] inline-block rotate-[-45deg] select-none text-[#a2a2a2]">www.custory.co</span>
        </div>
        <div className="flex items-center justify-between w-full">
        <span className="text-sm mx-[9px] my-[15px] inline-block rotate-[-45deg] select-none text-[#a2a2a2]">www.custory.co</span>
        <span className="text-sm mx-[9px] my-[15px] inline-block rotate-[-45deg] select-none text-[#a2a2a2]">www.custory.co</span>
        <span className="text-sm mx-[9px] my-[15px] inline-block rotate-[-45deg] select-none text-[#a2a2a2]">www.custory.co</span>
        </div>
        <div className="flex items-center justify-around w-full">
        <span className="text-sm mx-[9px] my-[15px] inline-block rotate-[-45deg] select-none text-[#a2a2a2]">www.custory.co</span>
        <span className="text-sm mx-[9px] my-[15px] inline-block rotate-[-45deg] select-none text-[#a2a2a2]">www.custory.co</span>
        </div>
      </span>
      </div>
      <button onClick={handleCopyToClipboard} className="flex m-auto mt-2">
        <FileCopyOutlined style={{ fontSize: "20px" }} />
        <div>Copy image</div>
      </button>
      <div className="my-4 flex justify-center space-x-4">
        {colours?.length > 0 ?
        Object.values(getColours).map((item, index)=>(
          (index !== 0) ? <img
            key={index}
            src={item}
            alt={`Thumbnail ${index}`}
            className={`w-[58px] h-[58px] border border-gray-300 cursor-pointer ${
              currentSlideIndex === index ? 'border-blue-500' : ''
            }`}
            onClick={() => setCurrentSlideIndex(index + 1)}
            onContextMenu={(e) => e.preventDefault()}
          /> : null
        ))
        :finalImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Thumbnail ${index}`}
            className={`w-[58px] h-[58px] border border-gray-300 cursor-pointer ${
              currentSlideIndex === index ? 'border-blue-500' : ''
            }`}
            onClick={() => setCurrentSlideIndex(index + 1)}
            onContextMenu={(e) => e.preventDefault()}
          />
        ))}
      </div>
      <div className="mx-auto">
        <div className="flex justify-center items-center space-x-2">
          <div className="flex items-center space-x-1">
            <ShoppingBagOutlined style={{ fontSize: "20px" }} />
            <span className="text-black font-medium">263 Satisfied Orders</span>
          </div>
          <div className="border-l h-5 border-gray-400"></div>
          <span className="text-custoryPrimary font-medium">
            Buyer Reviews
          </span>
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;
