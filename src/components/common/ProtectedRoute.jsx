import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import useAppStore from '../../hooks/useAppStore';
import { isLoggedinUser } from '../../hooks/useAuth';



const ProtectedRoute = () => {
    const isLoggedin = isLoggedinUser();


  return (
    <>
    {isLoggedin.state?<Outlet/>:<Navigate to={'/'}/>}
    </>
  )
}

export default ProtectedRoute