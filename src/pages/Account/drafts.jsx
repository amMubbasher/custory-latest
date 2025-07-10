import { Button, CircularProgress, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { MdArrowBack } from "react-icons/md";
import AccountLayout, { polotonoStore } from "../../components/Account/AccountLayout";
import ErrorState from "../../components/Account/ErrorState";
import { useDeleteDraft, useGetDrafts, useUpdateDraft } from "../../hooks/useDraft";
import noDraftSVG from '../../assets/no-drafts.svg'
import moment from "moment";
import { getImageLinkFromTemplate } from "../../utils/functions/getImageLinkFromTemplate";
import { Delete } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { usePrices } from "../../hooks/usePrices";
import { deleteFolderWithItemsFromS3 } from "../../utils/functions/S3Functions";
const DraftItem = ({data}) => {
  const {p,f} = usePrices();
  const [expired,setExpired] = useState(false);
  useEffect(() => {
    if (data?.updatedAt) {
      const dateToday = Date.now();
      const expirationDate = new Date(data.updatedAt).getTime() + 7 * 24 * 60 * 60 * 1000;
      if (dateToday >= expirationDate) {
        setExpired(true);
      }
    }
  }, [data]);
  
  const {deleteDraft} = useDeleteDraft();
  const handleDelete = ()=>{
    const cartId = data?.items[0].frontDesign.split("/")[1]
    deleteFolderWithItemsFromS3('custory-cart',`custory-cart/${cartId}/`)
    deleteDraft.mutate({
      draftId : data?.id
    })
  }

  return (
    <>
      <div className="lg:hidden border-2 rounded-md flex flex-col items-center p-2 space-x-4">
        <div className="p-1 flex flex-row justify-around w-full">
          {data?.items?.map(item => {
            return (
              <div key={item.id}>
                <img
                  alt="product"
                  src={`https://custorybucket.s3.ap-southeast-1.amazonaws.com/Products/${item?.productId}/${item?.color}/front.jpg`}
                  className="w-[80px] object-contain h-[80px]"
                  onContextMenu={(e) => e.preventDefault()}
                />
              </div>
            );
          })}
        </div>
        <div>
          <div className="font-semibold my-3">
            {data?.items?.at(0)?.product?.title}{" "}
            {data?.items?.length > 1
              ? ` and ${data?.items?.length - 1} more items`
              : ""}
          </div>

          <div className="py-3 h-auto flex flex-col justify-between">
            <div className="flex pb-4 max-sm:gap-5 gap-9">
              <div className="capitalize font-semibold">Total Amount:- <span className="font-normal">{f(p(data?.total) /100)}</span></div>
            </div>
            <div className="flex pb-4 border-b-[1px] max-sm:gap-5 gap-9">
              <div className="capitalize font-semibold">Modified on:- <span className="font-normal">{moment(data?.updatedAt).format('MMMM,  DD YYYY - hh:mm A')}</span></div>
            </div>
            <div className="mt-3 py-2 flex justify-between items-center">
              <Button onClick={()=>{window.location.href = `/checkout/${data?.id}`}} variant="text">Resume Order</Button>
              <IconButton onClick={handleDelete} color="error">
                {deleteDraft.isLoading?<CircularProgress size={18}/>:<Delete/>}
              </IconButton>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:block rounded-md font-default border-2">
        <div className="">
          <div className="justify-between p-3 bg-gray-100 text-gray-500 flex items-center">
            <div className="flex space-x-7 items-center text-sm">
              <div className="flex flex-col">
                <div>DRAFT-ID #</div>
                <div className="font-semibold">
                  {`${data?.id.slice(0, 11)}...${data?.id.slice(-4)}`}
                </div>
              </div>
              <div className="flex flex-col">
                <div className="capitalize">Modified on</div>
                <div className="font-semibold">{moment(data?.updatedAt).format('MMMM,  DD YYYY - hh:mm A')}</div>
              </div>
              <div className="flex flex-col">
                <div>Total</div>
                <div className="font-semibold">{f(p(data?.total) /100)}</div>
              </div>
            </div>
            <div className="flex flex-col">
              <IconButton onClick={handleDelete} color="error">
                {deleteDraft.isLoading?<CircularProgress size={18}/>:<Delete/>}
              </IconButton>
            </div>
          </div>
        </div>
        <div className="bg-white p-3 mt-1 flex justify-between 3xl:p-5">
          <div>
            <div className="flex space-x-6 mt-3">
            {data?.items?.map(item => {
              return (
                <div key={item.id}>
                  <div className="w-[55px] h-[55px] max-sm:h-[45px] max-sm:w-[45px] rounded-md"
                    style={{ background: `url(https://custorybucket.s3.ap-southeast-1.amazonaws.com/Products/${item?.productId}/${item?.color}/front.jpg) center center/cover` }}
                  ></div>
                </div>
              );
            })}
            </div>
            <div className="mt-2 text-sm">
              {data?.items?.length} Items in this Order
            </div>
          </div>
          <div>
            {!expired ? <div
              onClick={()=>{window.location.href = `/checkout/${data?.id}`}}
              className="text-xs cursor-pointer px-4 py-[3px] border-2 rounded-md shadow-lg xl:text-sm 2xl:px-8 uppercase"
            >
              Resume Order
            </div> :
            <div className="text-xs cursor-not-allowed px-4 py-[3px] bg-[#EC1C24] text-white rounded-md xl:text-sm 2xl:px-8 uppercase">
              Expired
            </div>}
          </div>
        </div>
      </div>
      <hr className="lg:hidden" />
    </>
  );
};

const Drafts = () => {
  const {
    getDrafts: {
      data: draftsData,
      isLoading: fetchDraftLoading,
      error: fetchDraftError,
    },
  } = useGetDrafts();
  const navigate = useNavigate();
  return (
    <AccountLayout>
      <div className="">
        <div className="pb-3 border-b-[1px]">
          <div className={`text-2xl font-bold flex items-center gap-4`}>
            <MdArrowBack onClick={()=>navigate('/account')} className="hidden max-md:block" />
            Saved Drafts
          </div>
          <div className="text-base mt-2 opacity-70">
            Your drafts will expire in 7 days!
          </div>
        </div>
        {fetchDraftError ? (
          <ErrorState />
        ) : fetchDraftLoading ? (
          <div className="w-full flex-col text-primary h-[50vh] flex items-center justify-center">
            <CircularProgress color="inherit" />
            <div className="text-center mt-2 text-base text-black">
              Loading..
            </div>
          </div>
        ) : draftsData?.length === 0? <div className="w-full h-[300px] flex items-center justify-center mt-16 flex-col">
          <img src={noDraftSVG} className='w-[60%] object-contain h-full' onContextMenu={(e) => e.preventDefault()}/>
          <div className="mt-6 text-xl">No Drafts Found!</div>
        </div>:(
          <div className="mt-4 space-y-5">
            {draftsData.map(item=>(
              <DraftItem key={item._id} data={item}/>
            ))}
          </div>
        )}
      </div>
    </AccountLayout>
  );
};

export default Drafts;
