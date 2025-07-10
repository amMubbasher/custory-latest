import { ArrowBack, Delete } from "@mui/icons-material";
import { CircularProgress, Drawer, IconButton, Tooltip } from "@mui/material";
import React from "react";
import useAppStore from "../../hooks/useAppStore";
import Button from "./Button";
import {Button as MuiButton} from "@mui/material";
import useCart from "../../hooks/useCart";
import EmptyCart from "../Checkout/EmptyCart";
import CancelIcon from "@mui/icons-material/Cancel";
import { useNavigate } from "react-router-dom";
import { usePrices } from "../../hooks/usePrices";
import { toast } from "react-hot-toast";
import { deleteFolderWithItemsFromS3 } from "../../utils/functions/S3Functions";

const CartItem = ({ data, handleCartItemDelete }) => {
  const {f,p} = usePrices();
  return (
    <div className="flex items-center justify-between py-3 max-sm:px-0 border-b-[1px] px-2">
      <div className="flex items-center gap-3">
        <div
          className="w-[55px] h-[55px] max-sm:h-[45px] max-sm:w-[45px] rounded-md"
          style={{ background: `url(https://custorybucket.s3.ap-southeast-1.amazonaws.com/Products/${data?.productId}/${data?.color}/front.jpg) center center/cover`}}
        ></div>
        <div>
          <div className="text-lg max-sm:text-base font-[500]">{data?.product?.title}</div>
          <div className="text-gray-500 max-sm:text-sm max-xs:text-xs underline flex flex-wrap flex-1">
          <b>Size : &nbsp;</b>
          {data?.itemProductSizes?.map((item, index) => (
              <span key={index} className="mr-2">{`${item.productSize?.sizeName.toUpperCase()} (${item.quantityPurchased} Qty)`}</span>
             ))}
          </div>
          <div className="text-gray-500 font-bold max-sm:text-sm max-xs:text-xs underline">
            Quantity : {data?.quantity}
          </div>
        </div>
      </div>
      <div className="">
        <div className="flex justify-end">
          <Tooltip title="Remove Item">
            <IconButton sx={{ ":hover": { color: '#FFF', background: 'var(--custory-primary)'} }} onClick={(()=> handleCartItemDelete(data))}>
              <Delete/>
            </IconButton>
          </Tooltip>
        </div>
        {/* <div className="text-sm opacity-50 max-sm:text-xs">
          <strike>{f(p(data?.quantity*data?.price))}</strike>
        </div> */}
        <div className="text-lg font-[600] max-sm:text-base">{f(p(data?.price / 100))}</div>
      </div>
    </div>
  );
};

const SideCart = () => {
  const isLoggedin = useAppStore(state=>state.isLoggedin);
  const {p,f} = usePrices();
  const showCart = useAppStore((state) => state.showCart);
  const setShowCart = useAppStore((state) => state.setShowCart);
  const navigate = useNavigate();
  const {cart,isFetchCartLoading,totalItems, deleteCart, isDeleteCartLoading, deleteItemFromCart} = useCart();
  const newTotal = cart?.items?.reduce((acc, curr) => acc + curr.price, 0);
  const handleCartDelete = ()=>{
    const cartId = cart?.items[0].frontDesign.split("/")[1]
    deleteFolderWithItemsFromS3('custory-cart',`custory-cart/${cartId}/`)
    deleteCart();
  }

  const handleCartItemDelete = (data) => {
    const wholeCart =  cart?.items.length == 1 ? data?.frontDesign.split("/")[1] : null;
    const folderKey = wholeCart !== null ? `custory-cart/${wholeCart}` : data?.frontDesign.split("/frontDesign.jpeg")[0]
    deleteFolderWithItemsFromS3('custory-cart',`${folderKey}/`)
    toast.loading('Item is being removed from the cart!');
    deleteItemFromCart(data.id);
  };
  if (!isLoggedin) {

    return (
      <Drawer anchor="right" open={showCart} onClose={() => setShowCart(false)}>
      <div className="w-[50vw] relative max-w-[600px] max-lg:w-[60vw] max-md:w-[70vw] max-sm:w-[90vw] max-xs:w-[98vw] h-full p-2 max-xs:px-3 px-6">
        <div className=" py-2 flex justify-between items-center border-b-[1px]">
          <div className="flex items-center gap-3">
            <IconButton
              onClick={() => setShowCart(false)}
              sx={{ color: "black" }}
            >
              <ArrowBack />
            </IconButton>
            <div className="text-2xl font-semibold">Cart</div>
          </div>
        </div>
    
            <div className="mt-3 text-lg max-sm:text-sm mx-auto">Please login to view your cart</div>
      </div>
    </Drawer>
    );
  }

  return (
    <Drawer anchor="right" open={showCart} onClose={() => setShowCart(false)}>
      <div className="w-[50vw] relative max-w-[600px] max-lg:w-[60vw] max-md:w-[70vw] max-sm:w-[90vw] max-xs:w-[98vw] h-full p-2 max-xs:px-3 px-6">
        <div className=" py-2 flex justify-between items-center border-b-[1px]">
          <div className="flex items-center gap-3">
            <IconButton
              onClick={() => setShowCart(false)}
              sx={{ color: "black" }}
            >
              <ArrowBack />
            </IconButton>
            <div className="text-2xl font-semibold">Cart</div>
          </div>
          <div className="">
            <Tooltip title='Delete Cart' >
            <MuiButton onClick={handleCartDelete} disabled={(totalItems===0 || isDeleteCartLoading)} variant="contained" sx={{backgroundColor : 'red', "&:hover" : {backgroundColor : 'rgba(255,0,0,0.7)'}}}>{isDeleteCartLoading?<CircularProgress sx={{color : 'white'}} size={20}/>:<Delete/>}</MuiButton>
            </Tooltip>
          </div>
        </div>
        {isFetchCartLoading?<div className="w-full h-[70vh] p-10 flex flex-col items-center justify-center">
            <CircularProgress sx={{color : '#f97b64'}} size={32}/>
            <div className="mt-3 text-lg max-sm:text-sm">Fetching Cart..</div>
        </div>:totalItems===0?(<EmptyCart setShowCart={setShowCart} height={'50vh'} className='mt-24'/>):<>
        <div className="mt-3 text-base px-2">Products</div>
        <div className="mt-2 space-y-3">
          {cart?.items?.map((item, index) => (
              <CartItem key={index} data={item} handleCartItemDelete={handleCartItemDelete}/>
            ))}
        </div>
        <div className="mt-7 max-sm:mt-5 flex items-center justify-between">
          <div className="text-lg max-sm:text-base">Total</div>
          <div className="text-2xl max-sm:text-xl  font-[600]">{f(p(newTotal / 100))}</div>
        </div>
        <div className="mt-10 flex justify-end">
          <Button onClick={()=>{
            setShowCart(false)
            navigate('/checkout')
          }} className={"sm:py-[9px] max-sm:text-sm"}>
            Proceed to checkout!
          </Button>
        </div>
        </>}
      </div>
    </Drawer>
  );
};

export default SideCart;