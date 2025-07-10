import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useAppStore from "../../hooks/useAppStore";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from 'react-router-dom';
import discountImage from "./../../assets/discount.png"

export const DiscountDialogModel = ({ enabledDiscounts, modalOpen, setModalOpen }) => {
  const navigate = useNavigate();
  return (
    <>
      {/* <Dialog
        onClose={() => {
          setModalOpen(false);
          sessionStorage.setItem("ModalOpened", true);
        }}
        open={modalOpen}
        fullWidth
        maxWidth="xs"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiDialog-paper": {
            backgroundImage:
              'url("https://img.freepik.com/premium-vector/background-discounts-special-offers-made-inscriptions-gift-boxes-black-gray-colors_444390-15426.jpg")',
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            borderRadius:'20px',
          },
        }}
      >
        <DialogTitle
          sx={{ fontWeight: "bold", textAlign: "center", color: "white" }}
        >
          Deals Just for You
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => {
            setModalOpen(false);
            sessionStorage.setItem("ModalOpened", true);
          }}
          sx={{ position: "absolute", right: 8, top: 8, color: "#ff6600" }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="rounded-lg relative shadow-lg text-center max-h-[52vh]">
              <div className="space-y-4">
                {enabledDiscounts?.length ? enabledDiscounts.map((item, index) => {
                      const {
                        percentage,
                        minimumSpend,
                        type,
                        code,
                        expiryDate,
                        daysLeft,
                        newUserDisc,
                      } = item;
                      return (
                        <div
                          key={index}
                          className="bg-orange-500 text-white rounded-xl pt-3 pb-2 relative shadow-md"
                        >
                          {newUserDisc ? (
                            <div className="absolute top-0 left-5 text-orange-300 bg-white text-[10px] px-3 p-[2.5px] rounded-md -mt-3">
                              New User Only
                            </div>
                          ) : null}
                          <div className="flex flex-row">
                            <div className=" w-1/3 m-auto">
                              <p className="text-[2.5rem] font-bold leading-10">
                                {percentage.toString().padStart(2, "0")}%{" "}
                              </p>
                              <p className="text-lg font-bold">OFF</p>
                            </div>
                            <div className="border-r-2 border-dashed my-[-10px]" />
                            <div className="w-8/12 pt-5 pl-5 pr-3">
                              <div className="text-left text-xl">
                                <p className="text-start font-semibold">{code}</p>
                                <p className="text-start">
                                  Min.{" "}
                                  {type === "price"
                                    ? `$${String(minimumSpend)}`
                                    : type === "quantity"
                                    ? `${String(minimumSpend)} Items`
                                    : String(minimumSpend)}
                                </p>
                              </div>
                              <div className="text-right text-[8px] mt-2">
                                <p className="text-end text-xs">
                                  Applies to All Products
                                </p>
                                <p className="text-end text-xs">
                                  {expiryDate ? (`Expires ${new Date(expiryDate).toLocaleDateString()} (${daysLeft} ${daysLeft > 1 ? "Days" : "Day"} Left)`) : 'No Expiry'}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          sx={{ fontWeight: "bold", textAlign: "center", color: "white" }}
        >
          <div className="rounded-lg relative shadow-lg text-center max-h-[52vh]">
            <button onClick={()=> {
              navigate('/products'); 
              setModalOpen(false);
              sessionStorage.setItem("ModalOpened", true);
              }}
              className="bg-black text-white py-2 px-7 rounded-full mt-4">
              Shop Now!
            </button>
            <p className="text-[10px] text-gray-300 py-3">
              Vouchers claimed after Login
            </p>
          </div>
        </DialogContentText>
      </Dialog> */}

<Dialog
        onClose={() => {
          setModalOpen(false);
          sessionStorage.setItem("ModalOpened", true);
        }}
        open={modalOpen}
        fullWidth
        maxWidth="xs"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        // className="bg-red-700"
        sx={{
          "& .MuiDialog-paper": {
            className:'bg-red-400',
            backgroundImage:
              `url(${discountImage})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            borderRadius:'20px',
          },
        }}
      >
        <DialogTitle
          sx={{ fontWeight: "bold", textAlign: "center", color: "white", backgroundColor:"#000000b3" }}
        >
          Deals Just for You
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => {
            setModalOpen(false);
            sessionStorage.setItem("ModalOpened", true);
          }}
          sx={{ position: "absolute", right: 8, top: 8, color: "#ff6600" }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ backgroundColor:"#000000b3"}}>
          <DialogContentText id="alert-dialog-description">
            <div className="rounded-lg relative shadow-lg text-center max-h-[52vh]">
              <div className="space-y-4">
                {enabledDiscounts?.length ? enabledDiscounts.map((item, index) => {
                      const {
                        percentage,
                        minimumSpend,
                        type,
                        code,
                        expiryDate,
                        daysLeft,
                        newUserDisc,
                      } = item;
                      return (
                        <div
                          key={index}
                          className="bg-orange-500 text-white rounded-xl pt-3 pb-2 relative shadow-md"
                        >
                          {newUserDisc ? (
                            <div className="absolute top-0 left-5 text-orange-300 bg-white text-[10px] px-3 p-[2.5px] rounded-md -mt-3">
                              New User Only
                            </div>
                          ) : null}
                          <div className="flex flex-row">
                            <div className=" w-1/3 m-auto">
                              <p className="text-[2.5rem] font-bold leading-10">
                                {percentage.toString().padStart(2, "0")}%{" "}
                              </p>
                              <p className="text-lg font-bold">OFF</p>
                            </div>
                            <div className="border-r-2 border-dashed my-[-10px]" />
                            <div className="w-8/12 pt-5 pl-5 pr-3">
                              <div className="text-left text-xl">
                                <p className="text-start font-semibold">{code}</p>
                                <p className="text-start">
                                  Min.{" "}
                                  {type === "price"
                                    ? `$${String(minimumSpend)}`
                                    : type === "quantity"
                                    ? `${String(minimumSpend)} Items`
                                    : String(minimumSpend)}
                                </p>
                              </div>
                              <div className="text-right text-[8px] mt-2">
                                <p className="text-end text-xs">
                                  Applies to All Products
                                </p>
                                <p className="text-end text-xs">
                                  {expiryDate ? (`Expires ${new Date(expiryDate).toLocaleDateString()} (${daysLeft} ${daysLeft > 1 ? "Days" : "Day"} Left)`) : 'No Expiry'}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogContentText
          id="alert-dialog-description"
          sx={{ fontWeight: "bold", textAlign: "center", color: "white", backgroundColor:"#000000b3" }}
          >
          <div className="rounded-lg relative shadow-lg text-center max-h-[52vh]">
            <button onClick={()=> {
              navigate('/products'); 
              setModalOpen(false);
              sessionStorage.setItem("ModalOpened", true);
              }}
              className="bg-black text-white py-2 px-7 rounded-full mt-4">
              Shop Now!
            </button>
            <p className="text-[10px] text-gray-300 py-3">
              Vouchers claimed after Login
            </p>
          </div>
        </DialogContentText>
      </Dialog>
    </>
  );
};

const DialogModal = ({ dialogModalOpen, setDialogModalOpen, blocker, setSelectedColor }) => {
  const { open, text, color } = dialogModalOpen;
  const setHandleDialogModal = useAppStore(state => state.setHandleDialogModal);
  const setOpenCustomEditor = useAppStore(state => state.setOpenCustomEditor);
  const frontUploadedImage = useAppStore(state => state.frontUploadedImage);
  const setFrontUploadedImage = useAppStore(state => state.setFrontUploadedImage);
  const backUploadedImage = useAppStore(state => state.backUploadedImage);
  const setBackUploadedImage = useAppStore(state => state.setBackUploadedImage);
  const setHasUnsavedChanges = useAppStore(state => state.setHasUnsavedChanges);
  const setFrontUploadedLogo = useAppStore(state => state.setFrontUploadedLogo);
  const setBackUploadedLogo = useAppStore(state => state.setBackUploadedLogo);

  const handlePermission = (isPermission) => {
    if (isPermission) {
      localStorage.removeItem("editorProduct");
      localStorage.removeItem("frontImage");
      localStorage.removeItem("backImage");
      switch (text) {
        case "Color Clicked":
          setHandleDialogModal({
            isColorClicked: true,
            openUploadDesign: false,
          });
          if (frontUploadedImage || backUploadedImage) {
            setFrontUploadedImage(null);
            setBackUploadedImage(null);
            setFrontUploadedLogo(null);
            setBackUploadedLogo(null);
            setSelectedColor(color);
          }
          break;
        case "Upload Design":
          setHandleDialogModal({
            isColorClicked: false,
            openUploadDesign: true,
          });
          setFrontUploadedImage(null);
          setBackUploadedImage(null);
          setFrontUploadedLogo(null);
          setBackUploadedLogo(null);
          break;
        case "Custom Editor":
          setOpenCustomEditor(true);
          setFrontUploadedImage(null);
          setBackUploadedImage(null);
          setFrontUploadedLogo(null);
          setBackUploadedLogo(null);
          break;
        case "Block Route":
          setFrontUploadedImage(null);
          setBackUploadedImage(null);
          setFrontUploadedLogo(null);
          setBackUploadedLogo(null);
          setHasUnsavedChanges(false);
          blocker.proceed();
          break;
        default:
          setHandleDialogModal({
            isColorClicked: false,
            openUploadDesign: false,
          });
          setOpenCustomEditor(true);
          break;
      }
      setDialogModalOpen({ open: false });
    } else {
      setHandleDialogModal({ isColorClicked: false, openUploadDesign: false });
      setDialogModalOpen({ open: false });
    }
  };

  return (
    <>
      <Dialog
        onClose={() => handlePermission(false)}
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirmation"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure? You will lose your design if Proceed.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => handlePermission(false)}>
            Decline
          </Button>
          <Button onClick={() => handlePermission(true)} autoFocus>
            Proceed
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default DialogModal;
