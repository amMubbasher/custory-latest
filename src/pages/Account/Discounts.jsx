import React, { useState, useEffect } from "react";
import AccountLayout from "../../components/Account/AccountLayout";
import { MdArrowBack } from "react-icons/md";
import DiscountForm from "../../components/common/DiscountFormModal";
import { Button } from "@mui/material";
import useAppStore from "../../hooks/useAppStore";
import useDiscount from "../../hooks/useDiscount";

const keyMappings = {
  code: "Code",
  type: "Reward Condition",
  description: "Description",
  minimumSpend: "Minimum Spend",
  percentage: "Discount",
  expiryDays: "User Expiry Days",
  expiryDate: "Global Expiry",
  freeDelivery: "Free Delivery",
  createdAt: "Created Date",
};

const Discounts = () => {
  const [openModal, setOpenModal] = useState({ open: false, disc_Item: {} });
  const [firstOrderDiscExists, setFirstOrderDiscExists] = useState(false);
  const discounts = useAppStore((state) => state.discounts);
  const { deleteDiscount } = useDiscount();

  useEffect(() => {
    if(discounts?.length){
      setFirstOrderDiscExists(discounts.some(discount => discount.newUserDisc));
    }
  }, [discounts])

  return (
    <AccountLayout>
      <div className="container">
        <div className="text-2xl font-semibold flex flex-col gap-2 pb-3 border-b-2 ">
          <MdArrowBack
            onClick={() => navigate("/account")}
            className="hidden max-md:block"
          />{" "}
          Discounts
          <h2 className="text-gray-400 font-semibold text-xl">
            Add, edit or delete the discounts
          </h2>
        </div>
        <div className="my-4">
          <button
            className="bg-black text-white py-2 px-5 text-base font-semibold rounded-md outline-none"
            onClick={() => setOpenModal({ open: true })}>
            Create Discount
          </button>
          {/* <button className="bg-black text-white py-2 px-5 ml-3 text-base font-semibold rounded-md">
            Select All
          </button> */}
          <DiscountForm openModal={openModal} setOpenModal={setOpenModal} firstOrderDiscExists={firstOrderDiscExists} />
        </div>
        <div>
          <h2 className="text-gray-400 font-semibold text-lg">
            Existing Discount Type
          </h2>
        </div>
        {discounts.length ?
          discounts.map((item, index) => {
            const {
              isEnable,
              isPublic,
              id,
              userId,
              newUserDisc,
              updatedAt,
              ...filteredItem
            } = item;
            return (
              <div className="border-2 border-[#c3c3c3] rounded-md p-[10px] mt-4">
                <div className="flex flex-col">
                  <div className="grid w-72 ml-auto grid-cols-2 gap-4 my-1">
                    <Button
                      sx={{ marginLeft: "3px" }}
                      variant="outlined"
                      color="success"
                      size="small"
                      onClick={() => {
                        setOpenModal({ open: true, disc_Item: item });
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => {
                        deleteDiscount(item.id);
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                  <div key={item} className="flex flex-col">
                    {Object.entries(filteredItem).map(([key, value]) => {
                        const displayValue = (() => {
                          switch (key) {
                            case "percentage":
                              return `${String(value)}%`;
                            case "minimumSpend":
                              return item.type === "price"
                                ? `$${String(value)}`
                                : item.type === "quantity"
                                ? `${String(value)} (Qty)`
                                : String(value);
                            case "expiryDate":
                            case "createdAt":
                              // Convert value to Date and format as local date string
                              return value ? new Date(value).toLocaleDateString() : null;
                            default:
                              return String(value);
                          }
                        });
                      return (
                        <div key={key} className="flex flex-row">
                          <div className="w-48 border-r-2 font-semibold">
                            {keyMappings[key] || key}
                          </div>
                          <div className="ml-2.5 my-1 font-semibold">
                            {displayValue() || "None"}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="ml-auto max-sm:m-auto">
                  {newUserDisc && <button
                      className={`${
                        isEnable ? "bg-green-600" : "bg-red-600"
                      } py-2 px-4 rounded-2xl text-white font-semibold outline-none`}
                    >
                      First Order Discount
                    </button>}
                    <button
                      className={`${
                        isEnable ? "bg-green-600" : "bg-red-600"
                      } mx-2 py-2 px-4 rounded-2xl text-white font-semibold outline-none`}
                    >
                      {isEnable ? "Enabled" : "Disabled"}
                    </button>
                    <button
                      className={`${
                        isPublic ? "bg-green-600" : "bg-red-600"
                      } py-2 px-4 rounded-2xl text-white font-semibold outline-none`}
                    >
                      {isPublic ? "Public Discount" : "Private Discount"}
                    </button>
                  </div>
                </div>
              </div>
            );
          }) : 'No Discounts Available!'}
      </div>
    </AccountLayout>
  );
};

export default Discounts;