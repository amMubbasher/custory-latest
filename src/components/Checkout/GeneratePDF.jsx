import React, { useEffect, useState } from "react";
import transparentLogo from "../../assets/custorynavbarlogotransparent.png";
import custoryLogo from "../../assets/CustoryOrangeTransparent.png";
import html2pdf from "html2pdf.js";
import { formatNumbers } from "../../utils/functions/formatNumbers";
import { getImageFromS3, uploadPDFToS3 } from "../../utils/functions/S3Functions";
import { MdOutlineFileDownload } from "react-icons/md";
import useQuotation from "../../hooks/useQuotation";
import { CircularProgress } from "@mui/material";
import { toWords } from 'number-to-words';
import { usePrices } from "../../hooks/usePrices";

const toCamelCase = (str) => {
  return str
    .toLowerCase()
    .replace(/\b\w+/g, (word, index) => 
      index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)
    );
};

const handleConvert = (amount) => {
  const [integerPart, decimalPart] = amount.toString().split('.');
  const integerWords = toWords(Number(integerPart));
  const decimalWords = decimalPart ? toWords(Number(decimalPart)) : '';
  const amountInWords = decimalPart 
    ? `${toCamelCase(integerWords)} Singapore Dollars and ${decimalWords} cents Only` 
    : `${toCamelCase(integerWords)} Singapore Dollars Only`;
  return amountInWords;
};

// Quotation
const GeneratePDF = ({ form, items, shippingFee, orderQuantity, subtotal, total, percentage, isReferAnyPerson, btnDisabled }) => {
  const userEmail = JSON.parse(localStorage.getItem('CUSTORY_AUTH') || '{}')?.user?.email;
  const { addQuotation, quotation } = useQuotation();
  const {p,f} = usePrices();
  const [loading, setLoading] = useState(false);
  const quotationPDF = async (form, items, shippingFee, subtotal, total, percentage) => {
    const pdfContainer = document.createElement("div");
    pdfContainer.id = "pdf";
    const issueDate = new Date();
    const dueDate = new Date();
    const options = { day: "numeric", month: "long", year: "numeric" };

    const generateTableRows = async (items) => {
      const rows = await Promise.all(
        items?.map(async (item, index) => {
          const frontImage = await getImageFromS3(
            `custorybucket`,
            `Products/${item.product?.id}/${item.color}/front.jpg`
          );
          const backImage = await getImageFromS3(
            `custorybucket`,
            `Products/${item.product?.id}/${item.color}/back.jpg`
          );
          return `<tr class="text-base" style="page-break-after: ${[2,8,14,20].includes(index) ? 'always' : 'auto'}">
              <td class="border p-2 align-top font-normal">${index + 1}</td>
              <td class="border p-2 align-top pl-7 font-normal">
                <div>
                  <ul>
                    <li class="relative after:content-[''] after:w-1 after:h-1 after:block after:rounded-lg after:absolute after:left-[-15px] after:top-[17px] after:bg-blue-600">Product Name: ${
                      item?.product?.title
                    }</li>
                    <li class="flex align-center relative after:content-[''] after:w-1 after:h-1 after:block after:rounded-lg after:absolute after:left-[-15px] after:top-[17px] after:bg-blue-600">
                      <span> Color: </span>
                      <button class="w-5 h-5 rounded-full ml-1 mt-2.5 border border-[${
                        item.color
                      }]" style="background-color: #${item.color};"></button>
                    </li>
                    <li class="relative after:content-[''] after:w-1 after:h-1 after:block after:rounded-lg after:absolute after:left-[-15px] after:top-[17px] after:bg-blue-600">
                      Printing Pricing:
                      <ul class="pl-5">
                        ${
                          Object.keys(item.printingType).length > 0
                            ? Object.entries(item.printingType)
                                .map(
                                  ([key, value]) => `
                                  <li class="relative after:content-[''] after:w-1 after:h-1 after:block after:rounded-lg after:absolute after:left-[-15px] after:top-[17px] after:bg-blue-600">
                                    ${
                                      value.trim() !== ""
                                        ? `${key}: ${value} ${
                                            value == "Heat Transfer"
                                              ? "($2.5 per print (Multi color))"
                                              : value == "Screen Printing"
                                              ? "($0.8 per color)"
                                              : value == "Embroidery"
                                              ? "($1.3 per print)"
                                              : 0
                                          }`
                                        : ""
                                    }
                                  </li>`
                                )
                                .join("")
                            : `<li class="relative after:content-[''] after:w-1 after:h-1 after:block after:rounded-lg after:absolute after:left-[-15px] after:top-[17px] after:bg-blue-600">No Printing</li>`
                        }
                      </ul>
                    </li>
                    <li class="relative after:content-[''] after:w-1 after:h-1 after:block after:rounded-lg after:absolute after:left-[-15px] after:top-[17px] after:bg-blue-600">
                      Product Pricing:
                      <ul class="pl-5">
                        <li class="relative after:content-[''] after:w-1 after:h-1 after:block after:rounded-lg after:absolute after:left-[-15px] after:top-[17px] after:bg-blue-600">
                          Any Quantity: $${formatNumbers(
                            item?.price / item.quantity / 100
                          )}
                        </li>
                      </ul>
                    </li>
                    <li class="relative after:content-[''] after:w-1 after:h-1 after:block after:rounded-lg after:absolute after:left-[-15px] after:top-[17px] after:bg-blue-600">
                      ${item?.isCustomUpload ? "Custom Images" : "Images"}:
                      <ul class="grid grid-cols-2 pl-5">
                        <li class="relative after:content-[''] after:w-1 after:h-1 after:block after:rounded-lg after:absolute after:left-[-15px] after:top-[17px] after:bg-blue-600">
                          <a class='text-blue-600 underline text-sm' href=${`https://custory-cart.s3.ap-southeast-1.amazonaws.com/${item?.frontDesign}`}><b>Front Design</b> </a>
                        </li>
                        <li class="relative after:content-[''] after:w-1 after:h-1 after:block after:rounded-lg after:absolute after:left-[-15px] after:top-[17px] after:bg-blue-600">
                          <a class='text-blue-600 underline text-sm' href=${`https://custory-cart.s3.ap-southeast-1.amazonaws.com/${item?.backDesign}`}><b>Back Design</b> </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                </div>
              </td>
              <td class="border p-2 align-top font-normal">
                <div class="flex flex-col gap-4">
                  <span class="w-[65px] h-[90px]">
                    <img class="h-full w-full object-cover" key="${
                      index + 101
                    }" src="${frontImage}" alt="">
                  </span>
                  <span class="w-[65px] h-[90px]">
                    <img class="h-full w-full object-cover" key="${
                      index + 201
                    }" src="${backImage}" alt="">
                  </span>
                </div>
              </td>
              <td class="border p-2 align-top font-normal">${item.itemProductSizes
                .map(
                  (size) =>
                    `${size.productSize?.sizeName.toUpperCase()} (${
                      size.quantityPurchased
                    })`
                )
                .join(", ")}</td>
              <td class="border p-2 align-top font-normal">
                <p>SGD ${formatNumbers(item?.price / item.quantity / 100)}</p>
              </td>
              <td class="border p-2 align-top font-normal">$${
                formatNumbers(item?.price / 100) + " SGD"
              }</td>
            </tr>`;
        })
      );
      return rows.join("");
    };

    setLoading(true);
    const tableRows = await generateTableRows(items);
    pdfContainer.innerHTML = `
      <div class="h-[270px] bg-gradient-to-r from-custoryPrimary to-custorySecondary">
        <div class="w-full h-full px-[80px] flex items-center justify-center">
         <img class="m-auto" src="${transparentLogo}" alt="custory image" />
        </div>
      </div>
      <div class="p-5">
        <div class="text-center my-4">
          <span class="font-bold text-2xl text-[#FF6600] w-full text-center">
            Quotation
          </span>
        </div>

        <div class="w-full my-3">
          <table class="w-full table-fixed">
            <tbody>
              <tr>
                <td>
                   <img class="h-[74px] w-52" src="${custoryLogo}" alt="custory image" />
                </td>
                <td align="left">
                  <div class="w-fit ml-auto">
                    <p class="text-xs">
                      <span class="text-[#6F6F6F] text-left pr-2">Quotation number <span>
                      <span class="text-black text-right ml-auto">${quotation?.quotation?.id}</span>
                    <p>
                    <p class="text-xs flex">
                      <span class="text-[#6F6F6F] text-left pr-2">Quotation generated date <span>
                      <span class="text-black text-right ml-[114px]">${new Intl.DateTimeFormat("en-GB", options).format(issueDate)}</span>
                    <p>
                    <p class="text-xs flex w-full">
                      <span class="text-[#6F6F6F] text-left pr-2">Payment due date <span>
                      <span class="text-black text-right ml-[154px]">${new Intl.DateTimeFormat("en-GB", options).format(dueDate.setDate(dueDate.getDate() + 7))}</span>
                    <p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div>
          <table class="table-fixed w-full">
            <tbody>
              <tr>
                <td class="pr-1 align-top">
                  <div class="p-3 bg-[#FFF2E0] rounded w-full  pt-0">
                    <p class="font-bold text-[20px] text-[#FF6600] mb-2">Quotation By</p>
                    <table class="w-full">
                      <tbody>
                        <tr>
                          <td class="text-sm font-bold py-1">
                              Company
                          </td>
                          <td class="text-sm">
                            Custory
                          </td>
                        </tr>
                        
                        <tr>
                          <td class="text-sm font-bold py-1">
                            UEN 
                          </td>
                          <td class="text-sm pl-1">
                          53484010L
                          </td>
                        </tr>

                        <tr>
                          <td class="text-sm font-bold py-1">
                           Contact
                          </td>
                          <td class="text-sm pl-1">
                          +65 9123 4567 | admin@custory.co
                          </td>
                        </tr>

                        <tr>
                          <td class="text-sm font-bold py-1">
                           Website
                          </td>
                          <td class="text-sm pl-1">
                          www.custory.co
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>

                <td class="pl-1 align-top">
                  <div class="p-3 bg-[#FFF2E0] rounded w-full pt-0">
                    <p class="font-bold text-[20px] text-[#FF6600] mb-2">Quotation To</p>
                    <table class="w-full">
                      <tbody>
                        <tr>
                          <td class="text-sm font-bold py-1">
                            Name
                          </td>
                          <td class="text-sm pl-1">
                            ${form?.firstName} ${form?.lastName}
                          </td>
                        </tr>

                        <tr>
                          <td class="text-sm font-bold py-1">
                            Entity 
                          </td>
                          <td class="text-sm pl-1">
                            -
                          </td>
                        </tr>

                        <tr>
                          <td class="text-sm font-bold py-1">
                           Contact
                          </td>
                          <td class="text-sm align-top pl-1" rowspan="2">
                            ${userEmail} | ${form?.phoneNumber}                          
                          </td>
                        </tr>

                        <tr>
                          <td class="invisible py-1" colspan="2">dummy</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="text-lg font-bold mt-6 mb-1">
          <table class="w-full">
            <thead>
              <tr class="text-base text-left">
                <th class="border font-medium p-2">No.</th>
                <th class="border font-medium p-2">Description</th>
                <th class="border font-medium p-2"></th>
                <th class="border font-medium p-2">Quantity</th>
                <th class="border font-medium p-2">Price per unit</th>
                <th class="border font-medium p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              ${tableRows}
              <tr class="text-base">
                <td colSpan="6" class="h-[40px] border"></td>
              </tr>
              <tr class="text-base">
                <td class="border p-2 align-center font-normal"></td>
                <td class="border p-2 pb-2 align-top font-normal">${
                  form?.fastService == "Regular"
                    ? "Regular Delievery (15-20 days)"
                    : "Fast Delievery (7-12 days)"
                }</td>
                <td class="border p-2 align-top font-normal"></td>
                <td class="border p-2 align-top font-normal"></td>
                <td class="border p-2 align-top font-normal"></td>
                <td class="border p-2 align-top font-normal">${shippingFee}</td>
               </tr>
            </tbody>
          </table>
        </div>
        
        <div class="flex mt-3">
          <div class="w-3/5 text-justify pr-3">
            <div class="mb-3">
              <p class="font-bold text-[#FF6600] text-[20px] mb-2">
                Quotation Validity:
              </p>
              <p class="text-xs pl-3 mb-2 relative after:content-[''] after:w-1 after:h-1 after:block after:rounded-lg after:absolute after:left-[0px] after:top-[14px] after:bg-black">
                <span class="font-bold">
                  Valid Duration:
                </span> This quotation is valid for 7 days from the date of issue. After this period, all prices and terms are subject to revision based on market conditions and product availability.
              </p>
              <p class="text-xs pl-3 mb-2 relative after:content-[''] after:w-1 after:h-1 after:block after:rounded-lg after:absolute after:left-[0px] after:top-[14px] after:bg-black">
                <span class="font-bold">
                  Non-Binding Quotation
                </span> This document is a non-binding quotation. To finalize the purchase, you must re-create your custom order on our platform, confirm the design, and complete payment through the platform.
              </p>
              <p class="text-xs pl-3 mb-2 relative after:content-[''] after:w-1 after:h-1 after:block after:rounded-lg after:absolute after:left-[0px] after:top-[14px] after:bg-black">
                <span class="font-bold">
                  Customization and Production:
                </span>  All customized items are non-refundable and non-exchangeable once design approval and payment are confirmed. Any design modifications must be made before order confirmation on the platform. Lead times for production start after full payment is received and design is approved.
              </p>
              <p class="text-xs pl-3 mb-2 relative after:content-[''] after:w-1 after:h-1 after:block after:rounded-lg after:absolute after:left-[0px] after:top-[14px] after:bg-black">
                <span class="font-bold">
                  Lead Time and Delivery: 
                </span>  Production and delivery timelines will be provided upon order confirmation. Delays caused by third parties, including suppliers and shipping partners, are outside Custory’s control.
              </p>
              <p class="text-xs pl-3 mb-2 relative after:content-[''] after:w-1 after:h-1 after:block after:rounded-lg after:absolute after:left-[0px] after:top-[14px] after:bg-black">
                <span class="font-bold">
                  Force Majeure:
                </span> Custory will not be held liable for delays or non-performance caused by circumstances beyond its control, including but not limited to natural disasters, strikes, or supplier disruptions.
              </p>
              <p class="text-xs pl-3 mb-2 relative after:content-[''] after:w-1 after:h-1 after:block after:rounded-lg after:absolute after:left-[0px] after:top-[14px] after:bg-black">
                <span class="font-bold">
                  Liability
                </span> Custory's liability for any claim, whether based on contract, tort, or otherwise, is limited to the value of the goods purchased. Custory is not liable for indirect or consequential damages.
              </p>
              <p class="text-xs pl-3 mb-2 relative after:content-[''] after:w-1 after:h-1 after:block after:rounded-lg after:absolute after:left-[0px] after:top-[14px] after:bg-black">
                <span class="font-bold">
                  Intellectual Property: 
                </span> All designs provided by the customer must have the necessary permissions and copyrights. Custory will not be held liable for any infringement claims arising from customer-supplied designs.
              </p>
              <p class="text-xs pl-3 mb-2 relative after:content-[''] after:w-1 after:h-1 after:block after:rounded-lg after:absolute after:left-[0px] after:top-[14px] after:bg-black">
                <span class="font-bold">
                  Governing Law:
                </span> This quotation and any subsequent contract are governed by the laws of Singapore. Any disputes arising will be subject to the jurisdiction of the courts of Singapore.
              </p>
            </div>

            <div class="mb-3">
              <p class="font-bold text-[#FF6600] text-[20px] mb-2">
                Process for Order Confirmation:
              </p>
              <p class="text-xs pl-3 mb-2 relative after:content-['1.'] after:font-bold after:rounded-lg after:absolute after:left-[0px] after:top-[0px]" >
                <span class="font-bold">
                  Quotation Request:
                </span> This quotation is based on the details provided for order request. Please use this document to discuss the purchase with your organization and determine if you wish to proceed.
              </p>

              <p class="text-xs pl-3 mb-2 relative after:content-['2.'] after:font-bold after:rounded-lg after:absolute after:left-[0px] after:top-[0px]">
                <span class="font-bold">
                  Quotation Download:
                </span> You may download and review this quotation with your team. The pricing and details are valid for 7 days from the date of issue. After this period, the prices and terms are subject to change.
              </p>

              <p class="text-xs pl-3 relative after:content-['3.'] after:font-bold after:rounded-lg after:absolute after:left-[0px] after:top-[0px]">
                <span class="font-bold">
                  Order Confirmation:
                </span> Should you decide to proceed with the order, please:
                <p class="text-xs pl-3 relative after:content-[''] after:w-1 after:h-1 after:block after:rounded-lg after:absolute after:left-[0px] after:top-[14px] after:bg-black">
                  Revisit our platform and log in to your account.
                </p>
                <p class="text-xs pl-3 relative after:content-[''] after:w-1 after:h-1 after:block after:rounded-lg after:absolute after:left-[0px] after:top-[14px] after:bg-black">
                  Re-create your custom order on the platform, ensuring that the product details, designs, and quantities match this quotation or make any necessary adjustments
                </p>
                <p class="text-xs pl-3 relative after:content-[''] after:w-1 after:h-1 after:block after:rounded-lg after:absolute after:left-[0px] after:top-[14px] after:bg-black">
                  Confirm your final order and proceed to payment via the platform.
                </p>
              </p>

              <p class="text-xs pl-3 mt-2 mb-2 relative after:content-['4.'] after:font-bold after:rounded-lg after:absolute after:left-[0px] after:top-[0px]" >
                <span class="font-bold block">
                  Payment:
                </span> Once your custom order is confirmed on our platform, you will be prompted to make payment. The order will only be processed after payment is received in full.
              </p>
            </div>
            <div class="mb-3">
              <p class="font-bold text-[#FF6600] text-[20px] mb-2">
                Acceptance of Quotation:
              </p>
              <p class="mt-2 mb-2 text-xs">
                By downloading or using this quotation, you acknowledge that this is a non-binding offer. To confirm your order, you must remake the custom order on Custory’s platform and proceed with payment.
              </p>
              <p class="mb-3 text-xs">
                If you require further assistance or clarification, please contact us at 
                <span class="font-bold">
                  admin@custory.co.
                </span>
              </p>
            </div>
          </div>

          <div class="w-2/5 p-2 align-center">
          <div class="font-normal text-base flex">
            <div class="w-1/2">
              <p class="text-left pt-1">Subtotal:  </p>
              <p class="text-left pt-1">Discounts:  </p>
              <p class="text-left pt-1">Shipping:  </p>
              <p class="h-[25px] w-full border border-x-0 border-t-0 border-[#BEBEBE] mb-3"> </p>
              <p class="text-left pt-1 text-2xl font-semibold">Total </p>
            </div>

            <div class= "font-medium w-1/2">
              <p class="text-right pt-1">${subtotal}</p>
              <p class="text-right pt-1">${percentage || 0}%</p>
              <p class="text-right pt-1">${shippingFee}</p>
              <p class="h-[25px] w-full border border-x-0 border-t-0 border-[#BEBEBE] mb-3"> </p>
              <p class="text-right pt-1 text-2xl font-bold">${f(p(formatNumbers(total)))}</p>
            </div>
          </div>
          <div class="font-normal text-base mt-5">
              <p class="text-[#6F6F6F]">
              Quotation Total (in words)
              </p>
              <p class="capitalize">
                ${handleConvert(formatNumbers(total))}
              </p>
              </div>
          </div>
        </div>
      </div>`;

    html2pdf()
      .from(pdfContainer)
      .set({
        margin: 0.1,
        filename: `Quotation_${quotation?.quotation?.id}`,
        html2canvas: { scale: 4 },
        jsPDF: { unit: "in", format: [9.5, 14.7], orientation: "portrait" },
      }).outputPdf("blob").then((pdfBlob) => {
        setLoading(false);
        uploadPDFToS3(pdfBlob, quotation?.quotation?.id);
        html2pdf()
          .from(pdfContainer)
          .set({
            margin: 0.1,
            filename: `Quotation_${quotation?.quotation?.id}`,
            html2canvas: { scale: 4 },
            jsPDF: { unit: "in", format: [9.5, 14.7], orientation: "portrait", compressPDF: true },
          }).save();
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error generating PDF:", error);
      });
  };

  useEffect(() => {
    if (quotation?.status) {
      quotationPDF(form, items, shippingFee, subtotal, total, percentage);
    }
  }, [quotation?.status]);

  return (
    <button
      disabled={isReferAnyPerson || btnDisabled}
      className="flex items-center justify-center px-5 disabled:border-gray-400 disabled:text-gray-400 py-2 text-center rounded-md hover:bg-opacity-50 bg-white outline-none text-custoryPrimary border-[#ff6600] font-semibold border-2 text-lg disabled:cursor-not-allowed max-sm:w-full"
      onClick={() =>
        addQuotation({
          data: { firstName: form?.firstName, lastName: form?.lastName },
        })
      }
      data-tooltip-html={
        isReferAnyPerson || btnDisabled
          ? "<div> Fill up the required fields to generate the quotation. </div>"
          : null
      }
      data-tooltip-id="quotation-message"
    >
      <span> Generate Quotation{" "}</span>
      { loading ? <CircularProgress size={16} color='inherit' className='inline ml-[4px] mt-1'/> : <MdOutlineFileDownload className="inline ml-[4px] mt-1"/>}
    </button>
  );
};

export default GeneratePDF;

// Order Details

export const orderDetailPDF = (data, f, p) => {
  const pdfContainer = document.createElement("div");
  pdfContainer.id = "pdf";
  const date = new Date(data?.createdAt);
  const options = { day: "numeric", month: "long", year: "numeric" };
  
  const generateTableRows = (items) => {
    return items
      ?.map(
        (item, index) => `
          <tr class="text-base" style="page-break-after: ${[2,8,14,20].includes(index) ? 'always' : 'auto'}">
            <td class="border p-2 align-top font-normal">${index + 1}</td>
            <td class="border p-2 align-top pl-7 font-normal">
              <div>
                <ul>
                  <li class="relative after:content-[''] after:w-1 after:h-1 after:block after:rounded-lg after:absolute after:left-[-15px] after:top-[17px] after:bg-blue-600">
                    Product Name: ${item?.product?.title}
                  </li>
                  <li class="flex align-center relative after:content-[''] after:w-1 after:h-1 after:block after:rounded-lg after:absolute after:left-[-15px] after:top-[17px] after:bg-blue-600">
                    <span> Color: </span>
                    <button class="w-5 h-5 rounded-full ml-1 mt-2.5 border border-[${item.color}]" style="background-color: #${item.color};"></button>
                  </li>
                  <li class="relative after:content-[''] after:w-1 after:h-1 after:block after:rounded-lg after:absolute after:left-[-15px] after:top-[17px] after:bg-blue-600">
                    Printing Pricing:
                    <ul class="pl-5">
                      ${
                        Object.keys(item.printingType).length > 0 ? Object.entries(item.printingType).map(([key, value]) => `
                          <li class="relative after:content-[''] after:w-1 after:h-1 after:block after:rounded-lg after:absolute after:left-[-15px] after:top-[17px] after:bg-blue-600">
                            ${
                              value.trim() !== "" ? `${key}: ${value} ${
                                value == "Heat Transfer" ? "($2.5 per print (Multi color))" : 
                                value == "Screen Printing" ? "($0.8 per color)" : 
                                value == "Embroidery" ? "($1.3 per print)" : 0 }` : "" }
                          </li>`).join(""): 
                          `<li class="relative after:content-[''] after:w-1 after:h-1 after:block after:rounded-lg after:absolute after:left-[-15px] after:top-[17px] after:bg-blue-600">No Printing</li>`
                      }
                    </ul>
                  </li>
                    <li class="relative after:content-[''] after:w-1 after:h-1 after:block after:rounded-lg after:absolute after:left-[-15px] after:top-[17px] after:bg-blue-600">
                      Product Pricing:
                      <ul class="pl-5">
                        <li class="relative after:content-[''] after:w-1 after:h-1 after:block after:rounded-lg after:absolute after:left-[-15px] after:top-[17px] after:bg-blue-600">
                          Any Quantity: $${formatNumbers( item?.price / item.quantity / 100 )}
                        </li>
                      </ul>
                    </li>
                    <li class="relative after:content-[''] after:w-1 after:h-1 after:block after:rounded-lg after:absolute after:left-[-15px] after:top-[17px] after:bg-blue-600">
                      ${item?.isCustomUpload ? "Custom Images" : "Images"}:
                      <ul class="grid grid-cols-2 pl-5">
                        <li class="relative after:content-[''] after:w-1 after:h-1 after:block after:rounded-lg after:absolute after:left-[-15px] after:top-[17px] after:bg-blue-600">
                          <a class='text-blue-600 underline text-sm' href=${`https://custory-cart.s3.ap-southeast-1.amazonaws.com/${item?.frontDesign}`}><b>Front Design</b> </a>
                        </li>
                        <li class="relative after:content-[''] after:w-1 after:h-1 after:block after:rounded-lg after:absolute after:left-[-15px] after:top-[17px] after:bg-blue-600">
                          <a class='text-blue-600 underline text-sm' href=${`https://custory-cart.s3.ap-southeast-1.amazonaws.com/${item?.backDesign}`}><b>Back Design</b> </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
              </div>
            </td>
            <td class="border p-2 align-top font-normal">${item.itemProductSizes
              .map(
                (size) =>
                  `${size.productSize?.sizeName.toUpperCase()} (${
                    size.quantityPurchased
                  })`
              )
              .join(", ")}</td>
            <td class="border p-2 align-top font-normal">
              <p>${f(p(item?.price / item.quantity) / 100)}
              </p>
            </td>
            <td class="border p-2 align-top font-normal">${f(
              p(item?.price / 100)
            )}</td>
          </tr>
        `
      )
      .join("");
  };

  pdfContainer.innerHTML = `
    <div class="h-[300px] bg-gradient-to-r from-custoryPrimary to-custorySecondary">
      <div class="w-full h-full px-[80px] flex items-center justify-center">
       <img class="m-auto" src="${transparentLogo}" alt="custory image" />
      </div>
    </div>
    <div class="p-5">
        <div class="text-center my-4">
          <span class="font-bold text-2xl text-[#FF6600] w-full text-center">
            Receipt
          </span>
        </div>
        <div class="w-full my-3">
          <table class="w-full table-fixed">
            <tbody>
              <tr>
                <td>
                   <img class="h-[74px] w-52" src="${custoryLogo}" alt="custory image" />
                </td>
                <td align="left">
                  <div class="w-fit ml-auto">
                    <p class="text-xs">
                      <span class="text-[#6F6F6F] text-left pr-2">Receipt Number <span>
                      <span class="text-black text-right ml-2">${data.id}</span>
                    <p>
                    <p class="text-xs flex">
                      <span class="text-[#6F6F6F] text-left pr-2">Date Issued <span>
                      <span class="text-black text-right ml-48">${new Intl.DateTimeFormat(
                        "en-GB",
                        options
                      ).format(date)}</span>
                    <p>
                    <p class="text-xs flex w-full">
                      <span class="text-[#6F6F6F] text-left pr-2">Shipping Date <span>
                      <span class="text-black text-right ml-52">${
                        data.shippingDate
                      }</span>
                    <p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      <div>
        <table class="table-fixed w-full">
          <tbody>
            <tr>
              <td class="pr-1 align-top">
                <div class="p-3 bg-[#FFF2E0] rounded w-full  pt-0">
                  <p class="font-bold text-[20px] text-[#FF6600] mb-2">Quotation By</p>
                  <table class="w-full">
                    <tbody>
                      <tr>
                        <td class="text-sm font-bold py-1">
                            Company
                        </td>
                        <td class="text-sm">
                          Custory
                        </td>
                      </tr>

                      <tr>
                        <td class="text-sm font-bold py-1">
                          Location
                        </td>
                        <td class="text-sm pl-1">
                        123 Custom Lane, Singapore 123456
                        </td>
                      </tr>

                      <tr>
                        <td class="text-sm font-bold py-1">
                          UEN 
                        </td>
                        <td class="text-sm pl-1">
                        53484010L
                        </td>
                      </tr>

                      <tr>
                        <td class="text-sm font-bold py-1">
                         Contact
                        </td>
                        <td class="text-sm pl-1">
                        +65 9123 4567 | admin@custory.co
                        </td>
                      </tr>

                      <tr>
                        <td class="text-sm font-bold py-1">
                         Website
                        </td>
                        <td class="text-sm pl-1">
                        www.custory.co
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>

              <td class="pl-1 align-top">
                <div class="p-3 bg-[#FFF2E0] rounded w-full pt-0">
                  <p class="font-bold text-[20px] text-[#FF6600] mb-2">Quotation To</p>
                  <table class="w-full">
                    <tbody>
                      <tr>
                        <td class="text-sm font-bold py-1">
                          Name
                        </td>
                        <td class="text-sm pl-1">
                          ${data?.customerFirstName} ${data?.customerLastName}
                        </td>
                      </tr>

                      <tr>
                        <td class="text-sm font-bold py-1">
                          Entity 
                        </td>
                         <td class="text-sm pl-1">
                          -
                        </td>
                      </tr>

                      <tr>
                        <td class="text-sm font-bold py-1">
                          Location
                        </td>
                        <td class="text-sm pl-1">
                          ${data?.customerAddress}
                        </td>
                      </tr>

                      <tr>
                        <td class="text-sm font-bold py-1">
                         Contact
                        </td>
                        <td class="text-sm align-top pl-1" rowspan="2">
                          ${data?.customerEmail} | ${data?.customerPhoneNumber}                          
                        </td>
                      </tr>

                      <tr>
                        <td class="invisible py-1" colspan="2">dummy</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="text-lg font-bold mt-6 mb-1">
          <table class="w-full">
            <thead>
              <tr class="text-base text-left">
                <th class="border font-medium p-2">No.</th>
                <th class="border font-medium p-2">Product Name</th>
                <th class="border font-medium p-2">Size & Qty</th>
                <th class="border font-medium p-2">Price Per Unit</th>
                <th class="border font-medium p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              ${generateTableRows(data.items)}
              <tr class="text-base">
                <td colSpan="6" class="h-[40px] border"></td>
              </tr>
              <tr class="text-base">
                <td class="border p-2 align-center font-normal"></td>
                <td class="border p-2 pb-2 align-top font-normal">${
                  data.shippingType
                }</td>
                <td class="border p-2 align-top font-normal"></td>
                <td class="border p-2 align-top font-normal"></td>
                <td class="border p-2 align-top font-normal">${f(
                  p(data.shippingCost / 100)
                )}</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="flex mt-3">
          <div class="w-3/5 text-justify pr-3">
            <div class="mb-3">
              <p class="font-bold text-[20px] mb-2">
                Notes
              </p>
              <p class="text-xs pl-3 mb-2 relative after:content-[''] after:w-1 after:h-1 after:block after:rounded-lg after:absolute after:left-[0px] after:top-[14px] after:bg-black">
                <span class="font-bold">
                  Receipt Acknowledgment:
                </span> This receipt confirms that full payment has been received for the items listed above.
              </p>
              <p class="text-xs pl-3 mb-2 relative after:content-[''] after:w-1 after:h-1 after:block after:rounded-lg after:absolute after:left-[0px] after:top-[14px] after:bg-black">
                <span class="font-bold">
                  Return and Exchange Policy:
                </span> Custom merchandise is non-refundable and non-exchangeable, except in cases of manufacturing defects. Please inspect the items upon delivery and report any issues within 7 days.
              </p>
              <p class="text-xs pl-3 mb-2 relative after:content-[''] after:w-1 after:h-1 after:block after:rounded-lg after:absolute after:left-[0px] after:top-[14px] after:bg-black">
                <span class="font-bold">
                  Customer Service:
                </span> For any queries or assistance, please contact us at admin@custory.co or call +65 9123 4567.
              </p>
              <p class="text-xs pl-3 mb-2 relative after:content-[''] after:w-1 after:h-1 after:block after:rounded-lg after:absolute after:left-[0px] after:top-[14px] after:bg-black">
                <span class="font-bold">
                  Thank You: 
                </span> Thank you for your purchase! We value your business and look forward to working with you again.
              </p>
              <p class="text-xs pl-3 mb-2">
                If you require further assistance or clarification, please contact us at <span class="font-bold">admin@custory.co.</span>
              </p>
            </div>
          </div>

          <div class="w-2/5 p-2 align-center">
          <div class="font-normal text-base flex">
           <div class="w-1/2">
              <p class="text-left pt-1">Subtotal:  </p>
              <p class="text-left pt-1">Discounts:  </p>
              <p class="text-left pt-1">Shipping:  </p>
              <p class="h-[25px] w-full border border-x-0 border-t-0 border-[#BEBEBE] mb-3"> </p>
              <p class="text-left pt-1 text-2xl font-semibold">Total </p>
            </div>

            <div class= "font-medium w-1/2">
              <p class="text-right pt-1">${f(p(data.subTotal / 100))}</p>
              <p class="text-right pt-1">${data.discount?.percentage || 0}%</p>
              <p class="text-right pt-1">${f(p(data.shippingCost / 100))}</p>
              <p class="h-[25px] w-full border border-x-0 border-t-0 border-[#BEBEBE] mb-3"> </p>
              <p class="text-right pt-1 text-2xl font-bold">${f(p(data.total / 100))}</p>
            </div> 
          </div>  
             <div class="font-normal text-base mt-5">
              <p class="text-[#6F6F6F]">
              Quotation Total (in words)
              </p>
              <p>
                ${handleConvert(data.total / 100)}
              </p>
              </div>                 
            </div>  
        </div>
    </div>
  `;
  html2pdf()
    .from(pdfContainer)
    .set({
      margin: 0.1,
      filename: `Order Details_${data.id}`,
      html2canvas: { scale: 4 },
      jsPDF: { unit: "in", format: [9.5, 14.7], orientation: "portrait" },
    })
    .save()
    .then(() => {
    })
    .catch((error) => {
      console.error("Error generating PDF:", error);
    });
};

export const downloadImagesPDF = async (frontDesignImage,frontDesignLogo, backDesignImage, backDesignLogo, productId, color, bucket, orderId) => {
  const pdfContainer = document.createElement("div");
  pdfContainer.id = "pdf";
  const frontImage = await getImageFromS3(
    `custorybucket`,
    `Products/${productId}/${color}/front.jpg`
  );
  const backImage = await getImageFromS3(
    `custorybucket`,
    `Products/${productId}/${color}/back.jpg`
  );
  const noImageFound = await getImageFromS3( `custorybucket`, `Products/image-not-found.png`);
  const [newFrontDesign,newFrontLogo, newBackDesign, newBackLogo] = await Promise.all(
    [frontDesignImage,frontDesignLogo, backDesignImage, backDesignLogo].map((image) =>
      image ? getImageFromS3(bucket, image.split('amazonaws.com/')[1]) : null
    )
  );

  pdfContainer.innerHTML = `
    <div class="h-[300px] bg-gradient-to-r from-custoryPrimary to-custorySecondary">
      <div class="w-full h-full px-[80px] flex items-center justify-center">
       <img class="m-auto" src="${transparentLogo}" alt="custory image" />
      </div>
    </div>
    <div class="flex justify-around items-center p-5 min-h-[50lvh]">
      <div class="flex items-center justify-between flex-col h-full">
        <span class="text-[18px] mb-5 font-semibold">Front Image without Template</span>
        <img src="${frontDesignLogo !== '' ? newFrontLogo : noImageFound}" class="w-[280px] h-[300px] rounded-xl"  alt="Image"/>
      </div>
      <div class="flex items-center justify-between flex-col h-full">
        <span class="text-[18px] mb-5 font-semibold">Back Image without Template</span>
        <img src="${backDesignLogo !== '' ? newBackLogo : noImageFound}" class="w-[280px] h-[300px] rounded-xl" alt="Image"/>
      </div>
    </div>       
    <div class="flex justify-around items-center p-5 min-h-[50lvh]">
      <div class="flex items-center justify-between flex-col h-full">
        <span class="text-[18px] mb-5 font-semibold">Front Image with Template</span>
        <img src="${frontDesignImage ? newFrontDesign : frontImage}" class="w-[380px] h-[400px] rounded-xl"  alt="Image"/>
      </div>
      <div class="flex items-center justify-between flex-col h-full">
        <span class="text-[18px] mb-5 font-semibold">Back Image with Template</span>
        <img src="${backDesignImage ? newBackDesign : backImage}" class="w-[380px] h-[400px] rounded-xl" alt="Image"/>
      </div>
    </div>       
  `;
  html2pdf()
    .from(pdfContainer)
    .set({
      margin: 0.1,
      filename: `Order_${orderId}_Designs`,
      html2canvas: { scale: 4 },
      jsPDF: { unit: "in", format: [9.5, 14.7], orientation: "portrait" },
    })
    .save()
    .then(() => {
    })
    .catch((error) => {
      console.error("Error generating PDF:", error);
    });
};