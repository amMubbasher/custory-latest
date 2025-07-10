import { Avatar, IconButton } from '@mui/material'
import React, { useState } from 'react'
import { toast } from 'react-hot-toast'
import useAppStore from '../../hooks/useAppStore'
import { APP_AUTH_KEY } from '../../hooks/useAuth'
import { stringAvatar } from '../../utils/functions/stringToColor'
import BasicModal from './BasicModal'
import Button from './Button'

const UserModal = ({open,handleClose}) => {
    const user = useAppStore(state=>state.user);
    const setIsLoggedin = useAppStore(state=>state.setIsLoggedin);
    const setUser = useAppStore(state=>state.setUser);
    const handleLogout = ()=>{
        setIsLoggedin(false);
        setUser(null);
        localStorage.removeItem(APP_AUTH_KEY);
        handleClose();
        toast.success('Logged out successfully')
    }
    
  return (
    <BasicModal handleClose={handleClose} open={open}>
        <div className='w-[40vw] max-w-[700px] max-lg:w-[70vw] max-md:w-[80vw] max-sm:flex-col max-sm:items-start max-xl:w-[50vw] flex justify-between items-center p-4 rounded-xl bg-white'>
            <div className='w-full flex items-center gap-3'>
                <IconButton>
                    <Avatar {...stringAvatar(`${user?.firstName || 'X'} ${user?.lastName || 'X'}`)}/>
                </IconButton>
                <div>
                    <div className='text-lg'>{`${user?.firstName} ${user?.lastName}`}</div>
                    <div className='text-sm mt-1 opacity-70'>{user?.email}</div>
                </div>
            </div>
            <div className='flex max-sm:mt-5'>
                <Button onClick={handleLogout} >Logout</Button>
            </div>
        </div>
    </BasicModal>
  )
}

export default UserModal