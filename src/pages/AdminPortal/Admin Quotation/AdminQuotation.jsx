import React, { useState } from "react";
import AdminPortalLayout from "../../../components/AdminPortal/AdminPortalLayout";
import useQuotation from "../../../hooks/useQuotation";
import { hanldeDaysLeft } from "../../../utils/Enums";
import { MdOutlineFileDownload } from "react-icons/md";
import { downloadImageFromS3 } from "../../../utils/functions/S3Functions";
import { Accordion, AccordionSummary, Typography, AccordionDetails, Button, AccordionActions, Box } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const AdminQuotation = () => {
  const {fetchQuotations: { data: quotationData, isLoading, error }} = useQuotation();
  const [dropMenu, setDropMenu] = useState([0]);
  return (
    <AdminPortalLayout>
      <div className="p-3 max-sm:p-0 font-poppins lg:p-4">
        <p className="text-[20px] mb-1">Quotations</p>
        <div className="max-sm:hidden">
            {quotationData?.length > 0 ? <table className="w-full table-auto border-collapse border border-gray-300">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="border border-gray-300 py-3 px-4 text-left text-sm font-semibold text-gray-700">Quotation No</th>
                        <th className="border border-gray-300 py-3 px-4 text-left text-sm font-semibold text-gray-700">Generated Date</th>
                        <th className="border border-gray-300 py-3 px-4 text-left text-sm font-semibold text-gray-700">Payment Due Date</th>
                        <th className="border border-gray-300 py-3 px-4 text-left text-sm font-semibold text-gray-700">User Name</th>
                        <th className="border border-gray-300 py-3 px-4 text-left text-sm font-semibold text-gray-700">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {quotationData?.length > 0 && quotationData.map((quotation, index) => {
                        const expiryDate = new Date(new Date(quotation?.createdAt).setDate(new Date(quotation?.createdAt).getDate() + 7))
                            .toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
                            .replace(",", "")
                        return (
                        <tr key={index} className={`${hanldeDaysLeft(expiryDate) === 0 ? "cursor-not-allowed" : "bg-white hover:bg-gray-50"}`}>
                            <td className="border border-gray-300 py-2 px-4 text-sm">{quotation?.id?.substr(0, 10)}</td>
                            <td className="border border-gray-300 py-2 px-4 text-sm">
                                {new Date(quotation?.createdAt).toLocaleDateString("en-GB", {day: "numeric", month: "short", year: "numeric"}).replace(",", "")}
                            </td>
                            <td className="border border-gray-300 py-2 px-4 text-sm">
                                {expiryDate}
                            </td>
                            <td className="border border-gray-300 py-2 px-4 text-sm">
                                {quotation?.user?.firstName} {quotation?.user?.lastName}
                            </td>
                            <td className="border border-gray-300 py-2 px-4">
                                <button
                                    onClick={() => downloadImageFromS3("custorybucket", `Quotations/Quotaion_${quotation?.id}.pdf`, 'Quotation.pdf')}
                                    type="button"
                                    disabled={hanldeDaysLeft(expiryDate) === 0}
                                    className="disabled:cursor-not-allowed disabled:bg-[#EC1C24] focus:outline-none px-4 py-2 text-center rounded-md bg-custoryPrimary text-[#ffffff] border-custoryPrimary font-semibold border-2 text-sm"
                                >
                                    {hanldeDaysLeft(expiryDate) === 0 ? "Expired":
                                        <>
                                            <span>Download</span>
                                            <MdOutlineFileDownload className="inline ml-[4px]" size={23} />
                                        </>
                                    }
                                </button>
                            </td>
                        </tr>
                    )})}
                </tbody>
            </table> : <span className="flex items-center justify-center">No quotations available.</span>}
        </div>
        <div className="block sm:hidden">
            {quotationData?.length > 0 ? quotationData.map((quotation, index) => {
                const expiryDate = new Date(new Date(quotation?.createdAt).setDate(new Date(quotation?.createdAt).getDate() + 7))
                    .toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
                    .replace(",", "")
                return (
                    <Accordion key={index} expanded={dropMenu.includes(index)}
                        onChange={() => {
                            if (!dropMenu.includes(index)) {
                                setDropMenu([...dropMenu, index]);
                            } else {
                                const filterDropMenu = dropMenu.filter((item) => item !== index);
                                setDropMenu([...filterDropMenu]);
                            }
                        }}
                        sx={{marginTop:'10px'}}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                            sx={{paddingRight: '5px' }}
                        >
                            <Box sx={{ width: '100%' }}>
                                <Box sx={{ width: '100%', display: 'flex',  alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Typography sx={{fontWeight:'600', lineHeight: '2rem', width: '50%'}}>User:</Typography>
                                    <Typography sx={{ width: '50%', lineHeight: '2rem', marginLeft: '15px'}}>{quotation?.user?.firstName} {quotation?.user?.lastName}</Typography>
                                </Box>
                                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <Typography sx={{fontWeight:'600', lineHeight: '2rem', width: '50%'}}>Quotation:</Typography>
                                    <Typography sx={{ width: '50%', lineHeight: '2rem', marginLeft: '15px'}}>{quotation?.id?.substr(0, 10)}</Typography>
                                </Box>
                            </Box>
                        </AccordionSummary>
                        <AccordionDetails sx={{ marginTop: '-25px' }}>
                            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Typography sx={{ width: '50%', lineHeight: '2rem', fontWeight:'600'}} >Generated Date:</Typography>
                                <Typography sx={{ width: '50%', lineHeight: '2rem', }}>{new Date(quotation?.createdAt).toLocaleDateString("en-GB", {day: "numeric", month: "short", year: "numeric"}).replace(",", "")}
                                </Typography>
                            </Box>
                            <Box sx={{ width: '100%', display: 'flex', lineHeight: '2rem', alignItems: 'center', justifyContent: 'space-between'}}>
                                <Typography sx={{ width: '50%', fontWeight:'600', lineHeight: '2rem' }}>Payment Due Date:</Typography>
                                <Typography sx={{ width: '50%', lineHeight: '2rem' }}>{expiryDate}</Typography>
                            </Box>
                        </AccordionDetails>
                        <AccordionActions>
                            <button
                                onClick={() => downloadImageFromS3("custorybucket", `Quotations/Quotaion_${quotation?.id}.pdf`, 'Quotation.pdf')}
                                type="button"
                                disabled={hanldeDaysLeft(expiryDate) === 0}
                                className="disabled:cursor-not-allowed disabled:bg-[#EC1C24] focus:outline-none px-4 py-2 text-center rounded-md bg-custoryPrimary text-[#ffffff] border-custoryPrimary font-semibold border-2 text-sm"
                            >
                                {hanldeDaysLeft(expiryDate) === 0 ? "Expired":
                                    <>
                                        <span>Download</span>
                                        <MdOutlineFileDownload className="inline ml-[4px]" size={23} />
                                    </>
                                }
                            </button>
                        </AccordionActions>
                    </Accordion>
                )
            }): <span className="flex items-center justify-center">No quotations available.</span>}
        </div>
      </div>
    </AdminPortalLayout>
  );
};

export default AdminQuotation;