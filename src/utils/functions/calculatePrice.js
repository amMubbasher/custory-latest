function calculatePrice(prices, quantity, printingType, printingSides,colorNumber,printingTypes) {
  const qty = parseInt(quantity, 10) || 0;
  const sides = parseInt(printingSides, 10) || 0;
  const number = parseInt(colorNumber, 10) || 1;
  let frontPrintingTypePrice = parseFloat(printingTypes.find((item) => item.printingType === printingType?.front ?? "")?.price) || 0;
  let backPrintingTypePrice = parseFloat(printingTypes.find((item) => item.printingType === printingType?.back ?? "")?.price) || 0;
  if (isNaN(qty) || isNaN(sides) || isNaN(frontPrintingTypePrice) || isNaN(backPrintingTypePrice)) {
    return NaN;
  }
  if(printingType.front && printingType.back=='Screen Printing' && number !== 1){
    frontPrintingTypePrice *= number;
    backPrintingTypePrice *= number;
  }else if(printingType.front=='Screen Printing' && number !== 1){
    frontPrintingTypePrice *= number;
  }else if(printingType.back=='Screen Printing' && number !== 1){
    backPrintingTypePrice *= number;
  }

  let calculatedPrice = 0;
  let basePrice = 0;

  prices.forEach(({ startRange, endRange, pricePerUnit }) => {
    if (qty >= startRange && qty <= endRange) {
      basePrice = calculatedPrice = parseFloat(pricePerUnit);
    }
  });
  if (isNaN(calculatedPrice)) {
      console.error("No valid price found for quantity", { qty });
      return NaN;
  }
  if(sides == 0){
    calculatedPrice += 0
  }else{
    calculatedPrice += (printingType.front ? frontPrintingTypePrice : 0) + (printingType.back ? backPrintingTypePrice : 0);
  }
  return {calculatedPrice,basePrice};
}
export default calculatePrice