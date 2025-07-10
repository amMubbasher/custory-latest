import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 'fit-content',
  bgcolor: 'background.paper',
  outline : 'none',
  borderRadius : '12px'
//   border: '2px solid #000', 
//   boxShadow: 24,
//   p: 4,
};

export default function BasicModal({open,handleClose,children}) {

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        sx={{backgroundColor : 'rgba(255,255,255, 0.5)'}}
      >
        <Box sx={style}>
          {children}
        </Box>
      </Modal>
    </>
  );
}
