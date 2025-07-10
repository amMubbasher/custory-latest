import React, { useEffect, useState } from "react";
import { FaPencilAlt, FaChevronUp, FaChevronDown } from "react-icons/fa";
import { MdOutlineMessage, MdOutlineFactory, MdOutlineWarehouse, MdEmail, MdCheck,MdOutlinePermIdentity, MdNumbers } from "react-icons/md";
import { IoFilterSharp, IoSearchOutline } from "react-icons/io5";
import { CiCircleMore } from "react-icons/ci";
import { RiTruckLine, RiDoorOpenLine } from "react-icons/ri";
import { LuCalendarClock } from "react-icons/lu";
import { RxCross1 } from "react-icons/rx";
import BasicModal from "../../../components/common/BasicModal";
import {Box, Radio, FormControlLabel, RadioGroup, IconButton, Tooltip, TextField, Typography, Accordion, AccordionSummary, AccordionDetails, Button, AccordionActions } from "@mui/material";
import { useFetchGifts } from "../../../hooks/useGifts";
import useItem from "../../../hooks/useItem";
import useAppStore from "../../../hooks/useAppStore";
import SellerPortalLayout from "../../../components/SellerPortal/SellerPortalLayout";
import { usePrices } from "../../../hooks/usePrices";
import { formatNumbers } from "../../../utils/functions/formatNumbers";
import { green, handleItemsLength, hanldeDaysLeft, orange, phases, phasesArr, phasesDisabledArr, red, review, statusConditions } from "../../../utils/Enums";
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const OrderItem = ({ order, handlePhaseModal, setSelectedItem,orderId }) => {
  const { p, f } = usePrices();
  const navigate = useNavigate();
  const modifiedFrontUrl = !window.location.href.includes("http://localhost:5173")
    ? `https://custory-order.s3.ap-southeast-1.amazonaws.com/${order?.frontDesign}`.replace("/custory-cart","")
    : `https://custory-cart.s3.ap-southeast-1.amazonaws.com/${order?.frontDesign}`;
  const modifiedBackUrl = !window.location.href.includes("http://localhost:5173")
    ? `https://custory-order.s3.ap-southeast-1.amazonaws.com/${order?.backDesign}`.replace("/custory-cart","")
    : `https://custory-cart.s3.ap-southeast-1.amazonaws.com/${order?.backDesign}`;

  return (
    <>
      <tr className={`${order?.status === "delivery is completed" && "bg-[#EAFFE9]"}`}>
        <td className="p-2.5 w-[15%] align-top">
          <div className="flex justify-between">
            <div className="flex items-start gap-2.5 leading-[1.2]">
              <span className="w-[45px] h-[50px] min-w-[45px] overflow-hidden">
                <img src={modifiedFrontUrl} className="w-full h-full" />
              </span>
              <div className="flex flex-col items-start justify-start">
                <span className="font-semibold"> {order?.product?.title} </span>
                <span className="w-full h-full rounded-full cursor-pointer"
                  style={{
                    backgroundColor: "#" + order?.color,
                    width: "16px",
                    height: "16px",
                    border: "1px solid #" + order?.color,
                  }}
                ></span>
                {Object.keys(order.printingType).length ? (
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
        <td className="p-2.5 w-[5%] align-top">
          <div className="flex flex-col items-start justify-start text-left w-[85px]">
            {order?.itemProductSizes.map((order, index) => (
              <span key={index} className="whitespace-nowrap">
                x{order.quantityPurchased}{" "}
                {order.productSize?.sizeName.toUpperCase()}{" "}
              </span>
            ))}
          </div>
        </td>
        <td className="p-2.5 w-[7%] align-top">
          <span>{f(p(formatNumbers(order?.price / 100)))}</span>
        </td>
        <td className="border-[#9F9F9F] p-2.5 w-[10%] align-top pt-0">
          <div className="flex flex-col items-start">
            <div className="flex items-center">
              <Tooltip title="Design" disableInteractive placement="top">
                <div>
                  <IconButton disabled={phasesDisabledArr.designPhase.includes(order?.status)} className="cursor-pointer"
                    onClick={() => {
                      handlePhaseModal("Design Phase", "product", order?.status);
                      setSelectedItem(order);
                    }}
                  >
                    <FaPencilAlt
                      size={15}
                      color={`${
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
                  <IconButton
                    disabled={phasesDisabledArr.productionPhase.includes(
                      order?.status
                    )}
                    className="cursor-pointer"
                    onClick={() => {
                      handlePhaseModal(
                        "Production Phase",
                        "product",
                        order?.status
                      );
                      setSelectedItem(order);
                    }}
                  >
                    <MdOutlineFactory
                      size={15}
                      color={`${
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
                  <IconButton
                    disabled={phasesDisabledArr.warehousePhase.includes(
                      order?.status
                    )}
                    className="cursor-pointer"
                    onClick={() => {
                      handlePhaseModal(
                        "Warehouse Phase",
                        "product",
                        order?.status
                      );
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
                  <IconButton
                    disabled={phasesDisabledArr.shippingPhase.includes(
                      order?.status
                    )}
                    onClick={() => {
                      handlePhaseModal(
                        "Shipping Phase",
                        "product",
                        order?.status
                      );
                      setSelectedItem(order);
                    }}
                    className="cursor-pointer"
                  >
                    <RiTruckLine
                      size={17}
                      color={`${
                        order?.status == "Warehouse has dispatched the order" ||
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
            <div className="capitalize"> {order?.status} </div>
          </div>
        </td>
        <td className="p-2.5 w-[10%] align-top">
          <button disabled={!review.includes(order.status)} className="text-[#FF6600] capitalize block text-[14px] outline-none hover:underline" onClick={()=> navigate(`/reviewOrder/${orderId}/${order.id}`)}>
            {review.includes(order.status) ? "Review" : "Completed"}
          </button>
          <span className="text-[#6F6F6F] text-[12px]">
          {review.includes(order.status) && "Accept to move to next phase or reject to give comments"}
          </span>
        </td>
      </tr>
    </>
  );
};

const SellerOrders = () => {
  const {fetchGifts: { data: giftData, isLoading, error }} = useFetchGifts();
  const setOrders = useAppStore(state=>state.setOrders);
  const orders = useAppStore(state=>state.orders);
  const { updateItem } = useItem();
  const [sortFilter, setSortFilter] = useState("newest to oldest");
  const [dropMenu, setDropMenu] = useState([]);
  const [phaseModal, setPhaseModal] = useState({});
  const [selectedPhase, setSelectedPhase] = useState({});
  const [phaseDetails, setPhaseDetails] = useState("");
  const [selectedItem, setSelectedItem] = useState({});
  const [ordersArr, setOrdersArr] = useState([]);
  const [itemStatusLength, setItemStatusLength] = useState({});
  const [selectedButon, setSelectedButton] = useState("all items");
  const { p, f } = usePrices();
  const navigate = useNavigate();

  useEffect(() => {
    // Order-Items Length
    setOrdersArr([...orders]);
    const {allItems, designReview, designReject, inProduction, deliverToWarehouse, reachedWarehouse, completed} = handleItemsLength(orders)
    setItemStatusLength({ allItems, designReview, designReject, inProduction, deliverToWarehouse, reachedWarehouse, completed });
  }, [orders]);

  const handlePhaseModal = (title, section, status) => {
    const phase = phases.find((item) => item.heading == title);
    setPhaseDetails(status);
    setSelectedPhase(phase || {});
    setPhaseModal({ open: true, heading: title, section: section });
  };

  const handleFilteration = (filter, type) => {
    setSortFilter("reset-creation-sort");
    setSelectedButton(type === "items" ? `${filter} items` : `${filter} order`);
    if (filter === "all") {
      setOrdersArr([...orders]);
    } else {
      const filteredOrders = orders.map((order) => ({ ...order, items: type === "items" ? order.items.filter((item) =>
          statusConditions[filter]?.includes(item.status) || item.status === filter) : order.items,
        })).filter((order) => type === "items" ? order.items.length > 0 : statusConditions[filter]?.includes(order.status) || order.status === filter
        );
      if (filteredOrders.length > 0) {
        const sortedOrders = [...filteredOrders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrdersArr([...sortedOrders]);
      } else {
        setOrdersArr([]);
      }
    }
  };

  return (
    <SellerPortalLayout>
      <div className="p-3 font-poppins lg:p-4">
        <p className="text-[20px] mb-1">My Orders</p>
        <div className="flex gap-2.5 flex-wrap">
          <button
            className={`${selectedButon == 'all items' ? 'border-[#09AA00] bg-green-50' : 'border-[#9F9F9F]'} p-2.5 rounded-md text-black border outline-none`}
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
            Design Review <span>({itemStatusLength?.designReview})</span>
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
        </div>
        <div className="w-full border-[#9F9F9F] border-t mt-2.5"></div>
        <div className="py-2.5 flex gap-2.5">
          <span className="w-full border-[#9F9F9F] rounded-md py-3.5 px-2.5 flex items-center border">
            <input
              type="text"
              className="w-full outline-none placeholder:text-[#6F6F6F]"
              placeholder="Search by Order ID"
              onChange={({ target }) => {
                setSelectedButton("all items");
                const filterByOrderId = orders.filter((item) =>
                  item.id.toLowerCase().includes(target.value.toLowerCase())
                );
                setOrdersArr([...filterByOrderId]);
              }}
            />
            <IoSearchOutline size={21} color="#6F6F6F" className="ml-[10px]" />
          </span>
          <span className="w-full border-[#9F9F9F] rounded-md py-3.5 px-2.5 flex items-center border">
            <input
              type="text"
              className="w-full outline-none placeholder:text-[#6F6F6F]"
              placeholder="Search by User"
              onChange={({ target }) => {
                setSelectedButton("all items");
                const filterByUserName = orders.filter(
                  (item) =>
                    item.customerFirstName
                      .toLowerCase()
                      .includes(target.value.toLowerCase()) ||
                    item.customerLastName
                      .toLowerCase()
                      .includes(target.value.toLowerCase())
                );
                setOrdersArr([...filterByUserName]);
              }}
            />
            <IoSearchOutline size={21} color="#6F6F6F" className="ml-[10px]" />
          </span>
        </div>
        <div className="flex items-center gap-3 w-full">
          <span className="relative p-[5px] pl-7 rounded-[27px] bg-[#F9E5CA] text-black">
            <IoFilterSharp
              size={20}
              className="absolute top-[4px] left-[10px]"
            />
            <select
              className="bg-[#F9E5CA] px-2 outline-none"
              value={sortFilter}
              onChange={({ target }) => {
                setSelectedButton("all items");
                setSortFilter(target.value);
                const sortedOrders = [...orders].sort((a, b) => {
                  if (target.value === "oldest to newest") {
                    return new Date(a.createdAt) - new Date(b.createdAt);
                  } else if (target.value === "newest to oldest") {
                    return new Date(b.createdAt) - new Date(a.createdAt);
                  }
                  return 0;
                });
                setOrdersArr(sortedOrders);
              }}
            >
              <option value="reset-creation-sort">Sort on Creation Date</option>
              <option value="newest to oldest">Newest to Oldest</option>
              <option value="oldest to newest">Oldest to Newest</option>
            </select>
          </span>
        </div>
        <div className="w-full border-[#9F9F9F] rounded-md py-3.5 px-2.5 flex items-center border my-2.5 max-sm:hidden">
          <table className="w-full table-fixed">
            <tbody>
              <tr>
                <td className="pl-2.5 w-[15%]"> Item(s) </td>
                <td className="pl-2.5 w-[5%]"> Size </td>
                <td className="pl-2.5 w-[7%]"> Total Price </td>
                <td className="pl-2.5 w-[10%] "> Status </td>
                <td className="pl-3 w-[10%]"> Action </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="max-sm:hidden">
          {ordersArr.length > 0
            ? ordersArr?.map((order, index) => (
                <React.Fragment key={index}>
                  <div className="flex items-center justify-between rounded-b-none rounded-md px-4 py-[5px] mt-2 bg-[#DBDBDB]">
                    <span>
                      {order?.customerFirstName} {order?.customerLastName}{" "}
                      <MdOutlineMessage
                        className="text-black ml-1 inline"
                        size={12}
                      />
                    </span>
                    <span
                      className="cursor-pointer"
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
                    <div className="flex items-center justify-end gap-2.5">
                      <Tooltip placement="top" title="Order Creation Date">
                        <span>
                          {new Date(order?.createdAt)
                            .toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })
                            .replace(",", "")}
                        </span>
                      </Tooltip>
                      <Tooltip
                        placement="top"
                        title={`${hanldeDaysLeft(order?.shippingDate)} ${ hanldeDaysLeft(order?.shippingDate) > 1 ? "days" : "day" } left to receive the order`}
                      >
                        <span
                          className={`${
                            hanldeDaysLeft(order?.shippingDate) >= 7
                              ? "text-[#09AA00]"
                              : "text-[#FF0509]"
                          }`}
                        >
                          Expiry Date: {order?.shippingDate}
                        </span>
                      </Tooltip>
                      <span className="w-[152px] whitespace-nowrap flex text-[#6F6F6F]">
                        Order ID:
                        <input
                          type="text"
                          defaultValue={order?.id}
                          readOnly
                          className="w-[95px] text-black bg-[#DBDBDB] outline-none"
                        />
                      </span>
                      <span className="cursor-pointer">
                        <IoSearchOutline size={13} color="#000000" />
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
                        {order?.items.map((item, index) => (
                          <OrderItem
                            key={index}
                            order={item}
                            handlePhaseModal={handlePhaseModal}
                            setSelectedItem={setSelectedItem}
                            orderId={order?.id}
                          />
                        ))}
                      </tbody>
                    </table>
                  </div>
                </React.Fragment>
              ))
            : "No Item Found"}
        </div>

        <div className="hidden max-sm:block mt-4">
          {ordersArr.length > 0
            ? ordersArr?.map((order, index) => (
              <React.Fragment key={index}>
                <div className="min-h-[280px] w-full pt-2 pb-5 my-3 relative border-2 rounded-md shadow-lg shadow-gray-200">
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
                                  {size.productSize?.sizeName.toUpperCase()}{" "}
                                </span>
                              ))}</Typography>
                            </Box>
                            <Box sx={{ width: '100%', display: 'flex',  alignItems: 'center', justifyContent: 'space-between' }}>
                              <Typography sx={{fontWeight:'600', lineHeight: '2rem', width: '50%'}}>Price:</Typography>
                              <Typography sx={{ width: '50%', lineHeight: '2rem', marginLeft: '15px'}}>{f(p(formatNumbers(item?.price / 100)))}</Typography>
                            </Box>
                            <Box sx={{ width: '100%', display: 'flex',  alignItems: 'center', justifyContent: 'space-between' }}>
                              <Typography sx={{fontWeight:'600', lineHeight: '2rem', width: '50%'}}>Printing Type:</Typography>
                              <Typography sx={{ width: '50%', lineHeight: '2rem', marginLeft: '15px'}}>{Object.keys(item?.printingType).length ? (
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
                                  <IconButton sx={{paddingInline: '5px'}} disabled={phasesDisabledArr.designPhase.includes(item?.status)} className="cursor-pointer"
                                    onClick={() => {
                                      handlePhaseModal("Design Phase","product",item?.status);
                                      setSelectedItem(item);
                                    }}
                                  >
                                    <FaPencilAlt
                                      size={15}
                                      color={`${
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
                                  <IconButton sx={{paddingInline: '5px'}} disabled={phasesDisabledArr.productionPhase.includes(item?.status)} className="cursor-pointer"
                                    onClick={() => {
                                      handlePhaseModal("Production Phase","product",item?.status);
                                      setSelectedItem(item);
                                    }}
                                  >
                                    <MdOutlineFactory size={15}
                                      color={`${
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
                                  <IconButton sx={{paddingInline: '5px'}} disabled={phasesDisabledArr.warehousePhase.includes(item?.status)} className="cursor-pointer"
                                    onClick={() => {
                                      handlePhaseModal("Warehouse Phase","product",item?.status);
                                      setSelectedItem(item);
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
                                    <IconButton sx={{paddingInline: '5px'}} disabled={phasesDisabledArr.shippingPhase.includes(item?.status)} className="cursor-pointer"
                                      onClick={() => {
                                        handlePhaseModal("Shipping Phase","product",item?.status);
                                        setSelectedItem(item);
                                      }}
                                    >
                                      <RiTruckLine size={17}
                                        color={`${
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
                              <div className="capitalize"> {item?.status} </div>
                              <div className="my-2">
                                <button disabled={!review.includes(item.status)} className="text-[#FF6600] capitalize block text-[14px]" onClick={()=> navigate(`/reviewOrder/${order.id}/${item.id}`)}>
                                  {review.includes(item.status) ? "Review" : "Completed"}
                                </button>
                              </div>
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

        <BasicModal
          open={Boolean(phaseModal?.open && (Object.keys(selectedPhase).length))}
          handleClose={() => setPhaseModal({ open: false })}
        >
          <div className="w-[450px] max-sm:w-[300px] p-3 rounded-xl border-[2px] relative">
            <div className="flex items-center justify-between border-b border-[#DBDBDB]">
              <span className="text-[18px] font-bold">
                {phaseModal?.heading}
              </span>
              <IconButton
                onClick={() => setPhaseModal({ open: false })}
                className="cursor-pointer"
              >
                <RxCross1 size={15} />
              </IconButton>
            </div>
            <div>
              <RadioGroup
                className="gap-4 max-md:justify-center"
                row
                aria-labelledby="phaseDetails"
                defaultValue="false"
                name={phaseDetails}
                value={phaseDetails}
                onChange={(event) =>
                  setPhaseDetails(event.target.value)
                }
              >
                <Box className="text-base flex items-start flex-col gap-2 py-4">
                  {selectedPhase?.radio?.map((item, index) => (
                    <Box className="flex" key={index}>
                      <FormControlLabel
                        value={item.value}
                        control={
                          <Radio
                            sx={{
                              padding: 0,
                              paddingTop: 0,
                              paddingLeft: 1.25,
                            }}
                            color="warning"
                          />
                        }
                      />
                      <Box className="text-[17px] font-semibold">
                        {item.key}
                      </Box>
                    </Box>
                  ))}
                </Box>
              </RadioGroup>
              <div className="flex items-center justify-center">
                <button
                  onClick={() => {
                    if (phaseModal.section === "product") {
                      const {
                        status,
                        id,
                        comment,
                        history,
                        updatedAt,
                      } = selectedItem;
                      const newHistory = {
                        dateTime: updatedAt,
                        lastStatus: status,
                      };
                      updateItem({
                        data: {
                          id,
                          status: phaseDetails,
                          comment: comment,
                          history: history
                            ? [...history, newHistory]
                            : [newHistory],
                        },
                      });
                    }
                    setPhaseModal({ open: false });
                  }}
                  className="px-2.5 py-1.5 rounded-3xl bg-green-500 text-white text-normal font-bold flex items-center gap-2"
                >
                  {/* <MdEmail size={18} color="#fff" />Send Email  */}
                  Submit
                </button>
              </div>
            </div>
          </div>
        </BasicModal>
      </div>
    </SellerPortalLayout>
  );
};

export default SellerOrders;