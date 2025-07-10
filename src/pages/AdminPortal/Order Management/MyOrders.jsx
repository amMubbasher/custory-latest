import React, { useEffect, useState } from "react";
import AdminPortalLayout from "../../../components/AdminPortal/AdminPortalLayout";
import { FaPencilAlt, FaChevronUp, FaChevronDown } from "react-icons/fa";
import { CiCircleMore } from "react-icons/ci";
import { MdOutlineMessage, MdOutlineFactory, MdOutlineWarehouse, MdEmail,  MdCheck, MdOutlinePermIdentity,MdNumbers } from "react-icons/md";
import { IoFilterSharp, IoSearchOutline } from "react-icons/io5";
import { RiTruckLine, RiDoorOpenLine } from "react-icons/ri";
import { LuCalendarClock } from "react-icons/lu";
import { RxCross1 } from "react-icons/rx";
import { TbCurrencyDollarOff } from "react-icons/tb";
import BasicModal from "../../../components/common/BasicModal";
import {Box, Radio, FormControlLabel, RadioGroup, IconButton, Tooltip, TextField, Typography, Accordion, AccordionSummary, AccordionDetails, Button, AccordionActions } from "@mui/material";
import { useFetchAdminOrders } from "../../../hooks/useGifts";
import { formatNumbers } from "../../../utils/functions/formatNumbers";
import { usePrices } from "../../../hooks/usePrices";
import useItem from "../../../hooks/useItem";
import useAppStore from "../../../hooks/useAppStore";
import useOrder from "../../../hooks/useOrder";
import { green, handleItemsLength, handleOrdersLength, hanldeDaysLeft, orange, phases, phasesArr, phasesDisabledArr, red, review, statusConditions } from "../../../utils/Enums";
import { Link, useNavigate } from "react-router-dom";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Tooltip as ReactTooltip } from "react-tooltip";
import { ConfirmationModal } from "../../Account/myorders";

const OrderItem = ({ order, handlePhaseModal, setSelectedItem, orderId, orderStatus }) => {
  const { p, f } = usePrices();
  const modifiedFrontUrl = !window.location.href.includes('http://localhost:5173') ? `https://custory-order.s3.ap-southeast-1.amazonaws.com/${order?.frontDesign}`.replace('/custory-cart', ''): `https://custory-cart.s3.ap-southeast-1.amazonaws.com/${order?.frontDesign}`;
  const modifiedBackUrl = !window.location.href.includes('http://localhost:5173') ? `https://custory-order.s3.ap-southeast-1.amazonaws.com/${order?.backDesign}`.replace('/custory-cart', ''): `https://custory-cart.s3.ap-southeast-1.amazonaws.com/${order?.backDesign}`;
  const navigate = useNavigate();

  return (
    <>
      <tr className={`${order?.status === "delivery is completed" && "bg-[#EAFFE9]"}`}>
        <td className="p-2.5 w-[27%] align-top">
          <div className="flex justify-between">
            <div className="flex items-start gap-2.5 leading-[1.2]">
              <span className="w-[45px] h-[50px] min-w-[45px] overflow-hidden">
                <img src={modifiedFrontUrl} className="w-full h-full"/>
              </span>
              <div className="flex flex-col items-start justify-start">
                <span className="font-semibold"> {order?.product?.title} </span>
                <span
                  className="w-full h-full rounded-full cursor-pointer"
                  style={{backgroundColor: "#" + order?.color, width: "16px", height: "16px", border: "1px solid #" + order?.color}}
                ></span>
                {Object.keys(order.printingType)?.length ? (
                  <span>
                    {order?.printingType?.front || "No Print"} |{" "}
                    {order?.printingType?.back || "No Print"}{" "}
                  </span>
                ) : (
                  <span>No Print</span>
                )}
              </div>
            </div>
          </div>
        </td>
        <td className="p-2.5 w-[15.5%] align-top">
          <div className="flex flex-col items-start justify-start text-left w-[85px]">
            {order?.itemProductSizes.map((order, index) => (
              <span key={index} className="whitespace-nowrap">
                x{order.quantityPurchased}{" "}
                {order.productSize?.sizeName.toUpperCase()}{" "}
              </span>
            ))}
          </div>
        </td>
        <td className="p-2.5 w-[10.5%] align-top">
          <span>{f(p(formatNumbers(order?.price / 100)))}</span>
        </td>
        <td className="p-2.5 w-[9%] align-top">Custory</td>
        <td className="border-[#9F9F9F] border-r p-2.5 w-[15%] align-top pt-0">
          <div className="flex flex-col items-start">
            <div className="flex items-center">
              <Tooltip title="Design" disableInteractive placement="top">
                <div>
                  <IconButton sx={{paddingInline: '5px'}} disabled={phasesDisabledArr.designPhase.includes(order?.status) || order?.noOfSidesPrinted == '0' || (['cancelled', 'refunded']?.includes(orderStatus))} className="cursor-pointer"
                    onClick={() => {
                      handlePhaseModal("Design Phase","product",order?.status);
                      setSelectedItem(order);
                    }}
                  >
                    <FaPencilAlt
                      size={15}
                      color={`${
                        (['cancelled', 'refunded']?.includes(orderStatus)) ? "" :
                        order?.status == "design pending approval"
                          ? "#FF6600"
                          : phasesArr.designPhase.includes(order?.status)
                          ? "#09AA00"
                          : "#EC1C24"
                      }`}
                    />
                  </IconButton>
                </div>
              </Tooltip>
              <Tooltip title="Production" placement="top">
                <div>
                  <IconButton sx={{paddingInline: '5px'}} disabled={phasesDisabledArr.productionPhase.includes(order?.status) || (['cancelled', 'refunded']?.includes(orderStatus))} className="cursor-pointer"
                    onClick={() => {
                      handlePhaseModal("Production Phase","product",order?.status);
                      setSelectedItem(order);
                    }}
                  >
                    <MdOutlineFactory size={15}
                      color={`${
                        (['cancelled', 'refunded']?.includes(orderStatus)) ? "" :
                        order?.status == "design approved" || order?.status == "production pending"
                          ? "#FF6600"
                          : phasesArr.productionPhase.includes(order?.status)
                          ? "#09AA00"
                          : phasesDisabledArr.productionPhase.includes(
                              order?.status
                            ) && "#D8D8D8"
                      }`}
                    />
                  </IconButton>
                </div>
              </Tooltip>
              <Tooltip title="Warehouse" placement="top">
                <div>
                  <IconButton sx={{paddingInline: '5px'}} disabled={phasesDisabledArr.warehousePhase.includes(order?.status) || (['cancelled', 'refunded']?.includes(orderStatus))} className="cursor-pointer"
                    onClick={() => {
                      handlePhaseModal("Warehouse Phase","product",order?.status);
                      setSelectedItem(order);
                    }}
                  >
                    <MdOutlineWarehouse
                      size={15}
                      color={`${
                        (['cancelled', 'refunded']?.includes(orderStatus)) ? "" :
                        [
                          "production started",
                          "supplier has delivered order to warehouse",
                          "supplier’s order has arrived at warehouse",
                          "Warehouse has completed quality check",
                        ].includes(order?.status)
                          ? "#FF6600"
                          : phasesArr.warehousePhase.includes(order?.status)
                          ? "#09AA00"
                          : phasesDisabledArr.warehousePhase.includes(
                              order?.status
                            ) && "#D8D8D8"
                      }`}
                    />
                  </IconButton>
                </div>
              </Tooltip>
              <Tooltip title="Shipment" placement="top">
                <div>
                  <IconButton sx={{paddingInline: '5px'}} disabled={phasesDisabledArr.shippingPhase.includes(order?.status) || (['cancelled', 'refunded']?.includes(orderStatus))} className="cursor-pointer"
                    onClick={() => {
                      handlePhaseModal("Shipping Phase","product",order?.status);
                      setSelectedItem(order);
                    }}
                  >
                    <RiTruckLine size={17}
                      color={`${
                        (['cancelled', 'refunded']?.includes(orderStatus)) ? "" :
                        order?.status == "Warehouse has dispatched the order"||
                            order?.status == "delivery in progress"
                          ? "#FF6600"
                          : phasesArr.shippingPhase.includes(order?.status)
                          ? "#09AA00"
                          : order?.status == "delivery not started"
                          ? "#EC1C24"
                          : phasesDisabledArr.shippingPhase.includes(
                              order?.status
                            ) && "#D8D8D8"
                      }`}
                    />
                  </IconButton>
                </div>
              </Tooltip>
            </div>
            <div className="capitalize"> {`${(['cancelled', 'refunded']?.includes(orderStatus)) ? 'Cancelled' : order?.status}`} </div>
            {(!['cancelled', 'refunded']?.includes(orderStatus)) &&
            <div className="w-full my-2">
              <button disabled={!review.includes(order.status) || orderStatus == 'cancelled'} className="text-[#FF6600] capitalize block text-[14px]" onClick={()=> navigate(`/reviewOrder/${orderId}/${order.id}`)}>
                {review.includes(order.status) ? "Review" : "Completed"}
              </button>
            </div>
            }
          </div>
        </td>
      </tr>
    </>
  );
};

const MyOrders = () => {
  const { fetchGifts: { data: giftData, isLoading, error } } = useFetchAdminOrders();
  const setOrders = useAppStore(state=>state.setOrders);
  const orders = useAppStore(state=>state.orders);
  const { updateItem } = useItem();
  const { updateOrder, updatedOrder } = useOrder({
    placeOrderSuccessCallback:(data)=>{
      if (data?.status) {
        const index = orders.findIndex(
          (order) => order.id === data?.updatedDetails.id
        );
        if (index > -1) {
          orders[index] = data.updatedDetails;
          setOrders([...orders]);
          setOrdersArr([...orders]);
        }
      }
    }
  });
  const [sortFilter, setSortFilter] = useState({ creationValue: 'newest to oldest', expiryValue: 'reset-expiry-sort' });
  const [dropMenu, setDropMenu] = useState([]);
  const [phaseModal, setPhaseModal] = useState({});
  const [selectedPhase, setSelectedPhase] = useState({});
  const [phaseDetails, setPhaseDetails] = useState("");
  const [selectedItem, setSelectedItem] = useState({});
  const [ordersArr, setOrdersArr] = useState([]);
  const [itemStatusLength, setItemStatusLength] = useState({});
  const [orderStatusLength, setOrderStatusLength] = useState({});
  const [openConfirmationModel,setOpenConfirmationModel] = useState(false)
  const [orderInfo,setOrderInfo] = useState({})
  const [selectedButon, setSelectedButton] = useState("all order");
  const [editDate, setEditDate] = useState([]);
  const [updatedDeliveryDate, setUpdatedDeliveryDate] = useState('');
  const [moveNextPhase, setMoveNextPhase] = useState({});
  const [inputFilterValue, setInputFilterValue] = useState({ searchByOrderId: '', searchByUserName: '' });
  const { p, f } = usePrices();
  const navigate = useNavigate();

  useEffect(()=>{
    setOrdersArr([...orders]);
  },[orders])

  useEffect(() => {
    // Order-Items Length
    setOrdersArr([...orders]);
    const {allItems, designReview, designReject, inProduction, deliverToWarehouse, reachedWarehouse, completed} = handleItemsLength(orders)
    setItemStatusLength({ allItems, designReview, designReject, inProduction, deliverToWarehouse, reachedWarehouse, completed });

    // Order Length
    const {allOrders, designReviewOrders, designRejectOrders, inProductionOrders, deliverToWarehouseOrders, reachedWarehouseOrders, dispatchedOrders, completedOrders, cancelledOrders, refundedOrders} = handleOrdersLength(orders);
    setOrderStatusLength({ allOrders, designReviewOrders, designRejectOrders, inProductionOrders, deliverToWarehouseOrders, reachedWarehouseOrders, dispatchedOrders, completedOrders, cancelledOrders, refundedOrders });
  }, [orders]);

  const handlePhaseModal = (title, section, status, id) => {
    const excludedStatuses = ["design approved","production started","Warehouse has dispatched the order","delivery is completed"]
    const phase = phases.find((item) => item.heading == title);
    setPhaseDetails(status);
    if(Boolean(id)){
      const selectedOrder = ordersArr?.find((item)=> item?.id == id);
      const boolean = selectedOrder?.items?.every((item)=> excludedStatuses.slice(excludedStatuses.indexOf(selectedOrder?.status) + 1).includes(item.status) || (item?.noOfSidesPrinted == '0' && item.status == 'production pending'));
      setMoveNextPhase({modalSide: 'orders', value: excludedStatuses, disable: !boolean});
    }else{
      setMoveNextPhase({});
    }
    setSelectedPhase(phase || {});
    setPhaseModal({ open: true, heading: title, section: section });
  };

  const handleFilteration = (filter, type) => {
    setSortFilter({ creationValue: 'reset-creation-sort', expiryValue: 'reset-expiry-sort' });
    setSelectedButton(type === "items" ? `${filter} items` : `${filter} order`);
    if (filter === "all") {
      setOrdersArr([...orders]);
    } else {
      const filteredOrders = orders.map((order) => ({
          ...order,
          items: type === "items" ? order.items.filter((item) => statusConditions[filter]?.includes(item.status) || item.status === filter): order.items,
        })).filter((order) =>
          type === "items" ? order?.items?.length > 0 : statusConditions[filter]?.includes(order.status) || order.status === filter
        );
      if (filteredOrders?.length > 0) {
        const sortedOrders = [...filteredOrders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrdersArr([...sortedOrders]);
      } else {
        setOrdersArr([]);
      }
    }
  };

  const handleInputFilter = ({ target: { name, value } }) => {
    setInputFilterValue((prev) => ({...prev, [name]: value}));
    if(name === 'searchByUserName'){
      setInputFilterValue(prev => ({ ...prev, searchByOrderId: '' }));
    }else if(name === 'searchByOrderId'){
      setInputFilterValue(prev => ({ ...prev, searchByUserName: '' }));
    }
    setSelectedButton("all order");
    const searchTerm = value.toLowerCase();
    const filteredOrders = orders.filter(({ id, customerFirstName, customerLastName }) => id.toLowerCase().includes(searchTerm) || customerFirstName.toLowerCase().includes(searchTerm) || customerLastName.toLowerCase().includes(searchTerm));
    setOrdersArr(filteredOrders.length ? filteredOrders : []);
  };
  const formatDate = (date) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  };

  return (
    <AdminPortalLayout>
      <div className="p-3 font-poppins lg:p-4">
        <p className="text-[20px] mb-1">My Orders</p>
        <p className="text-[14px] mb-1">Overall Status</p>

        <div className="flex gap-2.5 flex-wrap">
          <button
            className={`${selectedButon == 'all order' ? 'border-[#09AA00] bg-green-50' : 'border-[#9F9F9F]'} p-2.5 rounded-md text-black border outline-none`}
            onClick={() => handleFilteration("all", "order")}
          >
            All Orders ({orderStatusLength?.allOrders})
          </button>
          <button
            className={`${
              selectedButon == "design pending approval order"
                ? "border-[#FF6600] bg-orange-50"
                : "border-[#9F9F9F]"
            } p-2.5 rounded-md text-black border outline-none flex items-center`}
            onClick={() =>
              handleFilteration("design pending approval", "order")
            }
          >
            <FaPencilAlt size={15} color="#FF6600" className="mr-[10px]" />{" "}
            Design Pending Approval ({orderStatusLength?.designReviewOrders})
          </button>
          <button
            className={`${
              selectedButon == "design rejected order"
                ? "border-[#EC1C24] bg-red-50"
                : "border-[#9F9F9F]"
            } p-2.5 rounded-md text-black border outline-none flex items-center`}
            onClick={() => handleFilteration("design rejected", "order")}
          >
            <FaPencilAlt size={15} color="#EC1C24" className="mr-[10px]" />{" "}
            Design Rejected ({orderStatusLength?.designRejectOrders})
          </button>
          <button
            className={`${
              selectedButon == "design approved order"
                ? "border-[#FF6600] bg-orange-50"
                : "border-[#9F9F9F]"
            } p-2.5 rounded-md text-black border outline-none flex items-center`}
            onClick={() => handleFilteration("design approved", "order")}
          >
            <MdOutlineFactory size={17} color="#FF6600" className="mr-[10px]" />{" "}
            In Production ({orderStatusLength?.inProductionOrders})
          </button>
          <button
            className={`${
              selectedButon == "production started order"
                ? "border-[#FF6600] bg-orange-50"
                : "border-[#9F9F9F]"
            } p-2.5 rounded-md text-black border outline-none flex items-center`}
            onClick={() => handleFilteration("production started", "order")}
          >
            <MdOutlineWarehouse
              size={17}
              color="#FF6600"
              className="mr-[10px]"
            />{" "}
            Delivery to warehouse ({orderStatusLength?.deliverToWarehouseOrders}
            )
          </button>
          <button
            className={`${
              selectedButon == "Warehouse has dispatched the order order"
                ? "border-[#FF6600] bg-orange-50"
                : "border-[#9F9F9F]"
            } p-2.5 rounded-md text-black border outline-none flex items-center`}
            onClick={() =>
              handleFilteration("Warehouse has dispatched the order", "order")
            }
          >
            <RiTruckLine size={17} color="#FF6600" className="mr-[10px]" />{" "}
            Pending Shipment ({orderStatusLength?.reachedWarehouseOrders})
          </button>
          <button
            className={`${
              selectedButon == "delivery is completed order"
                ? "border-[#FF6600] bg-orange-50"
                : "border-[#9F9F9F]"
            } p-2.5 rounded-md text-black border outline-none flex items-center`}
            onClick={() => handleFilteration("delivery is completed", "order")}
          >
            <RiDoorOpenLine color="#FF6600" className="mr-[10px]" /> Pending Order Receive ({orderStatusLength?.dispatchedOrders})
          </button>
          <button
            className={`${
              selectedButon == "order received order"
                ? "border-[#09AA00] bg-green-50"
                : "border-[#9F9F9F]"
            } p-2.5 rounded-md text-black border outline-none flex items-center`}
            onClick={() => handleFilteration("order received", "order")}
          >
            <MdCheck size={19} color="#09AA00" className="mr-[10px]" /> Order
            Completed ({orderStatusLength?.completedOrders})
          </button>
          <button
            onClick={() => handleFilteration("cancelled", "order")}
            className={`${
              selectedButon == "cancelled order"
                ? "border-[#FF6600] bg-orange-50"
                : "border-[#9F9F9F]"
            } p-2.5 rounded-md text-black border outline-none flex items-center`}
          >
            <RxCross1 size={17} color="#FF0000" className="mr-[10px]" />{" "}
            Cancelled ({orderStatusLength?.cancelledOrders})
          </button>
          <button
            onClick={() => handleFilteration("refunded", "order")}
            className={`${
              selectedButon == "refunded"
                ? "border-[#FF6600] bg-orange-50"
                : "border-[#9F9F9F]"
            } p-2.5 rounded-md text-black border outline-none flex items-center`}
          >
            <TbCurrencyDollarOff size={17} color="#FF6600" className="mr-[10px]"/>{" "}
            Return/Refund ({orderStatusLength?.refundedOrders})
          </button>
        </div>

        <div className="w-full border-[#9F9F9F] border-t mt-2.5"></div>
        <p className="text-[14px] my-2">Item Status</p>

        <div className="flex gap-2.5 flex-wrap">
          <button
            className={`${
              selectedButon == "all items"
                ? "border-[#09AA00] bg-green-50"
                : "border-[#9F9F9F]"
            } p-2.5 rounded-md text-black border outline-none`}
            onClick={() => handleFilteration("all", "items")}
          >
            All Items <span>({itemStatusLength?.allItems})</span>
          </button>
          <button
            className={`${
              selectedButon == "design pending approval items"
                ? "border-[#FF6600] bg-orange-50"
                : "border-[#9F9F9F]"
            } p-2.5 rounded-md text-black border outline-none flex items-center`}
            onClick={() =>
              handleFilteration("design pending approval", "items")
            }
          >
            <FaPencilAlt size={15} color="#FF6600" className="mr-[10px]" />{" "}
            Design Pending Approval{" "}
            <span>({itemStatusLength?.designReview})</span>
          </button>
          <button
            className={`${
              selectedButon == "design rejected items"
                ? "border-[#EC1C24] bg-red-50"
                : "border-[#9F9F9F]"
            } p-2.5 rounded-md text-black border outline-none flex items-center`}
            onClick={() => handleFilteration("design rejected", "items")}
          >
            <FaPencilAlt size={15} color="#EC1C24" className="mr-[10px]" />{" "}
            Design Rejected <span>({itemStatusLength?.designReject})</span>
          </button>
          <button
            className={`${
              selectedButon == "design approved items"
                ? "border-[#FF6600] bg-orange-50"
                : "border-[#9F9F9F]"
            } p-2.5 rounded-md text-black border outline-none flex items-center`}
            onClick={() => handleFilteration("design approved", "items")}
          >
            <MdOutlineFactory size={17} color="#FF6600" className="mr-[10px]" />{" "}
            In Production ({itemStatusLength?.inProduction})
          </button>
          <button
            className={`${
              selectedButon == "production started items"
                ? "border-[#FF6600] bg-orange-50"
                : "border-[#9F9F9F]"
            } p-2.5 rounded-md text-black border outline-none flex items-center`}
            onClick={() => handleFilteration("production started", "items")}
          >
            <MdOutlineWarehouse
              size={17}
              color="#FF6600"
              className="mr-[10px]"
            />{" "}
            Delivery to warehouse{" "}
            <span>({itemStatusLength?.deliverToWarehouse})</span>
          </button>
          <button
            className={`${
              selectedButon == "Warehouse has dispatched the order items"
                ? "border-[#FF6600] bg-orange-50"
                : "border-[#9F9F9F]"
            } p-2.5 rounded-md text-black border outline-none flex items-center`}
            onClick={() =>
              handleFilteration("Warehouse has dispatched the order", "items")
            }
          >
            <RiTruckLine size={17} color="#FF6600" className="mr-[10px]" />{" "}
            Pending Shipment <span>({itemStatusLength?.reachedWarehouse})</span>
          </button>
          <button
            className={`${
              selectedButon == "delivery is completed items"
                ? "border-[#09AA00] bg-green-50"
                : "border-[#9F9F9F]"
            } p-2.5 rounded-md text-black border outline-none flex items-center`}
            onClick={() => handleFilteration("delivery is completed", "items")}
          >
            <MdCheck size={19} color="#09AA00" className="mr-[10px]" />{" "}
            Completed <span>({itemStatusLength?.completed})</span>
          </button>
          {/* <button
            disabled
            className="p-2.5 border-[#9F9F9F] rounded-md outline-none text-black border flex items-center disabled:cursor-not-allowed"
          >
            <RxCross1 size={17} color="#FF0000" className="mr-[10px]" />{" "}
            Cancelled
          </button> */}
          {/* <button
            disabled
            className="p-2.5 border-[#9F9F9F] rounded-md outline-none text-black border flex items-center disabled:cursor-not-allowed"
          >
            <TbCurrencyDollarOff
              size={17}
              color="#FF6600"
              className="mr-[10px]"
            />{" "}
            Return/Refund
          </button> */}
        </div>
        <div className="py-2.5 flex gap-2.5 max-sm:flex-wrap">
          <span className="w-full border-[#9F9F9F] rounded-md py-3.5 px-2.5 flex items-center border">
            <input type="text" className="w-full outline-none placeholder:text-[#6F6F6F]" name="searchByOrderId" value={inputFilterValue?.searchByOrderId} placeholder="Search by Order ID" onChange={(e) => handleInputFilter(e)}/>
            <IoSearchOutline size={21} color="#6F6F6F" className="ml-[10px]" />
          </span>
          <span className="w-full border-[#9F9F9F] rounded-md py-3.5 px-2.5 flex items-center border">
            <input type="text" className="w-full outline-none placeholder:text-[#6F6F6F]" name="searchByUserName" value={inputFilterValue?.searchByUserName} placeholder="Search by User" onChange={(e) => handleInputFilter(e)}/>
            <IoSearchOutline size={21} color="#6F6F6F" className="ml-[10px]" />
          </span>
        </div>
        <div className="flex items-center gap-3 w-full max-sm:flex-wrap">
          <span className="relative p-[5px] pl-7 rounded-[27px] bg-[#F9E5CA] text-black">
            <IoFilterSharp
              size={20}
              className="absolute top-[4px] left-[10px]"
            />
            <select
              className="bg-[#F9E5CA] px-2 outline-none"
              value={sortFilter.creationValue}
              onChange={({ target }) => {
                setSelectedButton("all order");
                setSortFilter({
                  creationValue: target.value,
                  expiryValue: "reset-expiry-sort",
                });
                const sortedOrders = [...orders].sort((a, b) => {
                  if (target.value === "oldest to newest") {
                    return new Date(a.createdAt) - new Date(b.createdAt);
                  } else if (target.value === "newest to oldest") {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                  }
                  return 0;
                });
                if(sortedOrders?.length){
                  setOrdersArr(sortedOrders);
                }
              }}
            >
              <option value="reset-creation-sort">Sort on Creation Date</option>
              <option value="oldest to newest">Oldest to Newest</option>
              <option value="newest to oldest">Newest to Oldest</option>
            </select>
          </span>
          <span className="relative p-[5px] pl-7 rounded-[27px] bg-[#F9E5CA] text-black">
            <IoFilterSharp
              size={20}
              className="absolute top-[4px] left-[10px]"
            />
            <select
              className="bg-[#F9E5CA] px-2 outline-none"
              value={sortFilter.expiryValue}
              onChange={({ target }) => {
                setSelectedButton("all order");
                setSortFilter({
                  creationValue: "reset-creation-sort",
                  expiryValue: target.value,
                });
                const sortedOrders = [...orders].sort((a, b) => {
                  if (target.value === "oldest expiry") {
                    return new Date(a.shippingDate) - new Date(b.shippingDate);
                  } else if (target.value === "latest expiry") {
                    return new Date(b.shippingDate) - new Date(a.shippingDate);
                  }
                  return 0;
                });
                if(sortedOrders?.length){
                  setOrdersArr(sortedOrders);
                }
              }}
            >
              <option value="reset-expiry-sort">Sort on Expiry Date</option>
              <option value="latest expiry">Latest Expiry</option>
              <option value="oldest expiry">Oldest Expiry</option>
            </select>
          </span>
          <button
            className="rounded-[27px] bg-[#F9E5CA] text-black outline-none p-[5px] px-3"
            onClick={() => setDropMenu([])}
          >
            Expand all
          </button>
        </div>
        <div className="w-full border-[#9F9F9F] rounded-md py-3.5 px-2.5 flex items-center border my-2.5 max-sm:hidden">
          <table className="w-full table-fixed">
            <tbody>
              <tr>
                <td className="pl-2.5 w-[25%]"> Item(s) </td>
                <td className="pl-2.5 w-[15%]"> Size </td>
                <td className="pl-2.5 w-[10%]"> Total Price </td>
                <td className="pl-2.5 w-[10%]"> Supplier </td>
                <td className="pl-2.5 w-[15%]"> Item Status </td>
                <td className="pl-3 w-[10%]"> Order Status </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="max-sm:hidden">
          {ordersArr?.length > 0
            ? ordersArr?.map((order, index) => (
                <React.Fragment key={index}>
                  <div className="flex items-center rounded-b-none rounded-md px-4 py-[5px] mt-2 bg-[#DBDBDB]">
                    <span className="w-[30rem] max-xl:w-72 text-blue-600">
                      <Link className="cursor-pointer" to={`/account/user/${order?.userId}`}>{order?.customerFirstName} {order?.customerLastName}</Link>
                      <MdOutlineMessage
                        className="text-black ml-1 inline"
                        size={12}
                      />
                    </span>
                    <span
                      className="cursor-pointer px-3"
                      onClick={() => {
                        if (!dropMenu.includes(index)) {
                          setDropMenu([...dropMenu, index]);
                        } else {
                          const filterDropMenu = dropMenu.filter(
                            (item) => item !== index
                          );
                          setDropMenu([...filterDropMenu]);
                        }
                      }}
                    >
                      {dropMenu.includes(index) ? (
                        <FaChevronDown size={10} />
                      ) : (
                        <FaChevronUp size={10} />
                      )}
                    </span>
                    <div className="flex items-center justify-end gap-2.5 w-full">
                      <Tooltip placement="top" title="Order Creation Date">
                        <span>
                          {new Date(order?.createdAt).toLocaleDateString("en-GB", {day: "numeric", month: "short", year: "numeric"}).replace(",", "")}
                        </span>
                      </Tooltip>
                      <Tooltip placement="top" title="Delivery Type">
                        <span className="text-black">
                          {order?.shippingType}
                        </span>
                      </Tooltip>
                      <Tooltip
                        placement="top"
                        title={`${!editDate.includes(index) ? `${hanldeDaysLeft(order?.shippingDate)} ${ hanldeDaysLeft(order?.shippingDate) > 1 ? "days" : "day" } left to receive the order` : ''}`}
                      >
                        <span className= {`${hanldeDaysLeft(order?.shippingDate) >= 7 ? "text-[#09AA00]" : "text-[#FF0509]"} relative`}>
                          Expiry Date: {order?.shippingDate}{" "}
                          <IconButton className="cursor-pointer"
                            sx={{paddingInline: '5px'}}
                            disabled={(['cancelled', 'refunded']?.includes(order?.status))}
                            onClick={() => {
                              const newDate = new Date(order?.shippingDate);
                              newDate.setDate(newDate.getDate() + 1);
                              setUpdatedDeliveryDate(newDate.toISOString().split("T")[0]);
                                if (!editDate.includes(index)) {
                                  setEditDate([...editDate, index]);
                                } else {
                                  const filterDropMenu = editDate.filter(
                                    (item) => item !== index
                                  );
                                  setEditDate([...filterDropMenu]);
                                }
                            }}
                          >
                            <FaPencilAlt size={15} color={(['cancelled', 'refunded']?.includes(order?.status)) ? "" : "#09AA00"} />
                          </IconButton>
                          {editDate.includes(index) ? 
                            <>
                              <div className="absolute top-[-165px] flex flex-col justify-center items-center bg-black shadow-lg z-50 w-60 rounded-lg px-2 pb-4 pt-2">
                                <div className="w-full flex flex-col items-center justify-start">
                                  <div className="w-full flex items-center justify-between px-0.5 mb-2">
                                    <Typography sx={{color: 'white'}}>Edit Delivery Date</Typography>
                                    <IconButton
                                      onClick={()=> {
                                        const filterDropMenu = editDate.filter(
                                          (item) => item !== index
                                        );
                                        setEditDate([...filterDropMenu]);
                                      }} 
                                      className="cursor-pointer"
                                    >
                                      <RxCross1 size={15} color='white' />
                                    </IconButton>
                                  </div>
                                  <TextField
                                    className="rounded-md bg-gray-100 w-[85%]"
                                    sx={{padding:'0px 0px'}}
                                    fullWidth
                                    name="expiryDate"
                                    value={updatedDeliveryDate}
                                    type="date"
                                    variant="outlined"
                                    onChange={({target:{value}})=>{
                                      const newDate = new Date(value);
                                      setUpdatedDeliveryDate(newDate.toISOString().split("T")[0]);
                                    }}
                                    inputProps={{
                                      min: new Date().toISOString().split("T")[0],
                                    }}
                                  />
                                </div>
                                <button disabled={updatedDeliveryDate < new Date().toISOString().split("T")[0]} className="bg-custoryPrimary disabled:bg-slate-400 disabled:cursor-not-allowed text-white mt-3 w-16 py-1 rounded-md text-center"
                                  onClick={()=>{
                                    const newDeliveryDate = formatDate(new Date(updatedDeliveryDate));
                                    if(newDeliveryDate){
                                      const id = order?.id;
                                      updateOrder({
                                        data: { id, shippingDate: newDeliveryDate },
                                      });
                                      const filterDropMenu = editDate.filter(
                                        (item) => item !== index
                                      );
                                      setEditDate([...filterDropMenu])
                                    }
                                  }}
                                >Update</button>
                              </div>
                              <span className="after:content-[''] after:absolute after:top-[-20px] after:z-10 after:shadow-md after:left-[58%] after:w-5 after:h-5 after:rotate-45 after:bg-black"></span>
                            </> : null
                          }
                        </span>
                      </Tooltip>
                      <span className="w-[152px] whitespace-nowrap flex text-blue-500">
                        <span className="text-[#6F6F6F]">Order ID:</span>
                        <Link to={`/account/mygifts/${order?.id}`} className="w-[100px] overflow-hidden text-ellipsis">{order?.id}</Link>
                      </span>
                      <span className="cursor-pointer">
                        {" "}
                        <IoSearchOutline size={13} color="#000000" />{" "}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`${
                      dropMenu.includes(index) && "max-h-[0] overflow-hidden"
                    }
                    flex border border-[#9F9F9F] rounded-t-none rounded-md transition-all duration-7000 ease-linear`}
                  >
                    <table className="w-full table-fixed rounded-md rounded-t-none">
                      <tbody>
                        {order?.items?.sort((a,b)=> a?.noOfSidesPrinted - b?.noOfSidesPrinted).map((item, index) => (
                          <OrderItem
                            key={index}
                            order={item}
                            handlePhaseModal={handlePhaseModal}
                            setSelectedItem={setSelectedItem}
                            orderId={order?.id}
                            orderStatus={order?.status}
                          />
                        ))}
                      </tbody>
                    </table>
                    <div className="w-[15%] max-w-[18%] p-2.5 flex items-center">
                      <div>
                        <div className="flex items-center justify-center">
                          <Tooltip placement="top" title="Design">
                            <div className="max-xl:flex max-xl:items-center max-xl:justify-center max-xl:h-[15px] max-xl:w-[15px] max-xl:mr-[4px]">
                              <IconButton
                                disabled={phasesDisabledArr.designPhase.includes(order?.status) || (['cancelled', 'refunded']?.includes(order?.status))}
                                className="cursor-pointer"
                                sx={{paddingInline: '5px'}}
                                onClick={() => {
                                  handlePhaseModal("Design Phase", "order", order?.status, order?.id);
                                  setSelectedItem(order);
                                }}
                              >
                                <FaPencilAlt
                                  size={15}
                                  color={`${
                                    order?.status == "design pending approval" || order?.status == 'payment received'
                                      ? "#FF6600"
                                      : phasesArr.designPhase.includes(
                                          order?.status
                                        )
                                      ? "#09AA00"
                                      : (['cancelled', 'refunded']?.includes(order?.status)) ? '' : "#EC1C24"
                                  }`}
                                />
                              </IconButton>
                            </div>
                          </Tooltip>
                          <Tooltip placement="top" title="Production">
                            <div className="max-xl:flex max-xl:items-center max-xl:justify-center max-xl:h-[15px] max-xl:w-[15px] max-xl:mr-[4px]">
                              <IconButton
                                disabled={phasesDisabledArr.productionPhase.includes(order?.status) || (['cancelled', 'refunded']?.includes(order?.status))}
                                className="cursor-pointer"
                                sx={{paddingInline: '5px'}}
                                onClick={() => {
                                  handlePhaseModal("Production Phase", "order", order?.status, order?.id);
                                  setSelectedItem(order);
                                }}
                              >
                                <MdOutlineFactory
                                  size={15}
                                  color={`${
                                    order?.status == "design approved" ||  order?.status == "production pending"
                                      ? "#FF6600"
                                      : phasesArr.productionPhase.includes(
                                          order?.status
                                        )
                                      ? "#09AA00"
                                      : phasesDisabledArr.productionPhase.includes(
                                          order?.status
                                        ) ? "#D8D8D8" : ''
                                  }`}
                                />
                              </IconButton>
                            </div>
                          </Tooltip>
                          <Tooltip placement="top" title="Warehouse">
                            <div className="max-xl:flex max-xl:items-center max-xl:justify-center max-xl:h-[15px] max-xl:w-[15px] max-xl:mr-[4px]">
                              <IconButton
                                disabled={phasesDisabledArr.warehousePhase.includes(order?.status) || (['cancelled', 'refunded']?.includes(order?.status))}
                                className="cursor-pointer"
                                sx={{paddingInline: '5px'}}
                                onClick={() => {
                                  handlePhaseModal("Warehouse Phase", "order", order?.status, order?.id);
                                  setSelectedItem(order);
                                }}
                              >
                                <MdOutlineWarehouse
                                  size={15}
                                  color={`${
                                    [
                                      "production started",
                                      "supplier has delivered order to warehouse",
                                      "supplier’s order has arrived at warehouse",
                                      "Warehouse has completed quality check",
                                    ].includes(order?.status)
                                      ? "#FF6600"
                                      : phasesArr.warehousePhase.includes(
                                          order?.status
                                        )
                                      ? "#09AA00"
                                      : phasesDisabledArr.warehousePhase.includes(
                                          order?.status
                                        ) ? "#D8D8D8" : ''
                                  }`}
                                />
                              </IconButton>
                            </div>
                          </Tooltip>
                          <Tooltip placement="top" title="Shipment">
                            <div className="max-xl:flex max-xl:items-center max-xl:justify-center max-xl:h-[15px] max-xl:w-[15px] max-xl:mr-[4px]">
                              <IconButton
                                disabled={phasesDisabledArr.shippingPhase.includes(order?.status) || (['cancelled', 'refunded']?.includes(order?.status))}
                                sx={{paddingInline: '5px'}}
                                className="cursor-pointer"
                                onClick={() => {
                                  handlePhaseModal("Shipping Phase", "order", order?.status, order?.id);
                                  setSelectedItem(order);
                                }}
                              >
                                <RiTruckLine
                                  size={17}
                                  color={`${
                                    order?.status ==
                                    "Warehouse has dispatched the order" ||
                                        order?.status == "delivery in progress"
                                      ? "#FF6600"
                                      : phasesArr.shippingPhase.includes(
                                          order?.status
                                        )
                                      ? "#09AA00"
                                      : order?.status ==
                                          "delivery not started"
                                      ? "#EC1C24"
                                      : phasesDisabledArr.shippingPhase.includes(
                                          order?.status
                                        ) ? "#D8D8D8" : ''
                                  }`}
                                />
                              </IconButton>
                            </div>
                          </Tooltip>
                          <Tooltip placement="top" title="Order">
                            <div className="max-xl:flex max-xl:items-center max-xl:justify-center max-xl:h-[15px] max-xl:w-[15px] max-xl:mr-[4px]">
                              <IconButton
                                disabled={phasesDisabledArr.orderPhase.includes(order?.status) || (['cancelled', 'refunded']?.includes(order?.status))}
                                className="cursor-pointer"
                                sx={{paddingInline: '5px'}}
                                onClick={() => {
                                  handlePhaseModal("Order Receive Phase", "order", order?.status, order?.id);
                                  setSelectedItem(order);
                                }}
                              >
                                <MdCheck
                                  size={15}
                                  color={`${
                                    order?.status == "delivery is completed" || order?.status == "pending order receive"
                                      ? "#FF6600"
                                      : order?.status == "order received"
                                      ? "#09AA00"
                                      : phasesDisabledArr.orderPhase.includes(
                                          order?.status
                                        ) ? "#D8D8D8" : ''
                                  }`}
                                />
                              </IconButton>
                            </div>
                          </Tooltip>
                        </div>
                        <p className={`${order?.status == 'cancelled' ? 'text-[#EC1C24]' : order?.status == 'refunded' && 'text-[#09AA00]'} font-bold text-base text-center my-3 capitalize`}>
                          {order?.status}
                        </p>
                        {(!['cancelled', 'refunded']?.includes(order?.status)) ? <button type="button" className="text-[#EC1C24] disabled:cursor-not-allowed disabled:text-gray-500 disabled:hover:no-underline font-semibold capitalize block text-[14px] outline-none hover:underline text-center w-full" 
                          onClick={()=>{
                            setOpenConfirmationModel(true)
                            setOrderInfo({
                              orderId: order?.id,
                              paymentIntentId: order?.paymentId
                            })
                          }}
                          disabled={order?.status == "order received"}
                        >
                          Cancel Order
                        </button> : null}
                      </div>
                    </div>
                  </div>
                </React.Fragment>
              ))
              : "No Item Found"}
        </div>
        <ConfirmationModal open={openConfirmationModel} handleClose={()=>{setOpenConfirmationModel(false)}} orderId={orderInfo?.orderId} paymentIntentId={orderInfo?.paymentIntentId}/>

        <div className="hidden max-sm:block mt-4">
          {ordersArr?.length > 0
            ? ordersArr?.map((order, index) => (
              <React.Fragment key={index}>
                <div className="min-h-[280px] w-full pt-2 pb-5 my-3 border-2 rounded-md shadow-lg shadow-gray-200">
                  <div className="w-full ml-3">
                    <div className="w-full flex items-center justify-start">
                      <span><MdNumbers size={22}/></span>
                      <span className="w-full leading-[2rem] ml-[15px] whitespace-nowrap">{`${order?.id.slice(0, 8)}...${order?.id.slice(-4)}`}</span>
                    </div>
                    <div className="w-full flex items-center justify-start">
                      <span><MdOutlinePermIdentity  size={22}/></span>
                      <span className="w-full leading-[2rem] ml-[15px] whitespace-nowrap">{order?.customerFirstName} {order?.customerLastName}</span>
                    </div>
                    <div className="w-full flex items-center justify-start">
                      <span><CiCircleMore size={22} color = {red.includes(order?.status) ? '#EC1C24' : green.includes(order?.status) ? "#09AA00" : orange.includes(order?.status) && "#FF6600"} /></span>
                      <span className="w-full leading-[2rem] ml-[15px]">
                        <span className={`${red.includes(order?.status) ? 'text-[#EC1C24]' : green.includes(order?.status) ? "text-[#09AA00]" : orange.includes(order?.status) && "text-[#FF6600]"} capitalize`} >{order?.status}</span>
                      </span>
                    </div>
                    <div className="w-full flex items-center justify-start">
                      <span><RiTruckLine size={22}/></span>
                      <span className="w-full leading-[2rem] ml-[15px] whitespace-nowrap">{order?.shippingType}</span>
                    </div>
                    <div className="w-full flex items-center justify-start">
                      <span><LuCalendarClock color = {hanldeDaysLeft(order?.shippingDate) >= 7 ? "#09AA00" : "#FF0509"} size={22}/></span>
                      <span className="w-full leading-[2rem] ml-[15px] whitespace-nowrap">
                        <span className= {`${hanldeDaysLeft(order?.shippingDate) >= 7 ? "text-[#09AA00]" : "text-[#FF0509]"} relative`}>
                          {order?.shippingDate}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="flex items-end justify-around w-full my-4">
                    <Tooltip placement="top" title="Design">
                      <div className="max-xl:flex max-xl:items-center max-xl:justify-center max-xl:h-[15px] max-xl:w-[15px] max-xl:mr-[4px]">
                        <IconButton
                          disabled={phasesDisabledArr.designPhase.includes(order?.status) || (['cancelled', 'refunded']?.includes(order?.status))}
                          className="cursor-pointer"
                          sx={{paddingInline: '5px'}}
                          onClick={() => {
                            handlePhaseModal("Design Phase", "order", order?.status, order?.id);
                            setSelectedItem(order);
                          }}
                        >
                          <FaPencilAlt
                            size={15}
                            color={`${
                              order?.status == "design pending approval" || order?.status == 'payment received'
                                ? "#FF6600"
                                : phasesArr.designPhase.includes(
                                    order?.status
                                  )
                                ? "#09AA00"
                                : (['cancelled', 'refunded']?.includes(order?.status)) ? '' : "#EC1C24"
                            }`}
                          />
                        </IconButton>
                      </div>
                    </Tooltip>
                    <Tooltip placement="top" title="Production">
                      <div className="max-xl:flex max-xl:items-center max-xl:justify-center max-xl:h-[15px] max-xl:w-[15px] max-xl:mr-[4px]">
                        <IconButton
                          disabled={phasesDisabledArr.productionPhase.includes(order?.status) || (['cancelled', 'refunded']?.includes(order?.status))}
                          className="cursor-pointer"
                          sx={{paddingInline: '5px'}}
                          onClick={() => {
                            handlePhaseModal("Production Phase", "order", order?.status, order?.id);
                            setSelectedItem(order);
                          }}
                        >
                          <MdOutlineFactory
                            size={15}
                            color={`${
                              order?.status == "design approved" ||  order?.status == "production pending"
                                ? "#FF6600"
                                : phasesArr.productionPhase.includes(
                                    order?.status
                                  )
                                ? "#09AA00"
                                : phasesDisabledArr.productionPhase.includes(
                                    order?.status
                                  ) ? "#D8D8D8" : ''
                            }`}
                          />
                        </IconButton>
                      </div>
                    </Tooltip>
                    <Tooltip placement="top" title="Warehouse">
                      <div className="max-xl:flex max-xl:items-center max-xl:justify-center max-xl:h-[15px] max-xl:w-[15px] max-xl:mr-[4px]">
                        <IconButton
                          disabled={phasesDisabledArr.warehousePhase.includes(order?.status) || (['cancelled', 'refunded']?.includes(order?.status))}
                          className="cursor-pointer"
                          sx={{paddingInline: '5px'}}
                          onClick={() => {
                            handlePhaseModal("Warehouse Phase", "order", order?.status, order?.id);
                            setSelectedItem(order);
                          }}
                        >
                          <MdOutlineWarehouse
                            size={15}
                            color={`${
                              [
                                "production started",
                                "supplier has delivered order to warehouse",
                                "supplier’s order has arrived at warehouse",
                                "Warehouse has completed quality check",
                              ].includes(order?.status)
                                ? "#FF6600"
                                : phasesArr.warehousePhase.includes(
                                    order?.status
                                  )
                                ? "#09AA00"
                                : phasesDisabledArr.warehousePhase.includes(
                                    order?.status
                                  ) ? "#D8D8D8" : ''
                            }`}
                          />
                        </IconButton>
                      </div>
                    </Tooltip>
                    <Tooltip placement="top" title="Shipment">
                      <div className="max-xl:flex max-xl:items-center max-xl:justify-center max-xl:h-[15px] max-xl:w-[15px] max-xl:mr-[4px]">
                        <IconButton
                          disabled={phasesDisabledArr.shippingPhase.includes(order?.status) || (['cancelled', 'refunded']?.includes(order?.status))}
                          sx={{paddingInline: '5px'}}
                          className="cursor-pointer"
                          onClick={() => {
                            handlePhaseModal("Shipping Phase", "order", order?.status, order?.id);
                            setSelectedItem(order);
                          }}
                        >
                          <RiTruckLine
                            size={17}
                            color={`${
                              order?.status ==
                              "Warehouse has dispatched the order" ||
                                  order?.status == "delivery in progress"
                                ? "#FF6600"
                                : phasesArr.shippingPhase.includes(
                                    order?.status
                                  )
                                ? "#09AA00"
                                : order?.status ==
                                    "delivery not started"
                                ? "#EC1C24"
                                : phasesDisabledArr.shippingPhase.includes(
                                    order?.status
                                  ) ? "#D8D8D8" : ''
                            }`}
                          />
                        </IconButton>
                      </div>
                    </Tooltip>
                    <Tooltip placement="top" title="Order">
                      <div className="max-xl:flex max-xl:items-center max-xl:justify-center max-xl:h-[15px] max-xl:w-[15px] max-xl:mr-[4px]">
                        <IconButton
                          disabled={phasesDisabledArr.orderPhase.includes(order?.status) || (['cancelled', 'refunded']?.includes(order?.status))}
                          className="cursor-pointer"
                          sx={{paddingInline: '5px'}}
                          onClick={() => {
                            handlePhaseModal("Order Receive Phase", "order", order?.status, order?.id);
                            setSelectedItem(order);
                          }}
                        >
                          <MdCheck
                            size={15}
                            color={`${
                              order?.status == "delivery is completed" || order?.status == "pending order receive"
                                ? "#FF6600"
                                : order?.status == "order received"
                                ? "#09AA00"
                                : phasesDisabledArr.orderPhase.includes(
                                    order?.status
                                  ) ? "#D8D8D8" : ''
                            }`}
                          />
                        </IconButton>
                      </div>
                    </Tooltip>
                  </div>
                  <hr />
                  <div className="w-[96%] mx-auto">
                    {order?.items?.map((item, index) =>{ 
                      const modifiedFrontUrl = !window.location.href.includes('http://localhost:5173') ? `https://custory-order.s3.ap-southeast-1.amazonaws.com/${item?.frontDesign}`.replace('/custory-cart', ''): `https://custory-cart.s3.ap-southeast-1.amazonaws.com/${item?.frontDesign}`;
                      return( 
                      <Accordion key={index}>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel3-content"
                          id="panel3-header"
                          sx={{marginTop:'10px'}}
                        >
                          <Box sx={{ width: '100%', display: 'flex',  alignItems: 'center', justifyContent: 'start',overflow:'hidden' }}>
                            <span className="w-[40px] h-[40px] min-w-[40px] overflow-hidden rounded-sm">
                              <img src={modifiedFrontUrl} className="w-full h-full"/>
                            </span>
                            <span>
                            <Typography sx={{ width: '100%', lineHeight: '2rem', marginLeft: '15px',fontWeight:'600'}}>{item?.product?.title}</Typography>
                            </span>
                          </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Box sx={{ width: '100%' }}>
                            <Box sx={{ width: '100%', display: 'flex',  alignItems: 'center', justifyContent: 'space-between' }}>
                              <Typography sx={{fontWeight:'600', lineHeight: '2rem', width: '50%'}}>Item Size:</Typography>
                              <Typography sx={{ width: '50%', lineHeight: '2rem', marginLeft: '15px', display: 'flex',  alignItems: 'center', gap: 1, flexWrap: 'wrap'}}>{item?.itemProductSizes.map((size, index) => (
                                <span key={index} className="whitespace-nowrap">
                                  x{size.quantityPurchased}{" "}
                                  {size.productSize?.sizeName.toUpperCase()},
                                </span>
                              ))}</Typography>
                            </Box>
                            <Box sx={{ width: '100%', display: 'flex',  alignItems: 'center', justifyContent: 'space-between' }}>
                              <Typography sx={{fontWeight:'600', lineHeight: '2rem', width: '50%'}}>Price:</Typography>
                              <Typography sx={{ width: '50%', lineHeight: '2rem', marginLeft: '15px'}}>{f(p(formatNumbers(item?.price / 100)))}</Typography>
                            </Box>
                            <Box sx={{ width: '100%', display: 'flex',  alignItems: 'center', justifyContent: 'space-between' }}>
                              <Typography sx={{fontWeight:'600', lineHeight: '2rem', width: '50%'}}>Printing Type:</Typography>
                              <Typography sx={{ width: '50%', lineHeight: '2rem', marginLeft: '15px'}}>{Object.keys(item?.printingType)?.length ? (
                                <span>
                                  {item?.printingType?.front || "No Print"} |{" "}
                                  {item?.printingType?.back || "No Print"}{" "}
                                </span>
                              ) : (
                                <span>No Print</span>
                              )}</Typography>
                            </Box>
                          </Box>
                        </AccordionDetails>
                        <AccordionActions>
                          <div className="w-full">
                            <div className="flex items-center justify-around w-full">
                              <Tooltip title="Design" disableInteractive placement="top">
                                <div>
                                  <IconButton sx={{paddingInline: '5px'}} disabled={phasesDisabledArr.designPhase.includes(item?.status) || (['cancelled', 'refunded']?.includes(order?.status))} className="cursor-pointer"
                                    onClick={() => {
                                      handlePhaseModal("Design Phase","product",item?.status);
                                      setSelectedItem(item);
                                    }}
                                  >
                                    <FaPencilAlt
                                      size={15}
                                      color={`${
                                        (['cancelled', 'refunded']?.includes(order?.status)) ? "" :
                                        item?.status == "design pending approval"
                                          ? "#FF6600"
                                          : phasesArr.designPhase.includes(item?.status)
                                          ? "#09AA00"
                                          : "#EC1C24"
                                      }`}
                                    />
                                  </IconButton>
                                </div>
                              </Tooltip>
                              <Tooltip title="Production" placement="top">
                                <div>
                                  <IconButton sx={{paddingInline: '5px'}} disabled={phasesDisabledArr.productionPhase.includes(item?.status) || (['cancelled', 'refunded']?.includes(order?.status))} className="cursor-pointer"
                                    onClick={() => {
                                      handlePhaseModal("Production Phase","product",item?.status);
                                      setSelectedItem(item);
                                    }}
                                  >
                                    <MdOutlineFactory size={15}
                                      color={`${
                                        (['cancelled', 'refunded']?.includes(order?.status)) ? "" :
                                        item?.status == "design approved" || item?.status == "production pending"
                                          ? "#FF6600"
                                          : phasesArr.productionPhase.includes(item?.status)
                                          ? "#09AA00"
                                          : phasesDisabledArr.productionPhase.includes(
                                              item?.status
                                            ) && "#D8D8D8"
                                      }`}
                                    />
                                  </IconButton>
                                </div>
                              </Tooltip>
                              <Tooltip title="Warehouse" placement="top">
                                <div>
                                  <IconButton sx={{paddingInline: '5px'}} disabled={phasesDisabledArr.warehousePhase.includes(item?.status) || (['cancelled', 'refunded']?.includes(order?.status))} className="cursor-pointer"
                                    onClick={() => {
                                      handlePhaseModal("Warehouse Phase","product",item?.status);
                                      setSelectedItem(item);
                                    }}
                                  >
                                    <MdOutlineWarehouse
                                      size={15}
                                      color={`${
                                        (['cancelled', 'refunded']?.includes(order?.status)) ? "" :
                                        [
                                          "production started",
                                          "supplier has delivered order to warehouse",
                                          "supplier’s order has arrived at warehouse",
                                          "Warehouse has completed quality check",
                                        ].includes(item?.status)
                                          ? "#FF6600"
                                          : phasesArr.warehousePhase.includes(item?.status)
                                          ? "#09AA00"
                                          : phasesDisabledArr.warehousePhase.includes(
                                              item?.status
                                            ) && "#D8D8D8"
                                      }`}
                                    />
                                  </IconButton>
                                </div>
                              </Tooltip>
                              <Tooltip title="Shipment" placement="top">
                                  <div>
                                    <IconButton sx={{paddingInline: '5px'}} disabled={phasesDisabledArr.shippingPhase.includes(item?.status) || (['cancelled', 'refunded']?.includes(order?.status))} className="cursor-pointer"
                                      onClick={() => {
                                        handlePhaseModal("Shipping Phase","product",item?.status);
                                        setSelectedItem(item);
                                      }}
                                    >
                                      <RiTruckLine size={17}
                                        color={`${
                                          (['cancelled', 'refunded']?.includes(order?.status)) ? "" :
                                          item?.status == "Warehouse has dispatched the order"||
                                              item?.status == "delivery in progress"
                                            ? "#FF6600"
                                            : phasesArr.shippingPhase.includes(item?.status)
                                            ? "#09AA00"
                                            : item?.status == "delivery not started"
                                            ? "#EC1C24"
                                            : phasesDisabledArr.shippingPhase.includes(
                                                item?.status
                                              ) && "#D8D8D8"
                                        }`}
                                      />
                                    </IconButton>
                                  </div>
                              </Tooltip>
                            </div>
                            <div className="w-full flex flex-col items-center mt-3">
                              <div className="capitalize"> {`${(!['cancelled', 'refunded']?.includes(order?.status))? item?.status : order?.status }`} </div>
                              {order?.status !== 'cancelled' &&
                              <div className="my-2">
                                {(!['cancelled', 'refunded']?.includes(order?.status)) ? <button disabled={!review.includes(item.status)} className="text-[#FF6600] capitalize block text-[14px]" onClick={()=> navigate(`/reviewOrder/${order.id}/${item.id}`)}>
                                  {review.includes(item.status) ? "Review" : "Completed"}
                                </button> : null}
                              </div>
                              }
                            </div>
                          </div>                              
                        </AccordionActions>
                      </Accordion>                          
                    )})}
                  </div>
                </div>
              </React.Fragment>
            )): "No Item Found"}
        </div>

        <BasicModal open={Boolean(phaseModal?.open && (Object.keys(selectedPhase)?.length))} handleClose={() => setPhaseModal({ open: false })}>
          <div className="w-[450px] max-sm:w-[300px] p-3 rounded-xl border-[2px] relative">
            <div className="flex items-center justify-between border-b border-[#DBDBDB]">
              <span className="text-[18px] font-bold">
                {phaseModal?.heading}
              </span>
              <IconButton onClick={() => setPhaseModal({ open: false })} className="cursor-pointer">
                <RxCross1 size={15} />
              </IconButton>
            </div>
            <div>
              <RadioGroup
                row
                className="gap-4 max-md:justify-center"
                aria-labelledby="phaseDetails"
                defaultValue="false"
                name={phaseDetails}
                value={phaseDetails}
                onChange={(event) =>setPhaseDetails(event.target.value)}
              >
                <Box className="text-base flex items-start flex-col gap-2 py-4">
                  {selectedPhase?.radio?.map((item, index) => (
                    <Box className="flex" key={index}
                      data-tooltip-html={moveNextPhase?.modalSide == 'orders' && moveNextPhase?.value?.includes(item.value) && moveNextPhase?.disable ? "<div class='text-start max-sm:text-xs text-sm'> Complete this stage for all the products under this order to select this option </div>":''}
                      data-tooltip-id="my-tooltip-front"
                    >
                      <FormControlLabel
                        value={item.value}
                        control={<Radio sx={{padding: 0, paddingTop: 0, paddingLeft: 1.25}} color="warning" disabled={moveNextPhase?.modalSide == 'orders' && moveNextPhase?.value?.includes(item.value) && moveNextPhase?.disable}/>}
                      />
                      <Box className="text-[17px] font-semibold">{item.key}</Box>
                    </Box>
                  ))}
                </Box>
                <ReactTooltip id="my-tooltip-front" place="bottom" />
              </RadioGroup>
              <div className="flex items-center justify-center">
                <button
                  className="px-2.5 py-1.5 rounded-3xl bg-green-500 text-white text-normal font-bold flex items-center gap-2"
                  onClick={() => {
                    if (phaseModal.section === "product") {
                      const { status, id, history, comment, updatedAt } = selectedItem;
                      const newHistory = {
                        dateTime: updatedAt,
                        lastStatus: status,
                      };
                      updateItem({
                        data: {
                          id,
                          status: phaseDetails,
                          comment: comment,
                          history: history ? [...history, newHistory] : [newHistory],
                        },
                      });
                    } else if (phaseModal.section === "order") {
                      const { status, id, ...filteredItem } = selectedItem;
                      updateOrder({
                        data: { id, status: phaseDetails },
                      });
                    }
                    setPhaseModal({ open: false });
                  }}
                >
                  {/* <MdEmail  size={18} color="#fff"/>Send Email */}
                  Submit
                </button>
              </div>
            </div>
          </div>
        </BasicModal>
      </div>
    </AdminPortalLayout>
  );
};

export default MyOrders;