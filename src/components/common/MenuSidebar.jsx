import { AccountCircle, ArrowForwardIos, Home, ShoppingBasket } from "@mui/icons-material";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { Button, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import useAppStore from "../../hooks/useAppStore";
import useAuth from "../../hooks/useAuth";
import { UserIconImg } from "../../utils/Assets";

const MenuItem = ({icon,text,link})=>{
  const navigate = useNavigate();
  return (
    <Button onClick={()=>navigate(link || '/')} variant='text' sx={{color : 'black', display : 'block', width : '100%'}}>
    <div className="px-3 py-4 border-b-[1px] flex items-center gap-5">
      {icon}
      <div className="text-xl max-xs:text-lg">{text}</div> 
    </div>
    </Button>
  )
}

const MenuSidebar = ({ isOpen, setIsOpen }) => {
  const {setLogoutState} = useAuth();
  const user = useAppStore(state=>state.user);
  const isLoggedin = useAppStore(state=>state.isLoggedin);
  const setShowAuthModal = useAppStore(state=>state.setShowAuthModal);
  const navigate = useNavigate();

  const handleLogout = ()=>{
    
    setLogoutState();
    setIsOpen(false);
    navigate('/')

  }

  const handleLogin = ()=>{
    setShowAuthModal(true);
    setIsOpen(false); 
  }
  


  return (
    <Drawer anchor="left" open={isOpen} onClose={() => setIsOpen(false)}>
      <div className="w-[50vw] max-xs:w-[90vw] max-md:w-[60vw] bg-white relative h-full">
        <div className="px-5 py-6 max-xs:px-3 border-b-[1px] flex items-center gap-6 justify-between">
          <div className="flex items-center gap-4">
            <div className="w-[65px] max-xs:w-[50px] max-xs:h-[50px] max-md:w-[55px] max-md:h-[55px] h-[65px] bg-[#f97b64] rounded-full">
              <img src={UserIconImg} onContextMenu={(e) => e.preventDefault()} />
            </div>
            {!isLoggedin?<div>
              <div onClick={handleLogin} className="text-xl max-xs:text-base max-md:text-lg font-semibold">Hi there!</div>
              <div className="text-lg text:text-sm max-md:text-base opacity-70 font-[400]">Login/Signup</div>
            </div>:<div>
            <div className="text-xl max-xs:text-base max-md:text-lg font-bold">{user?.firstName} {user?.lastName}</div>
              <div onClick={handleLogout} className="text-lg text:text-sm max-md:text-base opacity-80 text-red-500 -mt-1 underline font-[400]">Logout</div>
              </div>}
          </div>
          <ArrowForwardIos sx={{ fontSize: {xs : 28, sm:32} }} />
        </div>
        <div className="mt-0 py-4">    
        <MenuItem link={'/'} icon={<Home sx={{fontSize : {xs : 25, sm : 28}}}/>} text='Home'/>      
        <MenuItem link={'/products'} icon={<ShoppingBasket sx={{fontSize : {xs : 25, sm : 28}}}/>} text='Shop'/>
        {(isLoggedin && (user?.role === 'customer')) && <MenuItem link={'/account/mygifts'} icon={<FormatListBulletedIcon sx={{fontSize : {xs : 25, sm : 28}}}/>} text='My Orders'/>}
        {(user?.role === 'admin') && <MenuItem link={'/adminPortal'} icon={<AccountCircle sx={{fontSize : {xs : 25, sm : 28}}}/>} text='Custory Admin'/>}
        {(user?.role === 'supplier') && <MenuItem link={'/sellerPortal'} icon={<AccountCircle sx={{fontSize : {xs : 25, sm : 28}}}/>} text='Seller Portal'/>}     
        <MenuItem link={'/account'} icon={<AccountCircle sx={{fontSize : {xs : 25, sm : 28}}}/>} text='My Account'/>       
        </div>
      </div>
    </Drawer>
  );
};

export default MenuSidebar;