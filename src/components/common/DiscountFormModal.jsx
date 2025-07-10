import React, { useEffect, useState } from "react";
import {Modal, Box, TextField, Typography, Button, InputAdornment, FormControlLabel, Switch, Select, MenuItem, FormControl, InputLabel, FormHelperText} from "@mui/material";
import useDiscount from "../../hooks/useDiscount";

const formValidation = (form, setError) => {
  let errForm = {};

  if (!form?.code) errForm.code = "Code is required";
  if (!form?.type) errForm.type = "Reward Condition is required";
  if (!form?.description) errForm.description = "Description is required";
  if (!form?.percentage) errForm.percentage = "Percentage must be greater than 0";
  if (setError) setError(errForm);

  return Object.keys(errForm).length === 0;
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  borderRadius: "15px",
  overflow: "auto",
};

const INITIAL_DISCOUNTTPE_FORM = {
  code: "",
  type: "",
  description: "",
  percentage: 0,
  minimumSpend: 0,
  expiryDays: 0,
  expiryDate: "",
  freeDelivery: false,
  newUserDisc: false,
  isEnable: true,
  isPublic: true,
};

const DiscountForm = ({ openModal, setOpenModal, firstOrderDiscExists }) => {
  const [form, setForm] = useState(INITIAL_DISCOUNTTPE_FORM);
  const [error, setError] = useState(INITIAL_DISCOUNTTPE_FORM);
  const {addItemToDiscount, updateDiscount} = useDiscount();
  const {open, disc_Item} = openModal;

  useEffect(() => {
    if(open && !disc_Item){
      setForm({ isEnable: true, isPublic: true });
    }
    if(disc_Item){
      const {createdAt, updatedAt, ...filteredItem} = disc_Item;
      setForm({...filteredItem, expiryDate: filteredItem.expiryDate ? new Date(filteredItem.expiryDate).toISOString().split("T")[0] : ''})
    }
    setTimeout(() => {
      document.getElementById("code-field")?.focus();
    }, 1000);
  }, [open]);

  const handleChange = ({ target: { name, type, value, checked } }) => {
    setForm((prev) => {
      const newValue = type === "checkbox" ? checked : type === "number" ? parseInt(value) : value;
      if (name === "expiryDays") {
        const expiryDate = newValue
          ? new Date(Date.now() + newValue * 86400000)?.toISOString().split("T")[0]
          : "";
        return { ...prev, [name]: newValue, expiryDate };
      }

      return { ...prev, [name]: newValue };
    });
  };

  const hanldeSubmit = () => {
    const isValidated = formValidation(form, setError);
    if (isValidated) {
      if(disc_Item){
        updateDiscount({
          data:{
            code: form.code,
            type: form.type,
            description: form.description,
            percentage: form.percentage,
            minimumSpend: form.minimumSpend,
            expiryDays: form.expiryDays,
            expiryDate: form.expiryDate,
            freeDelivery: form.freeDelivery,
            newUserDisc: form.newUserDisc,
            isEnable: form.isEnable,
            isPublic: form.isPublic,
            ...form
          }
        });
        setForm({});
      }else{
        addItemToDiscount({
            code: form.code,
            type: form.type,
            description: form.description,
            percentage: parseInt(form.percentage),
            minimumSpend: parseInt(form.minimumSpend),
            expiryDays: parseInt(form.expiryDays),
            expiryDate: form.expiryDate ? new Date(form.expiryDate).toISOString() : null,
            freeDelivery: form.freeDelivery,
            newUserDisc: form.newUserDisc,
            isEnable: form.isEnable,
            isPublic: form.isPublic,
        });
        setForm({});
      }
      setOpenModal(false);
    }
  };

  const handleClose = ()=>{
    setOpenModal({open:false , disc_Item:''});
    setError({});
    setForm({});
  }

  return (
    <Modal
      open={open}
      onClose={() => handleClose()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="max-md:h-[35rem] h-[30rem]">
        <div className="container">
          <div className="my-3 flex justify-around items-center">
            <div className="text-center">
              <h1 className="text-lg font-bold">Create Discount</h1>
              <Typography variant="caption">
                Please fill this form to create a Discount!
              </Typography>
            </div>
          </div>
          <form>
            <div className="grid max-md:grid-cols-1 grid-cols-2 gap-4 my-5">
              <div>
                <TextField
                  fullWidth
                  label="Code"
                  variant="outlined"
                  required
                  name="code"
                  value={form?.code}
                  type="text"
                  placeholder="Enter Discount Code"
                  error={Boolean(error.code)}
                  helperText={error.code}
                  onChange={handleChange}
                  id="code-field"
                />
              </div>
              <div>
                <FormControl fullWidth variant="outlined" required error={Boolean(error?.type)}>
                  <InputLabel id="demo-simple-select-error-label">Reward Condition</InputLabel>
                  <Select
                    required
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={form?.type || ''}
                    label="Reward Condition"
                    name="type"
                    onChange={handleChange}
                  >
                    <MenuItem value={'quantity'}>Quantity</MenuItem>
                    <MenuItem value={'price'}>Price</MenuItem>
                  </Select>
                  {error?.type && <FormHelperText>{error.type}</FormHelperText>}
                </FormControl>
              </div>
            </div>
            <div className="grid max-md:grid-cols-1 grid-cols-2 gap-4 my-5">
              <div>
                <TextField
                  required
                  fullWidth
                  type="text"
                  label="Description"
                  variant="outlined"
                  name="description"
                  value={form?.description}
                  placeholder="Enter Description about Discount"
                  error={Boolean(error?.description)}
                  helperText={error?.description}
                  onChange={handleChange}
                />
              </div>
              <div>
                <TextField
                  fullWidth
                  required
                  type="number"
                  label="Discount"
                  name="percentage"
                  value={form?.percentage}
                  variant="outlined"
                  placeholder="Enter Discount in percentage"
                  error={Boolean(error?.percentage)}
                  helperText={error?.percentage || ''}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">%</InputAdornment>
                    ),
                  }}
                />
              </div>
            </div>
            <div className="grid max-md:grid-cols-1 grid-cols-3 gap-4 my-5">
              <div>
                <TextField
                  fullWidth
                  type="number"
                  label="Minimun Spend"
                  name="minimumSpend"
                  value={form?.minimumSpend}
                  variant="outlined"
                  placeholder={form.type === 'price' ? "Enter Minimun Spend Amount":"Enter Minimun Quantity"}
                  onChange={handleChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">{form.type === 'price' ? "$":"#"}</InputAdornment>
                    ),
                  }}
                />
              </div>
              <div>
                <TextField
                  fullWidth
                  type="number"
                  label="User Expiry Days"
                  name="expiryDays"
                  value={form?.expiryDays}
                  variant="outlined"
                  placeholder="Enter User Expiry Days"
                  onChange={handleChange}
                />
              </div>
              <div>
                <TextField
                  fullWidth
                  disabled
                  label="Global Expiry Date"
                  name="expiryDate"
                  value={form?.expiryDate}
                  type="date"
                  variant="outlined"
                  onChange={handleChange}
                  InputLabelProps={{shrink:true}}
                />
              </div>
            </div>
            <div className="grid max-md:grid-cols-1 grid-cols-4 my-5 items-center">
              <div className="md:text-center">
                <FormControlLabel
                  control={
                    <Switch checked={form?.freeDelivery} name="freeDelivery" color="warning" onChange={handleChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="Free Delivery"
                />
              </div>
              <div className="md:text-center">
                <FormControlLabel
                  control={
                    <Switch checked={form?.newUserDisc} disabled={firstOrderDiscExists} name="newUserDisc" color="warning" onChange={handleChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="New User Discount"
                />
              </div>
              <div className="md:text-center">
                <FormControlLabel
                  control={
                    <Switch checked={form?.isEnable} name="isEnable" color="warning" onChange={handleChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="Enabled"
                />
              </div>
              <div className="md:text-center">
                <FormControlLabel
                  control={
                    <Switch checked={form?.isPublic} name="isPublic" color="warning" onChange={handleChange}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="Public Discount"
                />
              </div>
            </div>
            <div className="mt-8">
              <div className="pb-5 float-right mr-5">
                <Button variant="outlined" color="warning" size="medium" onClick={() => handleClose()}>
                  Cancel
                </Button>
                <Button sx={{ marginLeft: 2 }} variant="outlined" color="success" size="medium" onClick={() => hanldeSubmit()}>
                  {!disc_Item ? 'Create':'Update'}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </Box>
    </Modal>
  );
};
export default DiscountForm;