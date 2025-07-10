import React, { useState, useEffect } from 'react';
import QuantitySelector from '../common/QuantitySelector';

const ProductCard = (props) => {
  const { data, selectedQuantity, handleClick = () => {}, imageClick = () => {}, isQuantity = false, quantity = 0, handleUpdateQuantity = () => {} } = props;
  const [hoveredImage, setHoveredImage] = useState('');

  useEffect(() => {
    if (data && data.id && data.colours) {
      setHoveredImage(`https://custorybucket.s3.ap-southeast-1.amazonaws.com/Products/${data.id}/${data.colours[0]}/front.jpg?cacheclearer=99`);
    }
  }, [data]);

  const handleColorHover = (colour) => {
    setHoveredImage(`https://custorybucket.s3.ap-southeast-1.amazonaws.com/Products/${data.id}/${colour}/front.jpg?cacheclearer=3`);
  };

  if (!data || !data.id || !data.colours) {
    return null; 
  }

  const buttonsPerRow = 6;
  const buttonWidth = `calc(${100 / buttonsPerRow}% - 10px)`;
  const limit = 5;

  const priceObj = data.price.find(item => Number(item.endRange) === 9999);
  const price = priceObj ? Number(priceObj.pricePerUnit) : null;

  return (
    <div onClick={handleClick} className="w-full cursor-pointer group rounded-md shadow-none transition-shadow duration-300 hover:shadow-lg hover:shadow-gray-500 border-2" style={{ height: '350px' }}>
      <div onClick={imageClick} className="w-full h-[210px] group-hover:p-2 transition-all rounded-md flex justify-center items-center">
        <img src={hoveredImage} className="h-full w-full object-cover rounded-md" style={{ objectFit: 'contain', height: '200px', width: '200px' }} onContextMenu={(e) => e.preventDefault()} />
      </div>
      <div className="mt-3 text-lg max-sm:text-[14px] font-semibold group-hover:scale-105 transition-all text-center" style={{ height: '3.5rem', overflow: 'hidden' }}>
        {data?.title}
      </div>
      <div className="flex mt-1">
        <div className="text-md font-[400] mx-auto">
          From <b>${price / 100}</b> each
        </div>
      </div>
      <div className="flex flex-wrap justify-center mt-2 max-sm:px-3" style={{ width: 'auto', height: '3.75rem' }}>
        {data.colours.slice(0, limit).map((color, index) => (
          <div key={index} style={{ width: buttonWidth, margin: '5px' }}>
            <button
              className="w-full h-full rounded-full"
              style={{ backgroundColor: "#" + color, width: '1.25rem', height: '1.25rem', border: '1px solid black' }}
              onMouseEnter={() => handleColorHover(data.colours[index])}
            ></button>
          </div>
        ))}

        {data.colours.length > limit && 
          <div style={{ width: buttonWidth, margin: '5px', textAlign: 'center' }}>
          <span>...</span>
        </div>
        }
      </div>
      {/* Commenting out supplier logo */}
      {/* <div className="pb-3 border-b-[3px] flex justify-center items-center">
        <img src={data.supplier?.logo} className='max-h-[3rem] pt-5 pb-1' alt="" />
      </div> */}
    </div>
  );
};

export default ProductCard;