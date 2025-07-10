import { Add, Remove } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";

const QuantitySelector = ({value,setValue,className}) => {
  return (
    <div className={`${className||''} flex items-center gap-6 max-sm:gap-4`}>
      <p className="text-lg max-sm:text-base">Quantity</p>
      <div className="flex items-center gap-3 max-sm:gap-2">
        <IconButton onClick={()=>setValue(value==0?value:value-1)}>
          <Remove  sx={{fontSize : {xs : 22, sm: 26}}}/>
        </IconButton>
        <div className="px-2 text-lg font-semibold">{value}</div>
        <IconButton onClick={()=>setValue(value==15?value:value+1)}>
          <Add sx={{fontSize : {xs : 22, sm: 26}}}/>
        </IconButton>
      </div>
    </div>
  );
};

export default QuantitySelector;
